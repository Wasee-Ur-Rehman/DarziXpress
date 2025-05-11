
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, KeyRound, Mail, RectangleEllipsis, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { set } from 'date-fns';

export default function ForgotPassword() {
    const [email, setEmail] = React.useState('');
    const [emailEntered, setEmailEntered] = React.useState("initial");
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [otp, setOtp] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailEntered === "initial") {
            setEmailEntered("otp");
            return;
        }

        if (emailEntered === "otp") {
            setEmailEntered("update-password");
            return;
        }
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setEmailEntered(true);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email');

        if (emailParam && (emailParam.includes('@') || emailParam.includes('%40')) && emailParam.includes('.')) {
            setEmail(decodeURIComponent(emailParam));
        }
    }, []);

    const handleResend = () => {

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
                    {emailEntered === "initial" ? (
                        <motion.div
                            key="enter-email"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className='flex h-full w-full flex-col items-center justify-center'
                        >
                            <div className='relative flex w-full h-full flex-col items-center justify-center' style={{ opacity: 1 }}>
                                <div className='w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl border sm:shadow-sm'>
                                    <div className='border-b border-neutral-200 bg-white pb-6 pt-8 text-center'>
                                        <h3 className='text-lg font-semibold'>Reset your password</h3>
                                    </div>
                                    <div className='bg-neutral-50 px-4 py-8 sm:px-16'>
                                        <div className='flex flex-col gap-3'>
                                            <div className='overflow-hidden'>
                                                <div className='h-max'>
                                                    <div className='flex flex-col gap-3 p-1'>
                                                        <div className='flex flex-col gap-2'>
                                                            <form className='flex flex-col gap-y-3' onSubmit={handleSubmit}>
                                                                <input
                                                                    name="email"
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    required
                                                                    minLength={5}
                                                                    placeholder='Email'
                                                                    type="email"
                                                                    className='block w-full min-w-0 appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                                                                />

                                                                <Button variant='outline' type="submit" onSubmit={handleSubmit} className='flex h-10 w-full items-center justify-center gap-2'
                                                                    disabled={!email || email.length < 5 || !email.includes('@') || !email.includes('.')}
                                                                >
                                                                    <RectangleEllipsis className='text-neutral-600' size={28} />
                                                                    <div className='min-w-0 truncate font-normal text-neutral-600'>
                                                                        Reset Password
                                                                    </div>
                                                                </Button>
                                                            </form>
                                                            <div className='my-2 flex flex-shrink items-center justify-center gap-2'>
                                                                <div className='grow basis-0 border-b border-neutral-300'></div>
                                                                <span className='text-xs font-normal uppercase leading-none text-neutral-500'>or</span>
                                                                <div className='grow basis-0 border-b border-neutral-300'></div>
                                                            </div>
                                                            <div>
                                                                <Button variant='outline' className='flex h-10 w-full items-center justify-center gap-2' onClick={() => window.location.href = '/login-cust'}>
                                                                    <ArrowLeft className='lucide lucide-arrow-left size-4 text-neutral-600' />
                                                                    <div className='min-w-0 truncate font-normal text-neutral-600'>
                                                                        Back to Sign In
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-center justify-center items-center text-sm text-neutral-500">
                                    Don't have an account?&nbsp;
                                    <a className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black" href="/signup">
                                        Sign up
                                    </a>
                                </p>
                            </div>
                        </motion.div>) : emailEntered === "otp" ? (
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
                                                    //value={otp}
                                                    //onChange={(value) => setOtp(value)}
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

                                                <Button variant='outline' type="submit" className='flex h-10 w-full items-center justify-center gap-2 mt-4'>
                                                    <KeyRound className='text-neutral-600' size={28} />
                                                    <div className='min-w-0 truncate font-normal text-neutral-600'>
                                                        Reset Password
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
                                    <p className="mt-4 text-center justify-center items-center text-sm text-neutral-500">
                                        Don't have an account?&nbsp;
                                        <a className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black" href="/signup">
                                            Sign up
                                        </a>
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                        <motion.div
                            key="update-password"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className='flex h-full w-full flex-col items-center justify-center'
                        >
                            <div className='relative flex w-full h-full flex-col items-center justify-center' style={{ opacity: 1 }}>
                                <div className='w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl border sm:shadow-sm'>
                                    <div className='border-b border-neutral-200 bg-white pb-6 pt-8 text-center'>
                                        <h3 className='text-lg font-semibold'>Update your password</h3>
                                    </div>
                                    <div className='bg-neutral-50 px-4 py-8 sm:px-16'>
                                        <div className='flex flex-col gap-3'>
                                            <div className='overflow-hidden'>
                                                <div className='h-max'>
                                                    <div className='flex flex-col gap-3 p-1'>
                                                        <div className='flex flex-col gap-2'>
                                                            <form className='flex flex-col gap-y-3' onSubmit={handleSubmit}>
                                                                <input
                                                                    name="newPassword"
                                                                    value={newPassword}
                                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                                    required
                                                                    minLength={8}
                                                                    placeholder='New Password'
                                                                    type="password"
                                                                    className='block w-full min-w-0 appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                                                                />

                                                                <input
                                                                    name="confirmPassword"
                                                                    value={confirmPassword}
                                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                                    required
                                                                    minLength={8}
                                                                    placeholder='Confirm New Password'
                                                                    type="password"
                                                                    className='block w-full min-w-0 appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                                                                />

                                                                <Button
                                                                    variant='outline'
                                                                    type="submit"
                                                                    //onSubmit={handlePasswordSubmit}
                                                                    className='flex h-10 w-full items-center justify-center gap-2'
                                                                    disabled={
                                                                        !newPassword ||
                                                                        newPassword.length < 8 ||
                                                                        newPassword !== confirmPassword
                                                                    }
                                                                >
                                                                    <RectangleEllipsis className='text-neutral-600' size={28} />
                                                                    <div className='min-w-0 truncate font-normal text-neutral-600'>
                                                                        Update Password
                                                                    </div>
                                                                </Button>
                                                            </form>
                                                            <div className='my-2 flex flex-shrink items-center justify-center gap-2'>
                                                                <div className='grow basis-0 border-b border-neutral-300'></div>
                                                                <span className='text-xs font-normal uppercase leading-none text-neutral-500'>or</span>
                                                                <div className='grow basis-0 border-b border-neutral-300'></div>
                                                            </div>
                                                            <div>
                                                                <Button variant='outline' className='flex h-10 w-full items-center justify-center gap-2' onClick={() => window.location.href = '/re-enter-email'}>
                                                                    <ArrowLeft className='lucide lucide-arrow-left size-4 text-neutral-600' />
                                                                    <div className='min-w-0 truncate font-normal text-neutral-600'>
                                                                        Re-enter Email
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-center justify-center items-center text-sm text-neutral-500">
                                    Don't have an account?&nbsp;
                                    <a className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black" href="/signup">
                                        Sign up
                                    </a>
                                </p>
                            </div>
                        </motion.div>

                    )
                    }
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