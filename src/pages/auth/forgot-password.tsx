import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../../components/ui/form-components';
import Button from '../../components/ui/button';
import { useForgotPassword } from '../../hooks/use-auth';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const forgotPasswordMutation = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordFormData>();

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            await forgotPasswordMutation.mutateAsync(data);
            navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
        } catch (error) {
            console.error('Forgot password error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <span className='flex justify-center pb-6'>
                    <img src="/Logo.png" alt="" />
                </span>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset Your Password
                    </h2>
                    <p className="mt-4 text-center font-[400] text-base text-[#525454]">
                        Let's get you back in! Just enter your email, and we'll send you a code
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormInput
                            id="email"
                            label="Email address"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder='Enter email'
                            error={errors.email}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            disabled={forgotPasswordMutation.isPending}
                            className="w-full"
                            size="lg"
                        >
                            {forgotPasswordMutation.isPending ? 'Sending...' : 'Continue'}
                        </Button>
                    </div>

                    <div className="text-center text-sm">
                        <Link
                            to="/"
                            className="font-medium text-[#2D2F30] transition-colors"
                        >
                            Remembered your password? <b className='text-[#FB8500]'>Login here</b>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
