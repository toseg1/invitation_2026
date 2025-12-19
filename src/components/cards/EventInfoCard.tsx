import React from 'react';
import { MapPin, Clock, Activity, TrendingUp } from 'lucide-react';

interface EventInfoCardProps {
  onContinue?: () => void;
}

export const EventInfoCard: React.FC<EventInfoCardProps> = ({ onContinue }) => {
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
        <span className="text-xs text-gray-500">root@event:~/genesis_block</span>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="max-w-2xl mx-auto p-4 sm:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00ff00] to-transparent" />
            <h4 className="text-[#00ff00] font-bold text-sm sm:text-base mb-1 tracking-wider">README.md</h4>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.85] tracking-tighter mix-blend-exclusion">
              JE<br/>QUITTE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff00] to-emerald-600">LA FRANCE</span>
            </h1>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="border border-[#333] p-2 sm:p-3 bg-[#0a0a0a]/50">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mb-1 sm:mb-2" />
              <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase">Timestamp</p>
              <p className="font-bold text-sm sm:text-base">4 Juillet 2026</p>
              <p className="text-[9px] sm:text-[10px] text-[#00ff00]">12:00 (midi)</p>
            </div>
            <div className="border border-[#333] p-2 sm:p-3 bg-[#0a0a0a]/50">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mb-1 sm:mb-2" />
              <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase">Location</p>
              <p className="font-bold text-sm sm:text-base">10 rue d'Echevanne</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500">70100 Velesmes</p>
            </div>
      
          </div>

          {/* Info Box */}
          <div className="border border-[#333] p-3 sm:p-4 bg-[#0a0a0a]/50 mb-4 sm:mb-6">
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#00ff00] mt-0.5">▸</span>
                <span>Possibilité de <span className="text-[#00ff00]">logement / camping</span> sur place</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00ff00] mt-0.5">▸</span>
                <span>Plus d'infos, contactez moi au <span className="text-[#00ff00] font-bold">07 70 70 60 27</span> / <span className="text-[#00ff00] font-bold">theo.seguin@free.fr</span></span>
              </li>
            </ul>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="w-full bg-[#00ff00] text-black font-black py-3 text-base sm:text-xl uppercase hover:bg-[#00cc00] transition-all border-b-4 border-[#009900] active:border-0 active:translate-y-[4px]"
          >
            CONFIRME TA VENUE
          </button>
        </div>
      </div>
    </div>
  );
};
