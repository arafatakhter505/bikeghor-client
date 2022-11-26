import React from "react";

const Overview = () => {
  return (
    <div className="container mx-auto px-6 lg:px-3 my-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      <div className="text-center shadow-lg px-4 py-12 border rounded-lg">
        <h3 className="text-4xl text-primary font-semibold">500+</h3>
        <p>Products Sell</p>
      </div>
      <div className="text-center shadow-lg px-4 py-12 border rounded-lg">
        <h3 className="text-4xl text-primary font-semibold">490+</h3>
        <p>Happy Customers</p>
      </div>
      <div className="text-center shadow-lg px-4 py-12 border rounded-lg">
        <h3 className="text-4xl text-primary font-semibold">100+</h3>
        <p>Active Users</p>
      </div>
    </div>
  );
};

export default Overview;
