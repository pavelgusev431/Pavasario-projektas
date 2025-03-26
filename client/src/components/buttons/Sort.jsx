import { useState } from 'react';

const Sort = () => {
    const [showTools, setShowTools] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleSort = async (order = '') => {
        try {
            const query = new URLSearchParams({
                sort: "price", order,
                order: order || 'asc',
                from: fromDate,
                to: toDate,
            }).toString();

            const response = await fetch(`
                http://localhost:3000/products/sorted?${query}`);
            const data = await response.json();

            window.dispatchEvent(
                new CustomEvent('sortedProducts', {
                    detail: data.products || [],
                })
            );
        } catch (err) {
            console.error('Klaida gaunant produktus:', err);
        }
    };

    const handleFromDateChange = (e) => setFromDate(e.target.value);
    const handleToDateChange = (e) => setToDate(e.target.value);

    return (
        <div className="mt-4">
            <button
                onClick={() => setShowTools(!showTools)}
                className="px-3 py-1 bg-blue-800 hover:bg-blue-900 text-white rounded"
            >
                Tools
            </button>

            {showTools && (
                <div className="mt-3 border border-gray-800 bg-[#181C25] rounded p-4 text-white space-y-4 w-[10cm]">
                    <div>
                        <p className="text-sm font-semibold text-white mb-1">Rūšiuoti pagal kainą:</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleSort('desc')}
                                className="px-3 py-1 text-sm border border-green-500 text-green-400 rounded hover:bg-green-600 hover:text-white transition"
                            >
                                Sumažėjančia kaina
                            </button>
                            <button
                                onClick={() => handleSort('asc')}
                                className="px-3 py-1 text-sm border border-blue-500 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition"
                            >
                                Didėjančia kaina
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-white mb-1">Filtruoti pagal datą:</p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label htmlFor="fromDate" className="text-sm text-gray-300">Nuo:</label>
                                <input
                                    type="date"
                                    id="fromDate"
                                    value={fromDate}
                                    onChange={handleFromDateChange}
                                    className="text-sm bg-[#1f2937] text-white border border-gray-600 rounded px-2 py-1"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="toDate" className="text-sm text-gray-300">Iki:</label>
                                <input
                                    type="date"
                                    id="toDate"
                                    value={toDate}
                                    onChange={handleToDateChange}
                                    className="text-sm bg-[#1f2937] text-white border border-gray-600 rounded px-2 py-1"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => handleSort()}
                            className="mt-3 px-4 py-1 text-sm bg-purple-700 hover:bg-purple-800 rounded text-white"
                        >
                            Filtruoti
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sort;
