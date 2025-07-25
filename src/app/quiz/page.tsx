'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface QuizAnswer {
  questionId: string;
  answer: string;
  value: number;
}

interface LifeEvent {
  name: string;
  age: number;
  color: string;
  description: string;
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [hoveredEvent, setHoveredEvent] = useState<LifeEvent | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showDailyBreakdown, setShowDailyBreakdown] = useState(false);

  const questions = [
    {
      id: 'sleep',
      question: 'How much do you sleep?',
      options: [
        { text: '3-4 hours (night owl)', value: 3.5 },
        { text: '4-6 hours (busy life)', value: 5 },
        { text: '6-8 hours (healthy balance)', value: 7 },
        { text: '8-10 hours (sleep lover)', value: 9 },
        { text: 'I never actually started sleeping, to be honest', value: 3 },
        { text: 'Plunged into a coma (12+ hours)', value: 12 }
      ]
    },
    {
      id: 'shower',
      question: 'How long do you spend in the shower?',
      options: [
        { text: '3-5 minutes (efficient)', value: 0.25 },
        { text: '5-10 minutes (normal)', value: 0.5 },
        { text: '10-15 minutes (relaxing)', value: 0.75 },
        { text: '15+ minutes (spa time)', value: 1 },
        { text: 'Zero shower, I study computer science', value: 0 },
        { text: 'Until the hot water runs out', value: 1.5 }
      ]
    },
    {
      id: 'eating',
      question: 'How much time do you spend eating?',
      options: [
        { text: '5 minutes for pasta box', value: 0.25 },
        { text: '5-15 minutes (quick meals)', value: 0.25 },
        { text: '15-30 minutes (normal pace)', value: 0.5 },
        { text: '30-45 minutes (enjoying food)', value: 0.75 },
        { text: '45+ minutes (foodie)', value: 1 },
        { text: 'No time to eat, I grind', value: 0.25 }
      ]
    },
    {
      id: 'exercise',
      question: 'How often do you exercise?',
      options: [
        { text: 'Occasionally (when motivated)', value: 0.25 },
        { text: '30 minutes daily (consistent)', value: 0.5 },
        { text: '1 hour 3-4 times/week (active)', value: 0.75 },
        { text: '2+ hours daily (fitness freak)', value: 2 },
        { text: 'I walk to the fridge, does that count?', value: 0.1 },
        { text: 'I never actually started, to be honest', value: 0 }
      ]
    },
    {
      id: 'phone',
      question: 'How much time do you spend on your phone?',
      options: [
        { text: '30 minutes daily (light user)', value: 0.5 },
        { text: '1-2 hours daily (moderate)', value: 1.5 },
        { text: '2-4 hours daily (heavy user)', value: 3 },
        { text: '4+ hours daily (addicted)', value: 5 },
        { text: 'I still have a Nokia 3310', value: 0.5 },
        { text: 'I\'m surgically attached to it', value: 7 }
      ]
    },
    {
      id: 'social_media',
      question: 'How much time on social media?',
      options: [
        { text: '15 minutes daily (minimal)', value: 0.25 },
        { text: '30 minutes daily (light user)', value: 0.5 },
        { text: '1-2 hours daily (regular)', value: 1.5 },
        { text: '2+ hours daily (heavy)', value: 3 },
        { text: 'I deleted all apps (but still check on browser)', value: 2 },
        { text: 'I\'m an influencer (of my own life)', value: 5 }
      ]
    },
    {
      id: 'procrastination',
      question: 'How do you manage your time?',
      options: [
        { text: 'Very organized (planner)', value: 0.5 },
        { text: 'Somewhat organized (tries hard)', value: 1 },
        { text: 'Disorganized (chaos)', value: 2 },
        { text: 'Complete mess (no structure)', value: 3 },
        { text: 'I\'m a time management guru', value: 0.5 },
        { text: 'I\'ll do it tomorrow (said every day)', value: 3 }
      ]
    },
    {
      id: 'work',
      question: 'How productive are you at work?',
      options: [
        { text: 'Very productive (focused)', value: 0.5 },
        { text: 'Moderately productive (some distractions)', value: 1 },
        { text: 'Low productivity (many breaks)', value: 2 },
        { text: 'Minimal productivity (mostly procrastinating)', value: 3 },
        { text: 'I\'m the employee of the month (every month)', value: 0.5 },
        { text: 'I work hard... at avoiding work', value: 2 }
      ]
    }
  ];

  const lifeEvents: LifeEvent[] = [
    { name: 'Your birth', age: 0, color: '#E5E7EB', description: 'Welcome to the world!' },
    { name: 'First day of school', age: 5, color: '#93C5FD', description: 'The beginning of your academic journey' },
    { name: 'Teenage years', age: 13, color: '#FBBF24', description: 'The awkward phase' },
    { name: 'High school graduation', age: 18, color: '#34D399', description: 'Freedom at last!' },
    { name: 'College/University', age: 18, color: '#A78BFA', description: 'The best years of your life' },
    { name: 'First job', age: 22, color: '#F87171', description: 'Welcome to the real world' },
    { name: 'Your wedding', age: 28, color: '#F9A8D4', description: 'The big day' },
    { name: 'First child', age: 30, color: '#60A5FA', description: 'Life changes forever' },
    { name: 'Midlife crisis', age: 40, color: '#F59E0B', description: 'Time to buy a sports car' },
    { name: 'Your retirement', age: 65, color: '#10B981', description: 'Freedom again!' },
    { name: 'Moving to retirement home', age: 75, color: '#8B5CF6', description: 'The golden years' },
    { name: 'Your departure', age: 79.5, color: '#6B7280', description: 'The final chapter' }
  ];

  const handleAnswer = (questionId: string, answer: string, value: number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === questionId);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId, answer, value };
    } else {
      newAnswers.push({ questionId, answer, value });
    }
    
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const calculateAge = () => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateTimeLeft = () => {
    const age = calculateAge();
    const lifeExpectancy = 79.5;
    const yearsLeft = Math.max(0, lifeExpectancy - age);
    const monthsLeft = yearsLeft * 12;
    return { yearsLeft, monthsLeft };
  };

  const calculateDailyTimeWasted = () => {
    const phoneTime = answers.find(a => a.questionId === 'phone')?.value || 0;
    const socialTime = answers.find(a => a.questionId === 'social_media')?.value || 0;
    const procrastinationTime = answers.find(a => a.questionId === 'procrastination')?.value || 0;
    const workWasteTime = answers.find(a => a.questionId === 'work')?.value || 0;
    
    return phoneTime + socialTime + procrastinationTime + workWasteTime;
  };

  const calculateDailyTimeProductive = () => {
    const sleepTime = answers.find(a => a.questionId === 'sleep')?.value || 0;
    const exerciseTime = answers.find(a => a.questionId === 'exercise')?.value || 0;
    const showerTime = answers.find(a => a.questionId === 'shower')?.value || 0;
    const eatingTime = answers.find(a => a.questionId === 'eating')?.value || 0;
    
    return 24 - sleepTime - exerciseTime - showerTime - eatingTime - calculateDailyTimeWasted();
  };

  const renderLifeTimeline = () => {
    const age = calculateAge();
    const totalYears = 80; // Round up to 80 years for cleaner display
    const passedYears = age;
    
    // Create life periods (10-year blocks)
    const lifePeriods = [
      { name: 'Childhood (0-10)', years: [0, 10], color: '#93C5FD', description: 'The wonder years' },
      { name: 'Teenage Years (11-20)', years: [11, 20], color: '#FBBF24', description: 'The awkward phase' },
      { name: 'Young Adult (21-30)', years: [21, 30], color: '#34D399', description: 'Finding your path' },
      { name: 'Adult Life (31-40)', years: [31, 40], color: '#A78BFA', description: 'Building your life' },
      { name: 'Midlife (41-50)', years: [41, 50], color: '#F59E0B', description: 'The crisis years' },
      { name: 'Mature Adult (51-60)', years: [51, 60], color: '#F87171', description: 'Wisdom comes' },
      { name: 'Pre-Retirement (61-70)', years: [61, 70], color: '#10B981', description: 'Planning the golden years' },
      { name: 'Golden Years (71-80)', years: [71, 80], color: '#8B5CF6', description: 'The final chapter' }
    ];
    
    const squares = [];
    const squaresPerYear = 12; // 12 months per year
    const totalSquares = totalYears * squaresPerYear;
    
    for (let i = 0; i < totalSquares; i++) {
      const currentYear = Math.floor(i / squaresPerYear);
      const isPassed = currentYear < passedYears;
      const period = lifePeriods.find(p => currentYear >= p.years[0] && currentYear <= p.years[1]);
      const isHoveredPeriod = hoveredEvent && period && hoveredEvent.name === period.name;
      
      squares.push(
        <div
          key={i}
          className={`w-3 h-3 border transition-all duration-200 cursor-pointer ${
            isHoveredPeriod 
              ? 'border-[#B2E4F6] bg-[#B2E4F6]' 
              : isPassed 
                ? 'border-gray-400 bg-gray-400' 
                : 'border-gray-300 bg-white'
          }`}
          onMouseEnter={() => setHoveredEvent(period ? { name: period.name, age: currentYear, color: period.color, description: period.description } : null)}
          onMouseLeave={() => setHoveredEvent(null)}
        />
      );
    }

    return (
      <div className="flex justify-center">
        <div className="grid grid-cols-24 gap-0.5">
          {squares}
        </div>
      </div>
    );
  };

  if (showResults) {
    const { yearsLeft, monthsLeft } = calculateTimeLeft();
    const dailyWasted = calculateDailyTimeWasted();
    const dailyProductive = calculateDailyTimeProductive();

    if (!showTimeline && !showDailyBreakdown) {
      return (
        <div className="min-h-screen bg-[#B2E4F6] relative overflow-hidden flex items-center justify-center">
          {/* Back to Home Link */}
          <div className="absolute top-6 left-8 z-20">
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

          <div className="relative z-10 px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8"
                  style={{
                    fontFamily: 'var(--font-playfull-daily)',
                    textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white'
                  }}>
                Your Time Analysis
              </h1>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                  Your Life Timeline
                </h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your birth date:</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full max-w-md mx-auto p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2E4F6] focus:border-transparent"
                  />
                </div>
                
                {birthDate && (
                  <div className="space-y-6">
                    <p className="text-xl">
                      You have approximately <span className="font-bold text-[#B2E4F6]">{yearsLeft.toFixed(1)} years</span> left to live.
                    </p>
                    
                    <button
                      onClick={() => setShowTimeline(true)}
                      className="bg-[#B2E4F6] text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-all duration-150"
                      style={{ fontFamily: 'var(--font-playfull-daily)' }}
                    >
                      See Your Life Timeline
                    </button>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowDailyBreakdown(true)}
                    className="bg-[#F5F184] text-[#AFA20C] px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-all duration-150"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}
                  >
                    See Your Quiz Results
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-x-4">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setShowTimeline(false);
                    setShowDailyBreakdown(false);
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-150"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}
                >
                  Retake Quiz
                </button>
                <Link
                  href="/present"
                  className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-150"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}
                >
                  Start Managing Time
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (showTimeline) {
      return (
        <div className="min-h-screen bg-[#B2E4F6] relative overflow-hidden">
          {/* Back to Home Link */}
          <div className="absolute top-6 left-8 z-20">
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

          <div className="relative z-10 px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
                    style={{
                      fontFamily: 'var(--font-playfull-daily)',
                      textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white'
                    }}>
                  Your Life Timeline
                </h1>
                <p className="text-xl text-black" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                  Each square represents one month of your life
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 max-w-lg mx-auto">
                                  <div className="text-center mb-4">
                    <p className="text-lg font-semibold text-black">
                      You have approximately <span className="font-bold text-2xl text-[#B2E4F6]">{yearsLeft.toFixed(1)} years</span> left to live
                    </p>
                  </div>
                <div className="relative">
                  {renderLifeTimeline()}
                  {hoveredEvent && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white p-4 rounded-lg shadow-lg border z-10 mb-2">
                      <div className="text-center">
                        <p className="font-bold text-lg text-black" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                          {hoveredEvent.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{hoveredEvent.description}</p>
                      </div>
                      {/* Arrow pointing down */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center space-x-4">
                <Link
                  href="/present"
                  className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-150"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}
                >
                  Take Control of Your Time
                </Link>
                <button
                  onClick={() => {
                    setShowTimeline(false);
                    setShowDailyBreakdown(true);
                  }}
                  className="bg-[#F5F184] text-[#AFA20C] px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-150"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}
                >
                  See Quiz Results
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

               if (showDailyBreakdown) {
             const sleepTime = answers.find(a => a.questionId === 'sleep')?.value || 0;
             const showerTime = answers.find(a => a.questionId === 'shower')?.value || 0;
             const eatingTime = answers.find(a => a.questionId === 'eating')?.value || 0;
             const exerciseTime = answers.find(a => a.questionId === 'exercise')?.value || 0;
             const phoneTime = answers.find(a => a.questionId === 'phone')?.value || 0;
             const socialTime = answers.find(a => a.questionId === 'social_media')?.value || 0;
             const procrastinationTime = answers.find(a => a.questionId === 'procrastination')?.value || 0;
             const workWasteTime = answers.find(a => a.questionId === 'work')?.value || 0;

             const unavoidableTasks = sleepTime + showerTime + eatingTime + exerciseTime;
             const completelyWasted = phoneTime + socialTime + procrastinationTime + workWasteTime;
             const freeTime = 24 - dailyProductive - unavoidableTasks - completelyWasted;

             return (
               <div className="min-h-screen bg-[#B2E4F6] relative overflow-hidden flex items-center justify-center">
                 {/* Back to Home Link */}
                 <div className="absolute top-6 left-8 z-20">
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

                 <div className="relative z-10 px-4 py-8 w-full max-w-6xl">
                   <div className="text-center mb-8">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
                         style={{
                           fontFamily: 'var(--font-playfull-daily)',
                           textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white'
                         }}>
                       Your Daily Time Breakdown
                     </h1>
                   </div>

                   <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 max-w-4xl mx-auto">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                       {/* Interactive Pie Chart */}
                       <div className="space-y-6">
                         <h3 className="text-2xl font-bold text-black text-center" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                           Daily Time Distribution
                         </h3>
                         <div className="flex justify-center">
                           <div className="relative w-64 h-64">
                             {/* Interactive Pie Chart SVG */}
                             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                               {/* Productive Time - Light Green */}
                               <circle
                                 cx="50"
                                 cy="50"
                                 r="40"
                                 fill="none"
                                 stroke="#A7F3D0"
                                 strokeWidth="20"
                                 strokeDasharray={`${(dailyProductive / 24) * 251.2} 251.2`}
                                 strokeDashoffset="0"
                                 className="cursor-pointer hover:stroke-[#10B981] transition-colors"
                                 onMouseEnter={() => {
                                   const tooltip = document.getElementById('pie-tooltip');
                                   if (tooltip) {
                                     tooltip.textContent = `Productive Time: ${dailyProductive.toFixed(1)}h`;
                                     tooltip.style.display = 'block';
                                   }
                                 }}
                                 onMouseLeave={() => {
                                   const tooltip = document.getElementById('pie-tooltip');
                                   if (tooltip) tooltip.style.display = 'none';
                                 }}
                               />
                               {/* Unavoidable Tasks - Light Blue */}
                               <circle
                                 cx="50"
                                 cy="50"
                                 r="40"
                                 fill="none"
                                 stroke="#BFDBFE"
                                 strokeWidth="20"
                                 strokeDasharray={`${(unavoidableTasks / 24) * 251.2} 251.2`}
                                 strokeDashoffset={`-${(dailyProductive / 24) * 251.2}`}
                                 className="cursor-pointer hover:stroke-[#3B82F6] transition-colors"
                                 onMouseEnter={() => {
                                   const tooltip = document.getElementById('pie-tooltip');
                                   if (tooltip) {
                                     tooltip.textContent = `Unavoidable Tasks: ${unavoidableTasks.toFixed(1)}h (Sleep, Shower, Eating, Exercise)`;
                                     tooltip.style.display = 'block';
                                   }
                                 }}
                                 onMouseLeave={() => {
                                   const tooltip = document.getElementById('pie-tooltip');
                                   if (tooltip) tooltip.style.display = 'none';
                                 }}
                               />
                               {/* Completely Wasted - Light Red */}
                               <circle
                                 cx="50"
                                 cy="50"
                                 r="40"
                                 fill="none"
                                 stroke="#FECACA"
                                 strokeWidth="20"
                                 strokeDasharray={`${(completelyWasted / 24) * 251.2} 251.2`}
                                 strokeDashoffset={`-${((dailyProductive + unavoidableTasks) / 24) * 251.2}`}
                                 className="cursor-pointer hover:stroke-[#EF4444] transition-colors"
                                 onMouseEnter={() => {
                                   const tooltip = document.getElementById('pie-tooltip');
                                   if (tooltip) {
                                     tooltip.textContent = `Completely Wasted: ${completelyWasted.toFixed(1)}h (Phone, Social Media, Procrastination)`;
                                     tooltip.style.display = 'block';
                                   }
                                 }}
                                 onMouseLeave={() => {
                                   const tooltip = document.getElementById('pie-tooltip');
                                   if (tooltip) tooltip.style.display = 'none';
                                 }}
                               />
                               {/* Free Time - Light Yellow */}
                               <circle
                                 cx="50"
                                 cy="50"
                                 r="40"
                                 fill="none"
                                 stroke="#FEF3C7"
                                 strokeWidth="20"
                                 strokeDasharray={`${(freeTime / 24) * 251.2} 251.2`}
                                 strokeDashoffset={`-${((dailyProductive + unavoidableTasks + completelyWasted) / 24) * 251.2}`}
                                 className="cursor-pointer hover:stroke-[#F59E0B] transition-colors"
                                 onMouseEnter={() => {
                                   const tooltip = document.getElementById('pie-tooltip');
                                   if (tooltip) {
                                     tooltip.textContent = `Free Time: ${freeTime.toFixed(1)}h (Time you can control)`;
                                     tooltip.style.display = 'block';
                                   }
                                 }}
                                 onMouseLeave={() => {
                                   const tooltip = document.getElementById('pie-tooltip');
                                   if (tooltip) tooltip.style.display = 'none';
                                 }}
                               />
                             </svg>
                             <div className="absolute inset-0 flex items-center justify-center">
                               <div className="text-center">
                                 <div className="text-2xl font-bold text-black">24h</div>
                                 <div className="text-sm text-gray-600">Total</div>
                               </div>
                             </div>
                             {/* Tooltip */}
                             <div
                               id="pie-tooltip"
                               className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap hidden z-10"
                               style={{ fontFamily: 'var(--font-playfull-daily)' }}
                             >
                               Hover over sections
                             </div>
                           </div>
                         </div>
                         
                         {/* Legend */}
                         <div className="grid grid-cols-2 gap-4 text-sm">
                           <div className="flex items-center space-x-2">
                             <div className="w-4 h-4 bg-[#A7F3D0] rounded"></div>
                             <span>Productive</span>
                           </div>
                           <div className="flex items-center space-x-2">
                             <div className="w-4 h-4 bg-[#BFDBFE] rounded"></div>
                             <span>Unavoidable</span>
                           </div>
                           <div className="flex items-center space-x-2">
                             <div className="w-4 h-4 bg-[#FECACA] rounded"></div>
                             <span>Wasted</span>
                           </div>
                           <div className="flex items-center space-x-2">
                             <div className="w-4 h-4 bg-[#FEF3C7] rounded"></div>
                             <span>Free Time</span>
                           </div>
                         </div>
                       </div>

                       {/* Detailed Bar Chart */}
                       <div className="space-y-6">
                         <h3 className="text-2xl font-bold text-black text-center" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                           Detailed Breakdown
                         </h3>
                         <div className="space-y-4">
                           <div>
                             <div className="flex justify-between mb-2">
                               <span className="font-semibold text-[#10B981]">Productive Time</span>
                               <span className="font-semibold">{dailyProductive.toFixed(1)}h</span>
                             </div>
                             <div className="w-full bg-gray-200 rounded-full h-4">
                               <div
                                 className="bg-[#A7F3D0] h-4 rounded-full transition-all duration-500"
                                 style={{ width: `${(dailyProductive / 24) * 100}%` }}
                               ></div>
                             </div>
                           </div>

                           <div>
                             <div className="flex justify-between mb-2">
                               <span className="font-semibold text-[#3B82F6]">Unavoidable Tasks</span>
                               <span className="font-semibold">{unavoidableTasks.toFixed(1)}h</span>
                             </div>
                             <div className="w-full bg-gray-200 rounded-full h-4">
                               <div
                                 className="bg-[#BFDBFE] h-4 rounded-full transition-all duration-500"
                                 style={{ width: `${(unavoidableTasks / 24) * 100}%` }}
                               ></div>
                             </div>
                           </div>

                           <div>
                             <div className="flex justify-between mb-2">
                               <span className="font-semibold text-[#EF4444]">Completely Wasted</span>
                               <span className="font-semibold">{completelyWasted.toFixed(1)}h</span>
                             </div>
                             <div className="w-full bg-gray-200 rounded-full h-4">
                               <div
                                 className="bg-[#FECACA] h-4 rounded-full transition-all duration-500"
                                 style={{ width: `${(completelyWasted / 24) * 100}%` }}
                               ></div>
                             </div>
                           </div>

                           <div>
                             <div className="flex justify-between mb-2">
                               <span className="font-semibold text-[#F59E0B]">Free Time</span>
                               <span className="font-semibold">{freeTime.toFixed(1)}h</span>
                             </div>
                             <div className="w-full bg-gray-200 rounded-full h-4">
                               <div
                                 className="bg-[#FEF3C7] h-4 rounded-full transition-all duration-500"
                                 style={{ width: `${(freeTime / 24) * 100}%` }}
                               ></div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>


                   </div>

                   <div className="text-center space-x-4">
                     <button
                       onClick={() => setShowDailyBreakdown(false)}
                       className="bg-[#F5F184] text-[#AFA20C] px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-150"
                       style={{ fontFamily: 'var(--font-playfull-daily)' }}
                     >
                       Back to Analysis
                     </button>
                     <Link
                       href="/present"
                       className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-150"
                       style={{ fontFamily: 'var(--font-playfull-daily)' }}
                     >
                       Start Managing Time
                     </Link>
                   </div>
                 </div>
               </div>
             );
           }
  }

  const currentQ = questions[currentQuestion];
  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-[#B2E4F6] relative overflow-hidden">
      {/* Back to Home Link */}
      <div className="absolute top-6 left-8 z-20">
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

      <div className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2"
                style={{
                  fontFamily: 'var(--font-playfull-daily)',
                  textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white'
                }}>
              Time Quiz
            </h1>
                         <p className="text-lg md:text-xl text-black"
                style={{ fontFamily: 'var(--font-playfull-daily)' }}>
               Discover how much time you&apos;re really wasting
             </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-[#B2E4F6] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                {currentQ.question}
              </h2>
              
              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQ.id, option.text, option.value)}
                    className="w-full bg-gray-50 hover:bg-[#B2E4F6] hover:text-white p-4 rounded-xl text-left transition-all duration-200 border-2 border-transparent hover:border-[#B2E4F6]"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 