from django.contrib import admin
from .models import (
    ChatSession, ChatMessage, Course, Department,
    Faculty, Facility, Event, ExamSchedule,
    PlacementStat, KnowledgeEntry, ContactInquiry, BotConfig
)

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_at', 'last_active_at', 'is_deleted')
    list_filter = ('is_deleted', 'created_at')
    search_fields = ('id',)

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'session', 'role', 'short_content', 'created_at', 'flagged')
    list_filter = ('role', 'flagged', 'created_at')
    search_fields = ('content', 'session__id')

    def short_content(self, obj):
        return obj.content[:60] + '...' if len(obj.content) > 60 else obj.content

@admin.register(KnowledgeEntry)
class KnowledgeEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_published', 'updated_at')
    list_filter = ('category', 'is_published')
    search_fields = ('title', 'content', 'keywords')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'title', 'degree', 'department', 'duration', 'fees_per_year', 'seats')
    list_filter = ('degree', 'department')
    search_fields = ('code', 'title', 'description')

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'head', 'contact_email')
    search_fields = ('name', 'code', 'head')

@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation', 'department', 'email')
    list_filter = ('department',)
    search_fields = ('name', 'qualification', 'research_areas')

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'location', 'timings')
    list_filter = ('category',)
    search_fields = ('name', 'description')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date_display', 'venue')
    list_filter = ('category',)
    search_fields = ('title', 'description')

@admin.register(ExamSchedule)
class ExamScheduleAdmin(admin.ModelAdmin):
    list_display = ('course_code', 'course_title', 'semester', 'exam_date', 'exam_time', 'venue')
    list_filter = ('semester',)
    search_fields = ('course_code', 'course_title')

@admin.register(PlacementStat)
class PlacementStatAdmin(admin.ModelAdmin):
    list_display = ('year', 'placement_rate', 'highest_package', 'average_package', 'total_offers')

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')

@admin.register(BotConfig)
class BotConfigAdmin(admin.ModelAdmin):
    list_display = ('model_name', 'temperature', 'history_limit', 'rate_limit', 'system_prompt_version')
