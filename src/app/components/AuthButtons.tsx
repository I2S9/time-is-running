import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function AuthButtons() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <button className="bg-black text-white px-6 py-2 rounded-full text-base md:text-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
            LOG IN
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-black text-white px-6 py-2 rounded-full text-base md:text-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                  style={{ fontFamily: 'var(--font-playfull-daily)' }}>
            SIGN UP
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 md:w-12 md:h-12",
              userButtonPopoverCard: "shadow-lg",
              userButtonPopoverActionButton: "hover:bg-gray-100",
            }
          }}
        />
      </SignedIn>
    </>
  );
} 