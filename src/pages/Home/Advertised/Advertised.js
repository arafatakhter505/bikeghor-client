import React from "react";
import AvertisedCard from "./AvertisedCard";

const Advertised = () => {
  return (
    <div className="container mx-auto px-6 lg:px-3 my-20">
      <h2 className="text-primary text-3xl font-semibold">Advertised</h2>
      <div className="mt-6 grid md:grid-cols-2 grid-cols-1 gap-10">
        <AvertisedCard />
        <AvertisedCard />
        <AvertisedCard />
        <AvertisedCard />
      </div>
    </div>
  );
};

export default Advertised;
