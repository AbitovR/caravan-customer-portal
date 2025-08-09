'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, DollarSign, Calendar, Download, CheckCircle, AlertCircle, Clock } from 'lucide-react'

const payments = [
  {
    id: 'PAY-2024-001',
    orderId: 'ORD-2024-001',
    amount: 250,
    status: 'completed',
    method: 'Visa ****1234',
    type: 'Deposit',
    description: 'Deposit payment for order ORD-2024-001',
    processedAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'PAY-2024-002',
    orderId: 'ORD-2024-001',
    amount: 1000,
    status: 'pending',
    method: 'Bank Transfer',
    type: 'Balance',
    description: 'Balance payment for order ORD-2024-001',
    processedAt: null,
    dueDate: '2024-01-22',
  },
  {
    id: 'PAY-2023-015',
    orderId: 'ORD-2023-015',
    amount: 950,
    status: 'completed',
    method: 'Mastercard ****5678',
    type: 'Full Payment',
    description: 'Full payment for order ORD-2023-015',
    processedAt: '2023-12-10T14:30:00Z',
  },
  {
    id: 'PAY-2023-014',
    orderId: 'ORD-2023-014',
    amount: 1350,
    status: 'refunded',
    method: 'Visa ****1234',
    type: 'Full Payment',
    description: 'Refunded - Order cancelled',
    processedAt: '2023-11-20T10:15:00Z',
    refundedAt: '2023-11-22T09:00:00Z',
  },
]

const statusConfig = {
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  refunded: { label: 'Refunded', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-800', icon: AlertCircle },
}

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<typeof payments[0] | null>(null)

  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)
  
  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="mt-2 text-gray-600">Manage your payments and invoices</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Paid</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Lifetime payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Next Payment</CardTitle>
            <Calendar className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 22</div>
            <p className="text-xs text-gray-500 mt-1">$1,000 due</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>All your payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => {
                  const status = statusConfig[payment.status as keyof typeof statusConfig]
                  return (
                    <div
                      key={payment.id}
                      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                        selectedPayment?.id === payment.id ? 'ring-2 ring-orange-500' : ''
                      }`}
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <CreditCard className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{payment.id}</p>
                          <p className="text-xs text-gray-500">
                            {payment.type} • {payment.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">${payment.amount}</p>
                        <div className="flex items-center justify-end space-x-1 mt-1">
                          <status.icon className="h-3 w-3" />
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedPayment ? (
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>{selectedPayment.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-2xl font-bold">${selectedPayment.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium">{selectedPayment.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">{selectedPayment.method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium">{selectedPayment.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium text-sm">{selectedPayment.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {selectedPayment.status === 'pending' ? 'Due Date' : 'Processed At'}
                  </p>
                  <p className="font-medium">
                    {selectedPayment.status === 'pending' 
                      ? selectedPayment.dueDate 
                      : formatDate(selectedPayment.processedAt)}
                  </p>
                </div>
                {selectedPayment.refundedAt && (
                  <div>
                    <p className="text-sm text-gray-600">Refunded At</p>
                    <p className="font-medium">{formatDate(selectedPayment.refundedAt)}</p>
                  </div>
                )}
                
                <div className="pt-4 space-y-2">
                  {selectedPayment.status === 'pending' && (
                    <Button className="w-full">
                      Pay Now
                    </Button>
                  )}
                  {selectedPayment.status === 'completed' && (
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium">Visa ****1234</p>
                        <p className="text-xs text-gray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}