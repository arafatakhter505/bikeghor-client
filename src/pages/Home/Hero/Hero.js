import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="bg-[url('https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover min-h-screen hero relative">
      <div className="container mx-auto px-6 lg:px-3 z-10">
        <div className="md:w-1/2">
          <h2 className="text-5xl font-semibold text-white">
            Find The Best Second Hand{" "}
            <span className="text-primary"> Motorbike</span>{" "}
          </h2>
          <p className="text-white mt-6 text-lg">
            The largest online marketplace for selling used bikes. Here you can
            buy and sell all categories of bikes.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
