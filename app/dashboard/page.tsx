import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, MapPin, Clock, DollarSign, Star, Users, FileText, HeadphonesIcon } from 'lucide-react'

const stats = [
  { name: 'Active Orders', value: '3', icon: Package, color: 'text-blue-600' },
  { name: 'Total Shipments', value: '12', icon: MapPin, color: 'text-green-600' },
  { name: 'Pending Quotes', value: '2', icon: Clock, color: 'text-yellow-600' },
  { name: 'Total Spent', value: '$8,450', icon: DollarSign, color: 'text-purple-600' },
]

const quickActions = [
  { name: 'Get a Quote', href: '/dashboard/quotes/new', icon: Package },
  { name: 'Track Order', href: '/dashboard/orders', icon: MapPin },
  { name: 'Upload Document', href: '/dashboard/documents', icon: FileText },
  { name: 'Contact Support', href: '/dashboard/support', icon: HeadphonesIcon },
]

const recentOrders = [
  { id: 'ORD-001', from: 'Los Angeles, CA', to: 'New York, NY', status: 'In Transit', date: '2024-01-15' },
  { id: 'ORD-002', from: 'Miami, FL', to: 'Chicago, IL', status: 'Delivered', date: '2024-01-10' },
  { id: 'ORD-003', from: 'Seattle, WA', to: 'Austin, TX', status: 'Pending', date: '2024-01-20' },
]

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="mt-2 text-gray-600">Here&apos;s an overview of your shipping activity</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <a
                  key={action.name}
                  href={action.href}
                  className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                >
                  <action.icon className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">{action.name}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-gray-500">
                      {order.from} → {order.to}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}