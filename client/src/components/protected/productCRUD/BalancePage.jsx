import { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import {
    getBalance,
    topUpBalance,
    getBalanceHistory,
} from '../../../helpers/Balance';
import { AuthContext } from '../../../contexts/AuthContext';

const BalancePage = () => {
    const { auth, loading } = useContext(AuthContext);

    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!loading && auth?.id) {
            const loadData = async () => {
                try {
                    const bal = await getBalance(auth.id);
                    const his = await getBalanceHistory(auth.id);
                    setBalance(bal.balance);
                    setHistory(his);
                } catch (err) {
                    console.error('Failed to load balance data:', err);
                    setMessage('Failed to load balance data');
                }
            };
            loadData();
        }
    }, [auth, loading]);

    const handleTopUp = async () => {
        if (!auth?.id) {
            setMessage('User not authenticated yet. Please wait...');
            return;
        }

        const userId = auth.id;
        const numericAmount = parseFloat(amount);
        if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
            setMessage('Enter a valid amount');
            return;
        }

        setIsLoading(true);
        try {
            const result = await topUpBalance(userId, numericAmount);
            setBalance(result.balance);
            setMessage('Balance successfully replenished!');
            setAmount('');

            const updatedHistory = await getBalanceHistory(userId);
            setHistory(updatedHistory);

            window.dispatchEvent(new Event('balance-updated'));
        } catch (err) {
            console.error('Top-up error:', err);
            setMessage('Top-up failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-10">🔄 Loading profile...</div>;
    }

    if (!auth) {
        return <div className="text-center mt-10">❌ Unauthorized user</div>;
    }

    const topUps = history.filter(
        (item) =>
            item.type_id === 3 &&
            (item.description.toLowerCase().includes('пополн') ||
                item.description.toLowerCase().includes('addendum') ||
                item.description.includes('+'))
    );

    const expenses = history.filter(
        (item) =>
            item.type_id === 3 &&
            (item.description.toLowerCase().includes('списан') ||
                item.description.includes('-'))
    );

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                💰 Balance:{' '}
                <span className="text-green-600 dark:text-green-400">
                    {balance}€
                </span>
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Enter the amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                    onClick={handleTopUp}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition duration-200 disabled:opacity-50"
                >
                    {isLoading ? 'Processing...' : 'Refill'}
                </button>
            </div>

            {message && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {message}
                </div>
            )}

            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Transaction History
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side */}
                <div>
                    <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 text-left">
                        Expenses
                    </h4>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-600 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
                        {expenses.length === 0 ? (
                            <li className="py-2 text-gray-500 dark:text-gray-400">
                                There are no expenses
                            </li>
                        ) : (
                            expenses
                                .sort(
                                    (a, b) =>
                                        new Date(b.timestamp) -
                                        new Date(a.timestamp)
                                )
                                .map((item) => (
                                    <li
                                        key={nanoid()}
                                        className="py-2 text-red-500 dark:text-red-400 text-left"
                                    >
                                        <strong>
                                            {new Date(
                                                item.timestamp
                                            ).toLocaleString()}
                                            :
                                        </strong>{' '}
                                        {item.description}
                                    </li>
                                ))
                        )}
                    </ul>
                </div>

                {/* Right side */}
                <div>
                    <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 text-right">
                        Refills
                    </h4>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-600 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
                        {topUps.length === 0 ? (
                            <li className="py-2 text-gray-500 dark:text-gray-400 text-right">
                                No refills
                            </li>
                        ) : (
                            topUps
                                .sort(
                                    (a, b) =>
                                        new Date(b.timestamp) -
                                        new Date(a.timestamp)
                                )
                                .map((item) => (
                                    <li
                                        key={nanoid()}
                                        className="py-2 text-green-600 dark:text-green-400 text-right"
                                    >
                                        <strong>
                                            {new Date(
                                                item.timestamp
                                            ).toLocaleString()}
                                            :
                                        </strong>{' '}
                                        {item.description}
                                    </li>
                                ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BalancePage;
