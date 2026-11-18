import React, { useState } from 'react';
import { Check, Play, MessageSquare, Sparkles } from 'lucide-react';

export const VibrantCampusSection = ({ onOpenChat }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Students Photo with Video Play Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
              <img
                src="/students.jpg"
                alt="Angelo University Students on Campus"
                className="w-full h-80 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "/campus_building.jpg";
                }}
              />
              
              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

              {/* Play Video Circular Overlay Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/90 hover:bg-white text-blue-700 flex items-center justify-center shadow-2xl backdrop-blur-sm transform hover:scale-110 active:scale-95 transition-all"
                title="Watch Campus Life Video"
              >
                <Play className="w-7 h-7 fill-blue-700 ml-1" />
              </button>

              <div className="absolute bottom-3 left-4 text-xs font-semibold text-white/90 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                Campus Tour & Student Stories (2:45)
              </div>
            </div>

            {/* Video Modal if clicked */}
            {isPlaying && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#0b1329] border border-slate-700 rounded-2xl p-6 max-w-xl w-full text-white space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-lg">Life at Angelo University</h4>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="text-slate-400 hover:text-white text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center text-slate-400">
                    <div className="text-center p-6 space-y-2">
                      <Sparkles className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
                      <p className="font-semibold text-white">Experience Innovation & Excellence</p>
                      <p className="text-xs text-slate-400">Angelo University 2026 Student Life Showcase Video</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-700"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Text + Feature Checkmarks + Ask Angelo AI Button */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] leading-tight">
              A Vibrant Campus <br />
              <span className="text-[#091535]">for Future Leaders</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              At Angelo University, we nurture knowledge, innovation and character, preparing students to make a real impact in the world.
            </p>

            {/* Checkmark Bullets */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">
                  Industry-Oriented Learning
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">
                  Research & Innovation
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">
                  Holistic Development
                </span>
              </div>
            </div>

            {/* Action Row: Ask Angelo AI button with notification badge */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenChat}
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#172554] hover:bg-[#1e3a8a] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all active:scale-95 border border-blue-900"
              >
                <span>Ask Angelo AI</span>
              </button>

              {/* Glowing Chat Icon with Red Notification Dot (as seen in image) */}
              <div
                onClick={onOpenChat}
                className="relative cursor-pointer p-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all"
                title="Chat with Angelo AI"
              >
                <MessageSquare className="w-6 h-6 fill-white" />
                {/* Red unread indicator dot */}
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default VibrantCampusSection;
