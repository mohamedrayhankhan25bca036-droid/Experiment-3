import React from 'react';

export const AngeloLogo = ({ className = "w-9 h-9", textClass = "text-white" }) => {
  return (
    <div className="flex items-center gap-3">
      {/* University Crest */}
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
          {/* Laurel Leaves Left */}
          <path d="M22 68C18 55 20 40 30 28C28 35 28 44 32 50C25 43 25 34 28 25C22 34 20 47 22 68Z" fill="currentColor" opacity="0.85" />
          <path d="M16 54C13 45 15 36 22 28C21 34 22 41 26 46C20 40 20 33 22 26C17 34 16 44 16 54Z" fill="currentColor" opacity="0.85" />
          
          {/* Laurel Leaves Right */}
          <path d="M78 68C82 55 80 40 70 28C72 35 72 44 68 50C75 43 75 34 72 25C78 34 80 47 78 68Z" fill="currentColor" opacity="0.85" />
          <path d="M84 54C87 45 85 36 78 28C79 34 78 41 74 46C80 40 80 33 78 26C83 34 84 44 84 54Z" fill="currentColor" opacity="0.85" />

          {/* Shield Outline */}
          <path d="M50 15L68 24V46C68 62 58 74 50 82C42 74 32 62 32 46V24L50 15Z" stroke="currentColor" strokeWidth="3" fill="#0f1f44" />
          
          {/* Open Book in Shield */}
          <path d="M50 44C44 39 37 40 37 40V58C37 58 44 57 50 62C56 57 63 58 63 58V40C63 40 56 39 50 44Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M50 44V62" stroke="currentColor" strokeWidth="2.5" />

          {/* Star above shield */}
          <circle cx="50" cy="18" r="1.5" fill="#38bdf8" />
        </svg>
      </div>

      {/* University Title */}
      <div className="flex flex-col leading-tight">
        <span className={`font-bold tracking-tight text-lg ${textClass}`}>Angelo</span>
        <span className={`font-bold tracking-tight text-lg -mt-1 ${textClass}`}>University</span>
      </div>
    </div>
  );
};

export default AngeloLogo;
