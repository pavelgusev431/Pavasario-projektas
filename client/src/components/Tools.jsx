import { useState } from 'react';
import FilterRange from './FilterRange';
import Sort from './Sort';

export default function Tools({
    priceRange,
    setPriceRange,
    dateRange,
    setDateRange,
    minDate,
    maxDate,
    onSortChange,
}) {
    const [isToolsVisible, setIsToolsVisible] = useState(false);

    const toggleToolsVisibility = () => {
        setIsToolsVisible((prev) => !prev);
    };

    return (
        <div className="mb-4">
            <button
                onClick={toggleToolsVisibility}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                {isToolsVisible ? 'Tools' : 'Tools'}
            </button>

            {isToolsVisible && (
                <div className="">
                    <FilterRange
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                    <Sort onSortChange={onSortChange} />
                </div>
            )}
        </div>
    );
}