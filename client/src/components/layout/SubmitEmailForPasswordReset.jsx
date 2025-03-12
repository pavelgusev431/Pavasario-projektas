import { useForm } from 'react-hook-form';
import { sendEmail } from '../../helpers/passwordReset.js';

const SubmitEmailForPasswordReset = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const send = async (data) => {
        const response = await sendEmail(data.email);
        console.log(response);
        alert('Password reset email sent');
    };

    return (
        <div>
            <form onSubmit={handleSubmit(send)}>
                <div className="mb-4">
                    <input
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SubmitEmailForPasswordReset;
