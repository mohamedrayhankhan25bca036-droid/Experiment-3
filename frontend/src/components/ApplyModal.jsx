import React, { useState } from 'react';
import { X, CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react';

export const ApplyModal = ({ isOpen, onClose, onAskBot }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'B.Tech in Computer Science & Engineering',
    score: '88%'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b142d] border border-blue-500/30 rounded-3xl max-w-lg w-full text-white p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Fall 2027 Admissions</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2">
              Apply to Angelo University
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Start your journey with world-class faculty, accredited engineering laboratories, and distinguished global placement pathways.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Applicant Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Smith"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordan@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Desired Degree Program *</label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="B.Tech in Computer Science & Engineering">B.Tech in Computer Science & Engineering ($13,000/yr)</option>
                  <option value="B.Tech in Artificial Intelligence & Data Science">B.Tech in AI & Data Science ($13,500/yr)</option>
                  <option value="B.Tech in Cyber Security & Digital Forensics">B.Tech in Cyber Security & Digital Forensics ($12,500/yr)</option>
                  <option value="B.Tech in Robotics & Mechatronics Engineering">B.Tech in Robotics & Mechatronics ($12,000/yr)</option>
                  <option value="BBA in Business Analytics & Global Finance">BBA in Business Analytics ($10,500/yr)</option>
                  <option value="B.Sc in Biotechnology & Genomic Science">B.Sc in Biotechnology ($9,500/yr)</option>
                  <option value="M.Tech in Autonomous Systems & AI">M.Tech in Autonomous Systems & AI ($15,000/yr)</option>
                  <option value="MBA in Technology Management & Leadership">MBA in Technology Management ($16,500/yr)</option>
                </select>
              </div>

              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-500/20 text-xs text-slate-300">
                <span className="font-semibold text-cyan-300">Application Fee: </span>
                $65 (waived for early applicants). Decision notification within 14 business days.
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
                >
                  <span>Submit Early Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Application Received!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your application for <span className="font-semibold text-cyan-300">{formData.program}</span> has been logged with application ID <span className="font-mono text-white">#ANG-2027-{Math.floor(1000 + Math.random() * 9000)}</span>.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onAskBot(`I just applied for ${formData.program}. What should I prepare for the Angelo Scholastic Entrance Test (ASET)?`);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Ask Angelo AI About Next Steps
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplyModal;
