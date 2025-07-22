import Image from 'next/image';
import CurrentTime from './components/CurrentTime';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#B2E4F6] relative overflow-hidden">
      {/* Animated Cloud decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left clouds */}
        <div className="absolute top-16 left-8 w-32 h-20 bg-white rounded-full opacity-90 animate-float"></div>
        <div className="absolute top-12 left-16 w-24 h-16 bg-white rounded-full opacity-90 animate-float-delay-1"></div>
        <div className="absolute top-20 left-24 w-28 h-18 bg-white rounded-full opacity-90 animate-float-delay-2"></div>
        
        {/* Top right clouds */}
        <div className="absolute top-24 right-16 w-28 h-18 bg-white rounded-full opacity-90 animate-float-delay-3"></div>
        <div className="absolute top-20 right-24 w-24 h-16 bg-white rounded-full opacity-90 animate-float"></div>
        <div className="absolute top-28 right-8 w-32 h-20 bg-white rounded-full opacity-90 animate-float-delay-1"></div>
        
        {/* Middle clouds */}
        <div className="absolute top-64 left-1/3 w-20 h-14 bg-white rounded-full opacity-90 animate-float-delay-2"></div>
        <div className="absolute top-60 left-1/3 w-16 h-12 bg-white rounded-full opacity-90 animate-float-delay-3"></div>
        
        {/* Bottom clouds */}
        <div className="absolute top-96 right-1/4 w-24 h-16 bg-white rounded-full opacity-90 animate-float"></div>
        <div className="absolute top-92 right-1/4 w-20 h-14 bg-white rounded-full opacity-90 animate-float-delay-1"></div>
      </div>

      {/* Header Navigation - Shorter with equidistant elements */}
      <header className="relative z-10 px-8 pt-4">
        <nav className="bg-white rounded-full mx-auto max-w-3xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
              <a href="#" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer" 
                 style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</a>
              <a href="#" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                 style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</a>
              <a href="#" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                 style={{ fontFamily: 'var(--font-playfull-daily)' }}>FUTURE</a>
              <a href="#" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                 style={{ fontFamily: 'var(--font-playfull-daily)' }}>ABOUT US</a>
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
      <main className="relative z-10 px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline - Bigger with stronger stroke */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black mb-12 md:mb-16 mt-8 md:mt-12" 
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '6px 6px 0px white, -6px -6px 0px white, 6px -6px 0px white, -6px 6px 0px white, 4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            time is Running
          </h1>

                    {/* Clock and Time Section - Clock on left, time centered */}
          <div className="relative mb-8 md:mb-10">
            <div className="absolute left-8 md:left-16 top-full transform -translate-y-1/2 -rotate-12 md:-rotate-6">
              <Image
                src="/images/clock.png"
                alt="Alarm Clock"
                width={200}
                height={200}
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
              />
            </div>
            <div className="flex justify-center">
              <CurrentTime />
            </div>
          </div>

          {/* Question - Two lines */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed"
             style={{ fontFamily: 'var(--font-playfull-daily)' }}>
            DO YOU KNOW HOW TO MANAGE<br />
            THE TIME YOU HAVE LEFT?
          </p>

          {/* Call to Action Button - Push effect with solid shadow */}
          <div className="relative inline-block">
            <button className="bg-[#F5F184] text-[#AFA20C] px-12 py-6 md:px-16 md:py-8 rounded-full text-xl md:text-2xl lg:text-3xl font-bold transform hover:scale-105 transition-all duration-150 relative z-10 push-button cursor-pointer"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}>
              GET STARTED
            </button>
            {/* Solid shadow effect */}
            <div className="absolute top-3 left-0 w-full h-full bg-[#AFA20C] rounded-full -z-10 transition-all duration-150 push-shadow"></div>
          </div>
        </div>
      </main>

      {/* Bottom Section */}
      <section className="relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black"
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            WHAT ARE YOU SUPPOSED TO EXPECT?
          </h2>
        </div>
      </section>

      {/* Large spacing before footer */}
      <div className="h-48 md:h-64 lg:h-96 bg-[#B2E4F6]"></div>

      {/* Footer */}
      <footer className="relative z-10 bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Time Is Running
              </h3>
              <p className="text-gray-300 text-lg">
                Master your time, master your life. Start your journey towards better time management today.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-gray-300 text-lg">
                <a href="#" className="hover:text-white transition-colors">Features</a>
                <a href="#" className="hover:text-white transition-colors">Pricing</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300 text-lg">
            <p>&copy; 2025 Time Is Running. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
