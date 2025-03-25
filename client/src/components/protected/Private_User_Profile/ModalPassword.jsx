import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updatePassword } from '../../../helpers/updateUserInfo.js';

const ModalPassword = ({ user, showModal, setShowModal }) => {
    const { id } = user;

    const [error, setError] = useState('');

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
            await updatePassword(id, { ...data, repeatPassword: undefined });
            setError('');
            setValue('oldPassword', '');
            setValue('newPassword', '');
            setValue('repeatPassword', '');
        } catch (error) {
            setError(error);
            console.log(error);
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
                        Edit password
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
                            type="password"
                            placeholder="Old password"
                            {...register('oldPassword', {
                                required: 'This field is required',
                                minLength: {
                                    value: 7,
                                    message: 'Password is too short',
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]{7,}$/,
                                    message:
                                        "Password must only contain letters, numbers and these special characters: $&+,:;=?@#|'<>.^*()%!-",
                                },
                                validate: (value) => {
                                    return (
                                        (/^.*[A-Z].*$/.test(value) &&
                                            /^.*\d.*$/.test(value) &&
                                            /^.*[$&+,:;=?@#|'<>.^*()%!-].*$/.test(
                                                value
                                            )) ||
                                        'Password must contain at least 1 capital letter, 1 number and 1 special character'
                                    );
                                },
                                onChange: () => {
                                    setError('');
                                    clearErrors('oldPassword');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.oldPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.oldPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="New password"
                            {...register('newPassword', {
                                required: 'This field is required',
                                minLength: {
                                    value: 7,
                                    message: 'Password is too short',
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]{7,}$/,
                                    message:
                                        "Password must only contain letters, numbers and these special characters: $&+,:;=?@#|'<>.^*()%!-",
                                },
                                validate: (value) => {
                                    return (
                                        (/^.*[A-Z].*$/.test(value) &&
                                            /^.*\d.*$/.test(value) &&
                                            /^.*[$&+,:;=?@#|'<>.^*()%!-].*$/.test(
                                                value
                                            )) ||
                                        'Password must contain at least 1 capital letter, 1 number and 1 special character'
                                    );
                                },
                                onChange: () => {
                                    setError('');
                                    clearErrors('newPassword');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Repeat new password"
                            {...register('repeatPassword', {
                                required: 'This field is required',
                                validate: (value) =>
                                    value === watch('newPassword') ||
                                    'Passwords must match',
                                onChange: () => {
                                    setError('');
                                    clearErrors('repeatPassword');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full"
                        />
                        {errors.repeatPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.repeatPassword.message}
                            </p>
                        )}
                    </div>
                    {error && <span>{error}</span>}
                    <input
                        type="submit"
                        value={'Submit new password'}
                        className="bg-purple-500 mt-2 rounded text-center text-white"
                    />
                </form>
            </dialog>
        </div>
    );
};

export default ModalPassword;
