import React, { useEffect } from "react";

import { getAuth } from "firebase/auth";

const HomePage = () => {
  const auth = getAuth();
  useEffect(() => {
    if (auth.currentUser) {
      console.log(auth.currentUser.email);
    } else {
      console.log("No user is currently signed in.");
    }
  }, [auth]);
  return <div>HomePage</div>;
};

export default HomePage;
