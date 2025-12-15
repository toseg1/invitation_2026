import React, { useState } from 'react';
import { MapPin, Clock, Activity, TrendingUp, Calendar, Users, Send } from 'lucide-react';

export const EventDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lunchCount: 0,
    dinnerCount: 0
  });
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5002/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name || 'Anonymous',
          email: formData.email,
          lunch_count: formData.lunchCount,
          dinner_count: formData.dinnerCount
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowForm(false);
          setSubmitted(false);
          setFormData({ name: '', email: '', lunchCount: 0, dinnerCount: 0 });
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Error submitting RSVP. Please make sure the API server is running on port 5002.');
    }
  };

  if (submitted) {
    return (
      <div className="w-full h-full bg-black text-white p-6 flex flex-col relative overflow-hidden font-mono selection:bg-[#00ff00] selection:text-black items-center justify-center">
        <div className="bg-black/60 backdrop-blur-lg p-8 rounded-lg border-2 border-[#00ff00]/30 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#00ff00] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#00ff00] mb-4">RSVP CONFIRMED!</h2>
          <p className="text-gray-300 mb-6">We'll see you at BASH 2025! 🚀</p>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="w-full h-full bg-black text-white p-4 flex flex-col relative overflow-hidden font-mono selection:bg-[#00ff00] selection:text-black overflow-y-auto">
        {/* CSS Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
              backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
          }}
        />

        <div className="z-10 flex-1 flex flex-col border border-[#333] p-1 relative bg-black/50 backdrop-blur-sm max-h-full">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-[#111] p-2 border-b border-[#333]">
              <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-gray-500">rsvp@bash2025</span>
          </div>

          <div className="p-4 flex-1 flex flex-col overflow-y-auto">
              {/* RSVP Form */}
              <h2 className="text-3xl font-bold text-[#00ff00] mb-6 text-center">CONFIRM ATTENDANCE</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#00ff00] mb-2 font-semibold text-sm">NAME</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                    className="w-full px-3 py-2 bg-[#0a0a0a] text-white rounded border border-[#333] focus:border-[#00ff00] outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#00ff00] mb-2 font-semibold text-sm">EMAIL</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 bg-[#0a0a0a] text-white rounded border border-[#333] focus:border-[#00ff00] outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#00ff00] mb-2 font-semibold text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    LUNCH (Number of people)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, lunchCount: Math.max(0, formData.lunchCount - 1)})}
                      className="bg-red-500/20 border border-red-500/50 text-red-500 px-4 py-2 rounded hover:bg-red-500/30 transition-all"
                    >
                      -
                    </button>
                    <div className="flex-1 bg-[#0a0a0a] border border-[#333] rounded flex items-center justify-center font-bold text-2xl text-[#00ff00]">
                      {formData.lunchCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, lunchCount: formData.lunchCount + 1})}
                      className="bg-[#00ff00]/20 border border-[#00ff00]/50 text-[#00ff00] px-4 py-2 rounded hover:bg-[#00ff00]/30 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#00ff00] mb-2 font-semibold text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    DINNER (Number of people)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, dinnerCount: Math.max(0, formData.dinnerCount - 1)})}
                      className="bg-red-500/20 border border-red-500/50 text-red-500 px-4 py-2 rounded hover:bg-red-500/30 transition-all"
                    >
                      -
                    </button>
                    <div className="flex-1 bg-[#0a0a0a] border border-[#333] rounded flex items-center justify-center font-bold text-2xl text-[#00ff00]">
                      {formData.dinnerCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, dinnerCount: formData.dinnerCount + 1})}
                      className="bg-[#00ff00]/20 border border-[#00ff00]/50 text-[#00ff00] px-4 py-2 rounded hover:bg-[#00ff00]/30 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-700 text-white py-3 rounded font-bold hover:bg-gray-600 transition-all"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#00ff00] text-black py-3 rounded font-bold hover:bg-[#00cc00] hover:scale-[1.02] transition-all border-b-4 border-[#009900] active:border-0 active:translate-y-[4px] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    SUBMIT RSVP
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black text-white p-6 flex flex-col relative overflow-hidden font-mono selection:bg-[#00ff00] selection:text-black">
      {/* CSS Grid Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
        }}
      />

      {/* Binary Rain Effect Overlay */}
      <div className="absolute top-0 right-0 p-4 text-[10px] text-[#00ff00] opacity-20 font-mono text-right pointer-events-none leading-none">
        01001011<br/>11010101<br/>00111001<br/>10101010<br/>01010111
      </div>

      <div className="z-10 flex-1 flex flex-col border border-[#333] p-1 relative bg-black/50 backdrop-blur-sm">

        {/* Top Bar */}
        <div className="flex justify-between items-center bg-[#111] p-2 border-b border-[#333]">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs text-gray-500">root@event:~/genesis_block</span>
        </div>

        <div className="p-4 flex-1 flex flex-col">
            {/* Header */}
            <div className="mb-8 relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00ff00] to-transparent" />
                <h4 className="text-[#00ff00] font-bold text-sm mb-1 tracking-wider">PROTOCOL: BASH_v2.0</h4>
                <h1 className="text-5xl md:text-6xl font-black uppercase leading-[0.8] tracking-tighter mix-blend-exclusion">
                    JE<br/>QUITTE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff00] to-emerald-600">LA FRANCE</span>
                </h1>
            </div>

            {/* Grid Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border border-[#333] p-3 hover:border-[#00ff00] transition-colors group">
                    <Clock className="w-5 h-5 text-gray-500 mb-2 group-hover:text-[#00ff00]" />
                    <p className="text-[10px] text-gray-400 uppercase">Timestamp</p>
                    <p className="font-bold">22:00 UTC</p>
                    <p className="text-[10px] text-[#00ff00]">Block #829103</p>
                </div>
                <div className="border border-[#333] p-3 hover:border-[#00ff00] transition-colors group">
                    <MapPin className="w-5 h-5 text-gray-500 mb-2 group-hover:text-[#00ff00]" />
                    <p className="text-[10px] text-gray-400 uppercase">Node Location</p>
                    <p className="font-bold">Sector 7G</p>
                    <p className="text-[10px] text-gray-500">127.0.0.1</p>
                </div>
                <div className="border border-[#333] p-3 hover:border-[#00ff00] transition-colors group">
                    <Activity className="w-5 h-5 text-gray-500 mb-2 group-hover:text-[#00ff00]" />
                    <p className="text-[10px] text-gray-400 uppercase">Vibe Check</p>
                    <p className="font-bold">Zone 2 Cardio</p>
                    <p className="text-[10px] text-gray-500">High Aerobic Base</p>
                </div>
                <div className="border border-[#333] p-3 hover:border-[#00ff00] transition-colors group">
                    <TrendingUp className="w-5 h-5 text-gray-500 mb-2 group-hover:text-[#00ff00]" />
                    <p className="text-[10px] text-gray-400 uppercase">Entry Fee</p>
                    <p className="font-bold">Gas Only</p>
                    <p className="text-[10px] text-gray-500">Proof of Party</p>
                </div>
            </div>

            {/* Terminal Snippet */}
            <div className="bg-[#0a0a0a] p-3 rounded border border-[#333] font-mono text-xs text-gray-300 mb-auto">
                <span className="text-[#00ff00]">$</span> npm install vibes<br/>
                <span className="text-gray-500">Installing...</span><br/>
                <span className="text-cyan-400">added 420 packages in 0.69s</span><br/>
                <span className="text-[#00ff00]">$</span> ./start_party.sh --force
            </div>

            {/* Footer Button */}
            <button
              onClick={() => setShowForm(true)}
              className="w-full mt-4 bg-[#00ff00] text-black font-black py-4 text-xl uppercase hover:bg-[#00cc00] hover:scale-[1.02] transition-all border-b-4 border-[#009900] active:border-0 active:translate-y-[4px]"
            >
                CONFIRM TRANSACTION
            </button>
        </div>
      </div>
    </div>
  );
};
