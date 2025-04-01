// Sort.jsx
import { useState} from 'react';

const Sort = ({ onSortChange }) => {
    const [sortValue, setSortValue] = useState('createdAt-asc'); 

    const handleSortChange = (event) => {
        const newSortValue = event.target.value;
        setSortValue(newSortValue);
        onSortChange(newSortValue); 
    };

    return (
        <div className="flex items-center justify-between gap-4">
            <select
                value={sortValue}
                onChange={handleSortChange}
                className="dark:bg-[#1f2937] dark:text-white border border-gray-600 rounded px-3 py-2 w-[4cm]"
            >
                <option value="" disabled>
                    Select sorting
                </option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="createdAt-desc">Newest</option>
                <option value="createdAt-asc">Oldest</option>
                <option value="avgRating-desc">Rating ↓</option>
                <option value="avgRating-asc">Rating ↑</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
            </select>
        </div>
    );
};

export default Sort;