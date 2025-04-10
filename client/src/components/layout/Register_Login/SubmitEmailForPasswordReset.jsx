import { useForm } from 'react-hook-form';
import { sendEmail } from '../../../helpers/passwordReset.js';
import { ToastContainer, toast } from 'react-toastify';

const SubmitEmailForPasswordReset = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const send = async (data) => {
        await sendEmail(data.email);
        toast.success('Password reset email sent!', {
            position: 'top-center',
            autoClose: 10000,
            style: {
                background: '#161D2F',
                color: '#FFFFFF',
            },
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
    };

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit(send)}>
                <div className="mb-4">
                    <input
                        className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email is required',
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-3 text-white bg-[#D30043] rounded-lg hover:bg-gray-800 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SubmitEmailForPasswordReset;
