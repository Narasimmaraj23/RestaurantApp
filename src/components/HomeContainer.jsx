import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";
import { motion } from "framer-motion";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.25rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in
          <span className="text-orange-600 text-[3rem] lg:text-[4.75rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Savor convenience with our cutting-edge food delivery app! Seamlessly
          crafted with React and Firebase, enjoy swift, secure, and delightful
          dining experiences at your fingertips.
        </p>

        <motion.button
          whileTap={{ scale: 0.6 }}
          type="button"
          className="md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 w-full p-4 py-2 rounded-lg hover:shadow-lg  "
        >
          Order Now
        </motion.button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          className="h-420 w-full lg:w-auto lg:h-650 ml-auto"
          alt="hero-bg"
        />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center md:px-30 py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center shadow-lg mt-6 lg:mt-0"
              >
                <img
                  src={n.imageSrc}
                  alt={n.name}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                />
                <p className="text-[16px] lg:text-xl font-semibold text-textColor">
                  {n.name}
                </p>
                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {n.decp}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600 ">₹</span>
                  {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
