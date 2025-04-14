import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import getFileTypes from '../../../helpers/getFileTypes.js';
import createComment from '../../../helpers/createComment.js';
import { FaStar} from 'react-icons/fa';
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
            setShowModal(false);
        } catch (error) {
            setError(error.response?.data?.message || 'Nepavyko sukurti komentaro');
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div
            className="fixed w-dvw h-dvh z-40 flex flex-col place-items-center left-0 top-25"
            style={{ backgroundColor: 'rgba(127, 127, 127, 0.25)' }}
        >
            <dialog
                open={showModal}
                className="bg-none rounded p-2 my-15 w-75 justify-self-center"
            >
                <div className="flex flex-row justify-between">
                    <h3 className="bg-none rounded p-2 my-0 w-50 justify-self-center">
                        Create new review
                    </h3>
                    <button
                        onClick={handleClose}
                        className="bg-none rounded p-2 my-0 w-10"
                    >
                        X
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="flex flex-col"
                >
                    <div>
                        <input
                            type="number"
                            placeholder="Produkto ID"
                            {...register('product_id', {
                                required: 'Produkto ID yra privalomas',
                                min: {
                                    value: 1,
                                    message: 'Produkto ID turi būti teigiamas skaičius',
                                },
                                valueAsNumber: true,
                                onChange: () => {
                                    setError('');
                                    clearErrors('product_id');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.product_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.product_id.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <textarea
                            placeholder="Komentaras"
                            {...register('comment', {
                                required: 'Komentaras yra privalomas',
                                onChange: () => {
                                    setError('');
                                    clearErrors('comment');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.comment.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="flex space-x-1 mb-1">
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
                        {/* Paslėptas inputas */}
                        <input
                            type="hidden"
                            {...register('stars', {
                                required: 'Įvertinimas yra privalomas',
                                min: { value: 1, message: 'Mažiausias įvertinimas yra 1' },
                                max: { value: 5, message: 'Didžiausias įvertinimas yra 5' },
                                valueAsNumber: true,
                            })}
                        />
                        {errors.stars && (
                            <p className="text-red-500 text-sm">{errors.stars.message}</p>
                        )}
                    </div>
                    <div>
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
                                            `Leidžiami failų formatai: ${strippedAvailableFileTypes}`
                                        );
                                    },
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.images && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.images.message}
                            </p>
                        )}
                    </div>
                    <span className="text-red-500 text-sm mt-1">{error}</span>
                    <input
                        type="submit"
                        value="Pateikti atsiliepimą"
                        className="bg-purple-500 mt-2 rounded text-center text-white"
                    />
                </form>
            </dialog>
        </div>
    );
}