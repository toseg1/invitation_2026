import React, { useState } from 'react';
import { Users, Send } from 'lucide-react';

export const RSVPFormCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lunchCount: 0,
    dinnerCount: 0
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5002';

    try {
      setError(null);
      const response = await fetch(`${apiUrl}/api/rsvp`, {
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
      } else {
        setError('Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setError('Erreur de connexion. Veuillez réessayer plus tard.');
    }
  };

  if (submitted) {
    return (
      <div className="w-full h-full bg-black text-white flex flex-col items-center justify-center p-6 font-mono">
        <div className="bg-black p-8 rounded-lg border-2 border-[#00ff00]/30 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#00ff00] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#00ff00] mb-4">RSVP CONFIRMÉ!</h2>
          <p className="text-gray-300 mb-6">On se voit en Juillet! 🚀</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black text-white overflow-hidden font-mono selection:bg-[#00ff00] selection:text-black flex flex-col">
      {/* CSS Grid Background */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Top Bar */}
      <div className="flex justify-between items-center bg-[#111] p-2 border-b border-[#333] flex-shrink-0 relative z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-xs text-gray-500">rsvp@jequittelafrance.com</span>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="max-w-md mx-auto p-4 sm:p-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#00ff00] mb-6 text-center">CONFIRMATION</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded">
            <p className="text-red-500 text-sm font-mono font-semibold text-center">
              ⚠️ ERROR: {error}
            </p>
          </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#00ff00] mb-2 font-semibold text-sm sm:text-base">NOM</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ton blaze"
              className="w-full px-4 py-3 bg-[#0a0a0a] text-white text-base rounded border border-[#333] focus:border-[#00ff00] outline-none font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-[#00ff00] mb-2 font-semibold text-sm sm:text-base">EMAIL</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="prénom.nom@gmail.com"
              className="w-full px-4 py-3 bg-[#0a0a0a] text-white text-base rounded border border-[#333] focus:border-[#00ff00] outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[#00ff00] mb-2 font-semibold text-sm sm:text-base flex items-center gap-2">
              <Users className="w-5 h-5" />
              DÉJEUNER (Nombre de personne)
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, lunchCount: Math.max(0, formData.lunchCount - 1)})}
                className="bg-red-500/20 text-red-500 px-6 py-4 text-2xl font-bold rounded hover:bg-red-500/30 transition-all active:scale-95 active:border-2 active:border-red-500"
              >
                -
              </button>
              <div className="flex-1 bg-[#0a0a0a] rounded flex items-center justify-center font-bold text-3xl text-[#00ff00] min-h-[60px]">
                {formData.lunchCount}
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, lunchCount: formData.lunchCount + 1})}
                className="bg-[#00ff00]/20 text-[#00ff00] px-6 py-4 text-2xl font-bold rounded hover:bg-[#00ff00]/30 transition-all active:scale-95 active:border-2 active:border-[#00ff00]"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#00ff00] mb-2 font-semibold text-sm sm:text-base flex items-center gap-2">
              <Users className="w-5 h-5" />
              DÎNER (Nombre de personne)
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, dinnerCount: Math.max(0, formData.dinnerCount - 1)})}
                className="bg-red-500/20 text-red-500 px-6 py-4 text-2xl font-bold rounded hover:bg-red-500/30 transition-all active:scale-95 active:border-2 active:border-red-500"
              >
                -
              </button>
              <div className="flex-1 bg-[#0a0a0a] rounded flex items-center justify-center font-bold text-3xl text-[#00ff00] min-h-[60px]">
                {formData.dinnerCount}
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, dinnerCount: formData.dinnerCount + 1})}
                className="bg-[#00ff00]/20 text-[#00ff00] px-6 py-4 text-2xl font-bold rounded hover:bg-[#00ff00]/30 transition-all active:scale-95 active:border-2 active:border-[#00ff00]"
              >
                +
              </button>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-[#00ff00] text-black py-4 text-lg sm:text-xl rounded font-black hover:bg-[#00cc00] hover:scale-[1.02] transition-all border-b-4 border-[#009900] active:border-0 active:translate-y-[4px] flex items-center justify-center gap-2 uppercase"
            >
              <Send className="w-5 h-5" />
              CONFIRME MOI
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};
