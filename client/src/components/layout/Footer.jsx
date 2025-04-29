const Footer = () => (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Links */}
                <div>
                    <h2 className="text-sm font-bold text-gray-700 dark:text-white uppercase mb-4">
                        Company
                    </h2>
                    <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                        <li>
                            <a href="/home" className="hover:text-blue-500">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-blue-500">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-blue-500">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/signup" className="hover:text-blue-500">
                                Sign up
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Product Categories */}
                <div>
                    <h2 className="text-sm font-bold text-gray-700 dark:text-white uppercase mb-4">
                        Categories
                    </h2>
                    <div className="grid grid-cols-2 gap-2 text-gray-500 dark:text-gray-400 text-sm">
                        {[
                            'Electronics',
                            'Fashion & Apparel',
                            'Home & Furniture',
                            'Health & Beauty',
                            'Sports & Outdoors',
                            'Toys & Games',
                            'Automotive',
                            'Books & Media',
                            'Groceries & Food',
                            'Office Supplies',
                        ].map((category, i) => (
                            <a
                                key={i}
                                href={`/categories/${i + 1}`}
                                className="hover:text-blue-500"
                            >
                                {category}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Logo */}
                <div className="flex justify-center md:justify-end items-start">
                    <img
                        src="../src/public/banner_images/logo.png"
                        alt="Logo"
                        className="h-50 object-contain"
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200 dark:border-gray-700" />

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                    © {new Date().getFullYear()} Marketplace. All Rights
                    Reserved.
                </span>
                <a
                    href="https://github.com/pavelgusev431/Pavasario-projektas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-4 md:mt-0 hover:text-gray-900 dark:hover:text-white"
                >
                    <svg
                        className="w-5 h-5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    GitHub
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;
