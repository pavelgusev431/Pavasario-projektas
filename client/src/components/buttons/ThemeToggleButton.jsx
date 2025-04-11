import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

const ThemeToggleButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-4 left-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center"
            aria-label="Toggle Theme"
        >
            {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500" /> // light mode
            ) : (
                <MoonIcon className="h-6 w-6 text-blue-500" /> // dark mode
            )}
        </button>
    );
};

export default ThemeToggleButton;
