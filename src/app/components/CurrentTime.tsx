'use client';

import { useState, useEffect } from 'react';

export default function CurrentTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const franceTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Paris"}));
      const hours = franceTime.getHours();
      const minutes = franceTime.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      setTime(`${displayHours}:${displayMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center"
         style={{ 
           fontFamily: 'var(--font-playfull-daily)',
           textShadow: '3px 3px 0px white, -3px -3px 0px white, 3px -3px 0px white, -3px 3px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
         }}>
      {time}
    </div>
  );
} 