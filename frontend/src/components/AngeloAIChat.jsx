import React, { useState, useEffect, useRef } from 'react';
import AngeloLogo from './AngeloLogo';
import RobotAvatar from './RobotAvatar';
import {
  Home, Paperclip, Send, RotateCcw, Trash2,
  Copy, Check, Sparkles, AlertCircle, ChevronRight,
  GraduationCap, Landmark, Calendar, MapPin, Maximize2, Minimize2
} from 'lucide-react';

export const AngeloAIChat = ({ onGoHome, isSideBySide = false, onToggleExpand, isExpanded = false }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize or restore session from localStorage (FR-HIS-01, FR-HIS-03)
  useEffect(() => {
    const savedSessionId = localStorage.getItem('angelo_ai_session_id');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      loadSessionMessages(savedSessionId);
    } else {
      createNewSession();
    }
  }, []);

  // Auto-scroll to bottom whenever messages update (FR-UI-06)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const createNewSession = async () => {
    try {
      const res = await fetch('/api/chat/sessions/', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.session_id);
        localStorage.setItem('angelo_ai_session_id', data.session_id);
        setMessages([]);
        setErrorMsg(null);
      }
    } catch (err) {
      console.error('Failed to create session:', err);
    }
  };

  const loadSessionMessages = async (id) => {
    try {
      const res = await fetch(`/api/chat/sessions/${id}/messages/`);
      if (res.ok) {
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.error('Failed to load session messages:', err);
    }
  };

  const handleClearHistory = async () => {
    if (!sessionId) return;
    if (window.confirm('Are you sure you want to start a new chat? Your current history will be reset.')) {
      try {
        await fetch(`/api/chat/sessions/${sessionId}/`, { method: 'DELETE' });
      } catch (e) {
        // Continue to fresh session
      }
      createNewSession();
    }
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    if (query.length > 1000) {
      setErrorMsg('Query exceeds maximum allowed limit of 1,000 characters.');
      return;
    }

    setErrorMsg(null);
    setInputValue('');

    // Optimistically append user message
    const tempUserMsg = {
      id: Date.now(),
      role: 'user',
      content: query,
      created_at: new Date().toISOString()
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: query
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (!sessionId && data.session_id) {
          setSessionId(data.session_id);
          localStorage.setItem('angelo_ai_session_id', data.session_id);
        }

        const assistantMsg = {
          id: data.assistant_message_id || Date.now() + 1,
          role: 'assistant',
          content: data.reply,
          created_at: data.timestamp || new Date().toISOString()
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setErrorMsg(data.error || 'Failed to reach Angelo AI. Please check connection and try again.');
      }
    } catch (err) {
      console.error('Chat error:', err);
      // NFR-REL-02 Fallback message
      setErrorMsg(
        'Unable to connect to the Angelo AI core service. You can contact the Admissions Office at admissions@angelo.edu or call +1 (555) 019-2834.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Quick prompt cards matching reference image
  const quickActions = [
    {
      title: 'Admission Process',
      icon: GraduationCap,
      query: 'What is the admission process, eligibility criteria, and application deadlines for Angelo University?'
    },
    {
      title: 'Courses Offered',
      icon: Landmark,
      query: 'What courses and degree programs are offered at Angelo University, along with their fees?'
    },
    {
      title: 'Exam Schedule',
      icon: Calendar,
      query: 'Can you show me the upcoming exam schedule and timetable for Angelo University?'
    },
    {
      title: 'Campus Facilities',
      icon: MapPin,
      query: 'What campus facilities, libraries, labs, and sports complexes are available at Angelo University?'
    }
  ];

  return (
    <div className="relative flex flex-col h-full w-full bg-[#070e24] text-white overflow-hidden shadow-2xl">
      
      {/* Background Gradient & Glow Rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial deep cosmic glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[120px]" />
        
        {/* Subtle silhouette of campus buildings at bottom (as in reference image) */}
        <div className="absolute bottom-0 left-0 right-0 h-44 opacity-25 pointer-events-none">
          <img
            src="/campus_night.png"
            alt=""
            className="w-full h-full object-cover object-bottom"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-3.5 bg-[#08122d]/90 backdrop-blur-md border-b border-blue-900/40">
        
        {/* Left: University Logo + Angelo AI Label */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex-shrink-0">
            <AngeloLogo className="w-8 h-8" textClass="hidden" />
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xs text-slate-300">Angelo</span>
              <span className="font-bold text-xs text-slate-300">University</span>
            </div>

            <span className="text-slate-500 font-light text-xl">|</span>

            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm text-white tracking-wide flex items-center gap-1.5">
                Angelo AI
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Your Campus Assistant</span>
            </div>
          </div>
        </div>

        {/* Right Header Actions: New Chat & Home Button */}
        <div className="flex items-center gap-2">
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/50 transition-colors"
              title={isExpanded ? "Collapse" : "Expand Fullscreen"}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/50 transition-colors"
            title="New Conversation / Clear History"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onGoHome}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/50 transition-colors"
            title="Back to College Home"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Conversation or Welcome Stage */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 space-y-6">
        
        {/* Welcome State if no messages yet */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto pt-4 pb-2 space-y-5 animate-in fade-in duration-500">
            
            {/* Robot Avatar with Pulsing Rings (from reference image) */}
            <div className="mt-2 mb-1">
              <RobotAvatar size="w-24 h-24" />
            </div>

            {/* Greeting Headline */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                <span>Hello! I'm Angelo AI</span>
                <span className="text-2xl animate-bounce">👋</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed px-4">
                Ask me anything about admissions, courses, exams, campus, or college facilities.
              </p>
            </div>

            {/* 4 Quick Action Cards (2x2 Grid matching reference image) */}
            <div className="grid grid-cols-2 gap-3 w-full pt-2">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(action.query)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0f1d44]/80 hover:bg-[#15275d] border border-blue-500/30 hover:border-cyan-400 text-left transition-all group shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-95"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
                        {action.title}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1" />
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {/* Message Bubble History */}
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id || index}
              className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              {/* Bot Avatar Icon */}
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-white flex-shrink-0 shadow-md ring-1 ring-cyan-400/50 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              {/* Message Content Bubble */}
              <div
                className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md font-medium'
                    : 'bg-[#111e42]/95 border border-blue-500/30 text-slate-100 rounded-tl-none shadow-lg'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-wrap break-words space-y-1">
                  {msg.content}
                </div>

                {/* Footer with Timestamp & Copy Action */}
                <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-white/10 text-[10px] text-slate-400">
                  <span>
                    {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                  </span>

                  {!isUser && (
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id || index)}
                      className="hover:text-white transition-colors flex items-center gap-1"
                      title="Copy response"
                    >
                      {copiedId === (msg.id || index) ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Loading Indicator (FR-UI-04) */}
        {isLoading && (
          <div className="flex items-start gap-2.5 justify-start animate-in fade-in">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white flex-shrink-0 shadow-md ring-1 ring-cyan-400/50">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-300" />
            </div>
            <div className="bg-[#111e42] border border-blue-500/30 text-slate-300 rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-2">
              <span className="text-xs text-cyan-300 font-medium">Angelo AI is retrieving college data...</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
              </div>
            </div>
          </div>
        )}

        {/* Error Notification with Retry option (FR-UI-05) */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <div>{errorMsg}</div>
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="text-cyan-300 font-semibold underline hover:text-white"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Query Input Bar (Exact Match with Reference Image) */}
      <div className="relative z-10 p-3 sm:p-4 bg-[#08122d]/95 backdrop-blur-md border-t border-blue-900/40">
        <div className="relative flex items-center rounded-full bg-[#111d40] border border-blue-500/30 hover:border-cyan-400 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 px-3 py-1.5 transition-all shadow-inner">
          
          {/* Attachment Paperclip Icon */}
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Attach inquiry document (mock)"
            onClick={() => alert("Document attachment is available for registered student portals. You may ask Angelo AI directly!")}
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            maxLength={1000}
            placeholder="Type your query here..."
            className="flex-1 bg-transparent border-none text-white placeholder-slate-400 text-xs sm:text-sm px-2 focus:outline-none"
          />

          {/* Send 'Query' Pill Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputValue.trim()}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/30"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>Query</span>
          </button>

        </div>

        {/* Small Notice / Disclaimer (SRS 6.2) */}
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-3">
          <span>Powered by Gemini 3.5 Flash Core</span>
          <span>{inputValue.length}/1000</span>
        </div>
      </div>

    </div>
  );
};

export default AngeloAIChat;
