import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Check, ChartBar, Settings, Users, UserPlus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AdminPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const stats = [
    { id: 1, title: 'Total Users', value: '2,845', trend: '+12.5%', icon: '👤', color: 'bg-blue-500' },
    { id: 2, title: 'Active Tailors', value: '842', trend: '+7.2%', icon: '🧵', color: 'bg-green-500' },
    { id: 3, title: 'Monthly Revenue', value: '$28,450', trend: '+18.3%', icon: '💰', color: 'bg-purple-500' },
    { id: 4, title: 'Pending Requests', value: '24', trend: '-2.1%', icon: '📋', color: 'bg-amber-500' },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 6000 },
    { name: 'Mar', revenue: 8000 },
    { name: 'Apr', revenue: 7000 },
    { name: 'May', revenue: 9000 },
    { name: 'Jun', revenue: 10000 },
    { name: 'Jul', revenue: 12000 },
  ];

  const categoryData = [
    { name: 'Wedding', value: 30 },
    { name: 'Formal', value: 25 },
    { name: 'Casual', value: 20 },
    { name: 'Traditional', value: 15 },
    { name: 'Kids', value: 10 },
  ];

  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Tailor',
      description: 'Specializes in formal wear and custom suits',
      status: 'Active',
      joined: '2023-04-12',
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'Tailor',
      description: 'Expert in traditional clothing and embroidery',
      status: 'Active',
      joined: '2023-05-18',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      role: 'Customer',
      description: 'Regular client with multiple orders',
      status: 'Active',
      joined: '2023-06-21',
    },
    {
      id: 4,
      name: 'Emily Johnson',
      email: 'emily@example.com',
      role: 'Tailor',
      description: 'Specializes in women\'s dresses and gowns',
      status: 'Inactive',
      joined: '2023-07-15',
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david@example.com',
      role: 'Customer',
      description: 'New customer with one pending order',
      status: 'Active',
      joined: '2023-08-03',
    },
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Robert Clark',
      email: 'robert@example.com',
      specialty: 'Wedding dresses and formal wear',
      experience: '8 years',
      date: '2023-09-15',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Amanda Lewis',
      email: 'amanda@example.com',
      specialty: 'Custom suits and business attire',
      experience: '5 years',
      date: '2023-09-16',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Thomas Garcia',
      email: 'thomas@example.com',
      specialty: 'Cultural and traditional outfits',
      experience: '10 years',
      date: '2023-09-17',
      status: 'Pending',
    },
  ]);

  const [activities] = useState([
    {
      id: 1,
      user: 'Sarah Smith',
      email: 'sarah@example.com',
      action: 'Created a new service listing',
      timestamp: '2023-09-18 09:45:12',
      ip: '192.168.1.105',
      details: 'Added service "Custom Wedding Dress" with 3 photos'
    },
    {
      id: 2,
      user: 'John Doe',
      email: 'john@example.com',
      action: 'Updated profile information',
      timestamp: '2023-09-18 10:22:36',
      ip: '192.168.1.120',
      details: 'Changed phone number and shop address'
    },
    {
      id: 3,
      user: 'Emily Johnson',
      email: 'emily@example.com',
      action: 'Completed an order',
      timestamp: '2023-09-18 11:05:54',
      ip: '192.168.1.115',
      details: 'Marked order #5643 as completed and uploaded delivery photos'
    },
    {
      id: 4,
      user: 'Michael Brown',
      email: 'michael@example.com',
      action: 'Added client measurements',
      timestamp: '2023-09-18 13:17:22',
      ip: '192.168.1.118',
      details: 'Added measurements for client ID #8754'
    },
    {
      id: 5,
      user: 'David Wilson',
      email: 'david@example.com',
      action: 'Login attempt failed',
      timestamp: '2023-09-18 14:32:08',
      ip: '192.168.1.130',
      details: 'Failed login attempt from new device'
    },
    {
      id: 6,
      user: 'Amanda Lewis',
      email: 'amanda@example.com',
      action: 'Login successful',
      timestamp: '2023-09-18 14:35:19',
      ip: '192.168.1.125',
      details: 'Successfully logged in from recognized device'
    },
    {
      id: 7,
      user: 'Robert Clark',
      email: 'robert@example.com',
      action: 'Responded to client message',
      timestamp: '2023-09-18 15:10:47',
      ip: '192.168.1.110',
      details: 'Sent message regarding order #5698'
    },
  ]);

  const handleApprove = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Approved' } : request
    ));
    toast({
      title: "Registration approved",
      description: "The tailor registration has been successfully approved.",
    });
  };

  const handleReject = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Rejected' } : request
    ));
    toast({
      title: "Registration rejected",
      description: "The tailor registration has been rejected.",
      variant: "destructive",
    });
  };

  const navItems = [
    { name: 'Dashboard', path: 'dashboard', icon: <ChartBar className="h-5 w-5" /> },
    { name: 'Users', path: 'users', icon: <Users className="h-5 w-5" /> },
    { name: 'Registration Requests', path: 'registration-requests', icon: <UserPlus className="h-5 w-5" /> },
    { name: 'User Activity', path: 'user-activity', icon: <Check className="h-5 w-5" /> },
    { name: 'Settings', path: 'settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin!</h1>
        <p className="text-gray-600">Here's what's happening with your platform today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <span className={`text-xs font-medium ${stat.trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend} since last month
                </span>
              </div>
              <div className={`${stat.color} h-12 w-12 rounded-full flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-lg font-medium mb-4">Revenue Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-lg font-medium mb-4">Service Categories</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm mr-3">
                {activity.user.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{activity.user} <span className="font-normal text-gray-600">{activity.action}</span></p>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">View and manage all users on the platform.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">All Users</h2>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90">
              Add User
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Tailor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{user.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-brand hover:text-brand/80 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to 5 of 5 entries
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded-lg text-gray-500 bg-white hover:bg-gray-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 border rounded-lg text-gray-500 bg-white hover:bg-gray-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRegistrationRequests = () => (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Registration Requests</h1>
        <p className="text-gray-600">Review and approve/reject tailor registration applications.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Tailor Registration Requests</h2>
          <p className="text-sm text-gray-500 mt-1">Review and manage new tailor applications</p>
        </div>
        
        <div className="overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {request.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.name}</div>
                        <div className="text-sm text-gray-500">{request.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{request.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {request.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {request.status !== 'Pending' && (
                      <span className="text-gray-400">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {requests.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No pending registration requests.
          </div>
        )}
      </div>
    </div>
  );

  const renderUserActivity = () => (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Activity</h1>
        <p className="text-gray-600">Monitor all user actions across the platform.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">User Activity Log</h2>
            <p className="text-sm text-gray-500 mt-1">Monitor all user actions across the platform</p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center text-gray-700 border px-4 py-2 rounded hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Filter
            </button>
            <button className="flex items-center text-gray-700 border px-4 py-2 rounded hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{activity.user}</div>
                        <div className="text-sm text-gray-500">{activity.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{activity.action}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.ip}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-sm truncate">
                    {activity.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to 7 of 7 entries
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded-lg text-gray-500 bg-white hover:bg-gray-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 border rounded-lg text-gray-500 bg-white hover:bg-gray-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your admin portal preferences.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Portal Settings</h2>
        <p className="text-gray-500">Settings content would go here.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return renderUsers();
      case 'registration-requests':
        return renderRegistrationRequests();
      case 'user-activity':
        return renderUserActivity();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} min-h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col`}>
        <div className="p-4 border-b flex justify-between items-center">
          {!sidebarCollapsed && (
            <div className="text-brand font-bold text-xl">AdminPortal</div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-500 p-1 rounded hover:bg-gray-100"
          >
            {sidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => setActiveSection(item.path)}
                  className={`flex items-center px-4 py-3 w-full ${
                    activeSection === item.path ? 'bg-brand/10 text-brand border-l-4 border-brand' : 'text-gray-700 hover:bg-gray-100'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                >
                  <div>{item.icon}</div>
                  {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
              A
            </div>
            {!sidebarCollapsed && (
              <div className="ml-2">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-gray-500">admin@example.com</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              
              <button className="ml-4 px-4 py-2 bg-brand text-white rounded-md hover:bg-brand/90">
                Generate Report
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
