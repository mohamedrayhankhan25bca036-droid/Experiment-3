import uuid
from django.db import models
from django.contrib.auth.models import User

class ChatSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='chat_sessions')
    created_at = models.DateTimeField(auto_now_add=True)
    last_active_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"Session {self.id} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"

class ChatMessage(models.Model):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    )
    session = models.ForeignKey(ChatSession, related_name='messages', on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    token_count = models.IntegerField(default=0)
    flagged = models.BooleanField(default=False)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"[{self.role}] {self.content[:40]}..."

class KnowledgeEntry(models.Model):
    CATEGORY_CHOICES = (
        ('admissions', 'Admissions & Requirements'),
        ('courses', 'Courses & Curriculum'),
        ('fees', 'Fees & Scholarships'),
        ('faculty', 'Faculty & Departments'),
        ('facilities', 'Campus & Facilities'),
        ('events', 'Events & Campus Life'),
        ('exams', 'Exams & Timetables'),
        ('placements', 'Placements & Careers'),
        ('contact', 'Contact & Office Hours'),
        ('rules', 'Rules & Regulations'),
        ('general', 'General College Information'),
    )
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=255)
    content = models.TextField()
    keywords = models.TextField(help_text="Comma-separated keywords for retrieval", blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"[{self.category}] {self.title}"

class Department(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    head = models.CharField(max_length=200)
    description = models.TextField()
    contact_email = models.EmailField()

    def __str__(self):
        return f"{self.name} ({self.code})"

class Course(models.Model):
    DEGREE_CHOICES = (
        ('Undergraduate', 'Undergraduate (B.Tech / B.Sc / BBA)'),
        ('Postgraduate', 'Postgraduate (M.Tech / MBA / M.Sc)'),
        ('Doctoral', 'Doctoral (Ph.D.)'),
        ('Diploma', 'Professional Diploma'),
    )
    code = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=255)
    degree = models.CharField(max_length=50, choices=DEGREE_CHOICES)
    department = models.ForeignKey(Department, related_name='courses', on_delete=models.CASCADE)
    duration = models.CharField(max_length=50, default='4 Years')
    fees_per_year = models.CharField(max_length=50)
    eligibility = models.TextField()
    description = models.TextField()
    curriculum = models.TextField(blank=True)
    seats = models.IntegerField(default=60)

    def __str__(self):
        return f"{self.title} ({self.code})"

class Faculty(models.Model):
    name = models.CharField(max_length=200)
    designation = models.CharField(max_length=200)
    department = models.ForeignKey(Department, related_name='faculty_members', on_delete=models.CASCADE)
    qualification = models.CharField(max_length=255)
    email = models.EmailField()
    bio = models.TextField(blank=True)
    research_areas = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} - {self.designation}"

class Facility(models.Model):
    CATEGORY_CHOICES = (
        ('Academic', 'Academic Labs & Libraries'),
        ('Residential', 'Hostels & Dining'),
        ('Sports', 'Sports & Recreation'),
        ('Health', 'Health & Wellness'),
        ('Innovation', 'Incubation & Research Centers'),
    )
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    location = models.CharField(max_length=255)
    timings = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.category})"

class Event(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50)
    date_display = models.CharField(max_length=100)
    venue = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f"{self.title} - {self.date_display}"

class ExamSchedule(models.Model):
    semester = models.CharField(max_length=50)
    program = models.CharField(max_length=100)
    course_code = models.CharField(max_length=20)
    course_title = models.CharField(max_length=255)
    exam_date = models.CharField(max_length=50)
    exam_time = models.CharField(max_length=50)
    venue = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.course_code}: {self.course_title} ({self.exam_date})"

class PlacementStat(models.Model):
    year = models.IntegerField(default=2026)
    total_offers = models.IntegerField(default=950)
    highest_package = models.CharField(max_length=50, default='$145,000 / annum')
    average_package = models.CharField(max_length=50, default='$84,500 / annum')
    placement_rate = models.CharField(max_length=20, default='96.4%')
    top_recruiters = models.TextField(default='Google, Microsoft, Amazon, Tesla, Cisco, Deloitte, Intel, Apple')

    def __str__(self):
        return f"Placements {self.year}"

class ContactInquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='New')

    def __str__(self):
        return f"Inquiry from {self.name} - {self.subject}"

class BotConfig(models.Model):
    model_name = models.CharField(max_length=100, default='gemini-3.5-flash')
    temperature = models.FloatField(default=0.7)
    history_limit = models.IntegerField(default=10)
    rate_limit = models.IntegerField(default=30)
    system_prompt_version = models.CharField(max_length=20, default='1.0')

    def __str__(self):
        return f"BotConfig: {self.model_name}"
