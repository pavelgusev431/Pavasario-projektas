import React, { useEffect, useState } from 'react';

const users = [
    { name: 'User One', surname: 'One', role: 'Developer', github: 'https://github.com/Pavel-techin', avatar: 'https://avatars.githubusercontent.com/Pavel-techin' },
    { name: 'User Two', surname: 'Two', role: 'Designer', github: 'https://github.com/usertwo', avatar: 'https://avatars.githubusercontent.com/usertwo' },
    { name: 'User Three', surname: 'Three', role: 'Frontend Developer', github: 'https://github.com/userthree', avatar: 'https://avatars.githubusercontent.com/userthree' },
    { name: 'User Four', surname: 'Four', role: 'Backend Developer', github: 'https://github.com/userfour', avatar: 'https://avatars.githubusercontent.com/userfour' },
    { name: 'User Five', surname: 'Five', role: 'UI/UX Designer', github: 'https://github.com/userfive', avatar: 'https://avatars.githubusercontent.com/userfive' },
    { name: 'User Six', surname: 'Six', role: 'Full-stack Developer', github: 'https://github.com/usersix', avatar: 'https://avatars.githubusercontent.com/usersix' },
    { name: 'User Seven', surname: 'Seven', role: 'Project Manager', github: 'https://github.com/userseven', avatar: 'https://avatars.githubusercontent.com/userseven' },
    { name: 'User Eight', surname: 'Eight', role: 'QA Engineer', github: 'https://github.com/usereight', avatar: 'https://avatars.githubusercontent.com/usereight' },
];

const About = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const usersPerPage = 3;

    // Загружаем тему из localStorage при загрузке компонента
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

    // Обновляем тему в localStorage и применяем её немедленно
    const toggleTheme = () => {
        setIsDarkMode(prevState => {
            const newTheme = !prevState;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

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

    useEffect(() => {
        // Применяем тему сразу после изменения
        if (isDarkMode) {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className={`max-w-6xl mx-auto px-6 py-12`}>
            <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Text (left side) */}
                <div className={`w-full md:w-1/2 text-left ${isDarkMode ? 'text-white' : 'text-black'} font-sans`}>
                    <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Welcome to{' '}
                        <span className="font-semibold text-red-700">Just Do It</span>{' '}
                        — a project created by aspiring web developers from{' '}
                        <span className="text-red-500 font-medium">Techin</span>, where we learn programming and bring our ideas to life! As part of our{' '}
                        <span className="italic text-gray-600">Pavasario Projektas</span>, launched in 2025, we strive to build modern, stylish, and functional websites.
                    </p>
                    <p className={`mt-4 text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="font-semibold text-red-700">The Story of Just Do It – Your Online Electronics Store</span>
                        <br />
                        Imagine a city of the future, where technology evolves at an incredible pace. At the heart of this world is{' '}
                        <span className="font-semibold text-red-700">Just Do It</span>, an online electronics store designed for those who value quality, innovation, and convenience.
                    </p>
                    <p className={`mt-4 text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Back in 2025, a group of passionate developers believed that shopping for gadgets should be more than just a necessity—it should be an exciting experience. That’s how{' '}
                        <span className="font-semibold text-red-700">Just Do It</span> was born—a place where you can discover the latest smartphones, powerful laptops, and smart home devices with just a few clicks.
                    </p>
                    <p className={`mt-4 text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Our team created a user-friendly interface, smart recommendations, and a fast delivery system to ensure that every customer enjoys a seamless shopping experience. We believe technology should be accessible, and choosing the right device should be simple and enjoyable.{' '}
                        <span className="font-semibold text-red-700">Just Do It</span> isn’t just a shop—it’s your gateway to the future of technology!
                    </p>
                </div>

                {/* Logo (right side) */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src="../src/public/banner_images/logo.png"
                        alt="Just Do It Logo"
                        className="w-80 md:w-96 rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Developers Carousel */}
            <div className="mt-12 overflow-hidden">
                <h3 className="text-2xl font-bold text-center mb-6">Meet Our Developers</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {currentUsers.map((user, index) => (
                        <a
                            key={index}
                            href={user.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`min-w-[220px] text-center flex flex-col items-center p-4 bg-gray-800 shadow-lg rounded-lg transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                        >
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-24 h-24 rounded-full border-4 border-gray-600 object-cover"
                            />
                            <p className={`mt-2 text-lg font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>{user.name} {user.surname}</p>
                            <p className={`text-gray-400 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user.role}</p>
                        </a>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50 text-white"
                    >
                        Previous
                    </button>
                    <span className="text-lg font-medium">{currentPage} / {totalPages}</span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50 text-white"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-900 transition duration-300"
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
};

export default About;
