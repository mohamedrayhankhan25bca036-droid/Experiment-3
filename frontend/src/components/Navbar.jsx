import React, { useState } from 'react';
import AngeloLogo from './AngeloLogo';
import { ChevronDown, Sparkles, LayoutGrid, Monitor, Bot } from 'lucide-react';

export const Navbar = ({ onOpenChat, onSelectTab, activeSection, viewMode, setViewMode, onOpenApply }) => {
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [campusLifeOpen, setCampusLifeOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070e22]/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: University Logo */}
        <a href="#home" onClick={() => onSelectTab('home')} className="hover:opacity-90 transition-opacity">
          <AngeloLogo />
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
          <a
            href="#home"
            onClick={() => onSelectTab('home')}
            className="relative py-2 hover:text-white transition-colors"
          >
            Home
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full" />
          </a>

          <a
            href="#about"
            onClick={() => onSelectTab('about')}
            className="hover:text-white transition-colors"
          >
            About
          </a>

          {/* Academics Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAcademicsOpen(true)}
            onMouseLeave={() => setAcademicsOpen(false)}
          >
            <button
              onClick={() => onSelectTab('academics')}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-2"
            >
              Academics
              <ChevronDown className={`w-4 h-4 transition-transform ${academicsOpen ? 'rotate-180' : ''}`} />
            </button>

            {academicsOpen && (
              <div className="absolute top-full left-0 w-64 bg-[#0a1533] border border-slate-700/80 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <a
                  href="#courses"
                  onClick={() => { onSelectTab('courses'); setAcademicsOpen(false); }}
                  className="block px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors"
                >
                  <div className="font-semibold text-sm text-slate-100">Undergraduate Programs</div>
                  <div className="text-slate-400 text-xs">B.Tech, B.Sc, BBA Degrees</div>
                </a>
                <a
                  href="#courses"
                  onClick={() => { onSelectTab('courses'); setAcademicsOpen(false); }}
                  className="block px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors mt-1"
                >
                  <div className="font-semibold text-sm text-slate-100">Postgraduate & Ph.D.</div>
                  <div className="text-slate-400 text-xs">M.Tech, MBA, Doctoral Fellowships</div>
                </a>
                <a
                  href="#faculty"
                  onClick={() => { onSelectTab('faculty'); setAcademicsOpen(false); }}
                  className="block px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors mt-1"
                >
                  <div className="font-semibold text-sm text-slate-100">Faculty & Research</div>
                  <div className="text-slate-400 text-xs">Stanford, MIT & Cambridge Scholars</div>
                </a>
              </div>
            )}
          </div>

          <a
            href="#admissions"
            onClick={() => onSelectTab('admissions')}
            className="hover:text-white transition-colors"
          >
            Admissions
          </a>

          {/* Campus Life Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCampusLifeOpen(true)}
            onMouseLeave={() => setCampusLifeOpen(false)}
          >
            <button
              onClick={() => onSelectTab('campus')}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-2"
            >
              Campus Life
              <ChevronDown className={`w-4 h-4 transition-transform ${campusLifeOpen ? 'rotate-180' : ''}`} />
            </button>

            {campusLifeOpen && (
              <div className="absolute top-full left-0 w-64 bg-[#0a1533] border border-slate-700/80 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <a
                  href="#facilities"
                  onClick={() => { onSelectTab('facilities'); setCampusLifeOpen(false); }}
                  className="block px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors"
                >
                  <div className="font-semibold text-sm text-slate-100">Campus Facilities</div>
                  <div className="text-slate-400 text-xs">Library, HPC Lab, Olympic Sports</div>
                </a>
                <a
                  href="#events"
                  onClick={() => { onSelectTab('events'); setCampusLifeOpen(false); }}
                  className="block px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors mt-1"
                >
                  <div className="font-semibold text-sm text-slate-100">Events & Festivals</div>
                  <div className="text-slate-400 text-xs">Ignite Tech Fest & Aura Cultural Fest</div>
                </a>
                <a
                  href="#hostels"
                  onClick={() => { onSelectTab('facilities'); setCampusLifeOpen(false); }}
                  className="block px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors mt-1"
                >
                  <div className="font-semibold text-sm text-slate-100">Hostels & Dining</div>
                  <div className="text-slate-400 text-xs">Phoenix & Orion Residences</div>
                </a>
              </div>
            )}
          </div>

          <a
            href="#contact"
            onClick={() => onSelectTab('contact')}
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Actions: View Mode Switcher + Apply Now button */}
        <div className="flex items-center gap-3">
          
          {/* Reference Image Split View Toggle */}
          <div className="hidden md:flex items-center bg-slate-900/90 border border-slate-800 rounded-full p-1 text-xs">
            <button
              onClick={() => setViewMode('split')}
              title="Side-by-side mode matching reference image exactly"
              className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                viewMode === 'split'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Split View (Ref)</span>
            </button>
            <button
              onClick={() => setViewMode('website')}
              title="Full width university website view"
              className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                viewMode === 'website'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>
            <button
              onClick={() => setViewMode('chat')}
              title="Dedicated Angelo AI Assistant view"
              className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                viewMode === 'chat'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Angelo AI</span>
            </button>
          </div>

          {/* Apply Now Pill Button */}
          <button
            onClick={onOpenApply}
            className="px-6 py-2.5 rounded-full bg-white text-[#0a1228] font-bold text-sm hover:bg-slate-100 hover:shadow-lg transition-all transform active:scale-95 shadow-md"
          >
            Apply Now
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
