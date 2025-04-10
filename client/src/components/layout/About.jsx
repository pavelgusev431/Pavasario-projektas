const About = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors">
            {/* About Section */}
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 text-left font-sans">
                    <h2 className="text-4xl font-bold mb-6">
                        About Just Do It
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        Just Do It is an online electronics store created by
                        aspiring web developers from Techin. Launched in 2025,
                        we offer a wide range of high-quality gadgets, including
                        smartphones, laptops, and smart home devices. Our goal
                        is to provide a simple and exciting shopping experience,
                        where innovation and convenience meet.
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
                <h3 className="text-2xl font-bold text-center mb-6">
                    How to Sell
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
                        <img
                            src="../src/public/banner_images/how-to-sell-step1.png"
                            alt="Step 1"
                            className="w-full h-auto mb-4 object-cover rounded-lg"
                        />
                        <h4 className="text-xl font-bold mb-2">
                            1. List for free
                        </h4>
                        <p>
                            Start selling by listing your item for free on our
                            platform.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
                        <img
                            src="../src/public/banner_images/how-to-sell-step1.png"
                            alt="Step 2"
                            className="w-full h-auto mb-4 object-cover rounded-lg"
                        />
                        <h4 className="text-xl font-bold mb-2">
                            2. Sell it, ship it
                        </h4>
                        <p>
                            Once your item sells, ship it to the buyer and
                            complete the transaction.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
                        <img
                            src="../src/public/banner_images/how-to-sell-step1.png"
                            alt="Step 3"
                            className="w-full h-auto mb-4 object-cover rounded-lg"
                        />
                        <h4 className="text-xl font-bold mb-2">
                            3. It’s payday!
                        </h4>
                        <p>
                            Get paid for your sale after the transaction is
                            complete.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold text-center mb-6">
                    How to Shop
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
                        <img
                            src="../src/public/banner_images/shopping-step1.png"
                            alt="Step 1"
                            className="w-full h-auto mb-4 object-cover rounded-lg"
                        />
                        <h4 className="text-xl font-bold mb-2">1. Find it</h4>
                        <p>
                            Browse through a variety of products and find what
                            you need.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
                        <img
                            src="../src/public/banner_images/shopping-step1.png"
                            alt="Step 2"
                            className="w-full h-auto mb-4 object-cover rounded-lg"
                        />
                        <h4 className="text-xl font-bold mb-2">2. Buy it</h4>
                        <p>
                            Once you’ve found the perfect item, add it to your
                            cart and purchase it.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg">
                        <img
                            src="../src/public/banner_images/shopping-step1.png"
                            alt="Step 3"
                            className="w-full h-auto mb-4 object-cover rounded-lg"
                        />
                        <h4 className="text-xl font-bold mb-2">3. Get it</h4>
                        <p>
                            Your product will be delivered to you as soon as
                            possible!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
