import React from "react";
import Advertised from "../Advertised/Advertised";
import Categories from "../Categories/Categories";
import Hero from "../Hero/Hero";
import Overview from "../Overview/Overview";

const Home = () => {
  return (
    <div>
      <Hero />
      <Advertised />
      <Categories />
      <Overview />
    </div>
  );
};

export default Home;
