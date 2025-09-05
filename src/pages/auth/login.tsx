import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../../components/ui/form-components';
import Button from '../../components/ui/button';
import { useLogin } from '@/hooks/use-auth';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
   const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            await loginMutation.mutateAsync(data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <span className='flex justify-center'>
                    <img src="/Logo.png" alt="" />
                </span>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-[600] text-[#2D2F30]">
                        Login to your account
                    </h2>
                
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormInput
                            id="email"
                            label="Email"
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

                        <FormInput
                            id="password"
                            label="Password"
                            type="password"
                            required
                            autoComplete="current-password"
                            placeholder='Enter password'
                            error={errors.password}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full"
                            size="lg"
                        >
                            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="text-sm">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-[#2D2F30] transition-colors"
                            >
                                Did you forget your password? <b className='text-[#FB8500]'>Reset it</b>
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
