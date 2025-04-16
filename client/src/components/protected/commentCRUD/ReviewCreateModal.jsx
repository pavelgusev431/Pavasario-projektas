import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import getFileTypes from '../../../helpers/getFileTypes.js';
import createComment from '../../../helpers/createComment.js';
import { FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export default function ReviewCreateModal({ showModal, setShowModal, setUpdate }) {
    const [availableFileTypes, setAvailableFileTypes] = useState([]);
    const [strippedAvailableFileTypes, setStrippedAvailableFileTypes] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFileTypes = async () => {
            const fileTypes = await getFileTypes();
            setAvailableFileTypes(fileTypes);
            const strippedFileTypes = fileTypes
                .map((fileType) => fileType.split('/')[1].toUpperCase())
                .join(', ');
            setStrippedAvailableFileTypes(strippedFileTypes);
        };
        fetchFileTypes();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
        watch,
    } = useForm();

    const submitHandler = async (data) => {
        try {
            await createComment(data);
            setUpdate((update) => update + 1);
            setError('');
            setValue('product_id', '');
            setValue('comment', '');
            setValue('stars', '');
            setValue('images', '');
            toast.success('Atsiliepimas sėkmingai pateiktas!', {
                position: 'bottom-right',
                autoClose: 2000,
                style: { background: '#161D2F', color: '#FFFFFF' },
                hideProgressBar: true,
            });
            setShowModal(false);
        } catch (error) {
            setError(error.response?.data?.message || 'Nepavyko sukurti komentaro');
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-stone-900/50 mt-20">
            <ToastContainer />
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex dark:bg-gray-800 items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-xl dark:text-white font-semibold text-gray-800">
                        Create New Review
                    </h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit(submitHandler)} className="dark:bg-gray-800 p-6">
                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Product ID"
                            {...register('product_id', {
                                required: 'Product ID is required',
                                min: {
                                    value: 1,
                                    message: 'Product ID must be a positive number',
                                },
                                valueAsNumber: true,
                                onChange: () => {
                                    setError('');
                                    clearErrors('product_id');
                                },
                            })}
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        {errors.product_id && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.product_id.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <textarea
                            placeholder="Comment"
                            {...register('comment', {
                                required: 'Comment is required',
                                onChange: () => {
                                    setError('');
                                    clearErrors('comment');
                                },
                            })}
                            rows="3"
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.comment.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                            Rating
                        </label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => {
                                        setValue('stars', star);
                                        clearErrors('stars');
                                        setError('');
                                    }}
                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        size={28}
                                        color={watch('stars') >= star ? '#facc15' : '#d1d5db'}
                                        className="transition-colors hover:scale-110"
                                    />
                                </button>
                            ))}
                        </div>
                        <input
                            type="hidden"
                            {...register('stars', {
                                required: 'Rating is required',
                                min: { value: 1, message: 'Minimum rating is 1' },
                                max: { value: 5, message: 'Maximum rating is 5' },
                                valueAsNumber: true,
                            })}
                        />
                        {errors.stars && (
                            <p className="text-red-500 text-sm mt-2">{errors.stars.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                            Upload Images ({strippedAvailableFileTypes})
                        </label>
                        <input
                            type="file"
                            multiple
                            {...register('images', {
                                onChange: () => {
                                    setError('');
                                    clearErrors('images');
                                },
                                validate: {
                                    fileType: (value) => {
                                        if (!value || !Array.from(value)[0]) return true;
                                        return (
                                            availableFileTypes.includes(Array.from(value)[0].type) ||
                                            `Allowed file types: ${strippedAvailableFileTypes}`
                                        );
                                    },
                                },
                            })}
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        {errors.images && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.images.message}
                            </p>
                        )}
                    </div>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
}
