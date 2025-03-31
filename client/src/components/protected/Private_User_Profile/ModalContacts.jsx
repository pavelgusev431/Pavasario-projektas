import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserInfo } from '../../../helpers/updateUserInfo';

const ModalContacts = ({ user, showModal, setShowModal }) => {
    const { id, contacts } = user;

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
            setValue('contacts', '');
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
                        Edit contacts
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
                        <textarea
                            type="text"
                            placeholder={
                                contacts || 'Phone number, facebook, twitter...'
                            }
                            {...register('contacts', {
                                required: 'This field is required',
                                onChange: () => {
                                    setError('');
                                    clearErrors('contacts');
                                },
                            })}
                            className="rounded p-1 border-1 border-slate-300 w-full h-25"
                        />
                        {errors.contacts && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.contacts.message}
                            </p>
                        )}
                    </div>
                    <span>{error}</span>
                    <input
                        type="submit"
                        value={'Submit new contacts'}
                        className="bg-purple-500 mt-2 rounded text-center text-white"
                    />
                </form>
            </dialog>
        </div>
    );
};

export default ModalContacts;
