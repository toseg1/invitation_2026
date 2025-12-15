import React, { useState, useEffect } from 'react';

export const SamoaCard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="samoa-container">
      {/* Background Layer with Parallax */}
      <div 
        className="background-layer"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.1)`,
        }}
      />

      {/* Main Content - Flowing Typography */}
      <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>
        
        {/* Coordinates - Minimalist Watermark */}
        <div 
          className="coordinates"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          }}
        >
          <div className="coord-line">13.8506° S, 171.7513° W</div>
          <div className="coord-location">Apia</div>
        </div>

        {/* Main Headline - Artistic Placement */}
        <div 
          className="headline"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
          }}
        >
          Je quitte la France
        </div>

        {/* Flight Path Visual - Minimal */}
        <div className="flight-path">
          <svg className="path-line" viewBox="0 0 400 100" preserveAspectRatio="none">
            <path 
              d="M 0 50 Q 100 20, 200 50 T 400 50" 
              fill="none" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="1"
            />
            {/* Animated plane */}
            <g className="plane-icon">
              <path 
                d="M 0 0 L 8 2 L 8 -2 Z M 2 0 L 2 4 L 4 4 L 4 -4 L 2 -4 Z" 
                fill="white"
                opacity="0.9"
              />
            </g>
          </svg>
        </div>

        {/* Destination - Massive Display Text */}
        <div 
          className="destination"
          style={{
            transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
          }}
        >
          <div className="destination-text">SAMOA</div>
          <div className="destination-subtitle">Paradise Awaits</div>
        </div>

        {/* Achievement - No Box, Just Text */}
        <div className="achievement">
          <svg className="unlock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.5"/>
            <path d="M12 15v2" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7 11V7a5 5 0 0 1 9.9-1" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="achievement-text">New Adventure Unlocked</span>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="palm-accent palm-left">
          <svg viewBox="0 0 100 200" preserveAspectRatio="xMidYMid meet">
            <path 
              d="M 50 200 Q 45 150, 50 100 Q 48 80, 30 50 M 50 100 Q 52 80, 70 50 M 50 100 Q 50 70, 50 40"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="palm-accent palm-right">
          <svg viewBox="0 0 100 200" preserveAspectRatio="xMidYMid meet">
            <path 
              d="M 50 200 Q 55 150, 50 100 Q 52 80, 70 50 M 50 100 Q 48 80, 30 50 M 50 100 Q 50 70, 50 40"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Compass Rose - Minimal Line Art */}
        <div className="compass">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
            <path d="M 50 15 L 50 85 M 15 50 L 85 50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
            <path d="M 50 15 L 53 25 L 50 50 L 47 25 Z" fill="rgba(255,255,255,0.3)"/>
            <text x="50" y="12" fontSize="8" fill="rgba(255,255,255,0.4)" textAnchor="middle">N</text>
          </svg>
        </div>

        {/* Wave Pattern - Bottom Accent */}
        <div className="wave-pattern">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path 
              d="M0,60 C300,90 600,30 900,60 C1050,75 1150,60 1200,60 L1200,120 L0,120 Z"
              fill="rgba(255,255,255,0.05)"
            />
            <path 
              d="M0,70 C300,100 600,40 900,70 C1050,85 1150,70 1200,70"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Glassmorphism Info Card - Minimal Use */}
        <div 
          className="info-glass"
          style={{
            transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
          }}
        >
          <div className="info-item">
            <span className="info-label">From</span>
            <span className="info-value">Dijon, France</span>
          </div>
          <div className="info-divider"></div>
          <div className="info-item">
            <span className="info-label">To</span>
            <span className="info-value">Apia, Samoa</span>
          </div>
        </div>

      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&family=Playfair+Display:wght@400;500;600&family=Roboto+Mono:wght@300;400&display=swap');

        .samoa-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        /* Background with Parallax */
        .background-layer {
          position: absolute;
          inset: -10%;
          background-image: url('/images/samoa.jpg');
          background-size: cover;
          background-position: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Content Wrapper */
        .content-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .content-wrapper.loaded {
          opacity: 1;
        }

        /* Coordinates - Top Right Watermark */
        .coordinates {
          position: absolute;
          top: 8%;
          right: 6%;
          font-family: 'Roboto Mono', monospace;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.7);
          text-align: right;
          transition: transform 0.3s ease-out;
          animation: fadeInDown 1.5s cubic-bezier(0.16, 1, 0.3, 1) 2s backwards;
        }

        .coord-line {
          font-size: 13px;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .coord-location {
          font-size: 11px;
          opacity: 0.8;
          letter-spacing: 0.1em;
        }

        /* Main Headline - Artistic Placement */
        .headline {
          position: absolute;
          top: 15%;
          left: 8%;
          font-family: 'Inter', sans-serif;
          font-weight: 200;
          font-size: clamp(48px, 8vw, 90px);
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: 0.08em;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
          animation: fadeInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
          line-height: 1.2;
        }

        .headline:hover {
          transform: translateY(-2px) scale(1.01);
          text-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
        }

        /* Flight Path */
        .flight-path {
          position: absolute;
          top: 32%;
          left: 10%;
          right: 10%;
          height: 100px;
          animation: fadeIn 1s ease-out 1.2s backwards;
        }

        .path-line {
          width: 100%;
          height: 100%;
        }

        .plane-icon {
          animation: flyAcross 4s ease-in-out 1.5s infinite;
          transform-origin: center;
        }

        @keyframes flyAcross {
          0% {
            transform: translate(0px, 50px) rotate(-5deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(400px, 50px) rotate(-5deg);
            opacity: 0;
          }
        }

        /* Destination - Center-Right, Massive */
        .destination {
          position: absolute;
          top: 42%;
          right: 8%;
          text-align: right;
          transition: transform 0.3s ease-out;
          animation: fadeInScale 1.5s cubic-bezier(0.16, 1, 0.3, 1) 1.8s backwards;
        }

        .destination-text {
          font-family: 'Inter', sans-serif;
          font-weight: 100;
          font-size: clamp(100px, 18vw, 200px);
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(32,178,170,0.9) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.15em;
          line-height: 0.9;
          text-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          filter: drop-shadow(0 4px 20px rgba(255,255,255,0.1));
        }

        .destination-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: clamp(16px, 2vw, 24px);
          color: rgba(255, 255, 255, 0.75);
          letter-spacing: 0.2em;
          margin-top: 12px;
          text-transform: lowercase;
        }

        .destination:hover .destination-text {
          filter: drop-shadow(0 6px 30px rgba(32,178,170,0.3));
        }

        /* Achievement - Bottom Left, No Box */
        .achievement {
          position: absolute;
          bottom: 12%;
          left: 8%;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.05em;
          animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 2.5s backwards;
          transition: all 0.3s ease;
        }

        .achievement:hover {
          transform: translateY(-3px);
          filter: drop-shadow(0 4px 20px rgba(255,255,255,0.2));
        }

        .unlock-icon {
          width: 28px;
          height: 28px;
          color: rgba(255, 255, 255, 0.85);
          animation: unlockPulse 2s ease-in-out 3s infinite;
        }

        @keyframes unlockPulse {
          0%, 100% {
            opacity: 0.85;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .achievement-text {
          font-size: 16px;
          letter-spacing: 0.1em;
        }

        /* Palm Accents - Decorative */
        .palm-accent {
          position: absolute;
          width: 80px;
          height: 160px;
          opacity: 0;
          animation: fadeIn 2s ease-out 1s backwards;
        }

        .palm-left {
          bottom: 20%;
          left: 3%;
        }

        .palm-right {
          top: 25%;
          right: 2%;
          transform: scaleX(-1);
        }

        /* Compass - Top Left Corner */
        .compass {
          position: absolute;
          top: 6%;
          left: 6%;
          width: 70px;
          height: 70px;
          opacity: 0;
          animation: fadeInRotate 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
        }

        @keyframes fadeInRotate {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        /* Wave Pattern - Bottom */
        .wave-pattern {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          animation: fadeIn 2s ease-out 2s backwards;
        }

        /* Glassmorphism Info Card */
        .info-glass {
          position: absolute;
          bottom: 22%;
          right: 8%;
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          padding: 20px 32px;
          display: flex;
          gap: 24px;
          align-items: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 2.2s backwards;
        }

        .info-glass:hover {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-4px);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .info-label {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .info-value {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: 0.05em;
        }

        .info-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
        }

        /* Animation Keyframes */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .headline {
            top: 12%;
            left: 6%;
            font-size: 42px;
          }

          .destination {
            top: 38%;
            right: 6%;
          }

          .destination-text {
            font-size: 80px;
          }

          .coordinates {
            top: 6%;
            right: 6%;
            font-size: 11px;
          }

          .achievement {
            bottom: 10%;
            left: 6%;
            font-size: 14px;
          }

          .info-glass {
            bottom: 18%;
            right: 6%;
            padding: 16px 24px;
            gap: 16px;
          }

          .compass {
            width: 50px;
            height: 50px;
          }

          .palm-accent {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .headline {
            font-size: 36px;
            letter-spacing: 0.05em;
          }

          .destination-text {
            font-size: 60px;
          }

          .destination-subtitle {
            font-size: 14px;
          }

          .info-glass {
            flex-direction: column;
            gap: 12px;
            padding: 16px 20px;
          }

          .info-divider {
            width: 60px;
            height: 1px;
          }
        }
      `}</style>
    </div>
  );
};
