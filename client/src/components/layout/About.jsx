import React, { useEffect, useState } from "react";

const users = [
  {
    name: "Pavel",
    surname: "Gusev",
    role: "Git-hub Manager",
    github: "https://github.com/Pavel-techin",
    avatar: "https://avatars.githubusercontent.com/Pavel-techin",
  },
  {
    name: "Darius",
    surname: "Alksnis",
    role: "Team Leader",
    github: "https://github.com/Darius911",
    avatar: "https://avatars.githubusercontent.com/Darius911",
  },
  {
    name: "Jarovslav",
    surname: "Paškel",
    role: "Scrum Master",
    github: "https://github.com/Jaronimo1337",
    avatar: "https://avatars.githubusercontent.com/Jaronimo1337",
  },
  {
    name: "Karolis",
    surname: "Rožan",
    role: "Full-stack Developer",
    github: "https://github.com/KarolisRZN",
    avatar: "https://avatars.githubusercontent.com/KarolisRZN",
  },
  {
    name: "Tomaš",
    surname: "Mučunas",
    role: "Full-stack Developer",
    github: "https://github.com/TomasMucunas",
    avatar: "https://avatars.githubusercontent.com/TomasMucunas",
  },
  {
    name: "Tadas",
    surname: "Rumšas",
    role: "Full-stack Developer",
    github: "https://github.com/tadasrumsas",
    avatar: "https://avatars.githubusercontent.com/tadasrumsas",
  },
  {
    name: "Ilona",
    surname: "Akinča",
    role: "QA Head specialist",
    github: "https://github.com/iakinca",
    avatar: "https://avatars.githubusercontent.com/iakinca",
  },
  {
    name: "Dmytro",
    surname: "Sokolov",
    role: "QA specialist",
    github: "https://github.com/drak0nch1k00",
    avatar: "https://avatars.githubusercontent.com/drak0nch1k00",
  },
];

const About = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const usersPerPage = 3;

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevState) => {
      const newTheme = !prevState;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors">
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 text-left font-sans">
          <h2 className="text-4xl font-bold mb-6">About Just Do It</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Just Do It is an online electronics store created by aspiring web
            developers from Techin. Launched in 2025, we offer a wide range of
            high-quality gadgets, including smartphones, laptops, and smart home
            devices. Our goal is to provide a simple and exciting shopping
            experience, where innovation and convenience meet.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="../src/public/banner_images/logo.png"
            alt="Just Do It Logo"
            className="w-80 md:w-96 rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Selling and Shopping Sections */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-6">How to Sell</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
            <img
              src="../src/public/banner_images/how-to-sell-step1.png" // IMAGE
              alt="Step 1"
              className="w-full h-auto mb-4 object-cover rounded-lg"
            />
            <h4 className="text-xl font-bold mb-2">1. List for free</h4>
            <p>Start selling by listing your item for free on our platform.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
            <img
              src="../src/public/banner_images/how-to-sell-step1.png" // IMAGE
              alt="Step 2"
              className="w-full h-auto mb-4 object-cover rounded-lg"
            />
            <h4 className="text-xl font-bold mb-2">2. Sell it, ship it</h4>
            <p>
              Once your item sells, ship it to the buyer and complete the
              transaction.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
            <img
              src="../src/public/banner_images/how-to-sell-step1.png" // IMAGE
              alt="Step 3"
              className="w-full h-auto mb-4 object-cover rounded-lg"
            />
            <h4 className="text-xl font-bold mb-2">3. It’s payday!</h4>
            <p>Get paid for your sale after the transaction is complete.</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-6">How to Shop</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
            <img
              src="../src/public/banner_images/shopping-step1.png" // IMAGE
              alt="Step 1"
              className="w-full h-auto mb-4 object-cover rounded-lg"
            />
            <h4 className="text-xl font-bold mb-2">1. Find it</h4>
            <p>Browse through a variety of products and find what you need.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
            <img
              src="../src/public/banner_images/shopping-step1.png" // IMAGE
              alt="Step 2"
              className="w-full h-auto mb-4 object-cover rounded-lg"
            />
            <h4 className="text-xl font-bold mb-2">2. Buy it</h4>
            <p>
              Once you ve found the perfect item, add it to your cart and
              purchase it.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
            <img
              src="../src/public/banner_images/shopping-step1.png" // IMAGE
              alt="Step 3"
              className="w-full h-auto mb-4 object-cover rounded-lg"
            />
            <h4 className="text-xl font-bold mb-2">3. Get it</h4>
            <p>Your product will be delivered to you as soon as possible!</p>
          </div>
        </div>
      </div>

      {/* Meet Our Developers Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-6">
          Meet Our Developers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {currentUsers.map((user, index) => (
            <a
              key={index}
              href={user.github}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[280px] text-center flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg transition-transform hover:scale-105"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-auto mb-4 object-cover rounded-full"
              />
              <h4 className="text-xl font-bold mb-2">
                {user.name} {user.surname}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">{user.role}</p>
            </a>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-200"
            disabled={currentPage === 1}
          >
            &larr; Previous
          </button>

          {/* Dots Pagination */}
          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-3 h-3 rounded-full ${currentPage === index + 1 ? "bg-gray-800" : "bg-gray-300"} transition-colors`}
              ></button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextPage}
            className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-200"
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
