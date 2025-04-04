import { useState } from 'react';

export default function Sort({ onSortChange }) {
    const [sortValue, setSortValue] = useState('createdAt-asc');

    const handleSortChange = (event) => {
        const newSortValue = event.target.value;
        setSortValue(newSortValue);
        onSortChange(newSortValue);
    };

    return (
        <div className="flex justify-center">
            <select
                value={sortValue}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
}
