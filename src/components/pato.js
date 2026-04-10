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
      const left = side === "left" ? Math.random() * 45 : 55 + Math.random() * 45;
      const delay = Math.random() * 4;
      const duration = 2 + Math.random() * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];

      newElements.push({
        id: i,
        left: `${left}%`,
        delay: `${delay}s`,
        duration: `${duration}s`,
        type: isText ? "text" : "duck",
        color: color,
        fontSize: `${1.5 + Math.random() * 2}rem`
      });

      setTimeout(() => {
        const audio = new Audio("/song_duck.mp3");
        audio.volume = 0.3;
        audio.play().catch((e) => console.log("Erro áudio:", e));
      }, delay * 1000);
    }
    setElements(newElements);
  }, [side]);

  return (
    <div className={`pato-container ${side === "left" ? "justify-start" : "justify-end"}`}>
      <audio ref={audioLoopRef} autoPlay loop volume={0.5}>
        <source src="/song_duck.mp3" type="audio/mpeg" />
      </audio>

      {/* NOME DO TIME COM DELAY NA ENTRADA */}
      <div className="team-name-container main-name-delay">
        {losingTeamName.split("").map((char, index) => (
          <span
            key={index}
            className="wave-letter"
            style={{ 
              animationDelay: `${1.5 + (index * 0.1)}s`, // 1.5s de delay base + o delay da onda
              whiteSpace: char === " " ? "pre" : "normal" 
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {elements.map((el) => (
        <div
          key={el.id}
          className="floating-element"
          style={{
            left: el.left,
            animationDelay: el.delay,
            animationDuration: el.duration,
            zIndex: el.type === "text" ? 600 : 500
          }}
        >
          {el.type === "duck" ? (
            <Image src="/pato.gif" alt="Pato" width={80} height={80} priority />
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
        }

        .justify-start { justify-content: flex-start; }
        .justify-end { justify-content: flex-end; }

        .team-name-container {
          display: flex;
          z-index: 10000;
          position: relative;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.5));
          opacity: 0; /* Começa invisível */
          animation: fadeIn 0.5s ease-out forwards;
          animation-delay: 1.5s; /* Delay para o container inteiro aparecer */
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
          bottom: -150px;
          animation: slideUpOnly linear infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
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
          50% { transform: translateY(-20px) scale(1.1); }
        }

        @keyframes slideUpOnly {
          from { transform: translateY(0); }
          to { transform: translateY(-120vh); }
        }

        @keyframes fullRotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .wave-letter { font-size: 3.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Pato;