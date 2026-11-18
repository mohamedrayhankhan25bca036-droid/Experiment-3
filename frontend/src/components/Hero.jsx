import React from 'react';
import { ArrowRight, GraduationCap, Users, Trophy, Building2 } from 'lucide-react';

export const Hero = ({ onExplorePrograms, onOpenAdmissions }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#07112c] via-[#091a3e] to-[#0c2356] text-white">
      {/* Decorative campus background layer with building reference */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity pointer-events-none">
        <img
          src="/campus_building.jpg"
          alt="Angelo University Campus Building"
          className="w-full h-full object-cover object-right"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07112c] via-[#07112c]/85 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill: Cyan Bar + Welcome to */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-1 bg-cyan-400 rounded-full" />
              <span className="text-cyan-300 font-semibold text-base tracking-wide">Welcome to</span>
            </div>

            {/* Huge Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Angelo <br />
              <span className="text-white">University</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-lg sm:text-xl font-normal max-w-xl leading-relaxed">
              Empowering Minds, Building Futures.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplorePrograms}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white text-[#0a1228] font-bold text-sm sm:text-base hover:bg-slate-100 hover:shadow-xl transition-all transform active:scale-95 shadow-md"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAdmissions}
                className="inline-flex items-center px-7 py-3 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white font-semibold text-sm sm:text-base border border-slate-600/80 hover:border-slate-400 transition-all backdrop-blur-sm shadow-sm"
              >
                <span>Admissions</span>
              </button>
            </div>

          </div>

          {/* Right Campus Building Showcase (Matches Reference Visual) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="/campus_building.jpg"
                alt="Angelo University Main Academic Hall"
                className="w-full h-80 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "/hero_reference.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07112c]/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold">Main Quadrangle</div>
                  <div className="text-sm font-semibold text-white">School of Computing & AI</div>
                </div>
                <div className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30 font-medium">
                  Est. 1968
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Stat Counters Row (Translucent Glass Bar from Reference) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">15+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Academic Programs</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">10,000+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Students</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">200+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Expert Faculty</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">30+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Campus Facilities</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
