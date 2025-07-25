'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import AuthButtons from '../components/AuthButtons';
import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  frequency: string;
  timePerSession: number;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  category: 'short' | 'medium' | 'long';
  tasks: Task[];
  color: string;
  progress: number;
}

export default function FuturePage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [modalStep, setModalStep] = useState<'goal' | 'tasks'>('goal');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: '',
    category: 'medium' as 'short' | 'medium' | 'long',
    tasks: [] as Task[]
  });
  const [newTask, setNewTask] = useState({
    title: '',
    frequency: 'daily',
    timePerSession: 0
  });
  const [tempTasks, setTempTasks] = useState<Task[]>([]);

  const goalColors = [
    'bg-yellow-200 border-yellow-400',
    'bg-blue-200 border-blue-400',
    'bg-green-200 border-green-400',
    'bg-purple-200 border-purple-400',
    'bg-pink-200 border-pink-400',
    'bg-orange-200 border-orange-400',
    'bg-red-200 border-red-400',
    'bg-indigo-200 border-indigo-400',
    'bg-teal-200 border-teal-400',
    'bg-cyan-200 border-cyan-400',
    'bg-lime-200 border-lime-400',
    'bg-emerald-200 border-emerald-400',
    'bg-rose-200 border-rose-400',
    'bg-violet-200 border-violet-400',
    'bg-fuchsia-200 border-fuchsia-400',
    'bg-sky-200 border-sky-400',
    'bg-amber-200 border-amber-400',
    'bg-stone-200 border-stone-400'
  ];

  const getGoalColorClass = (color: string) => {
    if (color.includes('yellow')) return 'bg-yellow-300';
    if (color.includes('blue')) return 'bg-blue-300';
    if (color.includes('green')) return 'bg-green-300';
    if (color.includes('purple')) return 'bg-purple-300';
    if (color.includes('pink')) return 'bg-pink-300';
    if (color.includes('orange')) return 'bg-orange-300';
    if (color.includes('red')) return 'bg-red-300';
    if (color.includes('indigo')) return 'bg-indigo-300';
    if (color.includes('teal')) return 'bg-teal-300';
    if (color.includes('cyan')) return 'bg-cyan-300';
    if (color.includes('lime')) return 'bg-lime-300';
    if (color.includes('emerald')) return 'bg-emerald-300';
    if (color.includes('rose')) return 'bg-rose-300';
    if (color.includes('violet')) return 'bg-violet-300';
    if (color.includes('fuchsia')) return 'bg-fuchsia-300';
    if (color.includes('sky')) return 'bg-sky-300';
    if (color.includes('amber')) return 'bg-amber-300';
    if (color.includes('stone')) return 'bg-stone-300';
    return 'bg-gray-300';
  };

  const getCategoryColorClass = (color: string) => {
    if (color.includes('yellow')) return 'bg-yellow-600 text-white';
    if (color.includes('blue')) return 'bg-blue-600 text-white';
    if (color.includes('green')) return 'bg-green-600 text-white';
    if (color.includes('purple')) return 'bg-purple-600 text-white';
    if (color.includes('pink')) return 'bg-pink-600 text-white';
    if (color.includes('orange')) return 'bg-orange-600 text-white';
    if (color.includes('red')) return 'bg-red-600 text-white';
    if (color.includes('indigo')) return 'bg-indigo-600 text-white';
    if (color.includes('teal')) return 'bg-teal-600 text-white';
    if (color.includes('cyan')) return 'bg-cyan-600 text-white';
    if (color.includes('lime')) return 'bg-lime-600 text-white';
    if (color.includes('emerald')) return 'bg-emerald-600 text-white';
    if (color.includes('rose')) return 'bg-rose-600 text-white';
    if (color.includes('violet')) return 'bg-violet-600 text-white';
    if (color.includes('fuchsia')) return 'bg-fuchsia-600 text-white';
    if (color.includes('sky')) return 'bg-sky-600 text-white';
    if (color.includes('amber')) return 'bg-amber-600 text-white';
    if (color.includes('stone')) return 'bg-stone-600 text-white';
    return 'bg-gray-600 text-white';
  };

  const addTask = () => {
    if (newTask.title && newTask.timePerSession > 0) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        frequency: newTask.frequency,
        timePerSession: newTask.timePerSession,
        completed: false
      };
      setTempTasks([...tempTasks, task]);
      setNewTask({ title: '', frequency: 'daily', timePerSession: 0 });
    }
  };

  const removeTask = (taskId: string) => {
    setTempTasks(tempTasks.filter(task => task.id !== taskId));
  };



  const nextToTasks = () => {
    if (newGoal.title && newGoal.description && newGoal.deadline) {
      setModalStep('tasks');
    }
  };

  const createGoal = () => {
    if (tempTasks.length === 0) {
      return; // Prevent creation if no tasks are defined
    }
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      deadline: newGoal.deadline,
      category: newGoal.category,
      tasks: tempTasks,
      color: goalColors[Math.floor(Math.random() * goalColors.length)],
      progress: 0
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', deadline: '', category: 'medium', tasks: [] });
    setTempTasks([]);
    setModalStep('goal');
    setShowAddGoalModal(false);
  };

  const toggleTask = (goalId: string, taskId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        const completedTasks = updatedTasks.filter(task => task.completed).length;
        const progress = updatedTasks.length > 0 ? (completedTasks / updatedTasks.length) * 100 : 0;
        return { ...goal, tasks: updatedTasks, progress };
      }
      return goal;
    }));
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCurrentMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay() + 1); // Start from Monday
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const getDailyTasksForDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    // Only show tasks for today and future dates
    if (targetDate < today) return [];
    
    const dailyTasks: { goal: Goal; task: Task }[] = [];
    
    goals.forEach(goal => {
      const goalDeadline = new Date(goal.deadline);
      goalDeadline.setHours(0, 0, 0, 0);
      
      // Only show tasks if the date is before or on the goal deadline
      if (targetDate <= goalDeadline) {
        goal.tasks.forEach(task => {
          if (task.frequency === 'daily') {
            dailyTasks.push({ goal, task });
          } else if (task.frequency === 'weekly') {
            // For weekly tasks, show them on the same day of the week
            const goalStartDate = new Date(goal.deadline);
            goalStartDate.setDate(goalStartDate.getDate() - 30); // Assume goal started 30 days before deadline
            const daysDiff = Math.floor((targetDate.getTime() - goalStartDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff >= 0 && daysDiff % 7 === 0) {
              dailyTasks.push({ goal, task });
            }
          } else if (task.frequency === 'monthly') {
            // For monthly tasks, show them on the same day of the month
            const goalStartDate = new Date(goal.deadline);
            goalStartDate.setDate(goalStartDate.getDate() - 30);
            const daysDiff = Math.floor((targetDate.getTime() - goalStartDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff >= 0 && daysDiff % 30 === 0) {
              dailyTasks.push({ goal, task });
            }
          }
        });
      }
    });
    
    return dailyTasks;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#B2E4F6]">
      {/* Header Navigation */}
      <header className="relative z-10 px-8 pt-4">
        <SignedOut>
          <nav className="bg-white rounded-full mx-auto max-w-3xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
                <Link href="/past" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer" 
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
                <Link href="/present" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</Link>
                <Link href="/future" className="text-lg md:text-xl font-bold text-[#B2E4F6] hover:text-gray-600 transition-colors py-2 cursor-pointer"
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
                <Link href="/present" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</Link>
                <Link href="/future" className="text-lg md:text-xl font-bold text-[#B2E4F6] hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>FUTURE</Link>
                <Link href="/about" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>ABOUT US</Link>
                <AuthButtons />
              </div>
            </div>
          </nav>
        </SignedIn>
      </header>

      {/* Alarm Clock Icon - Top Left */}
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
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
                style={{
                  fontFamily: 'var(--font-playfull-daily)',
                  textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white'
                }}>
              FUTURE
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Plan your goals, visualize your time scenarios and transform your dreams into reality
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mb-12">
            <button
              onClick={() => setShowAddGoalModal(true)}
              className="px-8 py-4 bg-black text-white rounded-full text-lg font-bold hover:scale-105 transition-all duration-150"
              style={{ fontFamily: 'var(--font-playfull-daily)' }}
            >
              Add Goal
            </button>
          </div>

          {/* Goals Board - Post-its Style */}
          {goals.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-8 text-center" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Goals Board
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`${goal.color} border-2 rounded-lg p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-200`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                        {goal.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColorClass(goal.color)}`}>
                        {goal.category === 'short' ? 'Short' : goal.category === 'medium' ? 'Medium' : 'Long'}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{goal.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(goal.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Deadline Warning */}
                    <div className="mb-4">
                      <span className="text-sm text-gray-600">
                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                      {getDaysUntilDeadline(goal.deadline) <= 7 && getDaysUntilDeadline(goal.deadline) > 0 && (
                        <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                          You have {getDaysUntilDeadline(goal.deadline)} days left!
                        </div>
                      )}
                    </div>

                    {/* Tasks */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Tasks:</h4>
                      {goal.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(goal.id, task.id)}
                            className="w-4 h-4 text-black rounded focus:ring-black"
                          />
                          <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                            {task.title} ({task.frequency}, {task.timePerSession}h)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monthly Planner Preview */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Previous
              </button>
              <h2 className="text-3xl font-bold text-black text-center" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                {getMonthName(currentMonth)}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Next →
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
              {getCurrentMonthDays(currentMonth).map((date, i) => {
                const dailyTasks = getDailyTasksForDate(date);
                const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div key={i} className="h-20 border border-gray-200 rounded p-2 text-xs relative">
                    <div className={`font-semibold ${isCurrentMonth ? 'text-gray-600' : 'text-gray-400'} ${isToday ? 'bg-blue-100 rounded px-1' : ''}`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1 mt-1">
                      {dailyTasks.map(({ goal, task }, index) => (
                        <div
                          key={`${goal.id}-${task.id}`}
                          className={`h-2 rounded ${getGoalColorClass(goal.color)}`}
                          style={{ opacity: 0.8 }}
                          title={`${goal.title}: ${task.title} (${task.timePerSession}h ${task.frequency})`}
                        ></div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Add Goal Modal - Step 1 */}
      {showAddGoalModal && modalStep === 'goal' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                New Goal
              </h3>
              <p className="text-sm text-gray-600">Step 1: Define your goal</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="Ex: Learn piano"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Describe your goal..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as 'short' | 'medium' | 'long' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="short">Short term (1-3 months)</option>
                  <option value="medium">Medium term (3-12 months)</option>
                  <option value="long">Long term (1+ year)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddGoalModal(false);
                    setModalStep('goal');
                    setNewGoal({ title: '', description: '', deadline: '', category: 'medium', tasks: [] });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={nextToTasks}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Tasks Modal - Step 2 */}
      {showAddGoalModal && modalStep === 'tasks' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Define Tasks
              </h3>
              <p className="text-sm text-gray-600">Step 2: Add tasks to achieve your goal</p>
            </div>

            <div className="space-y-4">
              {/* Goal Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{newGoal.title}</h4>
                <p className="text-sm text-gray-600">{newGoal.description}</p>
                <p className="text-xs text-gray-500 mt-2">Deadline: {new Date(newGoal.deadline).toLocaleDateString()}</p>
              </div>

              {/* Add Task Form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Task Name</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Ex: Practice scales"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={newTask.timePerSession}
                      onChange={(e) => setNewTask({ ...newTask, timePerSession: parseFloat(e.target.value) || 0 })}
                      placeholder="1.5"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                    <select
                      value={newTask.frequency}
                      onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={addTask}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Add Task
                </button>
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Added Tasks:</h4>
                {tempTasks.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No tasks added yet. Add at least one task to create your goal.
                  </div>
                ) : (
                  tempTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-gray-600">{task.timePerSession}h - {task.frequency}</p>
                      </div>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setModalStep('goal')}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={createGoal}
                  disabled={tempTasks.length === 0}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    tempTasks.length === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 