import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Scissors } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginCustomer() {
    const [passwordHidden, setPasswordHidden] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email');

        if (emailParam && (emailParam.includes('@') || emailParam.includes('%40')) && emailParam.includes('.')) {
            setEmail(decodeURIComponent(emailParam));
        }
    }, []);

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
            {/*<div className={`lg:w-[50vw] w-[100vw] h-screen flex col-span-1 flex-col`}>*/}
            <div className={`w-[100vw] h-screen flex col-span-1 flex-col`}>
                <div className="absolute left-4 top-3 z-10">
                    <motion.div
                        whileHover={{ rotate: 10 }}
                        className="mr-2 text-black hover:cursor-pointer"
                        onClick={() => window.location.href = '/'}
                    >
                        <Scissors size={28} />
                    </motion.div>
                    {/*<motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl font-bold text-black"
                    >
                        DarziXPress
                    </motion.h1>*/}
                </div>
                <div className='h-8'></div>
                <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className='flex h-full w-full flex-col items-center justify-center'>
                    <div className='relative flex w-full h-full flex-col items-center justify-center' style={{ opacity: 1 }}>
                        <div
                            className='w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl border sm:shadow-sm'>
                            <div className='border-b border-neutral-200 bg-white pb-6 pt-8 text-center'>
                                <h3 className='text-lg font-semibold'>Sign in to your account</h3>
                            </div>
                            <div className='bg-neutral-50 px-4 py-8 sm:px-16'>
                                <div className='flex flex-col gap-3'>
                                    <div className='overflow-hidden' style={{ width: 'auto', height: '269.594px' }}>
                                        <div className='h-max'>
                                            <div className='flex flex-col gap-3 p-1'>
                                                <div className='flex flex-col gap-2'>
                                                    <form className='flex flex-col gap-y-3' action="">
                                                        <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={false}
                                                            required minLength={5} placeholder='Email' type="email" className='block w-full min-w-0 appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm' />
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

                                                        <a className="text-center text-xs text-neutral-500 transition-colors hover:text-black" href={`/forgot-password?email=${encodeURIComponent(email)}`}>Forgot password?</a>

                                                        <Button variant='outline' className='flex h-10 w-full items-center justify-center gap-2'>
                                                            <Mail className='lucide lucide-mail size-4 text-neutral-600'></Mail>
                                                            <div className='min-w-0 truncate font-normal text-neutral-600'>
                                                                Continue with Email
                                                            </div>
                                                        </Button>
                                                    </form>
                                                    <div className='my-2 flex flex-shrink items-center justify-center gap-2'>
                                                        <div className='grow basis-0 border-b border-neutral-300'></div>
                                                        <span className='text-xs font-normal uppercase leading-none text-neutral-500'>or</span>
                                                        <div className='grow basis-0 border-b border-neutral-300'></div>
                                                    </div>
                                                    <div>
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
                        </div>
                        <p class="mt-4 text-center justify-center items-center text-sm text-neutral-500">Don't have an account?&nbsp;<a class="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black" href="/signup">Sign up</a></p>
                    </div>

                </motion.div>
                <div class="flex-col grid gap-2 pb-8 pt-4 mx-auto"><p class="text-xs mx-auto text-neutral-600">&copy; {new Date().getFullYear()} DarziXpress, Inc.</p>
                    <div class="flex gap-3 text-center text-xs mx-auto text-neutral-500 underline underline-offset-2"><a href="/privacy" target="_blank" class="hover:text-neutral-800">Privacy Policy</a><a href="/terms" target="_blank" class="hover:text-neutral-800">Terms of Service</a>
                    </div>
                </div>
            </div>
            {/*<div class="hidden lg:block float-left w-[50vw] h-screen overflow-hidden bg-white shadow-lg relative border border-gray-100">
                <img src="https://placeholder-image-rose.vercel.app/400x400?bg=eeeeee&textColor=000000&radius=0" alt="Floating image" class="w-full h-full object-cover" />
            </div>*/}
        </div >
    );
}