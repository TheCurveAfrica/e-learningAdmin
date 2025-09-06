import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FormInput } from '../../components/ui/form-components';
import Button from '../../components/ui/button';
import { useResetPassword } from '../../hooks/use-auth';
import { ResetPasswordFormData, resetPasswordValidationSchema, confirmPasswordValidationSchema } from '../../schemas/auth-schemas';

const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email') || '';

    const resetPasswordMutation = useResetPassword();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<ResetPasswordFormData>();

    const password = watch('password');

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            await resetPasswordMutation.mutateAsync({
                email,
                password: data.password
            });
            navigate('/login');
        } catch (error) {
            console.error('Reset password error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <span className='flex justify-center pb-6'>
                    <img src="/Logo.png" alt="" />
                </span>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-[600] text-[#2D2F30]">
                        New Password
                    </h2>
                    <p className="mt-4 text-center font-[400] text-base text-[#525454]">
                        All set! Now create a new password.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormInput
                            id="password"
                            label="Password"
                            type="password"
                            required
                            placeholder="New password"
                            autoComplete="new-password"
                            error={errors.password}
                            {...register('password', resetPasswordValidationSchema.password)}
                        />

                        <FormInput
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            required
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            error={errors.confirmPassword}
                            {...register('confirmPassword', confirmPasswordValidationSchema(password))}
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            disabled={resetPasswordMutation.isPending}
                            className="w-full"
                            size="lg"
                        >
                            {resetPasswordMutation.isPending ? 'Updating Password...' : 'Update Password'}
                        </Button>
                    </div>

                    <div className="text-center text-sm">
                        <Link
                            to="/"
                            className="font-[400] text-[#2D2F30] transition-colors"
                        >
                            Remember your password? <b className='text-[#FB8500]'>Login here</b>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
