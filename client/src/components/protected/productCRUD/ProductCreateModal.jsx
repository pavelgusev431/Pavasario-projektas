import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ProductCreateModal = ({showModal, setShowModal}) => {
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    const submitHandler = async (data) => {
        try {
            console.log(data);
            setError('');
            setValue('name', '');
        } catch (error) {
            setError(error);
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
                        Edit email
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
                            type="text"
                            placeholder="Name of the product"
                            {...register('name', {
                                required: 'This field is required',
                                onChange: () => {
                                    setError('');
                                    clearErrors('name');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder={0}
                            {...register('price', {
                                required: 'This field is required',
                                min: 0,
                                validate: (value)=>{
                                    return value != 0 || "Price cannot be 0";
                                },
                                onChange: () => {
                                    setError('');
                                    clearErrors('price');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <textarea
                            placeholder="Description"
                            {...register('description', {
                                required: 'This field is required',
                                onChange: () => {
                                    setError('');
                                    clearErrors('description');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Number of items in stock"
                            {...register('amount_in_stock', {
                                required: 'This field is required',
                                min: 0,
                                onChange: () => {
                                    setError('');
                                    clearErrors('amount_in_stock');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.amount_in_stock && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.amount_in_stock.message}
                            </p>
                        )}
                    </div>
                    <span>{error}</span>
                    <input
                        type="submit"
                        value={'Submit new email'}
                        className="bg-purple-500 mt-2 rounded text-center text-white"
                    />
                </form>
            </dialog>
        </div>
    );
};

export default ProductCreateModal;
