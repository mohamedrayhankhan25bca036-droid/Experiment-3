import React, { useState, useEffect } from 'react';
import { Landmark, Cpu, Trophy, Bed, HeartPulse, Wrench, Clock, MapPin } from 'lucide-react';

export const FacilitiesSection = ({ onAskBot }) => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch('/api/college/facilities/')
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch((err) => console.error(err));
  }, []);

  const getIcon = (category) => {
    switch (category) {
      case 'Academic': return Landmark;
      case 'Innovation': return Cpu;
      case 'Sports': return Trophy;
      case 'Residential': return Bed;
      case 'Health': return HeartPulse;
      default: return Wrench;
    }
  };

  return (
    <section id="facilities" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold mb-3">
            World-Class Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] tracking-tight">
            30+ Cutting-Edge Campus Facilities
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            From petascale supercomputers to Olympic athletic complexes, Angelo University offers an inspiring environment to thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => {
            const Icon = getIcon(fac.category);
            return (
              <div
                key={fac.name}
                className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-cyan-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-bold">
                      {fac.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {fac.name}
                  </h3>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-200/70 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                    <span className="truncate">{fac.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                    <span className="truncate">{fac.timings}</span>
                  </div>

                  <button
                    onClick={() => onAskBot(`Tell me about the ${fac.name} facility at Angelo University, including rules and timings.`)}
                    className="w-full mt-3 py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors text-center"
                  >
                    Ask Angelo AI about this facility
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FacilitiesSection;
