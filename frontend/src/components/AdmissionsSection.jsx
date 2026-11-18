import React from 'react';
import { CheckCircle2, Calendar, DollarSign, Award, ArrowRight, HelpCircle } from 'lucide-react';

export const AdmissionsSection = ({ onOpenApply, onAskBot }) => {
  const steps = [
    {
      num: '01',
      title: 'Online Application Submission',
      desc: 'Complete the Angelo University applicant profile, select your prospective degree program, and submit required academic transcripts.'
    },
    {
      num: '02',
      title: 'Entrance Test / Evaluation',
      desc: 'Take the online Angelo Scholastic Entrance Test (ASET) or submit existing SAT/ACT/GRE test scores for evaluation.'
    },
    {
      num: '03',
      title: 'Merit Assessment & Interview',
      desc: 'Review of academic qualifications, leadership portfolio, and optional video assessment by university faculty admissions board.'
    },
    {
      num: '04',
      title: 'Offer of Admission & Enrollment',
      desc: 'Receive your formal acceptance letter, scholarship award confirmation, and complete hostel booking reservation.'
    }
  ];

  const scholarships = [
    {
      title: "Chancellor's Merit Scholarship",
      benefit: "Up to 50% Tuition Waiver",
      criteria: "Top 5% score in Angelo Scholastic Entrance Test (ASET) or 95%+ high school aggregate."
    },
    {
      title: "Women in Technology Grant",
      benefit: "$5,000 Annual Stipend",
      criteria: "Female applicants enrolling in Computer Science, AI, Cyber Security, or Robotics programs."
    },
    {
      title: "Need-Based Financial Support",
      benefit: "Up to 40% Fee Reduction",
      criteria: "Assessed based on family income documentation and continuous satisfactory academic progress."
    }
  ];

  return (
    <section id="admissions" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">
            Join Angelo University 2027
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] tracking-tight">
            Admissions & Financial Aid
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Transparent admissions process committed to identifying driven, creative minds from across the globe.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((st) => (
            <div key={st.num} className="relative bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-white transition-all">
              <div className="text-3xl font-extrabold text-blue-600/30 mb-3 font-mono">
                {st.num}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {st.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Scholarships & Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Scholarships */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#0b1736] to-[#071126] text-white p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Scholarship & Grants Program</span>
            </div>
            
            <h3 className="text-2xl font-extrabold">
              Over $2.5 Million in Annual Merit Scholarships
            </h3>

            <div className="space-y-4">
              {scholarships.map((sc, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{sc.title}</span>
                    <span className="text-xs font-extrabold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20">
                      {sc.benefit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{sc.criteria}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={onOpenApply}
                className="px-6 py-2.5 rounded-full bg-cyan-400 text-[#091535] font-bold text-xs sm:text-sm hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Start Your Application
              </button>
              
              <button
                onClick={() => onAskBot('What are the scholarship requirements and how do I apply for financial aid at Angelo University?')}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask Angelo AI about Aid</span>
              </button>
            </div>
          </div>

          {/* Key Dates & Requirements */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Important Deadlines</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Fall 2027 Admission Cycle
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start justify-between p-3 bg-white rounded-xl border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">Early Action Decision</div>
                  <div className="text-slate-500 text-[11px]">Fee waived + Priority hostel</div>
                </div>
                <div className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  Jan 15, 2027
                </div>
              </div>

              <div className="flex items-start justify-between p-3 bg-white rounded-xl border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">Regular Application Deadline</div>
                  <div className="text-slate-500 text-[11px]">Standard evaluation batch</div>
                </div>
                <div className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                  Apr 30, 2027
                </div>
              </div>

              <div className="flex items-start justify-between p-3 bg-white rounded-xl border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">Late Rolling Application</div>
                  <div className="text-slate-500 text-[11px]">Subject to remaining seat quota</div>
                </div>
                <div className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                  Jun 30, 2027
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs text-blue-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Eligibility Reminder</span>
              </div>
              <p className="text-blue-800/80 leading-relaxed">
                Minimum 70%-75% aggregate marks required in 10+2 / High School in Physics, Mathematics & related sciences for engineering degrees.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AdmissionsSection;
