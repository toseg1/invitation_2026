import React, { useState, useRef } from 'react';
import { cn } from './ui/utils';

interface TearablePosterProps {
  children: React.ReactNode;
  onTear?: () => void;
  onTearStart?: () => void;
  isTorn?: boolean;
  className?: string;
}

// Static generation of tech tear geometry
const techZigZag = [
  [50, 0], [55, 0], [55, 5], [45, 5], [45, 12], [52, 12], [52, 18], [48, 18], [48, 25], 
  [58, 25], [58, 35], [42, 35], [42, 45], [53, 45], [53, 55], [46, 55], [46, 65], 
  [56, 65], [56, 72], [45, 72], [45, 82], [54, 82], [54, 92], [48, 92], [48, 100], [50, 100]
];

const leftPoints = [[0, 0], ...techZigZag, [0, 100]];
const rightPoints = [[100, 0], ...techZigZag, [100, 100]];
const toPoly = (points: number[][]) => `polygon(${points.map(p => `${p[0]}% ${p[1]}%`).join(', ')})`;
const LEFT_CLIP = toPoly(leftPoints);
const RIGHT_CLIP = toPoly(rightPoints);

export const TearablePoster: React.FC<TearablePosterProps> = ({
  children,
  onTear,
  onTearStart,
  isTorn = false,
  className
}) => {
  const [tearing, setTearing] = useState(false);
  const hasCalledOnTearRef = useRef(false);

  const handleInteraction = () => {
    if (tearing || isTorn) return;

    setTearing(true);

    if (onTearStart) {
        // Execute on next frame to ensure UI updates first
        requestAnimationFrame(() => {
            onTearStart();
        });
    }

    // Fallback timeout in case transitionend doesn't fire
    // Duration is 700ms + 100ms buffer
    setTimeout(() => {
        if (!hasCalledOnTearRef.current && onTear) {
            hasCalledOnTearRef.current = true;
            onTear();
        }
    }, 800);
  };

  // Use transition end instead of setTimeout for better reliability and performance
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Only trigger if the transform transition ended on this specific element (the left half)
    // Check for transform specifically and ensure we're in tearing state
    // Use hasCalledOnTear flag to ensure onTear is only called once
    if ((e.propertyName === 'transform' || e.propertyName === '-webkit-transform') && tearing && !hasCalledOnTearRef.current && e.currentTarget === e.target) {
        hasCalledOnTearRef.current = true;
        if (onTear) {
            // Schedule the tear action
             requestAnimationFrame(() => {
                onTear();
             });
        }
    }
  };

  // If explicitly torn by prop (not interaction), don't render
  // But note: in App.tsx, the component is unmounted when torn, so this rarely runs.
  if (isTorn && !tearing) return null;

  return (
    <div 
      className={cn(
        "relative w-full h-full select-none group perspective-1000",
        !tearing && !isTorn && "cursor-pointer",
        className
      )}
      onClick={handleInteraction}
    >
      {/* Glitch/Glow effect behind the tear line */}
      <div 
        className={cn(
            "absolute inset-0 z-10 bg-[#00ff00] transition-opacity duration-200",
             tearing ? "opacity-100 animate-pulse" : "opacity-0"
        )}
        style={{ clipPath: toPoly([[48, 0], [52, 0], [52, 100], [48, 100]]) }}
      />

      {/* Left Half - We attach the TransitionEnd listener here */}
      <div
        className={cn(
            "absolute inset-0 overflow-hidden origin-bottom-left z-20 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            tearing ? "opacity-0 grayscale" : "opacity-100"
        )}
        style={{
            clipPath: LEFT_CLIP,
            transform: tearing ? 'translate(-120px, 50px) rotate(-15deg) skewY(5deg)' : 'translate(0, 0) rotate(0deg)',
            filter: tearing ? 'drop-shadow(-10px 10px 0px #00ff00)' : 'none',
            pointerEvents: tearing ? 'none' : 'auto'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="absolute inset-0 pointer-events-none">
            {children}
        </div>
        {/* Digital Tear Edge Highlight */}
        <div className="absolute inset-y-0 right-0 w-[2px] bg-[#00ff00] shadow-[0_0_10px_#00ff00]" style={{ clipPath: LEFT_CLIP }}/>
        <div className="absolute inset-y-0 right-1/2 w-12 bg-gradient-to-l from-black/50 to-transparent pointer-events-none mix-blend-overlay" />
      </div>

      {/* Right Half */}
      <div
        className={cn(
            "absolute inset-0 overflow-hidden origin-bottom-right z-20 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            tearing ? "opacity-0 grayscale" : "opacity-100"
        )}
        style={{
            clipPath: RIGHT_CLIP,
            transform: tearing ? 'translate(120px, 100px) rotate(15deg) skewY(-5deg)' : 'translate(0, 0) rotate(0deg)',
             filter: tearing ? 'drop-shadow(10px 10px 0px #ff00ff)' : 'none',
            pointerEvents: tearing ? 'none' : 'auto'
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
            {children}
        </div>
        {/* Digital Tear Edge Highlight */}
        <div className="absolute inset-y-0 left-0 w-[2px] bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]" style={{ clipPath: RIGHT_CLIP }}/>
        <div className="absolute inset-y-0 left-1/2 w-12 bg-gradient-to-r from-black/50 to-transparent pointer-events-none mix-blend-overlay" />
      </div>
      
      {/* Hint overlay when hovering */}
      {!tearing && (
        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-black border-2 border-[#00ff00] text-[#00ff00] px-6 py-3 font-black uppercase tracking-widest shadow-[4px_4px_0px_#00ff00] transform -rotate-2">
                [ CLICK_TO_FORK ]
            </div>
        </div>
      )}
    </div>
  );
};
