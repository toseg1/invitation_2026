import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TearablePoster } from './components/TearablePoster';
import { Terminal, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { invitationConfig } from './config/invitation.config';
import { getCard } from './config/cards.registry';

// No-op sound functions
const playTechTearSound = () => {};
const playSuccessSound = () => {};

function App() {
  const [removedLayers, setRemovedLayers] = useState<number[]>([]);

  // Stable ref for Konami code (reset layers)
  const konamiIndexRef = useRef(0);
  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Handle layer tear
  const handleTear = useCallback((layerIndex: number) => {
    setRemovedLayers(prev => {
      if (prev.includes(layerIndex)) return prev;
      return [...prev, layerIndex];
    });
  }, []);

  // Go back one layer (restore the most recently removed layer)
  const goBackOneLayer = useCallback(() => {
    setRemovedLayers(prev => {
      if (prev.length === 0) return prev;
      // Remove the last item (most recently torn layer)
      return prev.slice(0, -1);
    });
  }, []);

  // Go forward one layer (tear the current top layer)
  const goForwardOneLayer = useCallback(() => {
    // Find the highest layer that hasn't been removed
    const visibleLayers = invitationConfig.layers
      .map((_, idx) => idx)
      .filter(idx => !removedLayers.includes(idx));

    if (visibleLayers.length > 1) {
      // Remove the highest visible layer (last in array, since they're bottom-to-top)
      const topLayer = visibleLayers[visibleLayers.length - 1];
      handleTear(topLayer);
    }
  }, [removedLayers, handleTear]);

  // Reset all layers
  const resetAll = useCallback(() => {
    setRemovedLayers([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = konamiIndexRef.current;

      // Handle Konami code
      if (e.key === KONAMI_CODE[currentIndex]) {
        konamiIndexRef.current = currentIndex + 1;
        if (konamiIndexRef.current === KONAMI_CODE.length) {
          setRemovedLayers([]); // Reset all layers
          konamiIndexRef.current = 0;
          playSuccessSound();
        }
      } else {
        konamiIndexRef.current = 0;
        if (e.key === KONAMI_CODE[0]) konamiIndexRef.current = 1;
      }

      // Navigation shortcuts
      // Left Arrow or Backspace: Go back one layer
      if ((e.key === 'ArrowLeft' || e.key === 'Backspace') && removedLayers.length > 0) {
        e.preventDefault();
        goBackOneLayer();
      }

      // Right Arrow: Go forward one layer
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goForwardOneLayer();
      }

      // R key: Reset all
      if (e.key === 'r' || e.key === 'R') {
        setRemovedLayers([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [removedLayers, goBackOneLayer, goForwardOneLayer]);

  // Build layers from configuration
  const layers = invitationConfig.layers.map((cardId, index) => {
    const cardDef = getCard(cardId);
    if (!cardDef) {
      console.error(`Card "${cardId}" not found in registry`);
      return null;
    }

    return {
      index,
      cardId,
      definition: cardDef,
      zIndex: 10 + (index * 10), // Bottom=10, Middle=20, Top=30, etc.
    };
  }).filter(Boolean);

  // Reverse layers for rendering (top layer should be last in DOM for z-index)
  const reversedLayers = [...layers].reverse();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center overflow-hidden relative font-mono select-none"
      style={{ backgroundColor: invitationConfig.globalSettings.backgroundColor }}
    >
      {/* Background Tech Grid */}
      {invitationConfig.globalSettings.showGrid && (
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${invitationConfig.globalSettings.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${invitationConfig.globalSettings.gridColor} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)'
          }}
        />
      )}

      {/* Floating Code Particles */}
      {invitationConfig.globalSettings.showParticles && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          {invitationConfig.globalSettings.particleTexts.map((text, idx) => (
            <div
              key={idx}
              className={`absolute text-[${invitationConfig.globalSettings.gridColor}] text-xs ${
                idx === 0 ? 'animate-pulse top-10 left-10' :
                idx === 1 ? 'animate-pulse bottom-20 right-20 delay-75' :
                'animate-bounce top-1/2 left-20 delay-150'
              }`}
            >
              {text}
            </div>
          ))}
        </div>
      )}

      {/* Main Container */}
      <div className="relative w-full max-w-md aspect-[3/5] md:aspect-[4/6] lg:h-[800px] lg:w-[550px] z-10 m-4 group">

        {/* Navigation Controls */}
        <div className="absolute inset-0 pointer-events-none z-[100]">
          {/* Left Arrow - Go Back */}
          {removedLayers.length > 0 && (
            <button
              onClick={goBackOneLayer}
              className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto
                         bg-black/40 hover:bg-black/60 border border-[#00ff00]/30
                         text-[#00ff00] p-3 rounded-full
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         hover:scale-110 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)]"
              title="Go back (Left Arrow / Backspace)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow - Go Forward */}
          {(() => {
            const visibleLayers = invitationConfig.layers
              .map((_, idx) => idx)
              .filter(idx => !removedLayers.includes(idx));
            return visibleLayers.length > 1 && (
              <button
                onClick={goForwardOneLayer}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto
                           bg-black/40 hover:bg-black/60 border border-[#00ff00]/30
                           text-[#00ff00] p-3 rounded-full
                           opacity-0 group-hover:opacity-100 transition-all duration-300
                           hover:scale-110 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)]"
                title="Go forward (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            );
          })()}

          {/* Reset Button */}
          {removedLayers.length > 0 && (
            <button
              onClick={resetAll}
              className="absolute top-2 right-2 pointer-events-auto
                         bg-black/40 hover:bg-black/60 border border-[#00ff00]/30
                         text-[#00ff00] p-2 rounded-full
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         hover:scale-110 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)]"
              title="Reset all layers (R key)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Render all layers */}
        {reversedLayers.map((layer) => {
          if (!layer) return null;

          const { index, definition, zIndex } = layer;
          const isRemoved = removedLayers.includes(index);
          const CardComponent = definition.component;

          // Don't render removed layers
          if (isRemoved) return null;

          // Tearable layer
          if (definition.isTearable) {
            return (
              <div
                key={definition.id}
                className={`absolute inset-0 transform ${definition.defaultStyling?.rotation || ''}`}
                style={{ zIndex }}
              >
                <TearablePoster
                  onTear={() => handleTear(index)}
                  onTearStart={playTechTearSound}
                  isTorn={false}
                  className="shadow-2xl"
                >
                  <CardComponent />
                </TearablePoster>
              </div>
            );
          }

          // Non-tearable layer (base layer)
          return (
            <div
              key={definition.id}
              className="absolute inset-0 shadow-[0_0_100px_rgba(0,255,0,0.1)] bg-black border border-[#333]"
              style={{ zIndex }}
            >
              <CardComponent />
            </div>
          );
        })}

      </div>

      {/* Instructions */}
      {invitationConfig.globalSettings.showInstructions &&
       removedLayers.length < layers.length && (
        <div className="absolute bottom-8 left-0 right-0 text-center z-50 pointer-events-none">
          <div className={`inline-flex items-center gap-2 bg-black text-[${invitationConfig.globalSettings.gridColor}] px-6 py-3 border-2 border-[${invitationConfig.globalSettings.gridColor}] shadow-[0_0_10px_${invitationConfig.globalSettings.gridColor}] animate-bounce`}>
            <Terminal className="w-4 h-4" />
            <span className="font-black text-sm uppercase tracking-widest">
              {invitationConfig.globalSettings.instructionText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
