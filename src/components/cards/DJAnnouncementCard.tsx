import React from 'react';
import { Radio } from 'lucide-react';

/**
 * DJ Announcement Card - Modern Cyberpunk Design
 * Underground electronic music aesthetic with contemporary edge
 *
 * TO CUSTOMIZE:
 * - Update EVENT_NAME, DJ_NAME, BACKUP_DJ below
 * - Change DATE_TEXT and EDITION
 */

// 🎧 CUSTOMIZE YOUR EVENT INFO HERE:
const EVENT_NAME = "VELESMES KITKAT";
const DATE_TEXT = "SAT 7 DEC";
const TIME_TEXT ="12:00PM"
const EDITION = "1";
const DJ_NAME = "TBA"; // "To Be Announced"
const BACKUP_DJ = "DJ Balzac";

export const DJAnnouncementCard: React.FC = () => {
  return (
    <div className="w-full h-full relative border-4 border-cyan-400 overflow-hidden bg-black">
      {/* Deep space gradient background - fully opaque */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-indigo-950" />

      {/* Galaxy/space photo overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(/images/M31_M33_08242000_RR_w.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'screen'
        }}
      />

      {/* Cyberpunk grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Halftone dots - subtle */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0'
        }}
      />

      {/* Diagonal scan lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.3) 2px,
            rgba(0, 255, 255, 0.3) 4px
          )`
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col p-6">
        {/* Top Header Bar */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-cyan-400/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest">LIVE</span>
          </div>
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span className="text-white/70 text-xs font-mono">ED.{EDITION}</span>
          </div>
        </div>

        {/* Event Title - Large & Bold */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {/* Main event name */}
          <div className="mb-8">
            <div className="text-xs text-cyan-400 font-mono tracking-[0.3em] mb-3 uppercase">
              ― Artist Lineup ―
            </div>
            <h1
              className="font-black uppercase tracking-tight text-white relative"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                lineHeight: '0.9',
                textShadow: `
                  0 0 20px rgba(0, 255, 255, 0.5),
                  0 0 40px rgba(0, 255, 255, 0.3),
                  4px 4px 0px rgba(0, 0, 0, 0.8)
                `,
                letterSpacing: '-0.02em'
              }}
            >
              {EVENT_NAME.split(' ').map((word, idx) => (
                <div key={idx} className="relative inline-block">
                  {word}
                  {idx === 0 && (
                    <div className="absolute -right-2 top-0 w-2 h-2 bg-pink-500 rounded-sm" />
                  )}
                </div>
              )).reduce((prev, curr) => [prev, ' ', curr] as any)}
            </h1>

            {/* Glitch effect bars */}
            <div className="mt-4 flex justify-center gap-2">
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-transparent" />
              <div className="h-1 w-16 bg-gradient-to-l from-pink-500 to-transparent" />
            </div>
          </div>

          {/* DJ Name Display - Modern Card */}
          <div className="w-full max-w-sm mb-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-pink-500/10 backdrop-blur-md border-2 border-cyan-400/50 p-6 relative overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pink-500" />

              {/* Content */}
              <div className="relative text-center">
                <div className="text-4xl font-black text-white uppercase tracking-wider mb-2" style={{
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                }}>
                  {DJ_NAME}
                </div>
                {DJ_NAME === "TBA" && (
                  <div className="text-3xl font-black text-cyan-400 tracking-wider" style={{
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                  }}>
                    Backup: {BACKUP_DJ}
                  </div>
                )}
              </div>

              {/* Animated background element */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-auto pt-4 border-t-2 border-cyan-400/30">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 border border-cyan-400/50 font-mono">SAX ON THE BEACH</span>
              <span className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 border border-cyan-400/50 font-mono">HOUSE</span>
            </div>
            <div className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 border border-cyan-400/50 font-monoo">
              ALL DAY-NIGHT LONG
            </div>
          </div>
        </div>
      </div>

      {/* Glowing corner effects */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 blur-3xl rounded-full" />

      {/* Corner brackets - cyberpunk style */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-cyan-400" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-pink-500" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-pink-500" />
    </div>
  );
};
