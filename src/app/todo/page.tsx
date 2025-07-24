'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import AuthButtons from '../components/AuthButtons';
import { useState } from 'react';

interface Task {
  id: number;
  text: string;
  estimatedTime: number; // in minutes
  completed: boolean;
}

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [maxSessionTime, setMaxSessionTime] = useState(120);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setIsLoading(true);
      
      // Simulate loading time
      setTimeout(() => {
        const task: Task = {
          id: Date.now(),
          text: newTask.trim(),
          estimatedTime: estimatedTime,
          completed: false
        };
        setTasks([...tasks, task]);
        setNewTask('');
        setEstimatedTime(30);
        setShowAddForm(false);
        setIsLoading(false);
      }, 1000); // 1 second loading time
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const totalEstimatedTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 text-center"
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            TO-DO LIST
          </h1>



          {/* Add Task Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-black mb-4"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                ADD NEW TASK
              </h2>
            </div>

            {!showAddForm ? (
              <div className="text-center">
                <button 
                  onClick={() => setShowAddForm(true)}
                  className={`px-8 py-4 rounded-full text-lg font-bold transform transition-all duration-150 ${
                    isLoading 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed scale-95' 
                      : 'bg-[#B2E4F6] text-black hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95'
                  }`}
                  disabled={isLoading}
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}
                >
                  {isLoading ? '+ ADD TASK...' : '+ ADD TASK'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-bold text-black mb-2"
                         style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                    TASK DESCRIPTION
                  </label>
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter your task..."
                    className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-[#B2E4F6] focus:outline-none"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-black mb-2"
                         style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                    ESTIMATED TIME (minutes)
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <button 
                      onClick={() => setEstimatedTime(prev => Math.max(5, prev - 5))}
                      className="bg-[#B2E4F6] text-black w-10 h-10 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 transition-all duration-150"
                      style={{ fontFamily: 'var(--font-playfull-daily)' }}
                    >
                      -
                    </button>
                    <div className="text-2xl font-bold text-black px-4"
                         style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                      {estimatedTime}
                    </div>
                    <button 
                      onClick={() => setEstimatedTime(prev => Math.min(240, prev + 5))}
                      className="bg-[#B2E4F6] text-black w-10 h-10 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 transition-all duration-150"
                      style={{ fontFamily: 'var(--font-playfull-daily)' }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className={`flex-1 px-6 py-3 rounded-full text-lg font-bold transform transition-all duration-150 ${
                      isLoading 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed scale-95' 
                        : 'bg-gray-300 text-black hover:scale-105 hover:bg-gray-400'
                    }`}
                    disabled={isLoading}
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}
                  >
                    {isLoading ? 'CANCEL...' : 'CANCEL'}
                  </button>
                  <button 
                    onClick={addTask}
                    className={`flex-1 px-6 py-3 rounded-full text-lg font-bold transform transition-all duration-150 ${
                      isLoading 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed scale-95' 
                        : 'bg-[#B2E4F6] text-black hover:scale-105 hover:bg-[#1e3a8a] hover:text-white'
                    }`}
                    disabled={isLoading}
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}
                  >
                    {isLoading ? 'ADD TASK...' : 'ADD TASK'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tasks List */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-black mb-4"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                YOUR TASKS
              </h2>
              <div className="text-gray-600 mb-2">
                {completedTasks} of {tasks.length} completed
              </div>
              <div className="text-lg font-bold text-black"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Total time: {totalEstimatedTime} minutes
              </div>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-lg mb-2">No tasks yet!</div>
                <div>Add your first task to get started.</div>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                    task.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          task.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-400 hover:border-[#B2E4F6]'
                        }`}
                      >
                        {task.completed && '×'}
                      </button>
                      <div className="flex-1">
                        <div className={`text-lg font-bold ${
                          task.completed ? 'line-through text-gray-500' : 'text-black'
                        }`}
                             style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                          {task.text}
                        </div>
                        <div className="text-sm text-gray-500">
                          Estimated: {task.estimatedTime} minutes
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-2 font-bold text-3xl w-8 h-8 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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