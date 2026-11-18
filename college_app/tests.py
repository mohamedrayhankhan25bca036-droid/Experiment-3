from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from college_app.models import (
    ChatSession, ChatMessage, Course, Department,
    Facility, Faculty, Event, ExamSchedule,
    PlacementStat, KnowledgeEntry, BotConfig, ContactInquiry
)
from college_app.gemini_service import retrieve_college_context

class CollegeManagementAndChatTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.dept = Department.objects.create(
            name="School of Computing & AI",
            code="CSAI",
            head="Prof. Alexander Reed",
            description="Leading AI and computing department",
            contact_email="cs@angelo.edu"
        )
        self.course = Course.objects.create(
            code="CS-101",
            title="B.Tech in Computer Science & Engineering",
            degree="Undergraduate",
            department=self.dept,
            duration="4 Years",
            fees_per_year="$13,000 / year",
            eligibility="10+2 with 75% in PCM",
            description="Comprehensive engineering curriculum covering systems and AI",
            seats=180
        )
        self.facility = Facility.objects.create(
            name="Angelo Central Library",
            category="Academic",
            description="6-floor modern library with 150,000+ volumes",
            location="North Quad",
            timings="24/7"
        )
        self.faculty = Faculty.objects.create(
            name="Dr. Sophia Martinez",
            designation="Dean of Engineering",
            department=self.dept,
            qualification="Ph.D. Stanford University",
            email="s.martinez@angelo.edu",
            bio="Leading researcher in neural networks",
            research_areas="Deep Learning, AI Ethics"
        )
        self.event = Event.objects.create(
            title="Ignite Angelo 2027",
            category="Tech",
            date_display="March 24-26, 2027",
            venue="Grand Auditorium",
            description="Annual 36-hour hackathon and robotics exhibition"
        )
        self.exam = ExamSchedule.objects.create(
            semester="Fall 2026 End-Semester",
            program="B.Tech Computer Science",
            course_code="CS-101",
            course_title="Computer Architecture",
            exam_date="December 08, 2026",
            exam_time="09:30 AM - 12:30 PM",
            venue="Turing Hall A"
        )
        self.placement = PlacementStat.objects.create(
            year=2026,
            total_offers=1120,
            highest_package="$148,000 / annum",
            average_package="$86,200 / annum",
            placement_rate="96.8%",
            top_recruiters="Google, Microsoft, Amazon, Tesla"
        )
        self.kb = KnowledgeEntry.objects.create(
            category="courses",
            title="B.Tech CS Degree Details",
            content="B.Tech in Computer Science at Angelo University costs $13,000 per year.",
            keywords="btech, cs, fee, courses, tuition",
            is_published=True
        )

    # 1. API Endpoint Tests (FR-WEB-01, 5.2)
    def test_college_overview_api(self):
        """Tests public college overview stats endpoint"""
        res = self.client.get(reverse('college-overview'))
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data['name'], 'Angelo University')
        self.assertEqual(data['motto'], 'Empowering Minds, Building Futures.')
        self.assertIn('academic_programs', data['stats'])
        self.assertEqual(data['stats']['placement_rate'], '96.8%')

    def test_courses_list_api(self):
        """Tests courses list endpoint and degree filtering"""
        res = self.client.get(reverse('college-courses'))
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertGreaterEqual(len(data), 1)
        self.assertEqual(data[0]['code'], 'CS-101')

        # Test filter
        res_ug = self.client.get(reverse('college-courses') + '?degree=Undergraduate')
        self.assertEqual(res_ug.status_code, 200)
        self.assertGreaterEqual(len(res_ug.json()), 1)

    def test_departments_list_api(self):
        """Tests departments endpoint"""
        res = self.client.get(reverse('college-departments'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.json()), 1)
        self.assertEqual(res.json()[0]['code'], 'CSAI')

    def test_faculty_list_api(self):
        """Tests faculty endpoint"""
        res = self.client.get(reverse('college-faculty'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()[0]['name'], 'Dr. Sophia Martinez')

    def test_facilities_list_api(self):
        """Tests facilities endpoint"""
        res = self.client.get(reverse('college-facilities'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()[0]['name'], 'Angelo Central Library')

    def test_events_list_api(self):
        """Tests events endpoint"""
        res = self.client.get(reverse('college-events'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()[0]['title'], 'Ignite Angelo 2027')

    def test_exams_list_api(self):
        """Tests exam schedules endpoint"""
        res = self.client.get(reverse('college-exams'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()[0]['course_code'], 'CS-101')

    def test_placements_api(self):
        """Tests placement statistics endpoint"""
        res = self.client.get(reverse('college-placements'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()['highest_package'], '$148,000 / annum')

    def test_contact_inquiry_submission(self):
        """Tests contact form submission endpoint (FR-WEB-05)"""
        res = self.client.post(reverse('college-contact'), {
            'name': 'Alex Morgan',
            'email': 'alex@example.com',
            'phone': '+1 555-1234',
            'subject': 'Scholarship Query',
            'message': 'Do you have women in tech scholarships?'
        }, content_type='application/json')
        self.assertEqual(res.status_code, 201)
        self.assertTrue(ContactInquiry.objects.filter(email='alex@example.com').exists())

    # 2. Session & History Tests (FR-HIS-01 to FR-HIS-06)
    def test_create_and_delete_chat_session(self):
        """Tests session creation, message storage, retrieval and deletion"""
        # Create session
        res = self.client.post(reverse('chat-session-create'))
        self.assertEqual(res.status_code, 201)
        session_id = res.json()['session_id']
        self.assertTrue(ChatSession.objects.filter(id=session_id).exists())

        # Post messages
        session = ChatSession.objects.get(id=session_id)
        ChatMessage.objects.create(session=session, role='user', content='Hello Angelo AI')
        ChatMessage.objects.create(session=session, role='assistant', content='Hello! Welcome to Angelo University 😊')

        # Retrieve messages
        get_res = self.client.get(reverse('chat-session-messages', args=[session_id]))
        self.assertEqual(get_res.status_code, 200)
        messages_data = get_res.json()['messages']
        self.assertEqual(len(messages_data), 2)
        self.assertEqual(messages_data[0]['role'], 'user')
        self.assertEqual(messages_data[1]['role'], 'assistant')

        # Clear session
        del_res = self.client.delete(reverse('chat-session-delete', args=[session_id]))
        self.assertEqual(del_res.status_code, 200)
        self.assertEqual(ChatMessage.objects.filter(session=session).count(), 0)

    # 3. Security & Input Constraints (NFR-SEC-04, NFR-SEC-06)
    def test_chat_message_length_validation(self):
        """Tests maximum message length validation (1,000 chars limit)"""
        too_long = "a" * 1005
        res = self.client.post(reverse('chat-message'), {
            'message': too_long
        }, content_type='application/json')
        self.assertEqual(res.status_code, 400)
        self.assertIn('exceeds maximum length', res.json()['error'])

    def test_empty_message_validation(self):
        """Tests empty message validation"""
        res = self.client.post(reverse('chat-message'), {
            'message': '   '
        }, content_type='application/json')
        self.assertEqual(res.status_code, 400)
        self.assertIn('cannot be empty', res.json()['error'])

    def test_rag_retrieval(self):
        """Tests keyword-based retrieval from Angelo knowledge base (FR-KB-02)"""
        context = retrieve_college_context('What is the tuition fee for B.Tech Computer Science?')
        self.assertIn('Angelo University', context)
        self.assertIn('13,000', context)

    def test_admin_authentication_enforced(self):
        """Tests that admin endpoints require authentication (FR-ADM-01)"""
        res = self.client.get('/admin/college_app/chatsession/')
        # Should redirect to login (302)
        self.assertEqual(res.status_code, 302)
