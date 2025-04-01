import React from "react";

const users = [
  {
    name: "User One",
    github: "https://github.com/userone",
    avatar: "https://avatars.githubusercontent.com/userone",
  },
  {
    name: "User Two",
    github: "https://github.com/usertwo",
    avatar: "https://avatars.githubusercontent.com/usertwo",
  },
  {
    name: "User Three",
    github: "https://github.com/userthree",
    avatar: "https://avatars.githubusercontent.com/userthree",
  },
];

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* photo */}
        <div className="w-full md:w-1/2">
          <img
            src="../src/public/banner_images/logo.png"
            alt="About Us"
            className="w-full rounded-lg"
          />
        </div>

        {/* {/ text /} */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600">
          Welcome to Just Do It — a project created by aspiring web developers from Techin, where we learn programming and bring our ideas to life! As part of our Pavasario Projektas, launched in 2025, we strive to build modern, stylish, and functional websites.

The Story of Just Do It – Your Online Electronics Store
Imagine a city of the future, where technology evolves at an incredible pace. At the heart of this world is Just Do It, an online electronics store designed for those who value quality, innovation, and convenience.

Back in 2025, a group of passionate developers believed that shopping for gadgets should be more than just a necessity—it should be an exciting experience. That’s how Just Do It was born—a place where you can discover the latest smartphones, powerful laptops, and smart home devices with just a few clicks.

Our team created a user-friendly interface, smart recommendations, and a fast delivery system to ensure that every customer enjoys a seamless shopping experience. We believe technology should be accessible, and choosing the right device should be simple and enjoyable.

Just Do It isn’t just a shop—it’s your gateway to the future of technology!
          </p>
        </div>
      </div>

      {/* developers */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {users.map((user, index) => (
          <a
            key={index}
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center transform transition-transform hover:scale-105"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover mx-auto"
            />
            <p className="mt-2 text-lg font-medium">{user.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default About;
