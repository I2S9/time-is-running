import Image from 'next/image';
import Link from 'next/link';
import CurrentTime from './components/CurrentTime';
import AuthButtons from './components/AuthButtons';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#B2E4F6] relative overflow-hidden">
      {/* Animated Cloud decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating clouds from right to left */}
        <Image
          src="/images/cloud.png"
          alt="Cloud"
          width={200}
          height={120}
          className="absolute top-8 w-32 h-20 opacity-80 animate-float-right-to-left-slow"
        />
        <Image
          src="/images/white clouds.png"
          alt="White Cloud"
          width={300}
          height={180}
          className="absolute top-48 w-64 h-40 opacity-90 animate-float-right-to-left-slow"
          style={{ animationDelay: '12s' }}
        />
        <Image
          src="/images/cloud.png"
          alt="Cloud"
          width={200}
          height={120}
          className="absolute top-88 w-28 h-16 opacity-75 animate-float-right-to-left-slow"
          style={{ animationDelay: '25s' }}
        />
        <Image
          src="/images/white clouds.png"
          alt="White Cloud"
          width={300}
          height={180}
          className="absolute top-128 w-56 h-36 opacity-85 animate-float-right-to-left-slow"
          style={{ animationDelay: '38s' }}
        />
        <Image
          src="/images/cloud.png"
          alt="Cloud"
          width={200}
          height={120}
          className="absolute top-168 w-20 h-12 opacity-70 animate-float-right-to-left-slow"
          style={{ animationDelay: '50s' }}
        />
        <Image
          src="/images/white clouds.png"
          alt="White Cloud"
          width={300}
          height={180}
          className="absolute top-208 w-72 h-48 opacity-90 animate-float-right-to-left-slow"
          style={{ animationDelay: '62s' }}
        />
      </div>

      {/* Header Navigation - Shorter with equidistant elements */}
      <header className="relative z-10 px-8 pt-4">
        <nav className="bg-white rounded-full mx-auto max-w-3xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-wrap justify-center md:justify-center w-full gap-8 mb-4 md:mb-0">
              <Link href="/past" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer" 
                 style={{ fontFamily: 'var(--font-playfull-daily)' }}>PAST</Link>
              <Link href="/present" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                 style={{ fontFamily: 'var(--font-playfull-daily)' }}>PRESENT</Link>
              <Link href="/future" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                 style={{ fontFamily: 'var(--font-playfull-daily)' }}>FUTURE</Link>
              <Link href="/about" className="text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors py-2 cursor-pointer"
                 style={{ fontFamily: 'var(--font-playfull-daily)' }}>ABOUT US</Link>
              <AuthButtons />
            </div>
          </div>
        </nav>
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
            <div className="absolute left-4 md:left-8 lg:left-16 top-[120%] md:top-[140%] lg:top-[160%] transform -translate-y-1/2 animate-clock-bounce md:animate-clock-bounce-md">
              <Image
                src="/images/clock.png"
                alt="Alarm Clock"
                width={200}
                height={200}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56"
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
      <section className="relative z-10 px-4 py-20 md:py-32 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-32 md:mb-40"
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            WHAT ARE YOU SUPPOSED TO EXPECT?
          </h2>
          
          {/* Timeline Section */}
          <div className="relative">
            {/* Blue Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 md:w-3 h-full bg-[#257CAB] rounded-full"></div>
            
            {/* Timeline Content */}
            <div className="relative z-10">
                            {/* Past Section */}
              <div className="flex flex-col md:flex-row items-center mb-16 md:mb-20">
                <div className="w-full md:w-1/2 md:pr-8 text-right">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4"
                      style={{
                        fontFamily: 'var(--font-playfull-daily)',
                        textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
                      }}>
                    KEEP TRACK OF YOUR PAST
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed"
                     style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                     Look back on completed tasks, tracked moods, and daily reflections to better understand your personal growth and how you&apos;ve spent your time.
                  </p>
                </div>
                <div className="w-4 h-4 md:w-6 md:h-6 bg-[#257CAB] rounded-full border-4 border-white shadow-lg my-4 md:my-0"></div>
                <div className="w-full md:w-1/2 md:pl-8 text-left">
                  {/* Past moment image */}
                  <div className="flex justify-center">
                    <Image
                      src="/images/past-moment.png"
                      alt="Past Moment"
                      width={200}
                      height={200}
                      className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64"
                      style={{ height: 'auto' }}
                    />
                  </div>
                </div>
              </div>

              {/* Present Section */}
              <div className="flex flex-col md:flex-row items-center mb-16 md:mb-20">
                <div className="w-full md:w-1/2 md:pr-8 text-right">
                  {/* Present moment image */}
                  <div className="flex justify-center">
                    <Image
                      src="/images/present-moment.png"
                      alt="Present Moment"
                      width={200}
                      height={200}
                      className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64"
                      style={{ height: 'auto' }}
                    />
                  </div>
                </div>
                <div className="w-4 h-4 md:w-6 md:h-6 bg-[#257CAB] rounded-full border-4 border-white shadow-lg my-4 md:my-0"></div>
                <div className="w-full md:w-1/2 md:pl-8 text-left">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4"
                      style={{
                        fontFamily: 'var(--font-playfull-daily)',
                        textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
                      }}>
                    EXPLORE THE PRESENT MOMENT
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed"
                     style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                    Stay focused with smart to-dos, a Pomodoro timer, and instant stats that help you manage your time and energy right now.
                  </p>
                </div>
              </div>

              {/* Future Section */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 md:pr-8 text-right">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4"
                      style={{
                        fontFamily: 'var(--font-playfull-daily)',
                        textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
                      }}>
                    SHAPE YOUR FUTURE
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed"
                     style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                    Set goals, plan your days, and visualize your time ahead to turn daily actions into long-term progress.
                  </p>
                </div>
                <div className="w-4 h-4 md:w-6 md:h-6 bg-[#257CAB] rounded-full border-4 border-white shadow-lg my-4 md:my-0"></div>
                <div className="w-full md:w-1/2 md:pl-8 text-left">
                  {/* Future moment image */}
                  <div className="flex justify-center">
                    <Image
                      src="/images/future-moment.png"
                      alt="Future Moment"
                      width={200}
                      height={200}
                      className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64"
                      style={{ height: 'auto' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before it's over section */}
      <section className="relative z-10 px-4 py-16 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black"
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            BEFORE IT&apos;S OVER...
          </h2>
        </div>
      </section>

      {/* Large spacing before footer */}
      <div className="h-32 md:h-48 lg:h-64 bg-[#B2E4F6]"></div>

      {/* Rip image positioned on blue zone */}
      <div className="relative">
        <div className="absolute -top-58 md:-top-66 lg:-top-74 left-1/2 transform -translate-x-1/2 z-0">
          <Image
            src="/images/rip.png"
            alt="Rip"
            width={300}
            height={200}
            className="w-48 md:w-64 lg:w-80"
            style={{ height: 'auto' }}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black text-white py-8">
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
