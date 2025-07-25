'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface TimeEntry {
  id: string;
  task: string;
  minutes: number;
}

interface JournalEntry {
  id: string;
  date: string;
  timeEntries: TimeEntry[];
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
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newMinutes, setNewMinutes] = useState('');
  const [localJournalEntries, setLocalJournalEntries] = useState<JournalEntry[]>(journalEntries);
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);

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
    const entry = getJournalEntry(date);
    if (entry) {
      setJournalContent(entry.content);
      setSelectedMood(entry.mood);
      setTimeEntries(entry.timeEntries);
    } else {
      setJournalContent('');
      setSelectedMood('neutral');
      setTimeEntries([]);
    }
    setShowJournalModal(true);
    onDayClick(date);
  };

  const getJournalEntry = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return localJournalEntries.find(entry => entry.date === dateString);
  };

  const hasJournalEntry = (date: Date) => {
    return getJournalEntry(date) !== undefined;
  };

  // Update local entries when props change
  useEffect(() => {
    setLocalJournalEntries(journalEntries);
  }, [journalEntries]);

  const getMoodColor = (mood: 'happy' | 'neutral' | 'sad') => {
    switch (mood) {
      case 'happy': return 'bg-green-500';
      case 'neutral': return 'bg-orange-500';
      case 'sad': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getMoodPercentage = (mood: 'happy' | 'neutral' | 'sad') => {
    switch (mood) {
      case 'happy': return 100;
      case 'neutral': return 50;
      case 'sad': return 0;
      default: return 0;
    }
  };

  const getGlobalMoodAverage = () => {
    if (localJournalEntries.length === 0) return 0;
    
    const totalMoodValue = localJournalEntries.reduce((sum, entry) => {
      return sum + getMoodPercentage(entry.mood);
    }, 0);
    
    return Math.round(totalMoodValue / localJournalEntries.length);
  };

  const getGlobalMoodColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getGlobalMoodLabel = (percentage: number) => {
    if (percentage >= 70) return 'Good';
    if (percentage >= 40) return 'Okay';
    return 'Bad';
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

  const addTimeEntry = () => {
    if (newTask.trim() && newMinutes.trim()) {
      const minutes = parseInt(newMinutes);
      if (!isNaN(minutes) && minutes > 0) {
        const newEntry: TimeEntry = {
          id: Date.now().toString(),
          task: newTask.trim(),
          minutes: minutes
        };
        setTimeEntries([...timeEntries, newEntry]);
        setNewTask('');
        setNewMinutes('');
      }
    }
  };

  const removeTimeEntry = (id: string) => {
    setTimeEntries(timeEntries.filter(entry => entry.id !== id));
  };

  const getTotalTime = () => {
    return timeEntries.reduce((total, entry) => total + entry.minutes, 0);
  };

  const days = getDaysInMonth(currentDate);
  const globalMoodAverage = getGlobalMoodAverage();
  const globalMoodColor = getGlobalMoodColor(globalMoodAverage);
  const globalMoodLabel = getGlobalMoodLabel(globalMoodAverage);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-6">
        {/* Calendar Section */}
        <div className="flex-1">
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
                              ? (() => {
                                  const entry = getJournalEntry(date);
                                  const moodColor = entry ? getMoodColor(entry.mood) : 'bg-green-500';
                                  return `border-2 ${moodColor} hover:opacity-80 cursor-pointer text-white font-semibold`;
                                })()
                              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      <span className="text-base font-semibold">{date.getDate()}</span>
                      {hasJournalEntry(date) && (
                        <div className="absolute bottom-1 right-1">
                          <div className={`w-2 h-2 ${getMoodColor(getJournalEntry(date)!.mood)} rounded-full`}></div>
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


        </div>

        {/* Vertical Mood Gauge */}
        <div className="w-64 bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
              Overall Mood
            </h3>
            <p className="text-xs text-gray-600">
              {localJournalEntries.length} entries
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{globalMoodAverage}%</div>
              <div className="text-xs text-gray-600">Mood Level</div>
            </div>
            
            <div className="text-center">
              <span className={`px-3 py-1 rounded-full text-sm text-white font-semibold ${globalMoodColor}`}>
                {globalMoodLabel}
              </span>
            </div>
          </div>
          
          {/* Vertical Progress Bar */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-8 h-48 bg-gray-200 rounded-full">
              <div
                className={`absolute bottom-0 w-full rounded-full transition-all duration-1000 ${globalMoodColor}`}
                style={{ height: `${globalMoodAverage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between text-xs text-gray-500 mt-4 h-48">
            <div className="text-center">Good</div>
            <div className="text-center">Okay</div>
            <div className="text-center">Bad</div>
          </div>

          {/* Add New Entry Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowAddEntryModal(true)}
              className="w-full px-4 py-3 bg-[#B2E4F6] text-white rounded-lg hover:bg-[#9DD4E6] transition-colors font-semibold"
              style={{ fontFamily: 'var(--font-playfull-daily)' }}
            >
              Add New Entry
            </button>
          </div>
        </div>
      </div>

      {/* Journal Modal */}
      {showJournalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                {selectedDate ? `Journal for ${selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}` : 'Write in Journal'}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedDate && getJournalEntry(selectedDate) ? 'Edit your journal entry' : 'How was your day?'}
              </p>
            </div>

            <div className="space-y-6">
              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How was your mood today?</label>
                <div className="flex justify-center gap-4">
                  {[
                    { value: 'happy', label: 'Good', color: 'bg-green-500' },
                    { value: 'neutral', label: 'Okay', color: 'bg-orange-500' },
                    { value: 'sad', label: 'Bad', color: 'bg-red-500' }
                  ].map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value as 'happy' | 'neutral' | 'sad')}
                      className={`px-4 py-3 rounded-lg border-2 transition-colors font-semibold ${
                        selectedMood === mood.value
                          ? `${mood.color} text-white border-transparent`
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Management - To-Do List Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Time spent on tasks</label>
                <div className="space-y-3">
                  {/* Add new time entry */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Task name"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2E4F6] focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={newMinutes}
                      onChange={(e) => setNewMinutes(e.target.value)}
                      placeholder="Min"
                      className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2E4F6] focus:border-transparent"
                    />
                    <button
                      onClick={addTimeEntry}
                      className="px-4 py-2 bg-[#B2E4F6] text-white rounded-lg hover:bg-[#9DD4E6] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Time entries list */}
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {timeEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium">{entry.task}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{entry.minutes} min</span>
                          <button
                            onClick={() => removeTimeEntry(entry.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total time */}
                  {timeEntries.length > 0 && (
                    <div className="text-right pt-2 border-t border-gray-200">
                      <span className="font-semibold">Total: {getTotalTime()} min</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Journal Content */}
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

              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowJournalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedDate) {
                      const dateString = selectedDate.toISOString().split('T')[0];
                      const newEntry: JournalEntry = {
                        id: Date.now().toString(),
                        date: dateString,
                        mood: selectedMood,
                        timeEntries: timeEntries,
                        content: journalContent
                      };

                      // Update local entries
                      const existingIndex = localJournalEntries.findIndex(entry => entry.date === dateString);
                      if (existingIndex >= 0) {
                        const updatedEntries = [...localJournalEntries];
                        updatedEntries[existingIndex] = newEntry;
                        setLocalJournalEntries(updatedEntries);
                      } else {
                        setLocalJournalEntries([...localJournalEntries, newEntry]);
                      }

                      console.log('Saving journal entry:', newEntry);
                    }
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

      {/* Add New Entry Modal */}
      {showAddEntryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Add New Journal Entry
              </h3>
              <p className="text-sm text-gray-600">Select a date and add your entry</p>
            </div>

            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2E4F6] focus:border-transparent"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How was your mood?</label>
                <div className="flex justify-center gap-4">
                  {[
                    { value: 'happy', label: 'Good', color: 'bg-green-500' },
                    { value: 'neutral', label: 'Okay', color: 'bg-orange-500' },
                    { value: 'sad', label: 'Bad', color: 'bg-red-500' }
                  ].map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value as 'happy' | 'neutral' | 'sad')}
                      className={`px-4 py-3 rounded-lg border-2 transition-colors font-semibold ${
                        selectedMood === mood.value
                          ? `${mood.color} text-white border-transparent`
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Management */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Time spent on tasks</label>
                <div className="space-y-3">
                  {/* Add new time entry */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Task name"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2E4F6] focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={newMinutes}
                      onChange={(e) => setNewMinutes(e.target.value)}
                      placeholder="Min"
                      className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2E4F6] focus:border-transparent"
                    />
                    <button
                      onClick={addTimeEntry}
                      className="px-4 py-2 bg-[#B2E4F6] text-white rounded-lg hover:bg-[#9DD4E6] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Time entries list */}
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {timeEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium">{entry.task}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{entry.minutes} min</span>
                          <button
                            onClick={() => removeTimeEntry(entry.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total time */}
                  {timeEntries.length > 0 && (
                    <div className="text-right pt-2 border-t border-gray-200">
                      <span className="font-semibold">Total: {getTotalTime()} min</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Journal Content */}
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

              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddEntryModal(false);
                    setJournalContent('');
                    setSelectedMood('neutral');
                    setTimeEntries([]);
                    setNewTask('');
                    setNewMinutes('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Here you would save the new entry
                    console.log('Adding new journal entry:', {
                      mood: selectedMood,
                      timeEntries: timeEntries,
                      content: journalContent
                    });
                    setShowAddEntryModal(false);
                    setJournalContent('');
                    setSelectedMood('neutral');
                    setTimeEntries([]);
                    setNewTask('');
                    setNewMinutes('');
                  }}
                  className="flex-1 px-4 py-2 bg-[#B2E4F6] text-white rounded-lg hover:bg-[#9DD4E6] transition-colors"
                >
                  Add Entry
                </button>
              </div>
              
              {/* Close button in top right corner */}
              <button
                onClick={() => setShowAddEntryModal(false)}
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