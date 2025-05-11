// /pages/customer/ChangePasswordPage.jsx
import React, { useState } from 'react';
import { Lock, KeyRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ChangePasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' }); // type: 'success' or 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' }); // Clear previous message

        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage({ type: 'error', text: 'All fields are required.' });
            return;
        }
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'New password and confirm password do not match.' });
            return;
        }

        // --- Mock Password Change Logic ---
        // In a real app, you'd make an API call here.
        // For this example, we'll just simulate success/failure.
        if (currentPassword === "oldpassword123") { // Simulate correct current password
            console.log("Password change requested:", { currentPassword, newPassword });
            setMessage({ type: 'success', text: 'Password changed successfully! (Mock)' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setMessage({ type: 'error', text: 'Incorrect current password. (Mock - try "oldpassword123")' });
        }
        // --- End Mock Logic ---
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full">
                <Card>
                    <CardHeader className="text-center">
                        <KeyRound size={48} className="mx-auto text-indigo-500 mb-3" />
                        <CardTitle className="text-2xl">Change Your Password</CardTitle>
                        <CardDescription>
                            Choose a strong password and don't reuse it for other accounts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {message.text && (
                                <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {message.text}
                                </p>
                            )}

                            <Button type="submit" className="w-full">
                                <Lock size={16} className="mr-2" /> Update Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ChangePasswordPage;