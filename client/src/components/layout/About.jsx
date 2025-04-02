import React, { useEffect, useState } from 'react';

const users = [
    {
        name: 'User One',
        surname: 'One',
        role: 'Developer',
        github: 'https://github.com/Pavel-techin',
        avatar: 'https://avatars.githubusercontent.com/Pavel-techin',
    },
    {
        name: 'User Two',
        surname: 'Two',
        role: 'Designer',
        github: 'https://github.com/usertwo',
        avatar: 'https://avatars.githubusercontent.com/usertwo',
    },
    {
        name: 'User Three',
        surname: 'Three',
        role: 'Frontend Developer',
        github: 'https://github.com/userthree',
        avatar: 'https://avatars.githubusercontent.com/userthree',
    },
    {
        name: 'User Four',
        surname: 'Four',
        role: 'Backend Developer',
        github: 'https://github.com/userfour',
        avatar: 'https://avatars.githubusercontent.com/userfour',
    },
    {
        name: 'User Five',
        surname: 'Five',
        role: 'UI/UX Designer',
        github: 'https://github.com/userfive',
        avatar: 'https://avatars.githubusercontent.com/userfive',
    },
    {
        name: 'User Six',
        surname: 'Six',
        role: 'Full-stack Developer',
        github: 'https://github.com/usersix',
        avatar: 'https://avatars.githubusercontent.com/usersix',
    },
    {
        name: 'User Seven',
        surname: 'Seven',
        role: 'Project Manager',
        github: 'https://github.com/userseven',
        avatar: 'https://avatars.githubusercontent.com/userseven',
    },
    {
        name: 'User Eight',
        surname: 'Eight',
        role: 'QA Engineer',
        github: 'https://github.com/usereight',
        avatar: 'https://avatars.githubusercontent.com/usereight',
    },
];

const About = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const usersPerPage = 3;

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prevState) => {
            const newTheme = !prevState;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
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
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 text-left font-sans">
                    <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        Welcome to <span className="font-semibold text-red-700">Just Do It</span> — a project created by aspiring web developers from
                        <span className="text-red-500 font-medium"> Techin</span>, where we learn programming and bring our ideas to life! 
                        As part of our <span className="font-semibold text-blue-700">Pavasario Projektas</span>, launched in 2025, we strive 
                        to build modern, stylish, and functional websites.
                    </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src="../src/public/banner_images/logo.png" alt="Just Do It Logo" className="w-80 md:w-96 rounded-lg shadow-lg" />
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold text-center mb-6">Meet Our Developers</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {currentUsers.map((user, index) => (
                        <a
                            key={index}
                            href={user.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-w-[220px] text-center flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg transition-transform hover:scale-105"
                        >
                            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-gray-600 object-cover" />
                            <p className="mt-2 text-lg font-medium text-gray-900 dark:text-white">{user.name} {user.surname}</p>
                            <p className="text-gray-600 dark:text-gray-400">{user.role}</p>
                        </a>
                    ))}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50 text-white">
                        Previous
                    </button>
                    <span className="text-lg font-medium">{currentPage} / {totalPages}</span>
                    <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50 text-white">
                        Next
                    </button>
                </div>
            </div>

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
