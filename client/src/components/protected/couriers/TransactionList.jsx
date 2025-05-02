import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import url from '../../../helpers/getURL.js';
import ReviewCreateModal from '../commentCRUD/ReviewCreateModal.jsx';

const TransactionsList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeRole, setActiveRole] = useState('buyer');
    const [activeTab, setActiveTab] = useState('all');
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [activeProductId, setActiveProductId] = useState(null);
    const [update, setUpdate] = useState(0);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                url(
                    `transactions?role=${activeRole}&status=${activeTab !== 'all' ? activeTab : ''}`
                ),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (
                response.data &&
                response.data.data &&
                response.data.data.transactions
            ) {
                setTransactions(response.data.data.transactions);
                setError(null);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('API Error:', err);
            setError(
                err.response?.data?.message || 'Failed to load transactions'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [activeRole, activeTab]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'assigned':
                return 'bg-blue-100 text-blue-800';
            case 'in progress':
                return 'bg-purple-100 text-purple-800';
            case 'done':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'expired':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading && transactions.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <svg
                        className="animate-spin h-8 w-8 mx-auto text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <p className="mt-2 text-gray-600">
                        Loading transactions...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Transactions</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                    <button
                        onClick={fetchTransactions}
                        className="mt-1 text-sm underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Role Selector */}
            <div className="mb-6">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                    <button
                        onClick={() => setActiveRole('buyer')}
                        className={`flex-1 py-2 px-4 rounded-md transition ${
                            activeRole === 'buyer'
                                ? 'bg-white shadow-sm font-medium text-blue-600'
                                : 'text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        As Buyer
                    </button>
                    <button
                        onClick={() => setActiveRole('seller')}
                        className={`flex-1 py-2 px-4 rounded-md transition ${
                            activeRole === 'seller'
                                ? 'bg-white shadow-sm font-medium text-blue-600'
                                : 'text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        As Seller
                    </button>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'all'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'pending'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setActiveTab('in progress')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'in progress'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        In Progress
                    </button>
                    <button
                        onClick={() => setActiveTab('done')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'done'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Completed
                    </button>
                </nav>
            </div>

            {/* Transactions List */}
            {transactions.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {transactions.map((transaction) => (
                            <li key={transaction.id}>
                                <Link
                                    to={`${transaction.id}`}
                                    className="block hover:bg-gray-50"
                                >
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                {transaction.Product
                                                    ?.image_url ? (
                                                    <img
                                                        src={
                                                            transaction.Product
                                                                .image_url
                                                        }
                                                        alt={
                                                            transaction.Product
                                                                .name
                                                        }
                                                        className="w-12 h-12 object-cover rounded-md mr-4"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded-md mr-4 flex items-center justify-center text-gray-500">
                                                        No img
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-blue-600 truncate">
                                                        {
                                                            transaction.Product
                                                                ?.name
                                                        }
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        ID: #{transaction.id} |
                                                        Quantity:{' '}
                                                        {transaction.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}
                                                >
                                                    {transaction.status}
                                                </p>
                                                {transaction.status ===
                                                    'done' && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActiveProductId(
                                                                transaction
                                                                    .Product.id
                                                            );
                                                            setShowReviewModal(
                                                                true
                                                            );
                                                        }}
                                                        className="ml-2 text-blue-600 hover:underline text-sm"
                                                    >
                                                        Rate
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    {activeRole === 'buyer' ? (
                                                        <>
                                                            <span className="mr-1">
                                                                Seller:
                                                            </span>
                                                            <span className="font-medium">
                                                                {
                                                                    transaction
                                                                        .seller
                                                                        ?.username
                                                                }
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="mr-1">
                                                                Buyer:
                                                            </span>
                                                            <span className="font-medium">
                                                                {
                                                                    transaction
                                                                        .buyer
                                                                        ?.username
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <span className="mr-1">
                                                        Amount:
                                                    </span>
                                                    <span className="font-medium">
                                                        $
                                                        {transaction.amount?.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <p>
                                                    {transaction.status ===
                                                    'pending'
                                                        ? 'Created on:'
                                                        : 'Updated:'}
                                                    <span className="ml-1">
                                                        {formatDate(
                                                            transaction.updated_at ||
                                                                transaction.created_at
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {showReviewModal && (
                        <ReviewCreateModal
                            setShowModal={setShowReviewModal}
                            setUpdate={setUpdate}
                            productId={activeProductId}
                        />
                    )}
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No transactions found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {activeRole === 'buyer'
                            ? "You haven't made any purchases yet."
                            : "You haven't sold any products yet."}
                    </p>
                    {activeRole === 'buyer' && (
                        <div className="mt-6">
                            <Link
                                to="/products"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Browse Products
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TransactionsList;
