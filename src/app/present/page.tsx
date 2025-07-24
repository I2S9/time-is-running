import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import AuthButtons from '../components/AuthButtons';

export default function PresentPage() {
  return (
    <div className="min-h-screen bg-[#B2E4F6]">
      {/* Header Navigation - Shorter with equidistant elements */}
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
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12"
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            PRESENT
          </h1>

          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* To-Do List Card */}
            <div className="bg-white rounded-2xl p-12 shadow-lg hover:shadow-xl transition-shadow min-h-[500px] flex flex-col">
              <div className="text-center mb-8 flex-grow">
                <Image
                  src="/images/clock-character.png"
                  alt="Clock Character"
                  width={150}
                  height={150}
                  className="w-32 h-32 mx-auto mb-6"
                />
                <h3 className="text-3xl font-bold text-black mb-4"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                  TO-DO LIST
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Organize your tasks and stay focused on what matters most right now.
                </p>
              </div>
              <div className="relative inline-block w-full">
                <Link href="/todo">
                  <button className="bg-[#B2E4F6] text-black px-8 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 active:bg-gray-400 active:text-gray-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none transition-all duration-150 relative z-10 push-button-blue cursor-pointer w-full"
                          style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                    GET STARTED
                  </button>
                </Link>
                <div className="absolute top-2 left-0 w-full h-full bg-[#8BC5D6] rounded-full -z-10 transition-all duration-150 push-shadow"></div>
              </div>
            </div>

            {/* Pomodoro Timer Card */}
            <div className="bg-white rounded-2xl p-12 shadow-lg hover:shadow-xl transition-shadow min-h-[500px] flex flex-col">
              <div className="text-center mb-8 flex-grow">
                <Image
                  src="/images/clock-pomodoro.png"
                  alt="Clock Pomodoro"
                  width={150}
                  height={150}
                  className="w-32 h-32 mx-auto mb-6"
                />
                <h3 className="text-3xl font-bold text-black mb-4"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                  POMODORO TIMER
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Boost your productivity with focused work sessions and strategic breaks.
                </p>
              </div>
              <div className="relative inline-block w-full">
                <Link href="/pomodoro">
                  <button className="bg-[#B2E4F6] text-black px-8 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 active:bg-gray-400 active:text-gray-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none transition-all duration-150 relative z-10 push-button-blue cursor-pointer w-full"
                          style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                    START TIMER
                  </button>
                </Link>
                <div className="absolute top-2 left-0 w-full h-full bg-[#8BC5D6] rounded-full -z-10 transition-all duration-150 push-shadow"></div>
              </div>
            </div>

            {/* Time Analysis Card */}
            <div className="bg-white rounded-2xl p-12 shadow-lg hover:shadow-xl transition-shadow min-h-[500px] flex flex-col">
              <div className="text-center mb-8 flex-grow">
                <Image
                  src="/images/clock-stats.png"
                  alt="Clock Stats"
                  width={150}
                  height={150}
                  className="w-32 h-32 mx-auto mb-6"
                />
                <h3 className="text-3xl font-bold text-black mb-4"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                  TIME ANALYSIS
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Track and analyze how you spend your time to make better decisions.
                </p>
              </div>
              <div className="relative inline-block w-full">
                <button className="bg-[#B2E4F6] text-black px-8 py-4 rounded-full text-lg font-bold transform hover:scale-105 hover:bg-[#1e3a8a] hover:text-white active:scale-95 active:bg-gray-400 active:text-gray-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none transition-all duration-150 relative z-10 push-button-blue cursor-pointer w-full"
                        style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                  VIEW STATS
                </button>
                <div className="absolute top-2 left-0 w-full h-full bg-[#8BC5D6] rounded-full -z-10 transition-all duration-150 push-shadow"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 