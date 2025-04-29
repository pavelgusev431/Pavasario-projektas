const Footer = () => (
    <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-6 lg:py-8">
                {/* Left: Company links */}
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                        Company
                    </h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                        <li className="mb-4">
                            <a
                                href="http://localhost:5173/home"
                                className="hover:underline"
                            >
                                Home
                            </a>
                        </li>
                        <li className="mb-4">
                            <a
                                href="http://localhost:5173/about"
                                className="hover:underline"
                            >
                                About
                            </a>
                        </li>
                        <li className="mb-4">
                            <a
                                href="http://localhost:5173/contact"
                                className="hover:underline"
                            >
                                Contact
                            </a>
                        </li>
                        <li className="mb-4">
                            <a
                                href="http://localhost:5173/signup"
                                className="hover:underline"
                            >
                                Sign up
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Right: Logo */}
                <div className="flex items-center justify-end h-full">
                    <img
                        src="../src/public/banner_images/logo.png"
                        alt="Logo"
                        className="h-50"
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
            {/* Product categories */}
            <div className="px-4 py-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <a
                        href="http://localhost:5173/categories/1"
                        className="hover:underline"
                    >
                        Electronics
                    </a>
                    <a
                        href="http://localhost:5173/categories/2"
                        className="hover:underline"
                    >
                        Fashion &amp; Apparel
                    </a>
                    <a
                        href="http://localhost:5173/categories/3"
                        className="hover:underline"
                    >
                        Home &amp; Furniture
                    </a>
                    <a
                        href="http://localhost:5173/categories/4"
                        className="hover:underline"
                    >
                        Health &amp; Beauty
                    </a>
                    <a
                        href="http://localhost:5173/categories/5"
                        className="hover:underline"
                    >
                        Sports &amp; Outdoors
                    </a>
                    <a
                        href="http://localhost:5173/categories/6"
                        className="hover:underline"
                    >
                        Toys &amp; Games
                    </a>
                    <a
                        href="http://localhost:5173/categories/7"
                        className="hover:underline"
                    >
                        Automotive
                    </a>
                    <a
                        href="http://localhost:5173/categories/8"
                        className="hover:underline"
                    >
                        Books &amp; Media
                    </a>
                    <a
                        href="http://localhost:5173/categories/9"
                        className="hover:underline"
                    >
                        Groceries &amp; Food
                    </a>
                    <a
                        href="http://localhost:5173/categories/10"
                        className="hover:underline"
                    >
                        Office Supplies
                    </a>
                </div>
            </div>
            {/* Bottom: GitHub icon and copyright */}
            <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
                    © {new Date().getFullYear()} Marketplace. All Rights
                    Reserved.
                </span>
                <div className="flex items-center mt-4 sm:justify-center md:mt-0">
                    <a
                        href="https://github.com/pavelgusev431/Pavasario-projektas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                        <span className="sr-only">GitHub account</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
