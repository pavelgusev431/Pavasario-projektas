import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserInfo } from '../../../helpers/updateUserInfo';

const ModalEmail = ({ user, showModal, setShowModal }) => {
    const { id, email } = user;

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
            setValue('email', '');
        } catch (error) {
            setError(error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <dialog open={showModal}>
            <div>
                <h3>Edit email</h3>
                <button onClick={handleClose}></button>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <input
                        type="email"
                        placeholder={email}
                        {...register('email', {
                            required: 'This field is required',
                            validate: (value) => {
                                return (
                                    (/^[A-Za-z0-9.-]{1,64}@[A-Za-z0-9.-]{1,255}$/.test(
                                        value
                                    ) &&
                                        /^[A-Za-z0-9]([A-Za-z0-9]+[.-]*)*[A-Za-z0-9]@.*$/.test(
                                            value
                                        ) &&
                                        /^.*@([A-Za-z0-9]{2,63}[.-])+[A-Za-z]{2,}$/.test(
                                            value
                                        )) ||
                                    'Invalid email address format'
                                );
                            },
                            onChange: () => {
                                setError('');
                                clearErrors('email');
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <span>{error}</span>
                <input type="submit" />
            </form>
        </dialog>
    );
};

export default ModalEmail;
