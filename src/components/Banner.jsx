import React from "react";
import bannerimg from "../assets/images/stockbanner.png";

const Banner = () => {
  return (
    <header>
      <img src={bannerimg} alt="Banner" className="animate-moveBanner" />
    </header>
  );
};

export default Banner;