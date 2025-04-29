const Footer = () => (
    <footer className="w-full bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
            <span className="text-sm">
                &copy; {new Date().getFullYear()} Marketplace. All rights
                reserved.
            </span>
            <div className="flex space-x-4 mt-2 md:mt-0">
                <a href="#" className="hover:text-red-400 transition">
                    Privacy Policy
                </a>
                <a href="#" className="hover:text-red-400 transition">
                    Terms of Service
                </a>
                <a href="#" className="hover:text-red-400 transition">
                    Contact
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;
