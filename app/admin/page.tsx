import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Package, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, HeadphonesIcon } from 'lucide-react'

const stats = [
  { name: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'text-blue-600' },
  { name: 'Active Orders', value: '56', change: '+8%', icon: Package, color: 'text-green-600' },
  { name: 'Revenue (Month)', value: '$45,678', change: '+23%', icon: DollarSign, color: 'text-purple-600' },
  { name: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: TrendingUp, color: 'text-orange-600' },
]

const recentOrders = [
  { id: 'ORD-2024-101', customer: 'John Doe', route: 'LA → NY', status: 'In Transit', amount: '$1,250' },
  { id: 'ORD-2024-102', customer: 'Jane Smith', route: 'Miami → Chicago', status: 'Pending', amount: '$980' },
  { id: 'ORD-2024-103', customer: 'Mike Johnson', route: 'Seattle → Austin', status: 'Confirmed', amount: '$1,450' },
  { id: 'ORD-2024-104', customer: 'Sarah Wilson', route: 'Boston → Denver', status: 'In Transit', amount: '$1,120' },
  { id: 'ORD-2024-105', customer: 'Tom Brown', route: 'Phoenix → Portland', status: 'Delivered', amount: '$890' },
]

const supportTickets = [
  { id: 'TKT-001', subject: 'Delivery delay inquiry', priority: 'High', status: 'Open', customer: 'David Lee' },
  { id: 'TKT-002', subject: 'Payment issue', priority: 'Medium', status: 'In Progress', customer: 'Lisa Chen' },
  { id: 'TKT-003', subject: 'Document verification', priority: 'Low', status: 'Open', customer: 'Robert Taylor' },
  { id: 'TKT-004', subject: 'Refund request', priority: 'High', status: 'Open', customer: 'Emily Davis' },
]

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Confirmed': 'bg-blue-100 text-blue-800',
  'In Transit': 'bg-purple-100 text-purple-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Open': 'bg-red-100 text-red-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
}

const priorityColors = {
  'High': 'text-red-600',
  'Medium': 'text-yellow-600',
  'Low': 'text-green-600',
}

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your business operations</p>
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
              <p className="text-xs text-green-600 mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.customer} • {order.route}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[order.status as keyof typeof statusColors]
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-medium mt-1">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Customer issues requiring resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ticket.subject}</p>
                    <p className="text-xs text-gray-500">{ticket.customer} • {ticket.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium ${
                      priorityColors[ticket.priority as keyof typeof priorityColors]
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[ticket.status as keyof typeof statusColors]
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Gateway</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Service</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">File Storage</span>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50">
                View All Orders
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50">
                Manage Users
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50">
                Process Refunds
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50">
                Generate Reports
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>New Users Today</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Orders Completed</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Revenue Today</span>
                  <span className="font-medium">$8,450</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Support Tickets</span>
                  <span className="font-medium">4 Open</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}