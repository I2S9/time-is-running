'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface JournalEntry {
  id: string;
  date: string;
  timeSpent: string;
  mood: 'happy' | 'neutral' | 'sad';
  content: string;
}

interface CalendarProps {
  onDayClick: (date: Date) => void;
  journalEntries: JournalEntry[];
}

export default function Calendar({ onDayClick, journalEntries }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journalContent, setJournalContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    onDayClick(date);
  };

  const getJournalEntry = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return journalEntries.find(entry => entry.date === dateString);
  };

  const hasJournalEntry = (date: Date) => {
    return getJournalEntry(date) !== undefined;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Calendar Header */}
      <div className="bg-white rounded-t-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={goToCurrentMonth}
              className="px-3 py-1 bg-[#B2E4F6] text-white rounded-full text-sm hover:bg-[#9DD4E6] transition-colors"
            >
              Today
            </button>
          </div>
          
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => (
            <div key={index} className="aspect-square">
              {date ? (
                <button
                  onClick={() => handleDayClick(date)}
                  disabled={!isPastDate(date)}
                  className={`w-full h-full rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center relative
                    ${isToday(date) 
                      ? 'border-[#B2E4F6] bg-[#B2E4F6] text-white font-bold' 
                      : isPastDate(date)
                        ? hasJournalEntry(date)
                          ? 'border-green-400 bg-green-50 hover:bg-green-100 cursor-pointer'
                          : 'border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <span className="text-base font-semibold">{date.getDate()}</span>
                  {hasJournalEntry(date) && (
                    <div className="absolute bottom-1 right-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </button>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDate && (
        <div className="bg-white rounded-b-2xl p-6 shadow-lg border-t-2 border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {(() => {
            const entry = getJournalEntry(selectedDate);
            if (entry) {
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Time spent:</span>
                    <span className="font-semibold">{entry.timeSpent}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Mood:</span>
                    <span className="text-2xl">
                      {entry.mood === 'happy' ? '😊' : entry.mood === 'neutral' ? '😐' : '😔'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Journal entry:</span>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-800">{entry.content}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setJournalContent(entry.content);
                      setSelectedMood(entry.mood);
                      setShowJournalModal(true);
                    }}
                    className="px-4 py-2 bg-[#B2E4F6] text-white rounded-lg hover:bg-[#9DD4E6] transition-colors"
                  >
                    Edit Journal
                  </button>
                </div>
              );
            } else {
              return (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No journal entry for this day</p>
                  <button
                    onClick={() => setShowJournalModal(true)}
                    className="px-6 py-3 bg-[#B2E4F6] text-white rounded-lg hover:bg-[#9DD4E6] transition-colors font-semibold"
                  >
                    Write in Journal
                  </button>
                </div>
              );
            }
          })()}
        </div>
      )}

      {/* Journal Modal */}
      {showJournalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                {selectedDate ? `Journal for ${selectedDate.toLocaleDateString()}` : 'Write in Journal'}
              </h3>
              <p className="text-sm text-gray-600">How was your day?</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                {[
                  { value: 'happy', emoji: '😊', label: 'Happy' },
                  { value: 'neutral', emoji: '😐', label: 'Neutral' },
                  { value: 'sad', emoji: '😔', label: 'Sad' }
                ].map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value as 'happy' | 'neutral' | 'sad')}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                      selectedMood === mood.value
                        ? 'border-[#B2E4F6] bg-[#B2E4F6] text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-2xl mb-1">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time spent today
                </label>
                <input
                  type="text"
                  placeholder="e.g., 8 hours working, 2 hours reading"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2E4F6] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Write about your day
                </label>
                <textarea
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  placeholder="How was your day? What did you do? How do you feel?"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2E4F6] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowJournalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Here you would save the journal entry
                    console.log('Saving journal entry:', {
                      date: selectedDate?.toISOString().split('T')[0],
                      mood: selectedMood,
                      content: journalContent
                    });
                    setShowJournalModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-[#B2E4F6] text-white rounded-lg hover:bg-[#9DD4E6] transition-colors"
                >
                  Save
                </button>
              </div>
              
              {/* Close button in top right corner */}
              <button
                onClick={() => setShowJournalModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 