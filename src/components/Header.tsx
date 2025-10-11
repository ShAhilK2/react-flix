import { Link } from "@tanstack/react-router";
import heroBg from "../assets/hero.jpg";
import SearchBar from "./SearchBar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-[100]  py-5 ">
      <div className="container max-w-6xl mx-auto px-6 md:px-6 flex justify-between items-center ">
        <Link to="/" className="flex-shrink-0 !cursor-pointer">
          <h1 className="md:text-md lg:text-3xl  font-bold   !text-red-600 ">
            REACTFLIX
          </h1>
        </Link>

        <div className="flex items-center gap-4 z-40 text-white !cursor-pointer">
          <SearchBar />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
