import React from 'react';
import { Heart, MapPin, Camera,PartyPopper } from 'lucide-react'

export const AboutMeCard = () => {
  // These image URLs can be easily replaced from backend
  const moodBoardImages = {
    mainPhoto: '/images/moodboard/mariage-1.jpeg',
    photo1: '/images/moodboard/victor-alice.jpeg',
    photo2: '/images/moodboard/tri.jpeg',
    photo3: '/images/moodboard/harry-potter.jpeg',
    photo4: '/images/moodboard/new-york.jpeg',
    photo5: '/images/moodboard/IMG_7055.jpeg',
    photo6: '/images/moodboard/IMG_1006.jpeg',
  };

  return (
    <div className="mood-board-container">
      {/* Header Section */}
      <div className="header">
        <div className="header-content">
          <h1 className="title">Viens fêter mon départ</h1>
          <div className="subtitle-row">
            <PartyPopper className="icon" size={16} />
            <span className="subtitle">Une bonne raison de célébrer</span>
          </div>
        </div>
      </div>

      {/* Mood Board Grid */}
      <div className="grid-container">
        
        {/* Large Featured Photo - Left Side */}
        <div className="photo-card large-card">
          <div className="photo-frame">
            <img src={moodBoardImages.mainPhoto} alt="Main" className="photo" />
          </div>
          <div className="tape tape-top-left"></div>
          <div className="tape tape-bottom-right"></div>
        </div>

        {/* Right Column - Stacked Photos */}
        <div className="right-column">
          
          {/* Photo 1 - Landscape */}
          <div className="photo-card landscape-card">
            <div className="photo-frame">
              <img src={moodBoardImages.photo1} alt="Photo 1" className="photo" />
            </div>
            <div className="tape tape-top-center"></div>
            <div className="corner-fold"></div>
          </div>

          {/* Photo 2 - Square */}
          <div className="photo-card square-card">
            <div className="photo-frame">
              <img src={moodBoardImages.photo2} alt="Photo 2" className="photo" />
            </div>
            <div className="tape tape-diagonal"></div>
          </div>

        </div>

        {/* Bottom Row - Three Photos */}
        <div className="bottom-row">
          
          {/* Photo 3 */}
          <div className="photo-card small-landscape">
            <div className="photo-frame">
              <img src={moodBoardImages.photo3} alt="Photo 3" className="photo" />
            </div>
            <div className="tape tape-corner"></div>
          </div>

          {/* Photo 4 */}
          <div className="photo-card small-square">
            <div className="photo-frame">
              <img src={moodBoardImages.photo4} alt="Photo 4" className="photo" />
            </div>
            <div className="tape tape-top-center"></div>
            <div className="sticker-heart">
              <Heart size={16} fill="currentColor" />
            </div>
          </div>

          {/* Photo 5 */}
          <div className="photo-card small-landscape">
            <div className="photo-frame">
              <img src={moodBoardImages.photo5} alt="Photo 5" className="photo" />
            </div>
            <div className="tape tape-side"></div>
          </div>

        </div>

        {/* Polaroid Style Photo - Floating */}
        <div className="photo-card polaroid-card">
          <div className="polaroid-frame">
            <div className="polaroid-photo">
              <img src={moodBoardImages.photo6} alt="Photo 6" className="photo" />
            </div>
            <div className="polaroid-caption">
              <Camera size={14} className="caption-icon" />
              <span>Good Times</span>
            </div>
          </div>
          <div className="tape tape-polaroid"></div>
        </div>

        {/* Decorative Push Pins */}
        <div className="pin pin-1"></div>
        <div className="pin pin-2"></div>
        <div className="pin pin-3"></div>
        <div className="pin pin-4"></div>

        {/* Handwritten Note */}
        <div className="handwritten-note">
          <p>Living the</p>
          <p>best life! ✨</p>
        </div>

      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Permanent+Marker&family=Inter:wght@300;400;500;600;700&family=Kalam:wght@300;400;700&display=swap');

        .mood-board-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
          overflow: hidden;
        }

        /* Header */
        .header {
          padding: 24px 28px 20px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: relative;
          z-index: 10;
        }

        .header-content {
          text-align: center;
        }

        .title {
          font-family: 'Permanent Marker', cursive;
          font-size: clamp(18px, 5vw, 28px);
          color: #2c3e50;
          margin: 0 0 8px;
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.08);
          letter-spacing: 1px;
        }

        .subtitle-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: 'Caveat', cursive;
          font-size: 18px;
          color: #7f8c8d;
          font-weight: 500;
        }

        .icon {
          color: #e74c3c;
        }

        /* Grid Container */
        .grid-container {
          position: relative;
          padding: 20px 24px 24px;
          height: calc(100% - 96px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr auto;
          gap: 16px;
        }

        /* Photo Cards Base */
        .photo-card {
          position: relative;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .photo-card:hover {
          transform: scale(1.02) rotate(0deg) !important;
          z-index: 20;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(0deg);
          }
          to {
            opacity: 1;
          }
        }

        .photo-frame {
          width: 100%;
          height: 100%;
          background: white;
          padding: 10px;
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.15),
            0 2px 6px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Large Featured Card */
        .large-card {
          grid-row: 1 / 2;
          transform: rotate(-2deg);
          animation-delay: 0.1s;
        }

        /* Right Column */
        .right-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
          grid-row: 1 / 2;
        }

        .landscape-card {
          height: 48%;
          transform: rotate(1deg);
          animation-delay: 0.2s;
        }

        .square-card {
          height: 52%;
          transform: rotate(-1.5deg);
          animation-delay: 0.3s;
        }

        /* Bottom Row */
        .bottom-row {
          grid-column: 1 / -1;
          display: flex;
          gap: 16px;
          height: 150px;
          margin-bottom: 10px;
        }

        .small-landscape {
          flex: 1;
          transform: rotate(0.5deg);
          animation-delay: 0.4s;
        }

        .small-square {
          flex: 1;
          transform: rotate(-1deg);
          animation-delay: 0.5s;
        }

        /* Polaroid Card */
        .polaroid-card {
          position: absolute;
          bottom: 170px;
          right: 28px;
          width: 140px;
          height: 170px;
          transform: rotate(8deg);
          z-index: 15;
          animation-delay: 0.6s;
        }

        .polaroid-frame {
          width: 100%;
          height: 100%;
          background: white;
          padding: 12px 12px 40px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.2),
            0 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }

        .polaroid-photo {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .polaroid-caption {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: 'Kalam', cursive;
          font-size: 13px;
          color: #555;
        }

        .caption-icon {
          color: #e74c3c;
        }

        /* Tape Effects */
        .tape {
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(2px);
          box-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.1),
            inset 0 0 2px rgba(255, 255, 255, 0.5);
        }

        .tape-top-left {
          top: -8px;
          left: 20px;
          width: 60px;
          height: 25px;
          transform: rotate(-45deg);
        }

        .tape-bottom-right {
          bottom: -8px;
          right: 20px;
          width: 60px;
          height: 25px;
          transform: rotate(45deg);
        }

        .tape-top-center {
          top: -8px;
          left: 50%;
          transform: translateX(-50%) rotate(-2deg);
          width: 50px;
          height: 20px;
        }

        .tape-diagonal {
          top: 10px;
          right: -8px;
          width: 50px;
          height: 20px;
          transform: rotate(90deg);
        }

        .tape-corner {
          top: -6px;
          left: -6px;
          width: 40px;
          height: 40px;
          transform: rotate(45deg);
        }

        .tape-side {
          top: 50%;
          right: -8px;
          width: 45px;
          height: 18px;
          transform: translateY(-50%) rotate(90deg);
        }

        .tape-polaroid {
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 20px;
        }

        /* Corner Fold Effect */
        .corner-fold {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 30px 30px;
          border-color: transparent transparent #bbb transparent;
          box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .corner-fold::before {
          content: '';
          position: absolute;
          bottom: -30px;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 30px 30px;
          border-color: transparent transparent #ddd transparent;
        }

        /* Heart Sticker */
        .sticker-heart {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          background: #e74c3c;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 
            0 4px 12px rgba(231, 76, 60, 0.4),
            0 0 0 3px white;
          animation: heartBeat 2s ease-in-out infinite;
          z-index: 5;
        }

        @keyframes heartBeat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.15);
          }
          20%, 40% {
            transform: scale(1);
          }
        }

        /* Push Pins */
        .pin {
          position: absolute;
          width: 14px;
          height: 14px;
          background: radial-gradient(circle, #e74c3c 0%, #c0392b 100%);
          border-radius: 50%;
          box-shadow: 
            0 3px 6px rgba(0, 0, 0, 0.3),
            inset 0 1px 2px rgba(255, 255, 255, 0.4);
          z-index: 25;
        }

        .pin::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          transform: translate(-50%, -70%);
        }

        .pin-1 {
          top: 80px;
          left: 50px;
        }

        .pin-2 {
          top: 75px;
          right: 180px;
        }

        .pin-3 {
          bottom: 180px;
          left: 180px;
        }

        .pin-4 {
          top: 300px;
          right: 50px;
        }

        /* Handwritten Note */
        .handwritten-note {
          position: absolute;
          bottom: 170px;
          left: 30px;
          background: #fef3c7;
          padding: 16px 20px;
          border-radius: 2px;
          box-shadow:
            0 6px 18px rgba(0, 0, 0, 0.15),
            inset 0 0 0 1px rgba(0, 0, 0, 0.05);
          transform: rotate(-3deg);
          font-family: 'Kalam', cursive;
          font-size: 18px;
          line-height: 1.4;
          color: #555;
          z-index: 15;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s backwards;
        }

        .handwritten-note p {
          margin: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: rotate(-3deg) translateY(20px);
          }
          to {
            opacity: 1;
            transform: rotate(-3deg) translateY(0);
          }
        }

        /* Responsive Design - Scale down but keep same layout */
        @media (max-width: 768px) {
          .header {
            padding: 16px 18px 14px;
          }

          .title {
            font-size: 28px;
          }

          .subtitle-row {
            font-size: 16px;
          }

          .grid-container {
            padding: 16px 14px 20px;
            gap: 12px;
            height: calc(100% - 80px);
          }

          .photo-frame {
            padding: 8px;
          }

          .polaroid-card {
            width: 100px;
            height: 125px;
            bottom: 130px;
            right: 16px;
          }

          .polaroid-frame {
            padding: 8px 8px 30px;
          }

          .polaroid-caption {
            font-size: 10px;
            bottom: 8px;
          }

          .bottom-row {
            height: 110px;
            gap: 10px;
            margin-bottom: 8px;
          }

          .handwritten-note {
            font-size: 14px;
            padding: 10px 14px;
            bottom: 130px;
            left: 20px;
          }

          .pin {
            width: 10px;
            height: 10px;
          }

          .tape {
            box-shadow:
              0 1px 3px rgba(0, 0, 0, 0.1),
              inset 0 0 2px rgba(255, 255, 255, 0.5);
          }

          .tape-top-left,
          .tape-bottom-right {
            width: 45px;
            height: 20px;
          }

          .tape-top-center,
          .tape-diagonal,
          .tape-side,
          .tape-polaroid {
            width: 40px;
            height: 16px;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 14px 16px 12px;
          }

          .title {
            font-size: 24px;
          }

          .subtitle-row {
            font-size: 14px;
          }

          .grid-container {
            padding: 12px 10px 16px;
            gap: 8px;
            height: calc(100% - 70px);
          }

          .photo-frame {
            padding: 6px;
          }

          .bottom-row {
            height: 90px;
            gap: 8px;
            margin-bottom: 6px;
          }

          .polaroid-card {
            width: 80px;
            height: 100px;
            bottom: 100px;
            right: 12px;
          }

          .polaroid-frame {
            padding: 6px 6px 24px;
          }

          .polaroid-caption {
            font-size: 9px;
            bottom: 6px;
            gap: 4px;
          }

          .caption-icon {
            width: 10px;
            height: 10px;
          }

          .handwritten-note {
            font-size: 13px;
            padding: 8px 12px;
            bottom: 100px;
            left: 16px;
          }

          .pin {
            width: 8px;
            height: 8px;
          }

          .pin::after {
            width: 3px;
            height: 3px;
          }

          .pin-1 {
            top: 60px;
            left: 30px;
          }

          .pin-2 {
            top: 55px;
            right: 120px;
          }

          .pin-3 {
            bottom: 140px;
            left: 120px;
          }

          .pin-4 {
            top: 200px;
            right: 30px;
          }

          .sticker-heart {
            width: 24px;
            height: 24px;
            box-shadow:
              0 2px 8px rgba(231, 76, 60, 0.4),
              0 0 0 2px white;
          }

          .corner-fold {
            border-width: 0 0 20px 20px;
          }

          .corner-fold::before {
            border-width: 0 0 20px 20px;
            bottom: -20px;
          }

          .tape-top-left,
          .tape-bottom-right {
            width: 35px;
            height: 16px;
          }

          .tape-top-center,
          .tape-diagonal,
          .tape-side,
          .tape-polaroid {
            width: 30px;
            height: 14px;
          }

          .tape-corner {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};
