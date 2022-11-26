import React from "react";
import AvertisedCard from "./AvertisedCard";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Spinner from "../../shared/Spinner/Spinner";

const Advertised = () => {
  const { data: advertise, isLoading } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5000/advertise`);
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (advertise.length > 0) {
    return (
      <div className="container mx-auto px-6 lg:px-3 my-20">
        <h2 className="text-primary text-3xl font-semibold">Advertised</h2>
        <div className="mt-6 grid md:grid-cols-2 grid-cols-1 gap-10">
          {advertise.map((advertised) => (
            <AvertisedCard key={advertised._id} advertised={advertised} />
          ))}
        </div>
      </div>
    );
  }
};

export default Advertised;
