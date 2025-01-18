import React from "react";
import useHelmet from './../../Hooks/useHelmet';

const Home = () => {
  return (
    <div>
      {useHelmet("Home")}
      Home
    </div>
  );
};

export default Home;
