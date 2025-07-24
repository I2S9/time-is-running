'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import AuthButtons from '../components/AuthButtons';
import { useState, useEffect } from 'react';

interface TimeData {
  hour: number;
  pomodoroTime: number; // in minutes
  taskTime: number; // in minutes
  totalTime: number; // in minutes
}

export default function AnalysisPage() {
  const [timeData, setTimeData] = useState<TimeData[]>([]);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize time data for 24 hours
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      const initialData: TimeData[] = Array.from({ length: 24 }, (_, index) => ({
        hour: index,
        pomodoroTime: Math.floor(Math.random() * 60), // Mock data
        taskTime: Math.floor(Math.random() * 45), // Mock data
        totalTime: 0
      }));

      // Calculate total time for each hour
      const dataWithTotals = initialData.map(item => ({
        ...item,
        totalTime: item.pomodoroTime + item.taskTime
      }));

      setTimeData(dataWithTotals);
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading time
  }, []);

  const maxTime = Math.max(...timeData.map(d => d.totalTime));

  const getBarHeight = (time: number) => {
    if (maxTime === 0) return 0;
    return (time / maxTime) * 200; // Max height of 200px
  };

  const getBarColor = (hour: number) => {
    const data = timeData[hour];
    if (!data) return '#B2E4F6';
    
    const total = data.totalTime;
    if (total === 0) return '#E5E7EB'; // Gray for no activity
    if (total < 30) return '#B2E4F6'; // Light blue for low activity
    if (total < 60) return '#8BC5D6'; // Medium blue for moderate activity
    return '#1e3a8a'; // Dark blue for high activity
  };

  const formatHour = (hour: number) => {
    return hour.toString().padStart(2, '0') + ':00';
  };

  const getHourLabel = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
  };

  return (
    <div className="min-h-screen bg-[#B2E4F6] relative">
      {/* Header Navigation */}
      <header className="relative z-10 px-8 pt-4">
        <SignedOut>
          <nav className="bg-white rounded-full mx-auto max-w-3xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
                <Link href="/past" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer" 
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
                <Link href="/present" className="text-lg md:text-xl font-bold text-[#B2E4F6] hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</Link>
                <Link href="/future" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>FUTURE</Link>
                <Link href="/about" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>ABOUT US</Link>
                <AuthButtons />
              </div>
            </div>
          </nav>
        </SignedOut>
        <SignedIn>
          <nav className="bg-white rounded-full mx-auto max-w-lg p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
                <Link href="/past" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer" 
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
                <Link href="/present" className="text-lg md:text-xl font-bold text-[#B2E4F6] hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</Link>
                <Link href="/future" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>FUTURE</Link>
                <Link href="/about" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>ABOUT US</Link>
                <AuthButtons />
              </div>
            </div>
          </nav>
        </SignedIn>
      </header>

      {/* Alarm Clock Icon */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="block hover:scale-110 transition-transform duration-200">
          <Image
            src="/images/clock.png"
            alt="Alarm Clock - Home"
            width={60}
            height={60}
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
          />
        </Link>
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 text-center"
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            TIME ANALYSIS
          </h1>

          {/* Chart Container */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                DAILY TIME DISTRIBUTION
              </h2>
              <p className="text-gray-600 text-lg">
                Track your productivity throughout the day
              </p>
            </div>

            {/* Chart */}
            <div className="relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-sm text-gray-500 pr-2">
                <div>120 min</div>
                <div>90 min</div>
                <div>60 min</div>
                <div>30 min</div>
                <div>0 min</div>
              </div>

              {/* Chart area */}
              <div className="ml-12">
                <div className="flex items-end justify-between h-64 border-b-2 border-gray-300">
                  {timeData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      {/* Bar */}
                      <div 
                        className="w-full max-w-8 mx-1 rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer relative"
                        style={{
                          height: `${getBarHeight(data.totalTime)}px`,
                          backgroundColor: getBarColor(data.hour),
                          minHeight: data.totalTime > 0 ? '4px' : '0px'
                        }}
                        onClick={() => setSelectedHour(selectedHour === data.hour ? null : data.hour)}
                      >
                        {/* Tooltip */}
                        {selectedHour === data.hour && data.totalTime > 0 && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                            <div>Pomodoro: {data.pomodoroTime} min</div>
                            <div>Tasks: {data.taskTime} min</div>
                            <div>Total: {data.totalTime} min</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Hour label */}
                      <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left">
                        {formatHour(data.hour)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-sm text-gray-600">No activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#B2E4F6] rounded"></div>
                <span className="text-sm text-gray-600">Low activity (0-30 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#8BC5D6] rounded"></div>
                <span className="text-sm text-gray-600">Moderate activity (30-60 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#1e3a8a] rounded"></div>
                <span className="text-sm text-gray-600">High activity (60+ min)</span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <h3 className="text-xl font-bold text-black mb-2"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                TOTAL POMODORO TIME
              </h3>
              <div className="text-3xl font-bold text-[#B2E4F6]"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                {timeData.reduce((sum, data) => sum + data.pomodoroTime, 0)} min
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <h3 className="text-xl font-bold text-black mb-2"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                TOTAL TASK TIME
              </h3>
              <div className="text-3xl font-bold text-[#8BC5D6]"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                {timeData.reduce((sum, data) => sum + data.taskTime, 0)} min
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <h3 className="text-xl font-bold text-black mb-2"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                TOTAL PRODUCTIVE TIME
              </h3>
              <div className="text-3xl font-bold text-[#1e3a8a]"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                {timeData.reduce((sum, data) => sum + data.totalTime, 0)} min
              </div>
            </div>
          </div>

          {/* Back to Present Button */}
          <div className="text-center">
            <Link href="/present">
              <button 
                className={`px-8 py-4 rounded-full text-lg font-bold transform transition-all duration-150 ${
                  isLoading 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed scale-95' 
                    : 'bg-gray-300 text-black hover:scale-105 hover:bg-gray-400'
                }`}
                disabled={isLoading}
                style={{ fontFamily: 'var(--font-playfull-daily)' }}
              >
                {isLoading ? 'GO BACK TO PRESENT...' : 'GO BACK TO PRESENT'}
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 