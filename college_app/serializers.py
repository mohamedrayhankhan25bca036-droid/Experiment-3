from rest_framework import serializers
from .models import (
    ChatSession, ChatMessage, Course, Department,
    Faculty, Facility, Event, ExamSchedule,
    PlacementStat, KnowledgeEntry, ContactInquiry, BotConfig
)

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'role', 'content', 'created_at', 'token_count', 'flagged']

class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = ChatSession
        fields = ['id', 'created_at', 'last_active_at', 'is_deleted', 'messages']

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Course
        fields = '__all__'

class FacultySerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Faculty
        fields = '__all__'

class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class ExamScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamSchedule
        fields = '__all__'

class PlacementStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlacementStat
        fields = '__all__'

class KnowledgeEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeEntry
        fields = '__all__'

class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = '__all__'

class BotConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotConfig
        fields = '__all__'
