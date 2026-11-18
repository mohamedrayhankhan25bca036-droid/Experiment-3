import uuid
from datetime import timedelta
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    ChatSession, ChatMessage, Course, Department,
    Faculty, Facility, Event, ExamSchedule,
    PlacementStat, KnowledgeEntry, ContactInquiry, BotConfig
)
from .serializers import (
    ChatMessageSerializer, ChatSessionSerializer,
    CourseSerializer, DepartmentSerializer, FacultySerializer,
    FacilitySerializer, EventSerializer, ExamScheduleSerializer,
    PlacementStatSerializer, ContactInquirySerializer
)
from .gemini_service import generate_chat_reply

@api_view(['POST'])
def chat_message_view(request):
    """
    Handles user chat message submission:
    Validates message, enforces rate limits, logs message, invokes Gemini 3.5 Flash,
    and returns assistant response.
    """
    session_id = request.data.get('session_id')
    user_message = request.data.get('message', '').strip()

    if not user_message:
        return Response({'error': 'Message cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)

    # NFR-SEC-06: Maximum message length (1,000 characters)
    if len(user_message) > 1000:
        return Response({'error': 'Message exceeds maximum length of 1,000 characters.'}, status=status.HTTP_400_BAD_REQUEST)

    # Retrieve or create session
    session = None
    if session_id:
        try:
            session = ChatSession.objects.filter(id=session_id, is_deleted=False).first()
        except Exception:
            session = None

    if not session:
        session = ChatSession.objects.create()

    # Rate limiting: maximum 30 messages per minute per session
    one_minute_ago = timezone.now() - timedelta(minutes=1)
    recent_count = ChatMessage.objects.filter(session=session, role='user', created_at__gte=one_minute_ago).count()
    if recent_count > 30:
        return Response(
            {'error': 'You have sent too many queries in a short time. Please wait a moment before sending another message.'},
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )

    # NFR-REL-03: Save user message before making the Gemini call
    user_msg_obj = ChatMessage.objects.create(
        session=session,
        role='user',
        content=user_message,
        token_count=len(user_message.split())
    )

    # Load recent conversation history (excluding current user message)
    recent_messages = ChatMessage.objects.filter(session=session).exclude(id=user_msg_obj.id).order_by('created_at')[:10]
    history = [{'role': m.role, 'content': m.content} for m in recent_messages]

    # Invoke Gemini with RAG and system prompt
    reply_text = generate_chat_reply(user_message, history)

    # Save assistant message
    asst_msg_obj = ChatMessage.objects.create(
        session=session,
        role='assistant',
        content=reply_text,
        token_count=len(reply_text.split())
    )

    session.last_active_at = timezone.now()
    session.save()

    return Response({
        'session_id': str(session.id),
        'reply': reply_text,
        'user_message_id': user_msg_obj.id,
        'assistant_message_id': asst_msg_obj.id,
        'timestamp': asst_msg_obj.created_at.isoformat(),
    })

@api_view(['POST'])
def create_session_view(request):
    """
    Creates a new chat session (FR-HIS-01, FR-HIS-05)
    """
    session = ChatSession.objects.create()
    return Response({
        'session_id': str(session.id),
        'created_at': session.created_at.isoformat()
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_session_messages_view(request, session_id):
    """
    Returns message history for a given session (FR-HIS-03)
    """
    try:
        session = ChatSession.objects.get(id=session_id, is_deleted=False)
    except ChatSession.DoesNotExist:
        return Response({'error': 'Session not found.'}, status=status.HTTP_404_NOT_FOUND)

    messages = session.messages.all().order_by('created_at')
    serializer = ChatMessageSerializer(messages, many=True)
    return Response({
        'session_id': str(session.id),
        'messages': serializer.data
    })

@api_view(['DELETE'])
def delete_session_view(request, session_id):
    """
    Deletes conversation history for the session (FR-HIS-06)
    """
    try:
        session = ChatSession.objects.get(id=session_id)
        session.is_deleted = True
        session.save()
        session.messages.all().delete()
        return Response({'message': 'Conversation history cleared successfully.'})
    except ChatSession.DoesNotExist:
        return Response({'error': 'Session not found.'}, status=status.HTTP_404_NOT_FOUND)

# College Data Endpoints
@api_view(['GET'])
def college_overview_view(request):
    """
    Provides statistics and general highlights for Angelo University
    """
    placement = PlacementStat.objects.first()
    return Response({
        'name': 'Angelo University',
        'motto': 'Empowering Minds, Building Futures.',
        'established': 1968,
        'stats': {
            'academic_programs': f"{Course.objects.count()}+",
            'students': '10,000+',
            'faculty': '200+',
            'facilities': '30+',
            'placement_rate': placement.placement_rate if placement else '96.8%',
            'highest_package': placement.highest_package if placement else '$148,000 / annum',
            'average_package': placement.average_package if placement else '$86,200 / annum',
        },
        'contact': {
            'phone': '+1 (555) 019-2834',
            'email': 'admissions@angelo.edu',
            'address': '100 University Boulevard, Tech Crest Valley, CA 94025, USA',
            'hours': 'Monday - Friday: 8:30 AM - 5:30 PM PST'
        }
    })

@api_view(['GET'])
def courses_list_view(request):
    degree = request.query_params.get('degree')
    qs = Course.objects.all()
    if degree:
        qs = qs.filter(degree__icontains=degree)
    serializer = CourseSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def departments_list_view(request):
    departments = Department.objects.all()
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def faculty_list_view(request):
    faculty = Faculty.objects.all()
    serializer = FacultySerializer(faculty, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def facilities_list_view(request):
    facilities = Facility.objects.all()
    serializer = FacilitySerializer(facilities, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def events_list_view(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def exam_schedule_list_view(request):
    exams = ExamSchedule.objects.all()
    serializer = ExamScheduleSerializer(exams, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def placement_stats_view(request):
    stats = PlacementStat.objects.first()
    serializer = PlacementStatSerializer(stats)
    return Response(serializer.data if stats else {})

@api_view(['POST'])
def submit_contact_inquiry(request):
    serializer = ContactInquirySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Thank you! Your inquiry has been received. Our admissions team will get back to you shortly.',
            'inquiry': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
