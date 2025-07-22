'use client';

import { useState, useEffect } from 'react';

const cities = [
  { name: 'Paris', timezone: 'Europe/Paris' },
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Sydney', timezone: 'Australia/Sydney' }
];

export default function CurrentTime() {
  const [time, setTime] = useState('');
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const cityTime = new Date(now.toLocaleString("en-US", {timeZone: cities[currentCityIndex].timezone}));
      const hours = cityTime.getHours();
      const minutes = cityTime.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      setTime(`${displayHours}:${displayMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [currentCityIndex]);

  const handleClick = () => {
    setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
  };

  return (
    <div className="text-center">
      <div 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-black cursor-pointer hover:scale-105 transition-transform"
        style={{ 
          fontFamily: 'var(--font-playfull-daily)',
          textShadow: '3px 3px 0px white, -3px -3px 0px white, 3px -3px 0px white, -3px 3px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
        }}
        onClick={handleClick}
        title={`Click to change city - Currently: ${cities[currentCityIndex].name}`}
      >
        {time}
      </div>
      <div 
        className="text-lg md:text-xl font-bold text-black mt-2 cursor-pointer hover:text-gray-700 transition-colors"
        style={{ 
          fontFamily: 'var(--font-playfull-daily)',
          textShadow: '1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white'
        }}
        onClick={handleClick}
      >
        {cities[currentCityIndex].name}
      </div>
    </div>
  );
} 