import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useState } from "react";
import heroBg from "../assets/hero.jpg";

const Hero = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden w-full bg-gradient-to-br from-black via-gray-900 to-black">
      <img
        src={heroBg}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/70 to-black/95 pointer-events-none" />

      <div className="relative z-10 text-center max-w-[600px] sm:px-3 md:px-6 flex flex-col items-center w-full">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg !text-white">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="sm:text-sm md:text-xl font-normal mt-8 mb-8 opacity-90 drop-shadow-md text-white">
            Starts at $7.99. Cancel anytime.
          </p>

          <SignedIn>
            <button className="bg-red-600 hover:bg-red-700 border-0 rounded-md text-white px-8 py-4 text-lg font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-300 ease-out shadow-lg shadow-red-600/30 min-w-[200px] justify-center hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-600/50 focus-visible:outline-2 focus-visible:outline-white/80 focus-visible:outline-offset-2 active:translate-y-0 group">
              Restart Your Membership
            </button>
          </SignedIn>

          <SignedOut>
            <p className="text-lg mb-4 text-white">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-gray-100 text-black w-full sm:flex-1 text-white"
              />
              <SignInButton mode="modal">
                <button className="bg-red-600 hover:bg-red-700 border-0 rounded-md text-white px-6 py-3 text-lg font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-300 ease-out shadow-lg shadow-red-600/30 whitespace-nowrap hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-600/50 focus-visible:outline-2 focus-visible:outline-white/80 focus-visible:outline-offset-2 active:translate-y-0">
                  Get Started
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </section>
  );
};

export default Hero;
