import Image from 'next/image';
import Link from 'next/link';

export default function QuizPage() {
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

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black mb-8 md:mb-12" 
              style={{
                fontFamily: 'var(--font-playfull-daily)',
                textShadow: '6px 6px 0px white, -6px -6px 0px white, 6px -6px 0px white, -6px 6px 0px white, 4px 4px 0px white, -4px -4px 0px white, 4px -4px 0px white, -4px 4px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
              }}>
            Time Quiz
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
             style={{ fontFamily: 'var(--font-playfull-daily)' }}>
            Discover how much time you&apos;re really wasting
          </p>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
              Quiz Coming Soon!
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              This quiz will help you understand your current time management habits 
              and identify areas where you can improve.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-xl p-4">
                <h3 className="font-bold text-black mb-2">What you&apos;ll discover:</h3>
                <ul className="text-gray-700 text-left space-y-2">
                  <li>• How much time you spend on distractions</li>
                  <li>• Your most productive hours</li>
                  <li>• Time-wasting habits to break</li>
                  <li>• Personalized improvement tips</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Back to Get Started
              </Link>
              <Link href="/present" className="inline-block bg-[#F5F184] text-[#AFA20C] px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-150"
                    style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Go to Present
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 