import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import loginMe from '../../../helpers/loginMe.js';
import url from '../../../helpers/getURL.js';
import { toast } from 'react-toastify';

const TransactionDetail = () => {
    const { id } = useParams();
    const [transactionData, setTransactionData] = useState({
        transaction: null,
        history: [],
        wallet: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const navigate = useNavigate();

    const safeGet = (obj, path, defaultValue = null) => {
        return path
            .split('.')
            .reduce(
                (acc, part) =>
                    acc && acc[part] !== undefined ? acc[part] : defaultValue,
                obj
            );
    };

    useEffect(() => {
        checkAuthAndLoadData();
    }, [id]);

    const checkAuthAndLoadData = async () => {
        try {
            setLoading(true);
            const userResponse = await loginMe();
            console.log('Login response:', userResponse);

            if (!userResponse?.data?.status === 'success') {
                console.log('User not authenticated');
                navigate('/');
                return;
            }

            const role = userResponse.data.data.role;
            const userId = userResponse.data.data.id;
            setUserRole(role);
            setUserId(userId);
            console.log('User role:', role);
            console.log('User ID:', userId);

            await fetchTransactionDetails();
        } catch (err) {
            console.error('Authentication error:', err);

            if (err.response?.status === 403) {
                setError('You do not have permission to view this transaction');
            } else if (err.response?.status === 401) {
                navigate('/');
            } else {
                setError('Failed to authenticate. Please log in again.');
            }
            setLoading(false);
        }
    };

    const fetchTransactionDetails = async () => {
        try {
            const response = await axios.get(url(`transactions/${id}`), {
                withCredentials: true,
            });

            console.log('Transaction data:', response.data);

            if (response.data && response.data.status === 'success') {
                const sanitizedData = {
                    transaction: response.data.data.transaction || null,
                    history: response.data.data.history || [],
                    wallet: response.data.data.wallet || null,
                };
                setTransactionData(sanitizedData);
                setError(null);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Error fetching transaction:', err);

            if (err.response?.status === 403) {
                setError('You do not have permission to view this transaction');
            } else if (err.response?.status === 404) {
                setError('Transaction not found');
            } else {
                setError(
                    err.response?.data?.message ||
                        'Failed to load transaction details'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

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

    const handleStatusUpdate = async (newStatus) => {
        try {
            await axios.patch(
                url(`transactions/${id}/status`),
                { status: newStatus },
                { withCredentials: true }
            );

            fetchTransactionDetails();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    'Failed to update transaction status'
            );
        }
    };

    const showCancelConfirmation = () => {
        setShowCancelModal(true);
    };

    const handleCancelTransaction = async () => {
        try {
            setCancelLoading(true);

            await axios.patch(
                url(`transactions/${id}/cancel`),
                {},
                { withCredentials: true }
            );

            toast.success(
                'Transaction cancelled successfully. Your funds have been returned.'
            );

            await fetchTransactionDetails();

            setShowCancelModal(false);
        } catch (err) {
            console.error('Error cancelling transaction:', err);
            toast.error(
                err.response?.data?.message || 'Failed to cancel transaction'
            );
        } finally {
            setCancelLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                Loading transaction details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
                <p>Error: {error}</p>
                <button
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={fetchTransactionDetails}
                >
                    Retry
                </button>
                <Link
                    to="/transactions"
                    className="ml-4 text-blue-500 hover:underline"
                >
                    Back to Transactions
                </Link>
            </div>
        );
    }

    const { transaction, history, wallet } = transactionData;

    if (!transaction) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
                <p>Error: Transaction data is missing</p>
                <Link
                    to="/transactions"
                    className="text-blue-500 hover:underline"
                >
                    Back to Transactions
                </Link>
            </div>
        );
    }

    const canCancel =
        transaction.status === 'pending' && transaction.buyer_id === userId;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <Link
                    to={
                        userRole === 'courier'
                            ? '/courier-dashboard'
                            : '/orders'
                    }
                    className="text-blue-500 hover:underline"
                >
                    ← Back to{' '}
                    {userRole === 'courier' ? 'Courier Dashboard' : 'Orders'}
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">
                            Transaction #{safeGet(transaction, 'id', 'N/A')}
                        </h1>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(transaction.status)}`}
                        >
                            {transaction.status || 'Unknown'}
                        </span>
                    </div>
                </div>

                <div className="p-4 grid md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-3">
                            Transaction Details
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Amount</p>
                                <p className="font-medium">
                                    ${(transaction.amount || 0).toFixed(2)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Quantity
                                </p>
                                <p className="font-medium">
                                    {transaction.quantity || 0}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Created</p>
                                <p className="font-medium">
                                    {formatDate(transaction.created_at)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Due Date
                                </p>
                                <p className="font-medium">
                                    {formatDate(transaction.due_date)}
                                </p>
                            </div>
                        </div>

                        <h3 className="text-md font-semibold mb-2">Product</h3>
                        <div className="flex items-center mb-4">
                            {transaction.Product?.image_url && (
                                <img
                                    src={transaction.Product.image_url}
                                    alt={transaction.Product?.name || 'Product'}
                                    className="w-16 h-16 object-cover rounded-md mr-3"
                                />
                            )}
                            <div>
                                <p className="font-medium">
                                    {transaction.Product?.name ||
                                        'Unknown Product'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    $
                                    {(transaction.Product?.price || 0).toFixed(
                                        2
                                    )}{' '}
                                    per unit
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-3">
                            Participants
                        </h2>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-1">Buyer</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                    <span className="text-blue-700 font-bold">
                                        {safeGet(
                                            transaction,
                                            'buyer.username',
                                            'U'
                                        )
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {safeGet(
                                            transaction,
                                            'buyer.username',
                                            'Unknown Buyer'
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {safeGet(
                                            transaction,
                                            'buyer.email',
                                            'No email'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-1">Seller</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                    <span className="text-green-700 font-bold">
                                        {safeGet(
                                            transaction,
                                            'seller.username',
                                            'S'
                                        )
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {safeGet(
                                            transaction,
                                            'seller.username',
                                            'Unknown Seller'
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {safeGet(
                                            transaction,
                                            'seller.email',
                                            'No email'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {transaction.courier && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-1">
                                    Courier
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                                        <span className="text-purple-700 font-bold">
                                            {safeGet(
                                                transaction,
                                                'courier.username',
                                                'C'
                                            )
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {safeGet(
                                                transaction,
                                                'courier.username',
                                                'Unknown Courier'
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {safeGet(
                                                transaction,
                                                'courier.email',
                                                'No email'
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {wallet && (
                            <div className="mt-6 p-3 bg-gray-50 rounded-md">
                                <h3 className="text-md font-semibold mb-2">
                                    Payment Status
                                </h3>
                                <p className="text-sm">
                                    <span className="text-gray-600">
                                        Amount in escrow:
                                    </span>{' '}
                                    ${(wallet.amount_held || 0).toFixed(2)}
                                </p>
                                <p className="text-sm">
                                    <span className="text-gray-600">
                                        Status:
                                    </span>{' '}
                                    {wallet.is_released
                                        ? 'Released'
                                        : 'Held in escrow'}
                                </p>
                                {wallet.is_released &&
                                    wallet.released_to_user_id && (
                                        <>
                                            <p className="text-sm">
                                                <span className="text-gray-600">
                                                    Released to:
                                                </span>{' '}
                                                {wallet.released_to_user_id ===
                                                (transaction.buyer?.id ?? null)
                                                    ? 'Buyer'
                                                    : wallet.released_to_user_id ===
                                                        transaction.seller.id
                                                      ? 'Seller'
                                                      : 'Unknown'}
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-gray-600">
                                                    Released on:
                                                </span>{' '}
                                                {formatDate(
                                                    wallet.release_timestamp
                                                )}
                                            </p>
                                        </>
                                    )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Buyer Actions - Allow cancellation if transaction is pending (no courier assigned) */}
                {canCancel && (
                    <div className="p-4 border-t">
                        <h3 className="text-lg font-semibold mb-3">
                            Buyer Actions
                        </h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={showCancelConfirmation}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Cancel Order
                            </button>
                            <p className="text-sm text-gray-500 italic mt-2">
                                * You can cancel this order as no courier has
                                been assigned yet. Your funds will be returned
                                immediately.
                            </p>
                        </div>
                    </div>
                )}

                {/* Courier Actions - Only shown if user is the assigned courier */}
                {userRole === 'courier' &&
                    transaction.courier &&
                    transaction.courier.id === userId && (
                        <div className="p-4border-t">
                            <h3 className="text-lg font-semibold mb-3">
                                Courier Actions
                            </h3>
                            <div className="flex space-x-2">
                                {transaction.status === 'assigned' && (
                                    <button
                                        onClick={() =>
                                            handleStatusUpdate('in progress')
                                        }
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                                    >
                                        Start Delivery
                                    </button>
                                )}

                                {transaction.status === 'in progress' && (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleStatusUpdate('done')
                                            }
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                        >
                                            Complete Delivery
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleStatusUpdate('cancelled')
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                            Cancel Delivery
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
            </div>

            {/* Transaction History */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">
                        Transaction History
                    </h2>
                </div>

                <div className="p-4">
                    {history && history.length > 0 ? (
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200"></div>

                            {/* Timeline events */}
                            <ul className="space-y-6">
                                {history.map((event, index) => (
                                    <li
                                        key={event.id || index}
                                        className="relative pl-10"
                                    >
                                        {/* Timeline dot */}
                                        <div
                                            className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center 
                      ${
                          index === 0
                              ? 'bg-blue-100'
                              : event.new_status === 'done'
                                ? 'bg-green-100'
                                : event.new_status === 'cancelled'
                                  ? 'bg-red-100'
                                  : event.new_status === 'expired'
                                    ? 'bg-gray-100'
                                    : 'bg-blue-50'
                      }`}
                                        >
                                            <span
                                                className={`text-sm font-medium 
                        ${
                            index === 0
                                ? 'text-blue-700'
                                : event.new_status === 'done'
                                  ? 'text-green-700'
                                  : event.new_status === 'cancelled'
                                    ? 'text-red-700'
                                    : event.new_status === 'expired'
                                      ? 'text-gray-700'
                                      : 'text-blue-600'
                        }`}
                                            >
                                                {/* First letter of status */}
                                                {(event.new_status || 'U')
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Event content */}
                                        <div className="bg-gray-50 p-3 rounded-md">
                                            <div className="flex justify-between items-center mb-1">
                                                <span
                                                    className={`px-2 py-0.5 rounded text-xs font-semibold ${getStatusColor(event.new_status || '')}`}
                                                >
                                                    {event.new_status ||
                                                        'Unknown'}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(
                                                        event.timestamp
                                                    )}
                                                </span>
                                            </div>

                                            <p className="text-sm">
                                                {event.previous_status
                                                    ? `Status changed from "${event.previous_status}" to "${event.new_status}"`
                                                    : `Transaction created with status "${event.new_status || 'Unknown'}"`}
                                            </p>

                                            {event.notes && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Note: {event.notes}
                                                </p>
                                            )}

                                            {event.user && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    By:{' '}
                                                    {event.user.username ||
                                                        'Unknown User'}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            No history available for this transaction.
                        </p>
                    )}
                </div>
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Cancel Order</h3>
                        <p className="mb-4">
                            Are you sure you want to cancel this order? Your
                            funds will be returned to your balance.
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                                disabled={cancelLoading}
                            >
                                No, Keep Order
                            </button>
                            <button
                                onClick={handleCancelTransaction}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                disabled={cancelLoading}
                            >
                                {cancelLoading
                                    ? 'Cancelling...'
                                    : 'Yes, Cancel Order'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionDetail;
