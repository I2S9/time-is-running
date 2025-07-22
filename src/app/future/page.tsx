import Image from 'next/image';
import Link from 'next/link';

export default function FuturePage() {
  return (
    <div className="min-h-screen bg-[#B2E4F6]">
      {/* Header Navigation - Shorter with equidistant elements */}
      <header className="relative z-10 px-8 pt-4">
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
              <button className="bg-black text-white px-6 py-2 rounded-full text-base md:text-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                      style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                LOG IN
              </button>
              <button className="bg-black text-white px-6 py-2 rounded-full text-base md:text-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                      style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                SIGN UP
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black"
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            FUTURE
          </h1>
        </div>
      </main>
    </div>
  );
} 