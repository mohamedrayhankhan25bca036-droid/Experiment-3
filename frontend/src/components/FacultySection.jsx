import React, { useState, useEffect } from 'react';
import { Mail, GraduationCap, Award, BookOpen, MessageSquare } from 'lucide-react';

export const FacultySection = ({ onAskBot }) => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    fetch('/api/college/faculty/')
      .then((res) => res.json())
      .then((data) => setFaculty(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="faculty" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mb-3">
            Scholarly Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] tracking-tight">
            200+ Renowned Faculty & Researchers
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Learn from distinguished scholars holding Ph.D. degrees from Stanford, MIT, Harvard, Cambridge, and ETH Zurich.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((f) => (
            <div
              key={f.name}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center font-extrabold text-xl flex-shrink-0">
                    {f.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {f.name}
                    </h3>
                    <p className="text-xs text-indigo-600 font-semibold">
                      {f.designation}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-700">{f.qualification}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed pt-1">
                    {f.bio}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4">
                  <span className="font-bold text-slate-700 block mb-1">Research Focus:</span>
                  <span>{f.research_areas}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`mailto:${f.email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{f.email}</span>
                </a>

                <button
                  onClick={() => onAskBot(`Can you tell me about Professor ${f.name}, their publications and research domain?`)}
                  className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50"
                  title="Ask Angelo AI about this professor"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FacultySection;
