import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import getFileTypes from '../../../helpers/getFileTypes.js';
import createComment from '../../../helpers/createComment.js';

export default function ReviewCreateModal({ showModal, setShowModal }) {
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
    } = useForm();

    const submitHandler = async (data) => {
        try {
            const formData = new FormData();
            formData.append('product_id', data.product_id);
            formData.append('comment', data.comment.trim());
            formData.append('stars', data.stars);
            if (data.images && data.images.length > 0) {
                Array.from(data.images).forEach((file) => {
                    formData.append('images', file); // Siunčiame failus kaip 'images'
                });
            }

            console.log('Siunčiami duomenys:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            await createComment(formData);
            setError('');
            setValue('product_id', '');
            setValue('comment', '');
            setValue('stars', '');
            setValue('images', '');
            setShowModal(false);
        } catch (error) {
            console.error('Klaida iš backend:', error.response?.data);
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
                        Sukurti naują atsiliepimą
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
                    encType="multipart/form-data"
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
                                minLength: {
                                    value: 1,
                                    message: 'Komentaras turi būti bent 1 simbolio ilgumo',
                                },
                                maxLength: {
                                    value: 255,
                                    message: 'Komentaras negali viršyti 255 simbolių',
                                },
                                validate: {
                                    isString: (value) =>
                                        typeof value === 'string' || 'Komentaras turi būti tekstas',
                                    allowedCharacters: (value) =>
                                        /^[A-Za-z0-9ąčęėįšųūž\s.,!?()-]*$/.test(value) ||
                                        'Leidžiami tik raidės, skaičiai, lietuviški simboliai ir tam tikri ženklai (.,!?()- ir tarpai)',
                                },
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
                        <input
                            type="number"
                            placeholder="Įvertinimas (1-5)"
                            {...register('stars', {
                                required: 'Įvertinimas yra privalomas',
                                min: {
                                    value: 1,
                                    message: 'Įvertinimas turi būti bent 1',
                                },
                                max: {
                                    value: 5,
                                    message: 'Įvertinimas negali būti didesnis nei 5',
                                },
                                valueAsNumber: true,
                                validate: (value) =>
                                    Number.isInteger(value) || 'Įvertinimas turi būti sveikasis skaičius',
                                onChange: () => {
                                    setError('');
                                    clearErrors('stars');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.stars && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.stars.message}
                            </p>
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
                                    fileSize: (value) => {
                                        if (!value || value.length === 0) return true; // Neprivalomas laukas
                                        return Array.from(value).every(
                                            (file) => file.size <= 2000000
                                        ) || 'Failo dydis turi būti mažesnis nei 2MB';
                                    },
                                    fileType: (value) => {
                                        if (!value || value.length === 0) return true; // Neprivalomas laukas
                                        return Array.from(value).every((file) =>
                                            availableFileTypes.includes(file.type)
                                        ) || `Leidžiami failų formatai: ${strippedAvailableFileTypes}`;
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