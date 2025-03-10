import { sendNewPassword } from '../../../helpers/passwordReset.js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { sha1 } from 'js-sha1';
import { sha256 } from 'js-sha256';

const PasswordReset = () => {
    const navigate = useNavigate();
    const { userid, salt } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const sendPassword = async (data) => {
        const password = data.password;
        const hashedPassword = sha256(sha1(password));
        console.log(hashedPassword);
        await sendNewPassword(userid, salt, hashedPassword);
        alert('Password changed');
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit(sendPassword)}>
                    <h1 className="text-3xl font-semibold text-center mb-5">
                        Password Reset
                    </h1>
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
                            type="password"
                            placeholder="Password"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
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
        </div>
    );
};

export default PasswordReset;
