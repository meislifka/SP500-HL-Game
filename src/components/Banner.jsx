import React from "react";
import bannerimg from "../assets/images/stockbanner.png";

const Banner = () => {
  return (
    <header className=" text-center font-arial border-solid mb-2">
      <img src={bannerimg} alt="Banner" className="animate-moveBanner" />
    </header>
  );
};

export default Banner;