// /pages/customer/MeasurementsPage.jsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Ruler } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // If you want a notes field

// Initial mock data - this would typically come from a backend or global state
const initialMockMeasurements = [
    { id: 'm1', name: 'Formal Shirt Profile', lastUpdated: '2023-10-15', details: { chest: '40', waist: '32', shoulder: '18', sleeveLength: '25', notes: 'Slim fit preference' } },
    { id: 'm2', name: 'Casual Trousers', lastUpdated: '2023-09-20', details: { waist: '32', inseam: '30', hip: '38', thigh: '22', notes: 'Comfort fit' } },
    { id: 'm3', name: 'Wedding Sherwani', lastUpdated: '2024-01-05', details: { chest: '41', waist: '33', shoulder: '18.5', length: '42', notes: 'Needs extra room for kurta underneath' } },
];

const MeasurementForm = ({ initialData, onSubmit, onCancel }) => {
    const [profileName, setProfileName] = useState(initialData?.name || '');
    const [chest, setChest] = useState(initialData?.details?.chest || '');
    const [waist, setWaist] = useState(initialData?.details?.waist || '');
    const [shoulder, setShoulder] = useState(initialData?.details?.shoulder || '');
    const [sleeveLength, setSleeveLength] = useState(initialData?.details?.sleeveLength || '');
    const [inseam, setInseam] = useState(initialData?.details?.inseam || '');
    const [notes, setNotes] = useState(initialData?.details?.notes || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!profileName) {
            alert("Profile Name is required.");
            return;
        }
        const measurementData = {
            id: initialData?.id || `m${Date.now()}`, // Generate new ID if not editing
            name: profileName,
            lastUpdated: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            details: {
                ...(chest && { chest }),
                ...(waist && { waist }),
                ...(shoulder && { shoulder }),
                ...(sleeveLength && { sleeveLength }),
                ...(inseam && { inseam }),
                ...(notes && { notes }),
            },
        };
        onSubmit(measurementData);
    };

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
                        {/* Replace with Textarea if you have one: <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Preferences like slim fit, specific style details, etc." /> */}
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


const MeasurementsPage = () => {
    const [measurements, setMeasurements] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingMeasurement, setEditingMeasurement] = useState(null); // null or measurement object

    // Load initial data (e.g., from localStorage or API in a real app)
    useEffect(() => {
        // For this example, we use the initial mock data.
        // In a real app, you might fetch this or get it from a global state.
        // To simulate persistence for dashboard, one could use localStorage.
        const storedMeasurements = localStorage.getItem('userMeasurements');
        if (storedMeasurements) {
            setMeasurements(JSON.parse(storedMeasurements));
        } else {
            setMeasurements(initialMockMeasurements);
            localStorage.setItem('userMeasurements', JSON.stringify(initialMockMeasurements));
        }
    }, []);

    // Update localStorage whenever measurements change
    useEffect(() => {
        if (measurements.length > 0 || localStorage.getItem('userMeasurements')) { // only update if not initial empty
            localStorage.setItem('userMeasurements', JSON.stringify(measurements));
        }
    }, [measurements]);


    const handleAddOrUpdateMeasurement = (data) => {
        if (editingMeasurement) {
            setMeasurements(measurements.map(m => m.id === data.id ? data : m));
        } else {
            setMeasurements([data, ...measurements]); // Add new to the top
        }
        setShowForm(false);
        setEditingMeasurement(null);
    };

    const handleDeleteMeasurement = (id) => {
        if (window.confirm("Are you sure you want to delete this measurement profile?")) {
            setMeasurements(measurements.filter(m => m.id !== id));
        }
    };

    const handleEditMeasurement = (measurement) => {
        setEditingMeasurement(measurement);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to show form
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
        if (showForm) { // If form was open and is now closing
            setEditingMeasurement(null);
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingMeasurement(null);
    }

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
                            <Card key={m.id}>
                                <CardHeader className="flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle>{m.name}</CardTitle>
                                        <CardDescription>Last Updated: {m.lastUpdated}</CardDescription>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEditMeasurement(m)}>
                                            <Edit size={14} className="mr-1.5" /> Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteMeasurement(m.id)}>
                                            <Trash2 size={14} className="mr-1.5" /> Delete
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                                        {Object.entries(m.details).map(([key, value]) => (
                                            value && ( // Only display if value exists
                                                <div key={key}>
                                                    <dt className="font-medium text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt> {/* Add space before capital letters */}
                                                    <dd className="text-slate-800">{value} {typeof value === 'number' || !isNaN(parseFloat(value)) && key !== 'notes' ? 'inches' : ''}</dd>
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

export default MeasurementsPage;