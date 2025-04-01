// Tools.jsx
import { useState } from 'react';
import FilterRange from './FilterRange';
import Sort from './Sort';

const Tools = ({
    priceRange,
    setPriceRange,
    dateRange,
    setDateRange,
    minDate,
    maxDate,
    onSortChange,
}) => {
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
                {isToolsVisible ? 'Hide Filters & Sort' : 'Show Filters & Sort'}
            </button>

            {isToolsVisible && (
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
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
};

export default Tools;