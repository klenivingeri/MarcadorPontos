'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const Pato = ({ side }) => {
  const [ducks, setDucks] = useState([]);
  const audioLoopRef = useRef(null);

  useEffect(() => {
    const newDucks = [];
    for (let i = 0; i < 10; i++) {
      const left = side === 'left' ? Math.random() * 50 : 50 + Math.random() * 50;
      const delay = Math.random() * 3;
      newDucks.push({
        id: i,
        left: `${left}%`,
        delay: `${delay}s`,
      });

      // Toca um som para cada pato com delay adicional
      setTimeout(() => {
        const audio = new Audio('/song_duck.mp3');
        audio.play().catch(e => console.log('Duck audio play failed:', e));
      }, delay * 1000 + 500); // delay da animação + 500ms extra
    }
    setDucks(newDucks);
  }, [side]);

  return (
    <div className="pato-container">
      <audio ref={audioLoopRef} autoPlay loop volume={0.5}>
        <source src="/song_duck.mp3" type="audio/mpeg" />
      </audio>
      {ducks.map((duck) => (
        <div
          key={duck.id}
          className="duck"
          style={{
            left: duck.left,
            animationDelay: duck.delay,
          }}
        >
          <Image
            src="/pato.gif"
            alt="Pato"
            width={100}
            height={100}
            priority
          />
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
          z-index: 1000;
        }
        .duck {
          position: absolute;
          bottom: -100px;
          animation: slideUp 2s linear infinite;
        }
        @keyframes slideUp {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-110vh);
          }
        }
      `}</style>
    </div>
  );
};

export default Pato;