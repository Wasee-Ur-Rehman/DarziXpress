import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import loginIllustration from '@/assets/images/login-illustration.svg';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token if needed
                localStorage.setItem('authToken', data.token);

                // Navigate based on user type
                if (data.userType === 'customer') {
                    navigate('/customer');
                } else if (data.userType === 'tailor') {
                    navigate('/tailor');
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Server error, please try again later.');
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="flex w-full max-w-5xl lg:max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden max-h-[90vh]"> {/* Added max-h-[90vh] */}
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 lg:w-[45%] p-8 sm:p-12 flex flex-col overflow-y-auto"> {/* Removed justify-center, added overflow-y-auto */}
                    {/* Branding */}
                    <div className="mb-8">
                        <h1
                            className="text-3xl font-extrabold text-indigo-600 cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            DarziXpress
                        </h1>
                    </div>

                    {/* Heading Text */}
                    <div className="text-left mb-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Welcome Back!</h2>
                        <p className="text-md sm:text-lg text-gray-600 mt-2">Login to continue to DarziXpress.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="w-full space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-end text-sm">
                            <a
                                href="#" // Replace with actual forgot password link
                                className="font-medium text-indigo-600 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 text-white rounded-lg py-3 text-base font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        >
                            Login
                        </Button>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <span
                                className="text-indigo-600 cursor-pointer font-medium hover:underline"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </span>
                        </p>
                    </form>
                </div>

                {/* Right Side - Illustration */}
                <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-indigo-50 items-center justify-center p-10 lg:p-16">
                    <img
                        src={loginIllustration}
                        alt="Login Illustration"
                        className="w-full max-w-md lg:max-w-lg object-contain max-h-full" // Added max-h-full
                    />
                </div>
            </div>
        </div>
    );
}