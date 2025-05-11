
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, KeyRound, Mail, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import axios from 'axios';

export default function SignUpCustomer() {
    const [email, setEmail] = React.useState('');
    const [emailEntered, setEmailEntered] = React.useState(false);
    const [otp, setOtp] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordHidden, setPasswordHidden] = React.useState(true);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [uuid, setUuid] = React.useState('');

    const SERVER = import.meta.env.SERVER || 'http://localhost:5000';

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if ((email && email.includes('@') && email.includes('.')) === false) {
            toast.error("Please enter a valid email address.", {
                description: "Please enter a valid email address to continue signing up.",
            });
            return;
        }

        axios.post(`${SERVER}/api/signup-cust/signup-req`, {
            email: email
        }).then((response) => {
            if (response.status === 400 && response.data.message === "Error: Account with this email already exists") {
                toast.error(response.data.message, {
                    description: "An account with this email already exists. Please try logging in instead.",
                });
                return;
            };

            if (response.status === 400 && response.data.message === "Email is required when sending the request") {
                toast.error(response.data.message, {
                    description: "Please enter a valid email address to continue signing up.",
                });
                return;
            };

            if (response.status === 500 && response.data.message === "Error sending OTP to Email") {
                toast.error(response.data.message, {
                    description: "An error occurred while sending the OTP. Please try again later.",
                });
                return;
            };

            if (response.status === 200 && response.data.message === "OTP already sent to this Email Address") {
                setEmailEntered(true);
                setUuid(response.data.uuid);
                toast.info(response.data.message, {
                    description: "Please check your email for the OTP and enter it to verify your account.",
                });
                return;
            };

            if (response.status === 500 && response.data.message === "Internal server error occurred") {
                toast.error(response.data.message, {
                    description: "An internal server error occurred. Please try again later.",
                });
                return;
            };

            if (response.status === 200) {
                setEmailEntered(true);
                setUuid(response.data.uuid);
                toast.success(response.data.message, {
                    description: "Please check your email for the OTP and enter it to verify your account. The OTP is valid only for 10 minutes.",
                });
                return;
            };
        }).catch((error) => {
            console.error(error);
            toast.error("An error occurred while sending the request", {
                description: "An error occurred while sending the request. We are working to fix this issue. Please try again later.",
            });
            return;
        }
        );
    }


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email');

        if (emailParam && (emailParam.includes('@') || emailParam.includes('%40')) && emailParam.includes('.')) {
            setEmail(decodeURIComponent(emailParam));
        }
    }, []);

    const handleResend = () => {
        if (uuid === '') {
            toast.error("OTP expired", {
                description: "Please enter your email address to create a new OTP.",
            });
            setEmailEntered(false);
            return;
        }

        axios.post(`${SERVER}/api/signup-cust/resend-otp`, {
            uuid: uuid
        }).then((response) => {
            if (response.status === 400 && response.data.message === "UUID is required when sending this request") {
                toast.error(response.data.message, {
                    description: "Please send the UUID to resend the OTP.",
                });
                setEmailEntered(false);
                return;
            };

            if (response.status === 400 && response.data.message === "Invalid UUID") {
                toast.success("OTP doesn't exist or has expired", {
                    description: "Please enter your email address again to create a new OTP.",
                });
                setEmailEntered(false);
                return;
            };

            if (response.status === 500 && response.data.message === "Error sending OTP to Email") {
                toast.error(response.data.message, {
                    description: "An error occurred while sending the OTP. Please try again later.",
                });
                return;
            }

            if (response.status === 500 && response.data.message === "Internal server error occurred") {
                toast.error(response.data.message, {
                    description: "An internal server error occurred. Please try again later.",
                });
                return;
            }

            if (response.status === 200) {
                toast.success(response.data.message, {
                    description: "Please check your email for the OTP and enter it to verify your account. The OTP is valid only for 10 minutes.",
                });
                setUuid(response.data.uuid);
                setEmailEntered(true);
                return;
            }


        }).catch((error) => {
            console.error(error);
            toast.error("An error occurred while sending the request", {
                description: "An error occurred while sending the request. We are working to fix this issue. Please try again later.",
            });
            return;
        }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (uuid === '' || otp.length < 6 || otp === '' || firstName === '' || lastName === '' || password === '' || email.includes('@') === false || email.includes('.') === false) {
            toast.error("Please enter all the required fields to continue signing up.", {
                description: "Please enter all the required fields to continue signing up.",
            });
            return;
        }

        console.log(uuid, otp, firstName, lastName, email, password);

        axios.post(`${SERVER}/api/signup-cust/verify-otp`, {
            uuid: uuid,
            otp: otp,
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        }).then((response) => {
            if (response.status === 400 && response.data.message === "Please enter all the required fields to continue signing up") {
                toast.error(response.data.message, {
                    description: "UUID, OTP, Firstname, Lastname, Email and Password are required."
                });
                return;
            }

            if (response.status === 400 && response.data.message === "Invalid UUID") {
                toast.error("OTP has expired. Please create a new one", {
                    description: "This OTP has expired. Please enter your email address to create a new one.",
                });
                return;
            }

            if (response.status === 400 && response.data.message === "Invalid OTP") {
                toast.error("OTP's don't match", {
                    description: "Please enter the correct OTP sent to your email address.",
                });
                return;
            }

            if (response.status === 400 && response.data.message === "OTP expired") {
                toast.error("OTP has expired. Please create a new one", {
                    description: "This OTP has expired. Please enter your email address to create a new one.",
                });
                return;
            }

            if (response.status === 500 && response.data.message === "Internal server error occurred") {
                toast.error("Internal server error occurred", {
                    description: "An internal server error occurred. Please try again later.",
                });
                return;
            }

            if (response.status === 200 && response.data.message === "User created successfully") {
                toast.promise(
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve("Success! Your account has been created successfully. Redirecting to login page...");
                            window.location.href = '/login-cust';
                        }, 4000);
                    }),
                    {
                        loading: "Creating your account. Please wait...",
                        success: (msg) => msg,
                    }
                );
                return;
            }

        }).catch((error) => {
            console.error(error);
            toast.error("An error occurred while sending the request", {
                description: "An error occurred while sending the request. We are working to fix this issue. Please try again later.",
            });
            return;
        }

        );
    }


    return (
        <div className='flex flex-row'>
            <div className="max-h-screen -z-10 absolute left-0 top-0 aspect-square w-full overflow-hidden sm:aspect-[2/1] [mask-image:radial-gradient(70%_100%_at_50%_0%,_black_70%,_transparent)] opacity-15">
                <div className="absolute inset-0 saturate-150" style={{
                    backgroundImage: "conic-gradient(from -45deg at 50% -10%, rgb(58, 139, 253) 0deg, rgb(255, 0, 0) 172.98deg, rgb(133, 90, 252) 215.14deg, rgb(255, 123, 0) 257.32deg, rgb(58, 139, 253) 360deg)"
                }}>
                </div>
                <div className="absolute inset-0 backdrop-blur-[100px]">
                </div>
            </div>
            <div className={`w-[100vw] h-screen flex col-span-1 flex-col`}>
                <div className="absolute left-4 top-3 z-10">
                    <motion.div
                        whileHover={{ rotate: 10 }}
                        className="mr-2 text-black hover:cursor-pointer"
                        onClick={() => window.location.href = '/'}
                    >
                        <Scissors size={28} />
                    </motion.div>
                </div>
                <div className='h-8'></div>
                <AnimatePresence mode="wait">
                    {emailEntered === false ? (
                        <motion.div
                            key="signup-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className='flex h-full w-full flex-col items-center justify-center'
                        >
                            <div className='relative flex w-full h-full flex-col items-center justify-center' style={{ opacity: 1 }}>
                                <div className='w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl border sm:shadow-sm'>
                                    <div className='border-b border-neutral-200 bg-white pb-6 pt-8 text-center'>
                                        <h3 className='text-lg font-semibold'>Create your account</h3>
                                    </div>
                                    <div className='bg-neutral-50 px-4 py-8 sm:px-16'>
                                        <div className='flex flex-col gap-3'>
                                            <div className='overflow-hidden' style={{ height: "286.594px" }}>
                                                <div className='h-max'>
                                                    <div className='flex flex-col gap-3 p-1'>
                                                        <div className='flex flex-col gap-2'>
                                                            <form className='flex flex-col gap-y-3'>
                                                                <div className='flex flex-row items-center justify-between gap-2'>
                                                                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                                                        required
                                                                        minLength={1}
                                                                        maxLength={25}
                                                                        name="firstName"
                                                                        type="text"
                                                                        placeholder='First Name'
                                                                        className='block w-full min-w-0 appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm' />
                                                                    <input value={lastName} onChange={(e) => setLastName(e.target.value)}
                                                                        required
                                                                        minLength={1}
                                                                        maxLength={25}
                                                                        name="lastName"
                                                                        type="text"
                                                                        placeholder='Last Name'
                                                                        className='block w-full min-w-0 appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm' />
                                                                </div>
                                                                <input
                                                                    name="email"
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    required
                                                                    placeholder='Email'
                                                                    type="email"
                                                                    className='block w-full min-w-0 appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                                                                />
                                                                <div className="relative">
                                                                    <input
                                                                        className="px-3 py-2 pr-9 w-full max-w-md rounded-md border border-neutral-300 text-neutral-900 placeholder-neutral-400 read-only:bg-neutral-100 read-only:text-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm"
                                                                        placeholder="Password"
                                                                        required
                                                                        minLength={8}
                                                                        type={passwordHidden ? 'password' : 'text'}
                                                                        name="password"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        readOnly={false}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setPasswordHidden(!passwordHidden)}
                                                                        className="absolute inset-y-0 right-0 flex items-center px-3"
                                                                        aria-label={passwordHidden ? 'Show Password' : 'Hide Password'}
                                                                    >
                                                                        {!passwordHidden ? (
                                                                            <svg height="18" width="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="size-4 text-neutral-500 hover:text-neutral-700" aria-hidden="true">
                                                                                <path d="M9 4.5C5.5 4.5 2.8 7 1.5 9c1.3 2 4 4.5 7.5 4.5s6.2-2.5 7.5-4.5c-1.3-2-4-4.5-7.5-4.5zM9 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="currentColor" />
                                                                                <circle cx="9" cy="9" r="1.5" fill="white" />
                                                                            </svg>
                                                                        ) : (
                                                                            <svg height="18" width="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="size-4 text-neutral-500 hover:text-neutral-700" aria-hidden="true">
                                                                                <g fill="currentColor">
                                                                                    <path d="M14.938,6.597c.401,.45,.725,.891,.974,1.27,.45,.683,.45,1.582,0,2.265-1.018,1.543-3.262,4.118-6.912,4.118-.549,0-1.066-.058-1.552-.162" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                                                                                    <path d="M4.956,13.044c-1.356-.876-2.302-2.053-2.868-2.912-.45-.683-.45-1.582,0-2.265,1.018-1.543,3.262-4.118,6.912-4.118,1.62,0,2.963,.507,4.044,1.206" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                                                                                    <path d="M11.579,9.956c-.278,.75-.873,1.345-1.623,1.623" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                                                                                    <path d="M7.055,10.945c-.498-.498-.805-1.185-.805-1.945,0-1.519,1.231-2.75,2.75-2.75,.759,0,1.447,.308,1.945,.805" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                                                                                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1="2" x2="16" y1="16" y2="2"></line>
                                                                                </g>
                                                                            </svg>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                                <Button
                                                                    variant='outline'
                                                                    type="submit"
                                                                    className='flex h-10 w-full items-center justify-center gap-2'
                                                                    onClick={handleEmailSubmit}
                                                                    disabled={!email || !email.includes('@') || !email.includes('.') || password.length < 6 || firstName.length < 1 || lastName.length < 1}
                                                                >
                                                                    <Mail className='text-neutral-600' size={28} />
                                                                    <div className='min-w-0 truncate font-normal text-neutral-600'>
                                                                        Continue with Email
                                                                    </div>
                                                                </Button>
                                                            </form>
                                                            <div className='my-2 flex items-center justify-center gap-2'>
                                                                <div className='grow basis-0 border-b border-neutral-300'></div>
                                                                <span className='text-xs font-normal uppercase leading-none text-neutral-500'>or</span>
                                                                <div className='grow basis-0 border-b border-neutral-300'></div>
                                                            </div>
                                                            <Button variant='outline' className='flex h-10 w-full items-center justify-center gap-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="size-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path></svg>
                                                                <div className='min-w-0 truncate text-neutral-600 font-normal'>Continue with Google</div>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-center text-sm text-neutral-500">
                                    Already have an account?&nbsp;
                                    <a className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black" href="/login-cust">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="verify-email"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className='flex h-full w-full flex-col items-center justify-center'
                        >
                            <div className='relative flex w-full h-full flex-col items-center justify-center'>
                                <div className='w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl border sm:shadow-sm'>
                                    <div className='border-b border-neutral-200 bg-white pb-6 pt-8 text-center'>
                                        <h3 className='text-lg font-semibold'>Verify your email address</h3>
                                        <p className='mt-2 text-sm text-neutral-500'>
                                            Enter the six digit verification code sent to<br />
                                            <span className='font-medium text-neutral-700'>{email}</span>
                                        </p>
                                    </div>
                                    <div className='bg-neutral-50 px-4 py-8 sm:px-16'>
                                        <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center'>
                                            <InputOTP pattern={REGEXP_ONLY_DIGITS}
                                                value={otp}
                                                onChange={(value) => setOtp(value)}
                                                maxLength={6}
                                            >
                                                <InputOTPGroup className="gap-0">
                                                    <InputOTPSlot index={0} className='bg-white' />
                                                    <InputOTPSlot index={1} className='bg-white' />
                                                    <InputOTPSlot index={2} className='bg-white' />
                                                    <InputOTPSlot index={3} className='bg-white' />
                                                    <InputOTPSlot index={4} className='bg-white' />
                                                    <InputOTPSlot index={5} className='bg-white' />
                                                </InputOTPGroup>

                                            </InputOTP>

                                            <Button variant='outline' type="submit" className='w-full mt-4 flex h-10 items-center justify-center gap-2'
                                                onClick={handleSubmit} disabled={otp.length < 6 || uuid === ''}
                                            >
                                                <KeyRound className='text-neutral-600' size={28} />
                                                <div className='min-w-0 truncate font-normal text-neutral-600'>
                                                    Confirm OTP
                                                </div>
                                            </Button>

                                        </form>
                                        <div className="text-center mt-3">
                                            <span className="text-sm text-neutral-500">
                                                Didn't receive a code?{" "}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={handleResend}
                                                className="font-medium text-sm text-neutral-500 hover:underline transition-colors hover:text-black"
                                            >
                                                Resend
                                            </button>
                                        </div>

                                        <div className='my-4 flex w-full items-center justify-center gap-2'>
                                            <div className='flex-grow border-b border-neutral-300'></div>
                                            <span className='text-xs font-normal uppercase leading-none text-neutral-500'>or</span>
                                            <div className='flex-grow border-b border-neutral-300'></div>
                                        </div>
                                        <Button variant='outline' className='flex h-10 w-full items-center justify-center gap-2' onClick={() => setEmailEntered(false)}>
                                            <ArrowLeft className='lucide lucide-arrow-left size-4 text-neutral-600' size={28} />
                                            <div className='min-w-0 truncate font-normal text-neutral-600'>
                                                Re-enter Email
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                                <p className="mt-4 text-center text-sm text-neutral-500">
                                    Already have an account?&nbsp;
                                    <a className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black" href="/login-cust">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex-col grid gap-2 pb-8 pt-4 mx-auto">
                    <p className="text-xs mx-auto text-neutral-600">&copy; {new Date().getFullYear()} DarziXpress, Inc.</p>
                    <div className="flex gap-3 text-center text-xs mx-auto text-neutral-500 underline underline-offset-2">
                        <a href="/privacy" target="_blank" className="hover:text-neutral-800">Privacy Policy</a>
                        <a href="/terms" target="_blank" className="hover:text-neutral-800">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    );
}