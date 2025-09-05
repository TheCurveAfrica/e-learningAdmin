import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FormInput } from '../../components/ui/form-components';
import Button from '../../components/ui/button';
import { useVerifyEmail, useResendCode } from '../../hooks/use-auth';

interface VerifyEmailFormData {
    code: string;
}

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email') || '';

    const verifyEmailMutation = useVerifyEmail();
    const resendCodeMutation = useResendCode();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<VerifyEmailFormData>();

    const onSubmit = async (data: VerifyEmailFormData) => {
        try {
            await verifyEmailMutation.mutateAsync({
                email,
                code: data.code
            });
            // Navigate to reset password page with email parameter
            navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch (error) {
            console.error('Verification error:', error);
        }
    };

    const handleResendCode = async () => {
        try {
            await resendCodeMutation.mutateAsync({ email });
        } catch (error) {
            console.error('Resend error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <span className='flex justify-center pb-6'>
                    <img src="/Logo.png" alt="" />
                </span>
                <div className='m-0'>
                    <h2 className="mt-6 text-center text-3xl font-[600] text-[#2D2F30]">
                        Check Your Email
                    </h2>
                    <p className="mt-4 text-center font-[400] text-base text-[#525454]">
                        Enter the 6-digit code we just sent to{' '}
                        <span className="font-medium text-[#2D2F30]">{email}</span>
                    </p>
                </div>
                <div className="text-center mt-3 flex items-center justify-center gap-1">
                    <p className="text-sm text-[#525454]">
                        Didn’t get it? Check your spam folder. or
                    </p>
                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resendCodeMutation.isPending}
                        className="font-[400] text-[#2D2F30] p-0  text-sm transition-colors hover:opacity-80"
                    >
                        {resendCodeMutation.isPending ? 'Sending...' : (
                            <> <b className='text-[#FB8500]'>Resend code</b></>
                        )}
                    </button>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormInput
                            id="code"
                            label="Verification Code"
                            type="text"
                            required
                            placeholder="Enter your 6-digit Code"
                            maxLength={6}
                            error={errors.code}
                            {...register('code', {
                                required: 'Verification code is required',
                                pattern: {
                                    value: /^[0-9]{6}$/,
                                    message: 'Please enter a valid 6-digit code'
                                }
                            })}
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            disabled={verifyEmailMutation.isPending}
                            className="w-full"
                            size="lg"
                        >
                            {verifyEmailMutation.isPending ? 'Verifying...' : 'Verify Code'}
                        </Button>
                    </div>


                    <div className="text-center text-sm">
                        <Link
                            to="/"
                            className="font-[400] text-[#2D2F30] transition-colors"
                        >
                            Remembered your password? <b className='text-[#FB8500]'>Login here</b>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;
