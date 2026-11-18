import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ state: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ state: 'loading', message: 'Submitting your inquiry...' });

    try {
      const res = await fetch('/api/college/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({
          state: 'success',
          message: data.message || 'Thank you! Your message has been received by our Admissions Office.'
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ state: 'error', message: 'Failed to submit inquiry. Please try again or email us directly.' });
      }
    } catch (err) {
      setStatus({
        state: 'error',
        message: 'Network error. Please reach out to admissions@angelo.edu or call +1 (555) 019-2834.'
      });
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] tracking-tight">
            Contact Angelo University
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Have questions about admissions, campus visits, or financial aid? Our university administration is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#09142e] text-white p-8 rounded-3xl shadow-xl space-y-6">
            <h3 className="text-xl font-bold">Campus Administrative Office</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We welcome prospective students, families, researchers, and campus visitors. Tours are conducted every Wednesday and Saturday.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Campus Address</div>
                  <div className="text-slate-300">100 University Boulevard, Tech Crest Valley, California 94025, USA</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Admissions Helpline</div>
                  <div className="text-slate-300">+1 (555) 019-2834 / +1 (555) 019-2835</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Official Email Addresses</div>
                  <div className="text-slate-300">Admissions: admissions@angelo.edu</div>
                  <div className="text-slate-300">Registrar: registrar@angelo.edu</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Office Hours</div>
                  <div className="text-slate-300">Monday - Friday: 8:30 AM - 5:30 PM PST</div>
                  <div className="text-slate-400 text-[11px]">Closed on major federal holidays</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <span className="font-bold text-cyan-400 block mb-1">Instant Support:</span>
              Use the <span className="font-bold text-white">Angelo AI Assistant</span> on the right to receive immediate answers regarding cutoffs, syllabus, or hostel availability!
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Send an Official Inquiry</h3>
            <p className="text-xs text-slate-500 mb-6">Submissions are logged directly into the university management database.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maya.lin@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. B.Tech AI Admission Question"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message / Query *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our admissions department help you?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {status.state === 'success' && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.state === 'error' && (
                <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{status.state === 'loading' ? 'Submitting...' : 'Send Message to Admissions Office'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
