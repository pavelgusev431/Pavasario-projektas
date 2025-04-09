import React, { useState } from "react";

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
    name: "Jaroslav",
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

const Contact = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const totalPages = Math.ceil(users.length / usersPerPage);

  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="px-8 py-16 max-w-[1600px] mx-auto dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-8 transition-colors duration-300">
          {/* Call Section */}
          <div className="flex items-start gap-5">
            <div className="bg-red-500 text-white rounded-full p-4 text-xl">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Call To Us</h4>
              <p className="text-base text-gray-600 dark:text-gray-300">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-base mt-1 font-medium">
                Phone: +8801611112222
              </p>
            </div>
          </div>
          <hr className="border-gray-300 dark:border-gray-600" />
          {/* Email Section */}
          <div className="flex items-start gap-5">
            <div className="bg-red-500 text-white rounded-full p-4 text-xl">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Write To Us</h4>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-base mt-1 font-medium">
                Email: justdoitserviceemail@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Email Form */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 transition-colors duration-300">
          <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Send Us a Message
          </h4>
          <form
            action="mailto:justdoitserviceemail@gmail.com"
            method="post"
            enctype="text/plain"
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-4 text-base border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                E-mail:
              </label>
              <input
                type="text"
                name="mail"
                className="w-full p-4 text-base border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Comment:
              </label>
              <textarea
                name="comment"
                rows="4"
                className="w-full p-4 text-base border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
              >
                Send
              </button>
              <button
                type="reset"
                className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-6 py-3 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Meet Our Developers Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Meet Our Developers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {currentUsers.map((user, index) => (
            <a
              key={index}
              href={user.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg transition-transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 mb-4 object-cover rounded-full border-4 border-gray-300 dark:border-gray-600"
              />
              <h4 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">
                {user.name} {user.surname}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {user.role}
              </p>
            </a>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-200 text-sm"
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
                className={`w-3 h-3 rounded-full ${
                  currentPage === index + 1 ? "bg-gray-800" : "bg-gray-300"
                } transition-colors`}
              ></button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextPage}
            className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-200 text-sm"
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
