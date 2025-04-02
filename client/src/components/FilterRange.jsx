import Slider from 'react-slider';

export default function FilterRange({
    priceRange,
    setPriceRange,
    dateRange,
    setDateRange,
    minDate,
    maxDate,
}) {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
            {/* Kainos slankiklis */}
            <div className="flex flex-col items-center">
                <label className="mb-2 font-semibold text-lg text-gray-700 text-center">
                    Price Range: {priceRange[0]} - {priceRange[1]}
                </label>
                <Slider
                    className="w-full h-6 max-w-md"
                    thumbClassName="h-6 w-6 bg-blue-500 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 translate-y-[-25%]"
                    trackClassName="h-2 bg-gray-300 rounded"
                    min={0}
                    max={5000}
                    value={priceRange}
                    onChange={(newValue) => setPriceRange(newValue)}
                    pearling
                    minDistance={10}
                />
            </div>

            {/* Datos slankiklis */}
            <div className="flex flex-col items-center">
                <label className="mb-2 font-semibold text-lg text-gray-700 text-center">
                    Date Range: {new Date(dateRange[0]).toLocaleDateString()} -{' '}
                    {new Date(dateRange[1]).toLocaleDateString()}
                </label>
                <Slider
                    className="w-full h-6 max-w-md"
                    thumbClassName="h-6 w-6 bg-blue-500 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 translate-y-[-25%]"
                    trackClassName="h-2 bg-gray-300 rounded"
                    min={minDate}
                    max={maxDate}
                    value={dateRange}
                    onChange={(newValue) => {
                        setDateRange([
                            Math.max(newValue[0], minDate),
                            Math.min(newValue[1], maxDate),
                        ]);
                    }}
                    pearling
                    minDistance={1000 * 60 * 60 * 24}
                />
            </div>
        </div>
    );
}
