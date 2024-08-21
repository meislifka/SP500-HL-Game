import React from "react";
import bannerimg from "../assets/images/stockbanner.png";

const Header = () => {
  return (
    <header className="grid grid-rows-2 text-center font-arial border-solid mb-2">
      <img src={bannerimg} alt="Banner" className="w-full animate-moveBanner" />
    </header>
  );
};

export default Header;
