import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Briefcase, Building, CheckCircle2, MessageSquare } from 'lucide-react';

export const PlacementsSection = ({ onAskBot }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/college/placements/')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  const companies = [
    'Google', 'Microsoft', 'Amazon AWS', 'Tesla', 'Apple',
    'NVIDIA', 'Meta', 'Cisco', 'Deloitte', 'McKinsey', 'Intel', 'Bloomberg'
  ];

  return (
    <section id="placements" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            Career Success
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] tracking-tight">
            Exceptional Placements & Global Pathways
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Angelo University's Career Development Cell connects graduates directly with premier technology firms and global Fortune 500 innovators.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">
              {stats?.placement_rate || '96.8%'}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700">Placement Record</div>
            <div className="text-[11px] text-slate-500">2026 Graduating Cohort</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
              {stats?.highest_package || '$148,000'}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700">Highest Package</div>
            <div className="text-[11px] text-slate-500">Silicon Valley Tech Offer</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">
              {stats?.average_package || '$86,200'}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700">Average Salary</div>
            <div className="text-[11px] text-slate-500">Across all engineering majors</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600">
              {stats?.total_offers || '1,120+'}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700">Job Offers Extended</div>
            <div className="text-[11px] text-slate-500">120+ multinational partners</div>
          </div>
        </div>

        {/* Top Recruiters Marquee / Badges */}
        <div className="bg-[#09142f] text-white p-8 rounded-3xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-bold text-lg">Top Corporate & Technology Recruiters</h3>
              <p className="text-xs text-slate-400">Regular campus placement recruiters visiting Angelo University annually</p>
            </div>
            <button
              onClick={() => onAskBot('Which companies hire from Angelo University and what are the average placement packages for computer science?')}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI Placement Insights</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {companies.map((co) => (
              <div
                key={co}
                className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-center font-bold text-xs text-slate-200 hover:bg-white/10 hover:text-white hover:border-cyan-400 transition-all cursor-default"
              >
                {co}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlacementsSection;
