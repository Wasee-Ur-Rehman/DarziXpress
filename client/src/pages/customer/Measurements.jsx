// /pages/customer/MeasurementsPage.jsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Ruler } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

// MeasurementForm component remains mostly the same, but 'id' handling will be different
const MeasurementForm = ({ initialData, onSubmit, onCancel }) => {
    const [profileName, setProfileName] = useState(initialData?.name || '');
    // ... other form fields state ...
    const [chest, setChest] = useState(initialData?.details?.chest || '');
    const [waist, setWaist] = useState(initialData?.details?.waist || '');
    const [shoulder, setShoulder] = useState(initialData?.details?.shoulder || '');
    const [sleeveLength, setSleeveLength] = useState(initialData?.details?.sleeveLength || '');
    const [inseam, setInseam] = useState(initialData?.details?.inseam || '');
    const [notes, setNotes] = useState(initialData?.details?.notes || '');


    useEffect(() => {
        // Reset form when initialData changes (e.g., when switching from add to edit)
        setProfileName(initialData?.name || '');
        setChest(initialData?.details?.chest || '');
        setWaist(initialData?.details?.waist || '');
        setShoulder(initialData?.details?.shoulder || '');
        setSleeveLength(initialData?.details?.sleeveLength || '');
        setInseam(initialData?.details?.inseam || '');
        setNotes(initialData?.details?.notes || '');
    }, [initialData]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!profileName) {
            alert("Profile Name is required.");
            return;
        }
        const measurementData = {
            // No ID generation here, backend handles it for new profiles
            // For updates, initialData will have the _id from MongoDB
            name: profileName,
            details: {
                ...(chest && { chest }),
                ...(waist && { waist }),
                ...(shoulder && { shoulder }),
                ...(sleeveLength && { sleeveLength }),
                ...(inseam && { inseam }),
                ...(notes && { notes }),
            },
        };
        onSubmit(measurementData, initialData?._id); // Pass ID if editing
    };

    // ... MeasurementForm JSX (mostly the same) ...
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>{initialData ? 'Edit Measurement Profile' : 'Add New Measurement Profile'}</CardTitle>
                <CardDescription>
                    {initialData ? 'Update the details for this profile.' : 'Create a new profile for your measurements. Only fill relevant fields.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="profileName">Profile Name (e.g., My Shirt, Work Trousers)</Label>
                        <Input id="profileName" value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="My Formal Shirt" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label htmlFor="chest">Chest (inches)</Label><Input id="chest" type="number" step="0.1" value={chest} onChange={(e) => setChest(e.target.value)} placeholder="40" /></div>
                        <div><Label htmlFor="waist">Waist (inches)</Label><Input id="waist" type="number" step="0.1" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="32" /></div>
                        <div><Label htmlFor="shoulder">Shoulder (inches)</Label><Input id="shoulder" type="number" step="0.1" value={shoulder} onChange={(e) => setShoulder(e.target.value)} placeholder="18" /></div>
                        <div><Label htmlFor="sleeveLength">Sleeve Length (inches)</Label><Input id="sleeveLength" type="number" step="0.1" value={sleeveLength} onChange={(e) => setSleeveLength(e.target.value)} placeholder="25" /></div>
                        <div><Label htmlFor="inseam">Inseam (for Trousers, inches)</Label><Input id="inseam" type="number" step="0.1" value={inseam} onChange={(e) => setInseam(e.target.value)} placeholder="30" /></div>
                    </div>
                    <div>
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Preferences, slim fit, etc." />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
                        <Button type="submit">{initialData ? 'Save Changes' : 'Add Profile'}</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};


const Measurements = () => {
    const [measurements, setMeasurements] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingMeasurement, setEditingMeasurement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useAuth();

    const fetchMeasurements = async () => {
        if (!authToken) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/measurements', {
                headers: { 'Authorization': `Bearer ${authToken}` },
            });
            if (!response.ok) throw new Error('Failed to fetch measurements');
            const data = await response.json();
            setMeasurements(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeasurements();
    }, [authToken]);


    const handleAddOrUpdateMeasurement = async (data, profileIdToUpdate) => {
        if (!authToken) {
            alert("You must be logged in to save measurements.");
            return;
        }
        const url = profileIdToUpdate ? `/api/measurements/${profileIdToUpdate}` : '/api/measurements';
        const method = profileIdToUpdate ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${profileIdToUpdate ? 'update' : 'add'} measurement`);
            }
            // const savedProfile = await response.json(); // The new/updated profile
            // Instead of relying on returned data, just refetch for simplicity to ensure UI consistency
            fetchMeasurements(); // Re-fetch all measurements to update the list
            setShowForm(false);
            setEditingMeasurement(null);
        } catch (err) {
            alert(`Error: ${err.message}`);
            console.error(err);
        }
    };

    const handleDeleteMeasurement = async (id) => {
        if (!authToken) {
            alert("You must be logged in to delete measurements.");
            return;
        }
        if (window.confirm("Are you sure you want to delete this measurement profile?")) {
            try {
                const response = await fetch(`/api/measurements/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${authToken}` },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to delete measurement');
                }
                fetchMeasurements(); // Re-fetch
            } catch (err) {
                alert(`Error: ${err.message}`);
                console.error(err);
            }
        }
    };

    // ... other handlers (handleEditMeasurement, handleToggleForm, handleCancelForm) remain similar ...
    const handleEditMeasurement = (measurement) => {
        setEditingMeasurement(measurement); // Pass the full measurement object (which includes _id)
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
        if (showForm) {
            setEditingMeasurement(null);
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingMeasurement(null);
    }


    if (loading) return <div className="p-6 text-center">Loading measurements...</div>;
    if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;

    // ... MeasurementsPage JSX (mostly the same, but uses _id from MongoDB for keys/delete) ...
    // Ensure you use `m._id` for keys when mapping over `measurements` if your backend returns it
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">My Measurements</h1>
                    <Button onClick={handleToggleForm}>
                        <PlusCircle size={18} className="mr-2" />
                        {showForm ? 'Cancel' : 'Add New Profile'}
                    </Button>
                </div>

                {showForm && (
                    <MeasurementForm
                        initialData={editingMeasurement}
                        onSubmit={handleAddOrUpdateMeasurement}
                        onCancel={handleCancelForm}
                    />
                )}

                {measurements.length === 0 && !showForm ? (
                    <Card className="text-center py-12">
                        {/* ... no measurements display ... */}
                        <CardContent>
                            <Ruler size={48} className="mx-auto text-slate-400 mb-4" />
                            <p className="text-xl font-semibold text-slate-700">No Measurement Profiles Yet</p>
                            <p className="text-slate-500 mt-1 mb-4">Click "Add New Profile" to save your first set of measurements.</p>
                            <Button onClick={() => { setShowForm(true); setEditingMeasurement(null); }}>
                                Create Your First Profile
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {measurements.map((m) => (
                            <Card key={m._id}> {/* Use m._id from MongoDB */}
                                <CardHeader className="flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle>{m.name}</CardTitle>
                                        <CardDescription>Last Updated: {new Date(m.lastUpdated).toLocaleDateString()}</CardDescription>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEditMeasurement(m)}>
                                            <Edit size={14} className="mr-1.5" /> Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteMeasurement(m._id)}> {/* Use m._id */}
                                            <Trash2 size={14} className="mr-1.5" /> Delete
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                                        {Object.entries(m.details).map(([key, value]) => (
                                            value && (
                                                <div key={key}>
                                                    <dt className="font-medium text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
                                                    <dd className="text-slate-800">{value} {typeof value === 'number' || (!isNaN(parseFloat(value)) && key !== 'notes') ? 'inches' : ''}</dd>
                                                </div>
                                            )
                                        ))}
                                    </dl>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Measurements;