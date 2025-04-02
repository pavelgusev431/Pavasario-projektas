import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserAvatar } from '../../../helpers/updateUserInfo';

const ModalPicture = ({ user, showModal, setShowModal }) => {
    const { id } = user;

    const availableTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/webp',
        'image/svg',
    ];

    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    const submitHandler = async (data) => {
        const file = data.picture[0];
        console.log(file.type);
        if (!availableTypes.includes(file.type)) {
            setError('Invalid file type');
            return;
        }
        try {
            await updateUserAvatar(id, data);
            setError('');
            setValue('file', '');
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
                        Edit Picture
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
                            type="file"
                            {...register('file', {
                                required: 'This field is required',
                                onChange: () => {
                                    setError('');
                                    clearErrors('file');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.file && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.file.message}
                            </p>
                        )}
                    </div>
                    <span>{error}</span>
                    <input
                        type="submit"
                        value={'Submit new picture'}
                        className="bg-purple-500 mt-2 rounded text-center text-white"
                    />
                </form>
            </dialog>
        </div>
    );
};

export default ModalPicture;
