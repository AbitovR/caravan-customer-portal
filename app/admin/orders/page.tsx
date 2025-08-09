'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Package, 
  Search, 
  Filter, 
  MoreVertical, 
  Truck, 
  MapPin, 
  Calendar,
  DollarSign,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Plus
} from 'lucide-react'

const orders = [
  {
    id: 'ORD-2024-101',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    phone: '(555) 123-4567',
    pickupLocation: 'Los Angeles, CA',
    deliveryLocation: 'New York, NY',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleYear: 2020,
    serviceType: 'Open Transport',
    status: 'In Transit',
    priority: 'Standard',
    amount: 1250,
    createdAt: '2024-01-15',
    pickupDate: '2024-01-20',
    estimatedDelivery: '2024-01-28',
    driverName: 'Mike Wilson',
    driverPhone: '(555) 999-8888',
    trackingId: 'TRK-001-2024'
  },
  {
    id: 'ORD-2024-102',
    customer: 'Jane Smith',
    customerEmail: 'jane@example.com',
    phone: '(555) 987-6543',
    pickupLocation: 'Miami, FL',
    deliveryLocation: 'Chicago, IL',
    vehicleMake: 'Honda',
    vehicleModel: 'Civic',
    vehicleYear: 2019,
    serviceType: 'Enclosed Transport',
    status: 'Pending',
    priority: 'High',
    amount: 980,
    createdAt: '2024-01-16',
    pickupDate: '2024-01-22',
    estimatedDelivery: '2024-01-30',
    driverName: null,
    driverPhone: null,
    trackingId: 'TRK-002-2024'
  },
  {
    id: 'ORD-2024-103',
    customer: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    phone: '(555) 456-7890',
    pickupLocation: 'Seattle, WA',
    deliveryLocation: 'Austin, TX',
    vehicleMake: 'Ford',
    vehicleModel: 'F-150',
    vehicleYear: 2021,
    serviceType: 'Open Transport',
    status: 'Confirmed',
    priority: 'Standard',
    amount: 1450,
    createdAt: '2024-01-14',
    pickupDate: '2024-01-25',
    estimatedDelivery: '2024-02-02',
    driverName: 'Sarah Davis',
    driverPhone: '(555) 777-6666',
    trackingId: 'TRK-003-2024'
  },
  {
    id: 'ORD-2024-104',
    customer: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    phone: '(555) 321-6540',
    pickupLocation: 'Boston, MA',
    deliveryLocation: 'Denver, CO',
    vehicleMake: 'BMW',
    vehicleModel: 'X5',
    vehicleYear: 2022,
    serviceType: 'Enclosed Transport',
    status: 'Delivered',
    priority: 'High',
    amount: 1120,
    createdAt: '2024-01-10',
    pickupDate: '2024-01-15',
    estimatedDelivery: '2024-01-23',
    driverName: 'Tom Rodriguez',
    driverPhone: '(555) 444-3333',
    trackingId: 'TRK-004-2024'
  },
  {
    id: 'ORD-2024-105',
    customer: 'Tom Brown',
    customerEmail: 'tom@example.com',
    phone: '(555) 654-3210',
    pickupLocation: 'Phoenix, AZ',
    deliveryLocation: 'Portland, OR',
    vehicleMake: 'Mercedes',
    vehicleModel: 'C-Class',
    vehicleYear: 2020,
    serviceType: 'Open Transport',
    status: 'Cancelled',
    priority: 'Standard',
    amount: 890,
    createdAt: '2024-01-12',
    pickupDate: '2024-01-18',
    estimatedDelivery: '2024-01-26',
    driverName: null,
    driverPhone: null,
    trackingId: 'TRK-005-2024'
  }
]

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Confirmed': 'bg-blue-100 text-blue-800',
  'In Transit': 'bg-purple-100 text-purple-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800',
}

const statusIcons = {
  'Pending': Clock,
  'Confirmed': CheckCircle,
  'In Transit': Truck,
  'Delivered': CheckCircle,
  'Cancelled': XCircle,
}

const priorityColors = {
  'High': 'text-red-600',
  'Standard': 'text-gray-600',
  'Low': 'text-green-600',
}

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesPriority = filterPriority === 'all' || order.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = [
    {
      name: 'Total Orders',
      value: orders.length.toString(),
      icon: Package,
      color: 'text-blue-600'
    },
    {
      name: 'In Transit',
      value: orders.filter(o => o.status === 'In Transit').length.toString(),
      icon: Truck,
      color: 'text-purple-600'
    },
    {
      name: 'Delivered Today',
      value: orders.filter(o => o.status === 'Delivered').length.toString(),
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      name: 'Total Revenue',
      value: `$${orders.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="mt-2 text-gray-600">Track and manage all customer orders</p>
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
              <p className="text-xs text-gray-500 mt-1">Updated daily</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Manage customer orders and shipments</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders by ID, customer, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Standard">Standard</option>
              <option value="Low">Low</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Order</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Route</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Vehicle</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Pickup Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons]
                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.trackingId}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div>
                            <p className="text-sm font-medium">{order.pickupLocation}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              {order.deliveryLocation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium">
                            {order.vehicleYear} {order.vehicleMake} {order.vehicleModel}
                          </p>
                          <p className="text-xs text-gray-500">{order.serviceType}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[order.status as keyof typeof statusColors]
                        }`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-medium ${
                          priorityColors[order.priority as keyof typeof priorityColors]
                        }`}>
                          {order.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">${order.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(order.pickupDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Order Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Order ID:</span> {selectedOrder.id}</p>
                  <p><span className="font-medium">Tracking ID:</span> {selectedOrder.trackingId}</p>
                  <p><span className="font-medium">Status:</span> {selectedOrder.status}</p>
                  <p><span className="font-medium">Priority:</span> {selectedOrder.priority}</p>
                  <p><span className="font-medium">Amount:</span> ${selectedOrder.amount.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                  <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                  <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Vehicle Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Vehicle:</span> {selectedOrder.vehicleYear} {selectedOrder.vehicleMake} {selectedOrder.vehicleModel}</p>
                  <p><span className="font-medium">Service:</span> {selectedOrder.serviceType}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Shipping Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Pickup:</span> {selectedOrder.pickupLocation}</p>
                  <p><span className="font-medium">Delivery:</span> {selectedOrder.deliveryLocation}</p>
                  <p><span className="font-medium">Pickup Date:</span> {new Date(selectedOrder.pickupDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Est. Delivery:</span> {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}</p>
                </div>
              </div>
              
              {selectedOrder.driverName && (
                <div className="col-span-2">
                  <h3 className="font-semibold mb-2">Driver Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Driver:</span> {selectedOrder.driverName}</p>
                    <p><span className="font-medium">Phone:</span> {selectedOrder.driverPhone}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
              <Button>
                Edit Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}