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
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: cities[currentCityIndex].timezone,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        
        let formattedTime = formatter.format(now);
        
        // Forcer le format uniforme avec espace avant PM/AM
        formattedTime = formattedTime.replace(/(\d+):(\d+)([AP]M)/, (match, hour, minute, period) => {
          return `${hour}:${minute} ${period}`;
        });
        
        setTime(formattedTime);
      } catch (error) {
        console.error('Error updating time:', error);
        // Fallback en cas d'erreur
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        let formattedTime = formatter.format(now);
        formattedTime = formattedTime.replace(/(\d+):(\d+)([AP]M)/, (match, hour, minute, period) => {
          return `${hour}:${minute} ${period}`;
        });
        setTime(formattedTime);
      }
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