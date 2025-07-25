'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import AuthButtons from '../components/AuthButtons';

export default function AboutPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/get-started');
  };

  return (
    <div className="min-h-screen bg-[#B2E4F6]">
      {/* Header Navigation */}
      <header className="relative z-10 px-8 pt-4">
        <SignedOut>
          <nav className="bg-white rounded-full mx-auto max-w-3xl p-6">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
                <Link href="/past" className="text-lg md:text-xl font-bold text-black py-2 cursor-pointer" 
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
                <Link href="/present" className="text-lg md:text-xl font-bold text-black py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</Link>
                <Link href="/future" className="text-lg md:text-xl font-bold text-black py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>FUTURE</Link>
                <Link href="/about" className="text-lg md:text-xl font-bold text-[#B2E4F6] py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>ABOUT US</Link>
                <AuthButtons />
              </div>
            </div>
          </nav>
        </SignedOut>
        <SignedIn>
          <nav className="bg-white rounded-full mx-auto max-w-lg p-6">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
                <Link href="/past" className="text-lg md:text-xl font-bold text-black py-2 cursor-pointer" 
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
                <Link href="/present" className="text-lg md:text-xl font-bold text-black py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</Link>
                <Link href="/future" className="text-lg md:text-xl font-bold text-black py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>FUTURE</Link>
                <Link href="/about" className="text-lg md:text-xl font-bold text-[#B2E4F6] py-2 cursor-pointer"
                   style={{ fontFamily: 'var(--font-playfull-daily)' }}>ABOUT US</Link>
                <AuthButtons />
              </div>
            </div>
          </nav>
        </SignedIn>
      </header>

      {/* Alarm Clock Icon - Top Left */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="block">
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
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
                style={{
                  fontFamily: 'var(--font-playfull-daily)',
                  textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white'
                }}>
              ABOUT US
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              We believe that time is the most precious resource we have. Our mission is to help you make the most of every moment.
            </p>
            <div className="flex justify-center">
              <Image
                src="/images/clock.png"
                alt="Time is Running Logo"
                width={120}
                height={120}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
              />
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-2xl p-8 md:p-12 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Our Mission
              </h2>
              <div className="w-24 h-1 bg-[#B2E4F6] mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Time is Running was born from a simple observation: we all have the same 24 hours in a day, but how we use them makes all the difference. 
                                     We wanted to create a tool that doesn&apos;t just track time, but helps you understand it, respect it, and make it work for you.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our platform combines the wisdom of time management with modern technology to give you insights into your daily patterns, 
                  help you set meaningful goals, and visualize your progress over time.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#B2E4F6] to-[#9DD4E6] rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-white mb-2">24</div>
                <div className="text-white text-lg">Hours in a day</div>
                <div className="text-white text-sm mt-2">Make every one count</div>
              </div>
            </div>
          </div>



          {/* Stats Section */}
          <div className="bg-white rounded-2xl p-8 md:p-12 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Time is Precious
              </h2>
              <div className="w-24 h-1 bg-[#B2E4F6] mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#B2E4F6] mb-2">525,600</div>
                <div className="text-gray-600">Minutes in a year</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#B2E4F6] mb-2">8,760</div>
                <div className="text-gray-600">Hours in a year</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#B2E4F6] mb-2">365</div>
                <div className="text-gray-600">Days to make a difference</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#B2E4F6] mb-2">1</div>
                <div className="text-gray-600">Life to live fully</div>
              </div>
            </div>
          </div>



          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#B2E4F6] to-[#9DD4E6] rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Ready to Take Control of Your Time?
              </h2>
              <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already making the most of every moment. 
                Start your journey towards better time management today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-black text-white rounded-full text-lg font-bold"
                >
                  Get Started
                </button>
                <Link href="/">
                  <button className="px-8 py-4 bg-white text-[#B2E4F6] rounded-full text-lg font-bold">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 