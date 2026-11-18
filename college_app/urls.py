from django.urls import path
from . import views

urlpatterns = [
    # Chat endpoints (SRS 5.2)
    path('chat/', views.chat_message_view, name='chat-message'),
    path('chat/sessions/', views.create_session_view, name='chat-session-create'),
    path('chat/sessions/<uuid:session_id>/messages/', views.get_session_messages_view, name='chat-session-messages'),
    path('chat/sessions/<uuid:session_id>/', views.delete_session_view, name='chat-session-delete'),

    # College Resource endpoints (SRS 5.2)
    path('college/overview/', views.college_overview_view, name='college-overview'),
    path('college/courses/', views.courses_list_view, name='college-courses'),
    path('college/departments/', views.departments_list_view, name='college-departments'),
    path('college/faculty/', views.faculty_list_view, name='college-faculty'),
    path('college/facilities/', views.facilities_list_view, name='college-facilities'),
    path('college/events/', views.events_list_view, name='college-events'),
    path('college/exams/', views.exam_schedule_list_view, name='college-exams'),
    path('college/placements/', views.placement_stats_view, name='college-placements'),
    path('college/contact/', views.submit_contact_inquiry, name='college-contact'),
]
