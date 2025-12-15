import React from 'react';
import { TrendingUp } from 'lucide-react';

const CHART_TEXTURE = "https://images.unsplash.com/photo-1611974765270-ca12586343bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export const CryptoStonksCard: React.FC = () => {
  return (
    <div className="absolute inset-0 shadow-[0_0_100px_rgba(0,255,0,0.1)] bg-gradient-to-b from-slate-900 to-slate-800 border-4 border-[#00ff00]">
      <div
        className="absolute inset-0 opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: `url(${CHART_TEXTURE})`, backgroundSize: 'cover' }}
      />
      <div className="relative z-10 h-full flex flex-col p-6">
        <div className="bg-[#00ff00] text-black px-4 py-2 font-black text-2xl transform -rotate-2 self-start inline-block mb-8 shadow-[4px_4px_0px_black]">
          STONKS ONLY GO UP 🚀
        </div>
        <div className="flex-1 relative">
          <div className="absolute bottom-0 left-1/4 w-16 h-[60%] bg-[#00ff00] border-2 border-black shadow-[0_0_20px_#00ff00] flex flex-col items-center justify-end pb-2">
            <span className="text-black font-bold vertical-text transform -rotate-90">PUMP IT</span>
          </div>
          <div className="absolute bottom-10 left-[30%] w-1 h-[80%] bg-[#00ff00]" />
          <div className="absolute top-10 right-0 transform rotate-12">
            <div className="bg-white p-2 border-2 border-black shadow-[4px_4px_0px_black]">
              <p className="text-4xl">🐸</p>
              <p className="font-black text-xs bg-black text-white px-1">RARE PEPE</p>
            </div>
          </div>
          <div className="absolute bottom-20 right-4 text-right">
            <div className="text-white font-bold text-4xl drop-shadow-md">
              HODL
            </div>
            <div className="text-[#00ff00] font-mono text-sm animate-pulse">
              +420.69% (24h)
            </div>
          </div>
        </div>
        <div className="mt-auto bg-red-600 text-white font-bold p-2 transform rotate-2 text-center border-2 border-white shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-6 h-6" />
            <span>BUY THE DIP</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/o0vwzuFxE437y/giphy.gif')] opacity-5 mix-blend-overlay pointer-events-none" />
    </div>
  );
};
