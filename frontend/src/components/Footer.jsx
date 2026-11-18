import React from 'react';
import AngeloLogo from './AngeloLogo';
import { ShieldCheck, Heart, Award } from 'lucide-react';

export const Footer = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#050c1c] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: University Identity */}
          <div className="space-y-4 md:col-span-1">
            <AngeloLogo />
            <p className="text-xs text-slate-400 leading-relaxed">
              Angelo University (Est. 1968) is dedicated to advancing technology, ethical innovation, and preparing future leaders through rigorous academic degrees.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>ABET & AACSB Accredited</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Academic Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#courses" onClick={() => onSelectTab('courses')} className="hover:text-cyan-400 transition-colors">Undergraduate Programs</a></li>
              <li><a href="#courses" onClick={() => onSelectTab('courses')} className="hover:text-cyan-400 transition-colors">Postgraduate & Research</a></li>
              <li><a href="#faculty" onClick={() => onSelectTab('faculty')} className="hover:text-cyan-400 transition-colors">Faculty Directory</a></li>
              <li><a href="#events" onClick={() => onSelectTab('events')} className="hover:text-cyan-400 transition-colors">Exam Timetables</a></li>
            </ul>
          </div>

          {/* Col 3: Campus & Admissions */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Admissions & Life</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#admissions" onClick={() => onSelectTab('admissions')} className="hover:text-cyan-400 transition-colors">Application Process</a></li>
              <li><a href="#admissions" onClick={() => onSelectTab('admissions')} className="hover:text-cyan-400 transition-colors">Scholarship Criteria</a></li>
              <li><a href="#facilities" onClick={() => onSelectTab('facilities')} className="hover:text-cyan-400 transition-colors">Hostels & Campus Housing</a></li>
              <li><a href="#placements" onClick={() => onSelectTab('placements')} className="hover:text-cyan-400 transition-colors">Placements & Career Cell</a></li>
            </ul>
          </div>

          {/* Col 4: Campus Office */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Campus Headquarters</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>100 University Boulevard, Tech Crest Valley, California 94025</p>
              <p>Hotline: <span className="text-white font-medium">+1 (555) 019-2834</span></p>
              <p>Inquiries: <span className="text-white font-medium">admissions@angelo.edu</span></p>
              <p className="text-[11px] text-slate-400 pt-2">Office Hours: Mon - Fri, 8:30 AM - 5:30 PM PST</p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Angelo University. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Powered by</span>
            <span className="font-bold text-cyan-400">Gemini 3.5 Flash</span>
            <span>& Django REST Core</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
