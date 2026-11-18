import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, DollarSign, Award, ArrowUpRight, MessageSquare, Search } from 'lucide-react';

export const CoursesSection = ({ onAskBot }) => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/college/courses/')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching courses:', err);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesFilter = filter === 'All' || c.degree.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">
            Academic Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] tracking-tight">
            Explore Academic Programs
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Discover cutting-edge degrees designed with global industry leaders, featuring hands-on labs and guaranteed placement pathways.
          </p>

          {/* Filters & Search */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {['All', 'Undergraduate', 'Postgraduate'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {f} Programs
              </button>
            ))}

            <div className="relative ml-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search programs..."
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Grid of Courses */}
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading programs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.code}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold">
                      {course.code}
                    </span>
                    <span className="text-slate-500 font-medium">
                      {course.degree}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-blue-500" /> Duration
                      </span>
                      <span className="font-semibold text-slate-800">{course.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Annual Tuition
                      </span>
                      <span className="font-semibold text-emerald-700">{course.fees_per_year}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Award className="w-3.5 h-3.5 text-amber-500" /> Available Seats
                      </span>
                      <span className="font-semibold text-slate-800">{course.seats} Seats</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onAskBot(`Tell me in detail about the ${course.title} (${course.code}), its eligibility, syllabus and career prospects.`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask Angelo AI</span>
                  </button>

                  <a
                    href="#admissions"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <span>Apply</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default CoursesSection;
