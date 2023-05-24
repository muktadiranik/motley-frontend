import React from "react";
import Categories from "./Categories";
import LatestProducts from "./LatestProducts";
import AllProducts from "./AllProducts";

const HomeScreen = () => {
  return (
    <div>
      <LatestProducts />
      <Categories />
      <AllProducts />
    </div>
  );
};

export default HomeScreen;
