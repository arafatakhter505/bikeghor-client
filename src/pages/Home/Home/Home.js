import React from "react";
import Advertised from "../Advertised/Advertised";
import Categories from "../Categories/Categories";
import Hero from "../Hero/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <Advertised />
      <Categories />
    </div>
  );
};

export default Home;
