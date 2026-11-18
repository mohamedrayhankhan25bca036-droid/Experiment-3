import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, FileText, CheckCircle } from 'lucide-react';

export const EventsExamSection = ({ onAskBot }) => {
  const [events, setEvents] = useState([]);
  const [exams, setExams] = useState([]);
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    fetch('/api/college/events/')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));

    fetch('/api/college/exams/')
      .then((res) => res.json())
      .then((data) => setExams(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="events" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-2">
              Campus Calendar
            </div>
            <h2 className="text-3xl font-extrabold text-[#091535] tracking-tight">
              Events & Examination Schedules
            </h2>
          </div>

          {/* Toggle Tab */}
          <div className="flex items-center bg-white p-1 rounded-full border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'events'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'exams'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Exam Timetables
            </button>
          </div>
        </div>

        {/* Events View */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((ev) => (
              <div
                key={ev.title}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-blue-600 font-bold mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50">{ev.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {ev.title}
                  </h3>

                  <p className="text-xs text-slate-600 mb-4 line-clamp-3">
                    {ev.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-semibold text-slate-800">{ev.date_display}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ev.venue}</span>
                  </div>

                  <button
                    onClick={() => onAskBot(`Tell me details about the upcoming event: ${ev.title} at Angelo University.`)}
                    className="w-full mt-3 py-1.5 text-center text-xs font-bold text-blue-600 hover:underline"
                  >
                    Ask Angelo AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Exams View */}
        {activeTab === 'exams' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Fall 2026 End-Semester Official Timetable</h3>
                <p className="text-xs text-slate-500">Hall tickets available 2 weeks prior via student portal</p>
              </div>
              <button
                onClick={() => onAskBot('What are the rules, passing criteria and exam timings for Fall 2026 exams at Angelo University?')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                Ask AI Exam Rules
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-6">Course Code</th>
                    <th className="py-3 px-6">Subject / Course Title</th>
                    <th className="py-3 px-6">Exam Date</th>
                    <th className="py-3 px-6">Time Slot</th>
                    <th className="py-3 px-6">Assigned Venue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {exams.map((ex) => (
                    <tr key={ex.course_code} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-bold text-blue-700 font-mono">{ex.course_code}</td>
                      <td className="py-3.5 px-6 font-semibold text-slate-900">{ex.course_title}</td>
                      <td className="py-3.5 px-6 font-medium text-slate-800">{ex.exam_date}</td>
                      <td className="py-3.5 px-6">{ex.exam_time}</td>
                      <td className="py-3.5 px-6 text-slate-500">{ex.venue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default EventsExamSection;
