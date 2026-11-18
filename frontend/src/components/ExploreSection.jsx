import React from 'react';
import { BookOpen, FileText, Users, Briefcase, ArrowRight } from 'lucide-react';

export const ExploreSection = ({ onSelectCard }) => {
  const cards = [
    {
      id: 'academics',
      title: 'Academics',
      subtitle: 'Programs & Curriculum',
      icon: BookOpen,
      tag: 'courses'
    },
    {
      id: 'admissions',
      title: 'Admissions',
      subtitle: 'Apply & Requirements',
      icon: FileText,
      tag: 'admissions'
    },
    {
      id: 'campus',
      title: 'Campus Life',
      subtitle: 'Clubs, Events & More',
      icon: Users,
      tag: 'events'
    },
    {
      id: 'placements',
      title: 'Placements',
      subtitle: 'Training & Career Support',
      icon: Briefcase,
      tag: 'placements'
    }
  ];

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading with Cyan Accent Line */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] tracking-tight">
            Explore Angelo University
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* 4 Feature Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onSelectCard(card.id)}
                className="group relative bg-[#f8fafc] hover:bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Icon in top-left */}
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title + Arrow */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Subtitle */}
                <p className="text-sm text-slate-500 font-medium">
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExploreSection;
