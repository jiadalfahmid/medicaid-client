import React from "react";
import useHelmet from './../../Hooks/useHelmet';
import DiscountProductsCarousel from "../../Components/DiscountProductsCarousel/DiscountProductsCarousel";
import CategoryCards from "../../Components/CategoryCards/CategoryCards";
import Slider from "../../Components/Slider/Slider";

const Home = () => {
  return (
    <div>
      {useHelmet("Home")}
      <Slider/>
      <CategoryCards/>
      <DiscountProductsCarousel/>

    </div>
  );
};

export default Home;
