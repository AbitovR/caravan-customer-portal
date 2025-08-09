'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Package, Calendar, Phone, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const orders = [
  {
    id: 'ORD-2024-001',
    trackingNumber: 'TRK1234567890',
    status: 'IN_TRANSIT',
    pickupLocation: 'Los Angeles, CA',
    deliveryLocation: 'New York, NY',
    pickupDate: '2024-01-15',
    estimatedDelivery: '2024-01-22',
    vehicle: '2022 Toyota Camry',
    carrier: 'Express Transport LLC',
    driverName: 'John Smith',
    driverPhone: '(555) 123-4567',
    price: 1250,
    timeline: [
      { date: '2024-01-15', status: 'Order Confirmed', description: 'Your order has been confirmed and assigned to a carrier' },
      { date: '2024-01-16', status: 'Vehicle Picked Up', description: 'Vehicle picked up from Los Angeles, CA' },
      { date: '2024-01-17', status: 'In Transit', description: 'Vehicle is in transit through Arizona' },
      { date: '2024-01-19', status: 'In Transit', description: 'Vehicle passed through Texas', current: true },
    ]
  },
  {
    id: 'ORD-2024-002',
    trackingNumber: 'TRK0987654321',
    status: 'DELIVERED',
    pickupLocation: 'Miami, FL',
    deliveryLocation: 'Chicago, IL',
    pickupDate: '2024-01-10',
    estimatedDelivery: '2024-01-15',
    actualDelivery: '2024-01-14',
    vehicle: '2021 Honda Accord',
    carrier: 'Reliable Auto Shippers',
    price: 950,
    timeline: [
      { date: '2024-01-10', status: 'Order Confirmed', description: 'Your order has been confirmed' },
      { date: '2024-01-11', status: 'Vehicle Picked Up', description: 'Vehicle picked up from Miami, FL' },
      { date: '2024-01-13', status: 'In Transit', description: 'Vehicle in transit through Georgia' },
      { date: '2024-01-14', status: 'Delivered', description: 'Vehicle delivered to Chicago, IL' },
    ]
  },
]

const statusConfig = {
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  CONFIRMED: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  IN_TRANSIT: { label: 'In Transit', color: 'bg-purple-100 text-purple-800', icon: Truck },
  DELIVERED: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: AlertCircle },
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        <p className="mt-2 text-gray-600">Track and manage your vehicle shipments</p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          <Input
            placeholder="Search by order or tracking number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig]
            return (
              <Card
                key={order.id}
                className={`cursor-pointer transition-colors ${
                  selectedOrder?.id === order.id ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{order.id}</CardTitle>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <p className="text-gray-600">Vehicle</p>
                    <p className="font-medium">{order.vehicle}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Route</p>
                    <p className="font-medium">{order.pickupLocation} → {order.deliveryLocation}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Delivery</p>
                    <p className="font-medium">{order.actualDelivery || order.estimatedDelivery}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedOrder && (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order Details</CardTitle>
                    <CardDescription>Tracking: {selectedOrder.trackingNumber}</CardDescription>
                  </div>
                  <Button>Download Invoice</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Pickup Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedOrder.pickupLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedOrder.pickupDate}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Delivery Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedOrder.deliveryLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {selectedOrder.actualDelivery
                              ? `Delivered: ${selectedOrder.actualDelivery}`
                              : `Estimated: ${selectedOrder.estimatedDelivery}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Vehicle Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedOrder.vehicle}</span>
                        </div>
                      </div>
                    </div>
                    {selectedOrder.carrier && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Carrier Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Truck className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{selectedOrder.carrier}</span>
                          </div>
                          {selectedOrder.driverName && (
                            <div className="flex items-center space-x-2">
                              <Package className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">Driver: {selectedOrder.driverName}</span>
                            </div>
                          )}
                          {selectedOrder.driverPhone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{selectedOrder.driverPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Tracking Timeline</h3>
                  <div className="space-y-4">
                    {selectedOrder.timeline.map((event, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className="relative flex flex-col items-center">
                          <div className={`h-3 w-3 rounded-full ${
                            event.current ? 'bg-orange-600' : 'bg-gray-300'
                          }`} />
                          {index < selectedOrder.timeline.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{event.status}</p>
                            <p className="text-xs text-gray-500">{event.date}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Price</p>
                    <p className="text-2xl font-bold">${selectedOrder.price}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline">Contact Support</Button>
                    {selectedOrder.status === 'DELIVERED' && (
                      <Button>Leave Review</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}