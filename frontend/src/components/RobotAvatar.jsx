import React from 'react';

export const RobotAvatar = ({ size = "w-28 h-28", isPulsing = true }) => {
  return (
    <div className={`relative flex items-center justify-center ${size} select-none`}>
      {/* Outer Neon Glow Rings */}
      {isPulsing && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping opacity-30" />
          <div className="absolute -inset-3 rounded-full border border-blue-500/20 animate-pulse" />
        </>
      )}

      {/* Halo Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.5)]" />

      {/* Robot Base Body */}
      <div className="relative w-4/5 h-4/5 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 p-1 shadow-lg flex items-center justify-center">
        {/* Dark Visor Face */}
        <div className="w-full h-full rounded-full bg-[#0d1629] border border-cyan-500/40 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
          {/* Ear pods */}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-5 bg-cyan-400 rounded-r-md shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-5 bg-cyan-400 rounded-l-md shadow-[0_0_8px_#22d3ee]" />

          {/* Visor Glare */}
          <div className="absolute top-1 left-2 w-8 h-3 bg-white/10 rounded-full rotate-[-25deg] blur-[1px]" />

          {/* Glowing Eyes */}
          <div className="flex items-center gap-3 z-10">
            {/* Left Eye */}
            <div className="relative flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>

            {/* Right Eye */}
            <div className="relative flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Glowing Smile */}
          <div className="w-5 h-2 border-b-2 border-cyan-400 rounded-b-full shadow-[0_0_8px_#22d3ee] mt-1.5" />
        </div>
      </div>
    </div>
  );
};

export default RobotAvatar;
