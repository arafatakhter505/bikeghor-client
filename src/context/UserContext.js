import React from "react";
import app from "./../firebase/firebase.init";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
const UserContext = () => {
  return (
    <div>
      <h2></h2>
    </div>
  );
};

export default UserContext;
