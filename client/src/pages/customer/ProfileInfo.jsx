// /pages/customer/ProfileInfoPage.jsx
import React, { useState, useEffect } from 'react';
import { UserCircle, Edit3, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock user data - this would come from an API or global state
const initialUserProfile = {
    fullName: 'Ayesha Khan',
    email: 'ayesha.k@example.com',
    phoneNumber: '+923001234567',
    address: '123, Gulberg III, Lahore, Pakistan',
    city: 'Lahore',
};

const ProfileInfoPage = () => {
    const [profile, setProfile] = useState(initialUserProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialUserProfile);

    useEffect(() => {
        // In a real app, fetch profile data here
        // For now, we set it from initial mock data
        setProfile(initialUserProfile);
        setFormData(initialUserProfile);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        if (isEditing) { // If currently editing, means "Cancel" was clicked essentially
            setFormData(profile); // Reset form data to original profile
        }
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to update the profile
        console.log("Profile updated (mock):", formData);
        setProfile(formData); // Update the "saved" profile state
        setIsEditing(false);
        alert("Profile updated successfully! (Mock)");
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="items-center text-center">
                        <UserCircle size={64} className="mx-auto text-indigo-500 mb-3" />
                        <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
                        <CardDescription>{profile.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address (cannot be changed)</Label>
                                    <Input id="email" name="email" type="email" value={formData.email} readOnly disabled className="bg-slate-100" />
                                </div>
                                <div>
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                                </div>
                                <div className="flex justify-end space-x-3 pt-3">
                                    <Button type="button" variant="outline" onClick={handleEditToggle}>Cancel</Button>
                                    <Button type="submit">
                                        <Save size={16} className="mr-2" /> Save Changes
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-3">
                                <InfoRow label="Full Name" value={profile.fullName} />
                                <InfoRow label="Email Address" value={profile.email} />
                                <InfoRow label="Phone Number" value={profile.phoneNumber || 'Not provided'} />
                                <InfoRow label="Address" value={profile.address || 'Not provided'} />
                                <InfoRow label="City" value={profile.city || 'Not provided'} />
                                <div className="pt-4 text-right">
                                    <Button onClick={handleEditToggle}>
                                        <Edit3 size={16} className="mr-2" /> Edit Profile
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-4 items-center py-1.5 border-b border-slate-100 last:border-b-0">
        <dt className="text-sm font-medium text-slate-600 col-span-1">{label}</dt>
        <dd className="text-sm text-slate-800 col-span-2">{value}</dd>
    </div>
);

export default ProfileInfoPage;