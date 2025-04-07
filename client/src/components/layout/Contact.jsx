import React from 'react';

const Contact = () => {
    return (
        <div className="px-8 py-16 max-w-[1600px] mx-auto dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Left Contact Info */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-8 transition-colors duration-300">
                    {/* Call */}
                    <div className="flex items-start gap-5">
                        <div className="bg-red-500 text-white rounded-full p-4 text-xl">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">Call To Us</h4>
                            <p className="text-base text-gray-600 dark:text-gray-300">
                                We are available 24/7, 7 days a week.
                            </p>
                            <p className="text-base mt-1">
                                Phone: +8801611112222
                            </p>
                        </div>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    {/* Write */}
                    <div className="flex items-start gap-5">
                        <div className="bg-red-500 text-white rounded-full p-4 text-xl">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">Write To Us</h4>
                            <p className="text-base text-gray-600 dark:text-gray-300">
                                Fill out our form and we will contact you within
                                24 hours.
                            </p>
                            <p className="text-base mt-1">
                                Emails: justdoitserviceemail@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 transition-colors duration-300">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <input
                                type="text"
                                placeholder="Your Name *"
                                className="w-full p-4 text-base border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                            <input
                                type="email"
                                placeholder="Your Email *"
                                className="w-full p-4 text-base border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                            <input
                                type="tel"
                                placeholder="Your Phone *"
                                className="w-full p-4 text-base border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>
                        <textarea
                            placeholder="Your Message"
                            rows="6"
                            className="w-full p-4 text-base border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-red-500 text-white px-8 py-4 text-base rounded-md hover:bg-red-600 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
