import React from "react";
import useHelmet from './../../Hooks/useHelmet';
import DiscountProductsCarousel from "../../Components/DiscountProductsCarousel/DiscountProductsCarousel";

const Home = () => {
  return (
    <div>
      {useHelmet("Home")}
      <DiscountProductsCarousel/>
    </div>
  );
};

export default Home;
