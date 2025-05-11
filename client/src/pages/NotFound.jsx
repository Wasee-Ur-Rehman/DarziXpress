import React from 'react';
import { ArrowLeft, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
    const handleBack = () => {
        window.history.back();
    };

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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}

                    className='flex h-full w-full flex-col items-center justify-center'>
                    <div className='relative flex w-full h-full flex-col items-center justify-center' style={{ opacity: 1 }}>
                        <div className='w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl border sm:shadow-sm'>
                            <div className='border-b border-neutral-200 bg-white pb-6 pt-8 text-center'>
                                <h3 className='text-lg font-semibold'>Page Not Found</h3>
                            </div>
                            <div className='bg-neutral-50 px-4 py-8 sm:px-16'>
                                <div className='flex flex-col items-center gap-6'>
                                    <div className='text-center'>
                                        <h1 className='mb-2 text-6xl font-bold text-neutral-800'>404</h1>
                                        <p className='mb-6 text-neutral-600'>The page you are looking for doesn't exist or has been moved.</p>

                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={handleBack}
                                            className='inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2'
                                        >
                                            <ArrowLeft className='mr-2 h-4 w-4' />
                                            Go Back
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-center justify-center items-center text-sm text-neutral-500">
                            Are you Lost? <a className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black" href="/">Return home</a>
                        </p>
                    </div>
                </motion.div>
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