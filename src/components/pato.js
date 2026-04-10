"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const Pato = ({ side, losingTeamName }) => {
  const [elements, setElements] = useState([]);
  const audioLoopRef = useRef(null);
  const colors = ["#10b981", "#06b6d4", "#a855f7", "#ef4444", "#f59e0b"];

  useEffect(() => {
    const newElements = [];
    for (let i = 0; i < 20; i++) {
      const isText = i % 2 === 0;
      const delay = Math.random() * 4;
      const duration = 2 + Math.random() * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];

      // DESKTOP: Lado esquerdo (0-45%) ou direito (55-100%)
      const leftDesktop = side === "left" ? Math.random() * 45 : 55 + Math.random() * 40;
      
      // MOBILE (Em pé): 
      // Se side for left: ocupa de 5% a 45% da altura (Metade Superior)
      // Se side for right: ocupa de 55% a 90% da altura (Metade Inferior)
      const topMobile = side === "left" 
        ? (Math.random() * 40) + 5  
        : (Math.random() * 35) + 55;

      newElements.push({
        id: i,
        leftDesktop: `${leftDesktop}%`,
        topMobile: `${topMobile}%`,
        delay: `${delay}s`,
        duration: `${duration}s`,
        type: isText ? "text" : "duck",
        color: color,
        fontSize: `${1.2 + Math.random() * 1.5}rem` // Ajustado para não poluir tanto o mobile
      });

      setTimeout(() => {
        const audio = new Audio("/song_duck.mp3");
        audio.volume = 0.2;
        audio.play().catch((e) => console.log("Erro áudio:", e));
      }, delay * 1000);
    }
    setElements(newElements);
  }, [side]);

  return (
    <div className={`pato-container ${side === "left" ? "side-left" : "side-right"}`}>
      <audio ref={audioLoopRef} autoPlay loop>
        <source src="/song_duck.mp3" type="audio/mpeg" />
      </audio>

      {/* NOME DO TIME - CENTRALIZADO NO MOBILE */}
      <div className="team-name-container main-name-delay">
        {losingTeamName.split("").map((char, index) => (
          <span
            key={index}
            className="wave-letter"
            style={{ 
              animationDelay: `${1.5 + (index * 0.1)}s`,
              whiteSpace: char === " " ? "pre" : "normal" 
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* ELEMENTOS FLUTUANTES */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="floating-element"
          style={{
            "--left-desktop": el.leftDesktop,
            "--top-mobile": el.topMobile,
            animationDelay: el.delay,
            animationDuration: el.duration,
            zIndex: el.type === "text" ? 600 : 500
          }}
        >
          {el.type === "duck" ? (
            <Image src="/pato.gif" alt="Pato" width={70} height={70} priority />
          ) : (
            <span 
              className="pato-text-float rotating-pato" 
              style={{ color: el.color, fontSize: el.fontSize }}
            >
              PATO
            </span>
          )}
        </div>
      ))}

      <style jsx>{`
        .pato-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          display: flex;
          align-items: center;
          padding: 0 5%;
          overflow: hidden;
        }

        .side-left { justify-content: flex-start; }
        .side-right { justify-content: flex-end; }

        .team-name-container {
          display: flex;
          z-index: 10000;
          position: relative;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.5));
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
          animation-delay: 1.5s;
        }

        .wave-letter {
          display: inline-block;
          font-size: 6rem;
          font-weight: 900;
          text-transform: uppercase;
          animation: wave 1s ease-in-out infinite;
          background-image: url('/pato.gif');
          background-size: cover;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .floating-element {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* LANDSCAPE (DEITADO) - SOBE VERTICAL */
        @media (min-aspect-ratio: 1/1) {
          .floating-element {
            bottom: -120px;
            left: var(--left-desktop);
            animation: slideUp linear infinite;
          }
        }

        /* PORTRAIT (EM PÉ) - CORRE HORIZONTAL */
        @media (max-aspect-ratio: 1/1) {
          .floating-element {
            left: -120px;
            top: var(--top-mobile);
            animation: slideRight linear infinite;
          }
          
          .pato-container {
            flex-direction: column;
            justify-content: center !important;
            padding: 0;
          }

          .wave-letter { 
            font-size: 3.2rem; 
          }
        }

        .rotating-pato {
          display: inline-block;
          animation: fullRotation 2s linear infinite;
        }

        .pato-text-float {
          font-weight: 900;
          text-shadow: 2px 2px 0px #000;
          letter-spacing: 2px;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes wave {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }

        @keyframes slideUp {
          from { transform: translateY(0); }
          to { transform: translateY(-120vh); }
        }

        @keyframes slideRight {
          from { transform: translateX(0); }
          to { transform: translateX(120vw); }
        }

        @keyframes fullRotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Pato;