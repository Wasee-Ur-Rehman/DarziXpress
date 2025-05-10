// /pages/customer/ServiceListingPage.jsx (or whatever you named it)
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
    Search as SearchIconLucide, // Renamed to avoid conflict if you have a Search component
    MapPin,
    DollarSign,
    Star,
    ChevronDown, // This was used by the simplified Select, may not be needed if using full shadcn/ui Select
    Filter as FilterIconLucide, // Renamed
    X,
    ShoppingBag
} from 'lucide-react';

// Import your UI components (assuming they are in @/components/ui/)
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'; // Import all parts
import { Select } from '@/components/ui/select'; // Assuming your simplified Select for now
import { Label } from '@/components/ui/label'; // Assuming you have this


// Mock Data for Services Offered by Tailors
const mockServicesData = [
    { serviceId: 'S001', tailorId: 1, tailorName: 'Ahmad Custom Wear', tailorRating: 4.5, serviceName: "Men's 2-Piece Suit Stitching", category: "Men's Formal", location: 'Lahore', price: 8500, priceType: 'Fixed', image: 'https://via.placeholder.com/300x200/A0A0FF/FFFFFF?text=Men+Suit' },
    { serviceId: 'S002', tailorId: 1, tailorName: 'Ahmad Custom Wear', tailorRating: 4.5, serviceName: "Custom Sherwani Design", category: "Men's Ethnic", location: 'Lahore', price: 15000, priceType: 'Starting at', image: 'https://via.placeholder.com/300x200/A0A0FF/FFFFFF?text=Sherwani' },
    { serviceId: 'S003', tailorId: 2, tailorName: 'Sara Boutique', tailorRating: 4.8, serviceName: "Bridal Lehenga Stitching", category: "Women's Bridal", location: 'Karachi', price: 25000, priceType: 'Starting at', image: 'https://via.placeholder.com/300x200/FFA0A0/FFFFFF?text=Bridal+Lehenga' },
    { serviceId: 'S004', tailorId: 2, tailorName: 'Sara Boutique', tailorRating: 4.8, serviceName: "Formal Dress Alterations", category: "Alterations", location: 'Karachi', price: 1500, priceType: 'Per piece', image: 'https://via.placeholder.com/300x200/FFA0A0/FFFFFF?text=Dress+Alteration' },
    { serviceId: 'S005', tailorId: 3, tailorName: 'Modern Stitches', tailorRating: 4.2, serviceName: "Kurta Pajama Set", category: "Men's Casual", location: 'Islamabad', price: 3500, priceType: 'Fixed', image: 'https://via.placeholder.com/300x200/A0FFA0/FFFFFF?text=Kurta+Pajama' },
    { serviceId: 'S006', tailorId: 4, tailorName: 'The Perfect Fit', tailorRating: 4.6, serviceName: "Pant Coat Stitching (Standard)", category: "Men's Formal", location: 'Lahore', price: 9000, priceType: 'Fixed', image: 'https://via.placeholder.com/300x200/A0A0FF/FFFFFF?text=Pant+Coat' },
];

// Derive filter options from data
const allLocations = [...new Set(mockServicesData.map(s => s.location))].sort();
const allCategories = [...new Set(mockServicesData.map(s => s.category))].sort();
const priceTiers = [
    { value: 'low', label: 'Under PKR 5,000', min: 0, max: 4999 },
    { value: 'mid', label: 'PKR 5,000 - PKR 10,000', min: 5000, max: 10000 },
    { value: 'high', label: 'Over PKR 10,000', min: 10001, max: Infinity },
];

// Renamed this to avoid conflict with imported Card component
const ServiceDisplayCard = ({ service }) => (
    <Card className="flex flex-col transition-shadow hover:shadow-xl">
        <img src={service.image || 'https://via.placeholder.com/300x200/E2E8F0/94A3B8?text=Service'} alt={service.serviceName} className="w-full h-44 object-cover" />
        {/* Using imported Card parts */}
        <CardHeader className="pb-2">
            <CardTitle className="text-base leading-tight">{service.serviceName}</CardTitle>
            <CardDescription>Category: {service.category}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-2 pb-3">
            <div className="text-sm">
                <p className="font-semibold text-indigo-700">PKR {service.price.toLocaleString()}</p>
                <p className="text-xs text-slate-500">{service.priceType}</p>
            </div>
            <div className="border-t border-slate-100 pt-2 text-xs text-slate-600">
                <p>By: <span className="font-medium text-slate-700">{service.tailorName}</span></p>
                <div className="flex items-center text-slate-500">
                    <MapPin size={12} className="mr-1 flex-shrink-0" /> {service.location}
                    <span className="mx-1.5">·</span>
                    <Star size={12} className="mr-0.5 fill-amber-400 text-amber-500" /> {service.tailorRating.toFixed(1)}
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Link to={`/customer/service-details/${service.serviceId}`} className="w-full">
                <Button variant="secondary" className="w-full hover:bg-indigo-100 hover:text-indigo-700">
                    View Service Details
                </Button>
            </Link>
        </CardFooter>
    </Card>
);


const ServiceListingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceTier, setSelectedPriceTier] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('search');
        setSearchTerm(query || '');
    }, [location.search]);

    const filteredServices = useMemo(() => {
        let services = mockServicesData;
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            services = services.filter(s =>
                s.serviceName.toLowerCase().includes(lowerSearchTerm) ||
                s.tailorName.toLowerCase().includes(lowerSearchTerm) ||
                s.category.toLowerCase().includes(lowerSearchTerm)
            );
        }
        if (selectedLocation) services = services.filter(s => s.location === selectedLocation);
        if (selectedCategory) services = services.filter(s => s.category === selectedCategory);
        if (selectedPriceTier) {
            const tier = priceTiers.find(t => t.value === selectedPriceTier);
            if (tier) services = services.filter(s => s.price >= tier.min && s.price <= tier.max);
        }
        return services;
    }, [searchTerm, selectedLocation, selectedCategory, selectedPriceTier]);

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        const params = new URLSearchParams(location.search);
        if (newSearchTerm) params.set('search', newSearchTerm);
        else params.delete('search');
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };

    const handleFilterChange = (setter, value) => {
        setter(value);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedLocation('');
        setSelectedCategory('');
        setSelectedPriceTier('');
        navigate(location.pathname, { replace: true });
    };
    const activeFilterCount = [searchTerm, selectedLocation, selectedCategory, selectedPriceTier].filter(val => val !== '').length;


    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
                        Discover Tailoring Services
                    </h1>
                    <p className="text-slate-600 text-md">
                        Find stitching for "pant coat", "kurta", "lehenga", and more.
                    </p>
                </header>

                <Card className="p-4 sm:p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div className="lg:col-span-4">
                            <Label htmlFor="main-search">Search Services</Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIconLucide className="w-4 h-4 text-slate-400" />
                                </div>
                                <Input
                                    id="main-search"
                                    type="text"
                                    placeholder="Search by service, tailor, or category..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="location-filter">Location</Label>
                            <Select
                                id="location-filter"
                                value={selectedLocation}
                                onChange={(e) => handleFilterChange(setSelectedLocation, e.target.value)}
                            >
                                <option value="">All Locations</option>
                                {allLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="category-filter">Category</Label>
                            <Select
                                id="category-filter"
                                value={selectedCategory}
                                onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </Select>
                        </div>

                        {/* Move Price Range dropdown next to Category filter */}
                        <div>
                            <Label htmlFor="price-filter">Price Range</Label>
                            <Select
                                id="price-filter"
                                value={selectedPriceTier}
                                onChange={(e) => handleFilterChange(setSelectedPriceTier, e.target.value)}
                            >
                                <option value="">Any Price</option>
                                {priceTiers.map(tier => <option key={tier.value} value={tier.value}>{tier.label}</option>)}
                            </Select>
                        </div>

                        {/* Clear Filter button on a new line */}
                        {activeFilterCount > 0 ? (
                            <div className="lg:col-span-4">
                                <Button variant="outline" onClick={clearFilters} className="self-end h-10">
                                    <X size={16} className="mr-2" /> Clear ({activeFilterCount})
                                </Button>
                            </div>
                        ) : <div className="h-10"></div>}
                    </div>
                </Card>


                {(searchTerm || activeFilterCount > 0) && filteredServices.length > 0 && (
                    <p className="text-sm text-slate-600 mb-6 text-center sm:text-left">
                        Found <span className="font-semibold text-indigo-600">{filteredServices.length}</span> service(s) matching your criteria.
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredServices.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <FilterIconLucide size={48} className="mx-auto text-slate-400 mb-4" />
                            <p className="text-xl font-semibold text-slate-700 mb-2">No Services Found</p>
                            <p className="text-slate-500 mb-4">Try adjusting your search or filters.</p>
                            {activeFilterCount > 0 && <Button onClick={clearFilters}>Clear All Filters</Button>}
                        </div>
                    ) : (
                        filteredServices.map((service) => (
                            <ServiceDisplayCard key={service.serviceId} service={service} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceListingPage;