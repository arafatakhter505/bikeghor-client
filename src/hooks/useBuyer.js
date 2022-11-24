import React, { useState } from "react";
import { useEffect } from "react";

const useBuyer = (role) => {
  const [isBuyer, setIsBuyer] = useState(false);
  useEffect(() => {
    if (role === "Buyer") {
      setIsBuyer(true);
    }
  }, [role]);
  return isBuyer;
};

export default useBuyer;
