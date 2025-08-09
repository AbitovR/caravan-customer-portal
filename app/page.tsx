import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Shield, Users, Truck, CreditCard, HeadphonesIcon, Star, Gift } from 'lucide-react'

const features = [
  {
    title: 'Track Your Shipments',
    description: 'Real-time tracking and updates for all your vehicle shipments',
    icon: Truck,
  },
  {
    title: 'Secure Payments',
    description: 'Safe and secure payment processing with Stripe',
    icon: CreditCard,
  },
  {
    title: 'Document Management',
    description: 'Upload and manage all your shipping documents in one place',
    icon: Package,
  },
  {
    title: '24/7 Support',
    description: 'Get help whenever you need it through our support ticket system',
    icon: HeadphonesIcon,
  },
  {
    title: 'Review System',
    description: 'Share your experience and read reviews from other customers',
    icon: Star,
  },
  {
    title: 'Referral Rewards',
    description: 'Earn $50 for every friend who completes their first shipment',
    icon: Gift,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold">Caravan Transport Portal</span>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your Complete Car Shipping Portal
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Manage your vehicle shipments, track orders, handle payments, and more - all in one secure platform
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/auth/register">
                <Button size="lg" className="px-8">
                  Create Account
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Everything You Need in One Place
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-orange-600 mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  For Customers
                </h2>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <Shield className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Complete Order Management</p>
                      <p className="text-sm">Track quotes, orders, and payments in real-time</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Secure Document Storage</p>
                      <p className="text-sm">Upload and manage all shipping documents securely</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Referral Program</p>
                      <p className="text-sm">Earn rewards by referring friends and family</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  For Administrators
                </h2>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <Users className="h-6 w-6 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">User Management</p>
                      <p className="text-sm">Manage customer accounts and permissions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-6 w-6 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Order Oversight</p>
                      <p className="text-sm">Monitor and manage all customer orders</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-6 w-6 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Analytics Dashboard</p>
                      <p className="text-sm">Track business metrics and performance</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of customers managing their vehicle shipments with ease
            </p>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="px-8">
                Create Your Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Caravan Transport</h3>
              <p className="text-sm">Professional car shipping and auto transport services</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth/login" className="hover:text-white">Login</Link></li>
                <li><Link href="/auth/register" className="hover:text-white">Register</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>support@caravantransport.io</li>
                <li>(513) 570-0252</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2024 Caravan Transport LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
