import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreSection from './components/ExploreSection';
import VibrantCampusSection from './components/VibrantCampusSection';
import CoursesSection from './components/CoursesSection';
import FacilitiesSection from './components/FacilitiesSection';
import FacultySection from './components/FacultySection';
import AdmissionsSection from './components/AdmissionsSection';
import EventsExamSection from './components/EventsExamSection';
import PlacementsSection from './components/PlacementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AngeloAIChat from './components/AngeloAIChat';
import ApplyModal from './components/ApplyModal';
import { MessageSquare, Bot, Sparkles, X } from 'lucide-react';

export function App() {
  // viewMode: 'split' (side-by-side reference layout), 'website' (full website), 'chat' (full chat)
  const [viewMode, setViewMode] = useState('split');
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState(null);

  const handleOpenChat = (prompt) => {
    if (viewMode === 'website') {
      setIsFloatingChatOpen(true);
    }
    if (prompt) {
      setPendingPrompt(prompt);
    }
  };

  const handleSelectTab = (tab) => {
    const el = document.getElementById(tab);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardClick = (id) => {
    if (id === 'academics') handleSelectTab('courses');
    else if (id === 'admissions') handleSelectTab('admissions');
    else if (id === 'campus') handleSelectTab('facilities');
    else if (id === 'placements') handleSelectTab('placements');
  };

  return (
    <div className="min-h-screen bg-[#070e22] text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        onOpenChat={() => handleOpenChat()}
        onSelectTab={handleSelectTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenApply={() => setIsApplyOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col">
        
        {/* CASE 1: Split View (Matches the reference image 1:1) */}
        {viewMode === 'split' && (
          <div className="flex-1 flex flex-col lg:flex-row h-full">
            {/* Left Column: University Website (approx 65% width) */}
            <div className="w-full lg:w-[65%] xl:w-[68%] overflow-y-auto border-r border-slate-800 h-[calc(100vh-80px)]">
              <Hero
                onExplorePrograms={() => handleSelectTab('courses')}
                onOpenAdmissions={() => handleSelectTab('admissions')}
              />
              <ExploreSection onSelectCard={handleCardClick} />
              <VibrantCampusSection onOpenChat={() => handleOpenChat()} />
              <CoursesSection onAskBot={(p) => handleOpenChat(p)} />
              <FacilitiesSection onAskBot={(p) => handleOpenChat(p)} />
              <FacultySection onAskBot={(p) => handleOpenChat(p)} />
              <AdmissionsSection
                onOpenApply={() => setIsApplyOpen(true)}
                onAskBot={(p) => handleOpenChat(p)}
              />
              <EventsExamSection onAskBot={(p) => handleOpenChat(p)} />
              <PlacementsSection onAskBot={(p) => handleOpenChat(p)} />
              <ContactSection />
              <Footer onSelectTab={handleSelectTab} />
            </div>

            {/* Right Column: Dedicated Angelo AI Screen (approx 35% width, exactly as shown in reference) */}
            <div className="w-full lg:w-[35%] xl:w-[32%] h-[600px] lg:h-[calc(100vh-80px)] sticky top-20 bg-[#070e24] shadow-2xl">
              <AngeloAIChat
                isSideBySide={true}
                onGoHome={() => setViewMode('website')}
                onToggleExpand={() => setViewMode('chat')}
              />
            </div>
          </div>
        )}

        {/* CASE 2: Full Website View */}
        {viewMode === 'website' && (
          <div className="flex-1">
            <Hero
              onExplorePrograms={() => handleSelectTab('courses')}
              onOpenAdmissions={() => handleSelectTab('admissions')}
            />
            <ExploreSection onSelectCard={handleCardClick} />
            <VibrantCampusSection onOpenChat={() => setIsFloatingChatOpen(true)} />
            <CoursesSection onAskBot={(p) => handleOpenChat(p)} />
            <FacilitiesSection onAskBot={(p) => handleOpenChat(p)} />
            <FacultySection onAskBot={(p) => handleOpenChat(p)} />
            <AdmissionsSection
              onOpenApply={() => setIsApplyOpen(true)}
              onAskBot={(p) => handleOpenChat(p)}
            />
            <EventsExamSection onAskBot={(p) => handleOpenChat(p)} />
            <PlacementsSection onAskBot={(p) => handleOpenChat(p)} />
            <ContactSection />
            <Footer onSelectTab={handleSelectTab} />

            {/* Floating Chat Launcher Button (SRS FR-UI-01) */}
            <div className="fixed bottom-6 right-6 z-40">
              <button
                onClick={() => setIsFloatingChatOpen(true)}
                className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all"
              >
                <div className="relative">
                  <Bot className="w-6 h-6 fill-white" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-blue-600 animate-pulse" />
                </div>
                <span className="font-bold text-sm tracking-wide">Ask Angelo AI</span>
              </button>
            </div>

            {/* Floating Slide-over / Modal Chat Window */}
            {isFloatingChatOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
                <div className="w-full sm:w-[480px] h-full bg-[#070e24] shadow-2xl relative flex flex-col animate-in slide-in-from-right duration-300">
                  <button
                    onClick={() => setIsFloatingChatOpen(false)}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <AngeloAIChat
                    onGoHome={() => setIsFloatingChatOpen(false)}
                    onToggleExpand={() => {
                      setIsFloatingChatOpen(false);
                      setViewMode('chat');
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* CASE 3: Fullscreen Angelo AI Assistant View */}
        {viewMode === 'chat' && (
          <div className="flex-1 h-[calc(100vh-80px)] flex items-center justify-center p-2 sm:p-6 bg-slate-950">
            <div className="w-full max-w-4xl h-full rounded-3xl overflow-hidden border border-blue-900/50 shadow-2xl">
              <AngeloAIChat
                isExpanded={true}
                onGoHome={() => setViewMode('split')}
                onToggleExpand={() => setViewMode('split')}
              />
            </div>
          </div>
        )}

      </div>

      {/* Online Application Modal */}
      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onAskBot={(prompt) => {
          setIsApplyOpen(false);
          handleOpenChat(prompt);
        }}
      />
    </div>
  );
}

export default App;
