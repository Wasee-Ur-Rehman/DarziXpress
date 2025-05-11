import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scissors, CheckCircle, ChevronRight, Menu, X, Clock, Shield, CreditCard, Users, Leaf } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRide, setActiveRide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRide((prev) => (prev + 1) % availableServices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navigation */}
      <nav className="bg-white py-4 px-6 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="mr-2 text-blue-500"
            >
              <Scissors size={24} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-blue-500"
            >
              DarziXPress
            </motion.h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#dashboard">Dashboard</NavLink>
            <NavLink href="#find-tailor">Find Tailor</NavLink>
            <NavLink href="#messages">Messages</NavLink>
          </div>

          <div className="hidden md:flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-gray-700 font-medium"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white shadow-lg md:hidden"
        >
          <div className="flex flex-col p-4">
            <MobileNavLink href="#home" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="#dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</MobileNavLink>
            <MobileNavLink href="#find-tailor" onClick={() => setIsMenuOpen(false)}>Find Tailor</MobileNavLink>
            <MobileNavLink href="#messages" onClick={() => setIsMenuOpen(false)}>Messages</MobileNavLink>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="p-2 text-gray-700 border border-gray-300 rounded-lg">Sign In</button>
              <button className="p-2 bg-blue-500 text-white rounded-lg">Get Started</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-50 rounded-lg p-2 inline-block mb-4">
            <span className="text-blue-500 font-medium text-sm">Exclusive for everyone - No commissions</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find tailors, save money,
                <br />
                <span className="text-blue-500">connect with experts</span>
              </h1>

              <p className="text-gray-600 mb-8">
                Join the DarzixPress tailoring community. Find reliable tailoring services, connect with skilled professionals, reduce costs, and make your clothing perfect.
              </p>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium flex items-center"
                >
                  Get Started <ChevronRight size={18} className="ml-1" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
                >
                  Find a Tailor
                </motion.button>
              </div>
            </div>

            <div className="relative">
              {/* Service Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Scissors size={24} className="text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">Custom Alteration Service</h3>
                    <p className="text-gray-500">Mon-Sat, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-gray-600">5 services available</p>
                </div>
              </div>

              {/* Confirmation Card */}
              <div className="absolute right-4 bottom-20 bg-white rounded-lg shadow-lg p-4 w-64">
                <div className="flex items-center mb-2">
                  <div className="p-1 bg-green-100 rounded-full mr-2">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                  <h4 className="font-semibold">Order Confirmed!</h4>
                </div>
                <p className="text-sm text-gray-500">
                  Your alteration has been confirmed for tomorrow at 2:00 PM.
                </p>
              </div>

              {/* Savings Card */}
              <div className="absolute -bottom-10 right-10 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center">
                  <div className="text-blue-500 mr-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ₹
                    </motion.div>
                  </div>
                  <div>
                    <p className="font-semibold">₹850 Saved</p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                </div>
                <div className="w-full bg-blue-100 h-2 mt-2 rounded-full">
                  <div className="bg-blue-500 h-2 w-3/4 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-500">Active tailors</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">2,000+</h3>
              <p className="text-gray-500">Orders completed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">₹150K+</h3>
              <p className="text-gray-500">Monthly savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose DarzixPress?</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Our platform is designed specifically to make alteration and sewing services
            easier, safer, and more affordable.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Scissors size={24} />}
              title="Easy Service Booking"
              description="Connect with skilled tailors for convenient, cost-effective clothing alterations and repairs."
            />

            <FeatureCard
              icon={<Shield size={24} />}
              title="Verified Service Providers"
              description="All tailors are verified professionals, ensuring safety and trust in the community."
            />

            <FeatureCard
              icon={<Clock size={24} />}
              title="Flexible Scheduling"
              description="Find services that fit your schedule, whether it's a one-time alteration or recurring needs."
            />

            <FeatureCard
              icon={<Users size={24} />}
              title="Community Building"
              description="Connect with local tailors and build relationships with trusted service providers."
            />

            <FeatureCard
              icon={<CreditCard size={24} />}
              title="Cost Sharing"
              description="Split costs for bulk orders and get group discounts to make alterations more affordable."
            />

            <FeatureCard
              icon={<Leaf size={24} />}
              title="Sustainable Fashion"
              description="Extend the life of your clothes through repairs and alterations instead of buying new."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How DarzixPress Works</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Our simple 4-step process makes connecting with tailors easy, safe, and convenient for all your clothing needs.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Create Your Account"
              description="Sign up and complete your profile with clothing preferences and alteration needs."
            />

            <StepCard
              number="2"
              title="Find or Offer Services"
              description="Search for available tailors or create your store to offer services to others."
            />

            <StepCard
              number="3"
              title="Schedule Your Orders"
              description="Set up appointments based on your schedule and availability."
            />

            <StepCard
              number="4"
              title="Connect and Order"
              description="Chat with your tailor, confirm details, and enjoy quality services."
            />
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium">
              Start Finding Tailors Now
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your DarzixPress Journey?</h2>
            <p className="text-gray-600 mb-8">
              Join the DarzixPress community today and transform your clothing experience. Save money, reduce waste, and make new connections.
            </p>

            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium flex items-center">
                Create Your Account <ChevronRight size={18} className="ml-1" />
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium">
                Learn More
              </button>
            </div>
          </div>

          <div className="md:col-span-2 bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-blue-500">500+</p>
                <p className="text-gray-600">Active Tailors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-500">2,000+</p>
                <p className="text-gray-600">Orders Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-500">₹150K+</p>
                <p className="text-gray-600">Monthly Savings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-500">3.5K+</p>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Scissors size={24} className="text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-blue-500">DarzixPress</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Simplifying alterations for everyone through a community of skilled tailors.
                Save money, get quality work, and build connections.
              </p>
              <div className="flex space-x-4">
                <SocialIcon />
                <SocialIcon />
                <SocialIcon />
                <SocialIcon />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Find Tailor</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Dashboard</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Messages</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Safety Guidelines</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 DarzixPress. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 text-sm hover:text-blue-500">Privacy Policy</a>
              <a href="#" className="text-gray-500 text-sm hover:text-blue-500">Terms of Service</a>
              <a href="#" className="text-gray-500 text-sm hover:text-blue-500">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function NavLink({ href, children }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      className="font-medium hover:text-blue-500 transition"
    >
      {children}
    </motion.a>
  );
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="py-3 border-b border-gray-100 text-lg hover:text-blue-500"
    >
      {children}
    </a>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="bg-blue-100 text-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="relative">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-4">
          {number}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function SocialIcon() {
  return (
    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
      <span>@</span>
    </div>
  );
}

// Sample data
const availableServices = [
  {
    title: "Pants Hemming",
    time: "Mon-Fri, 9:00 AM - 5:00 PM",
    seatsAvailable: 3
  },
  {
    title: "Dress Alterations",
    time: "Tue-Sat, 10:00 AM - 6:00 PM",
    seatsAvailable: 2
  },
  {
    title: "Custom Tailoring",
    time: "Mon-Thu, 8:00 AM - 4:00 PM",
    seatsAvailable: 5
  }
];