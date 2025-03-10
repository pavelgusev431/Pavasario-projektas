import { Outlet } from "react-router";
import BannerCarousel from "./Home/Carousel";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import SortOptions from "./Home/SortOptions"; // Import the SortOptions component

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
        <div className="pl-2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
