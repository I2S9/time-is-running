import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
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

      {/* Centered Sign In Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'var(--font-playfull-daily)' }}>
                Welcome Back!
              </h1>
              <p className="text-gray-600">Sign in to continue your journey</p>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-black font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-0 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-black font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-0 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link href="#" className="text-sm text-black hover:text-gray-600 font-semibold">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 rounded-full font-bold py-3 px-6 transition-colors"
                style={{ fontFamily: 'var(--font-playfull-daily)' }}
              >
                SIGN IN
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="text-black hover:text-gray-600 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-300">
              <p className="text-center text-sm text-gray-500">
                Or continue with
              </p>
              <div className="mt-4 flex space-x-4">
                <button className="flex-1 border-2 border-gray-300 rounded-xl py-3 hover:border-black transition-colors flex items-center justify-center">
                  <span className="text-black font-semibold">Google</span>
                </button>
                <button className="flex-1 border-2 border-gray-300 rounded-xl py-3 hover:border-black transition-colors flex items-center justify-center">
                  <span className="text-black font-semibold">GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 