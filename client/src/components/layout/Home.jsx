import React from "react";
import BannerCarousel from "./Home/Carousel";
import NavBar from "./NavBar";
import HighestRatedProducts from "../products/HighestRatedProducts";
import HotProducts from "../products/HotProducts";
import TrendingUserProducts from "../products/TrendingUserProducts";
import TopUserProducts from "../products/TopUserProducts";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import SortOptions from "./SortOptions"; // Import the SortOptions component

const Home = () => {
  const handleSearch = (query, category) => {
    console.log("Search query:", query, "Category:", category);
    // Implement search functionality here
  };

  const handleSort = (criteria, order) => {
    console.log("Sort criteria:", criteria, "Order:", order);
    // Implement sort functionality here
  };

  return (
    <>
      <NavBar />
      <div>
        <BannerCarousel />
        <SearchBar onSearch={handleSearch} />{" "}
        {/* Add SearchBar under the carousel */}
        <SortOptions onSort={handleSort} /> {/* Add SortOptions component */}
        <HighestRatedProducts />
        <HotProducts />
        <TrendingUserProducts />
        <TopUserProducts />
      </div>
    </>
  );
};

export default Home;
