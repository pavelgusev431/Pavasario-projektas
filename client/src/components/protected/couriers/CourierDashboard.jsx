import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import loginMe from '../../../helpers/loginMe.js';
import url from '../../../helpers/getURL.js';

const CourierDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        activeTransaction: null,
        hasActiveTransaction: false,
        availableTransactions: [],
        completedTransactions: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accessDenied, setAccessDenied] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthAndLoadDashboard();
    }, []);

    const checkAuthAndLoadDashboard = async () => {
        try {
            setLoading(true);

            const userResponse = await loginMe();

            if (!userResponse.data || userResponse.data.status !== 'success') {
                navigate('/');
                return;
            }

            console.log('User data:', userResponse.data);

            if (userResponse.data.data.role !== 'courier') {
                setAccessDenied(true);
                setLoading(false);
                return;
            }

            await fetchDashboardData();
        } catch (err) {
            console.error('Authentication error:', err);

            if (err.response?.status === 403) {
                setAccessDenied(true);
            } else if (err.response?.status === 401) {
                navigate('/');
            } else {
                setError(
                    'Failed to authenticate. Please try logging in again.'
                );
            }
            setLoading(false);
        }
    };

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get(
                url('transactions/courier/dashboard'),
                { withCredentials: true }
            );

            console.log('Dashboard response:', response.data);

            if (response.data?.status === 'success' && response.data?.data) {
                const sanitizedData = {
                    activeTransaction:
                        response.data.data.activeTransaction || null,
                    hasActiveTransaction:
                        !!response.data.data.activeTransaction,
                    availableTransactions:
                        response.data.data.availableTransactions || [],
                    completedTransactions:
                        response.data.data.completedTransactions || [],
                };
                setDashboardData(sanitizedData);
                setError(null);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Dashboard Error:', err);
            setError(
                err.response?.data?.message || 'Failed to load dashboard data'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (transactionId, newStatus) => {
        try {
            await axios.patch(
                url(`transactions/${transactionId}/status`),
                { status: newStatus },
                { withCredentials: true }
            );

            fetchDashboardData();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    'Failed to update transaction status'
            );
        }
    };

    const handleAssignTransaction = async (transactionId) => {
        try {
            await axios.patch(
                url(`transactions/${transactionId}/assign`),
                {},
                { withCredentials: true }
            );

            fetchDashboardData();
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to assign transaction'
            );
        }
    };

    if (accessDenied) {
        return (
            <div className="container mx-auto p-8 text-center">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-red-700 mb-2">
                        Access Denied
                    </h2>
                    <p className="text-gray-700 mb-4">
                        You need courier privileges to access this dashboard.
                    </p>
                    <Link
                        to="/home"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                Loading courier dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
                <p>Error: {error}</p>
                <button
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={fetchDashboardData}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Courier Dashboard</h1>

            {/* Active Transaction Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    Active Transaction
                </h2>
                {dashboardData.hasActiveTransaction &&
                dashboardData.activeTransaction ? (
                    <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">
                                {dashboardData.activeTransaction.Product
                                    ?.name || 'Unknown Product'}
                            </h3>
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                                {dashboardData.activeTransaction.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Buyer</p>
                                <p>
                                    {dashboardData.activeTransaction.buyer
                                        ?.username || 'Unknown Buyer'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Seller</p>
                                <p>
                                    {dashboardData.activeTransaction.seller
                                        ?.username || 'Unknown Seller'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Amount</p>
                                <p>
                                    $
                                    {(
                                        dashboardData.activeTransaction
                                            .amount || 0
                                    ).toFixed(2)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Due Date
                                </p>
                                <p>
                                    {dashboardData.activeTransaction.due_date
                                        ? new Date(
                                              dashboardData.activeTransaction.due_date
                                          ).toLocaleDateString()
                                        : 'No due date'}
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-2 justify-end">
                            {dashboardData.activeTransaction.status ===
                                'assigned' && (
                                <button
                                    onClick={() =>
                                        handleStatusUpdate(
                                            dashboardData.activeTransaction.id,
                                            'in progress'
                                        )
                                    }
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                                >
                                    Start Delivery
                                </button>
                            )}

                            {dashboardData.activeTransaction.status ===
                                'in progress' && (
                                <>
                                    <button
                                        onClick={() =>
                                            handleStatusUpdate(
                                                dashboardData.activeTransaction
                                                    .id,
                                                'done'
                                            )
                                        }
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        Complete
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleStatusUpdate(
                                                dashboardData.activeTransaction
                                                    .id,
                                                'cancelled'
                                            )
                                        }
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}

                            <Link
                                to={`/${dashboardData.activeTransaction.id}`}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-gray-600">No active transaction</p>
                        <p className="text-sm mt-2">
                            You can assign yourself to an available transaction
                            below
                        </p>
                    </div>
                )}
            </div>

            {/* Available Transactions Section */}
            {!dashboardData.hasActiveTransaction &&
                dashboardData.availableTransactions && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">
                            Available Transactions
                        </h2>
                        {dashboardData.availableTransactions.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {dashboardData.availableTransactions.map(
                                    (transaction) => (
                                        <div
                                            key={transaction.id}
                                            className="bg-white shadow-md rounded-lg p-4 border-l-4 border-gray-500"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-medium">
                                                    {transaction.Product
                                                        ?.name ||
                                                        'Unknown Product'}
                                                </h3>
                                                <span className="text-sm font-semibold text-gray-600">
                                                    $
                                                    {(
                                                        transaction.amount || 0
                                                    ).toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="text-sm text-gray-600 mb-3">
                                                <p>
                                                    Seller:{' '}
                                                    {transaction.seller
                                                        ?.username ||
                                                        'Unknown Seller'}
                                                </p>
                                                <p>
                                                    Due date:{' '}
                                                    {transaction.due_date
                                                        ? new Date(
                                                              transaction.due_date
                                                          ).toLocaleDateString()
                                                        : 'No due date'}
                                                </p>
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() =>
                                                        handleAssignTransaction(
                                                            transaction.id
                                                        )
                                                    }
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Take This Delivery
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="bg-gray-100 p-4 rounded-lg text-center">
                                <p className="text-gray-600">
                                    No available transactions at the moment
                                </p>
                            </div>
                        )}
                    </div>
                )}

            {/* Completed Transactions Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Completed Transactions
                </h2>
                {dashboardData.completedTransactions &&
                dashboardData.completedTransactions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 text-left">ID</th>
                                    <th className="py-2 px-4 text-left">
                                        Product
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                        Amount
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                        Status
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                        Completed Date
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.completedTransactions.map(
                                    (transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="border-b"
                                        >
                                            <td className="py-2 px-4">
                                                {transaction.id}
                                            </td>
                                            <td className="py-2 px-4">
                                                {transaction.Product?.name ||
                                                    'Unknown Product'}
                                            </td>
                                            <td className="py-2 px-4">
                                                $
                                                {(
                                                    transaction.amount || 0
                                                ).toFixed(2)}
                                            </td>
                                            <td className="py-2 px-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${
                            transaction.status === 'done'
                                ? 'bg-green-100 text-green-800'
                                : transaction.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                        }`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="py-2 px-4">
                                                {transaction.updated_at
                                                    ? new Date(
                                                          transaction.updated_at
                                                      ).toLocaleDateString()
                                                    : 'N/A'}
                                            </td>
                                            <td className="py-2 px-4">
                                                <Link
                                                    to={`/orders/${transaction.id}`}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-gray-600">
                            No completed transactions yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourierDashboard;
