import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserInfo } from '../../../helpers/updateUserInfo';

const ModalUsername = ({ user, showModal, setShowModal }) => {
    const { id, username } = user;

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
            await updateUserInfo(id, data);
            setError('');
            setValue('username', '');
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
                    <h3 className="bg-none rounded my-0 p-2 w-50 justify-self-center">
                        Edit username
                    </h3>
                    <button
                        className="bg-none rounded my-0 p-2 w-10 justify-self-center"
                        onClick={handleClose}
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
                            type="username"
                            placeholder={username}
                            {...register('username', {
                                required: 'This field is required',
                                pattern: {
                                    value: /^[A-Za-z]\w+$/,
                                    message:
                                        'Username must contain only letters, numbers and underscores',
                                },
                                onChange: () => {
                                    setError('');
                                    clearErrors('username');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                    <input
                        type="submit"
                        value={'Submit new username'}
                        className="bg-purple-500 mt-2 rounded text-center text-white"
                    />
                    {error && <span>{error}</span>}
                </form>
            </dialog>
        </div>
    );
};

export default ModalUsername;
