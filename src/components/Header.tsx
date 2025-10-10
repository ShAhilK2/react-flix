import { Link } from "@tanstack/react-router";
import heroBg from "../assets/hero.jpg";
import SearchBar from "./SearchBar";
const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-[100]  py-5 ">
      <div className="container max-w-6xl mx-auto px-6 md:px-6 flex justify-between items-center ">
        <Link to="/" className="flex-shrink-0 !cursor-pointer">
          <h1 className="md:text-md lg:text-3xl  font-bold   !text-red-600 ">
            REACTFLIX
          </h1>
        </Link>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
