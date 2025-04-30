import React, { useState } from 'react';
import ExportButton from './ExportButton';

const allData = [
    { date: '2024-04-01', type: 'Income', amount: 100, description: 'Salary' },
    {
        date: '2024-04-05',
        type: 'Expense',
        amount: -20,
        description: 'Groceries',
    },
    {
        date: '2024-04-10',
        type: 'Income',
        amount: 50,
        description: 'Freelance',
    },
    { date: '2024-04-15', type: 'Expense', amount: -10, description: 'Snacks' },
];

const FinanceReport = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [hasGenerated, setHasGenerated] = useState(false);

    const handleGenerate = () => {
        if (!from || !to) {
            alert('Please select both dates.');
            return;
        }

        if (new Date(from) > new Date(to)) {
            alert('Start date must be before end date.');
            return;
        }

        const result = allData.filter(
            (row) => row.date >= from && row.date <= to
        );
        setFiltered(result);
        setHasGenerated(true);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Finance Report</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="border px-2 py-1 rounded"
                />
                <span className="self-center">to</span>
                <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="border px-2 py-1 rounded"
                />
                <button
                    onClick={handleGenerate}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    Generate
                </button>
            </div>

            {hasGenerated && filtered.length === 0 && (
                <p className="text-gray-500">
                    No records found for this date range.
                </p>
            )}

            {filtered.length > 0 && (
                <>
                    <table className="w-full border mb-4">
                        <thead>
                            <tr>
                                <th className="border px-2 py-1">Date</th>
                                <th className="border px-2 py-1">Type</th>
                                <th className="border px-2 py-1">Amount</th>
                                <th className="border px-2 py-1">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="border px-2 py-1">
                                        {row.date}
                                    </td>
                                    <td className="border px-2 py-1">
                                        {row.type}
                                    </td>
                                    <td className="border px-2 py-1">
                                        {row.amount}
                                    </td>
                                    <td className="border px-2 py-1">
                                        {row.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ExportButton
                        data={filtered}
                        filename="finance-report.csv"
                    />
                </>
            )}
        </div>
    );
};

export default FinanceReport;
