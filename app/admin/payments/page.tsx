'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  DollarSign, 
  Search, 
  Filter, 
  MoreVertical, 
  CreditCard,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Banknote,
  Wallet
} from 'lucide-react'

const payments = [
  {
    id: 'PAY-2024-001',
    orderId: 'ORD-2024-101',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    amount: 1250.00,
    currency: 'USD',
    method: 'Credit Card',
    cardLast4: '4242',
    cardBrand: 'Visa',
    status: 'Completed',
    transactionId: 'txn_1234567890',
    paymentDate: '2024-01-15',
    processingFee: 36.25,
    netAmount: 1213.75,
    gateway: 'Stripe',
    description: 'Car shipping service - LA to NY',
    refundAmount: 0,
    chargebackAmount: 0
  },
  {
    id: 'PAY-2024-002',
    orderId: 'ORD-2024-102',
    customer: 'Jane Smith',
    customerEmail: 'jane@example.com',
    amount: 980.00,
    currency: 'USD',
    method: 'Bank Transfer',
    cardLast4: null,
    cardBrand: null,
    status: 'Pending',
    transactionId: 'txn_0987654321',
    paymentDate: '2024-01-16',
    processingFee: 5.00,
    netAmount: 975.00,
    gateway: 'Bank ACH',
    description: 'Enclosed transport - Miami to Chicago',
    refundAmount: 0,
    chargebackAmount: 0
  },
  {
    id: 'PAY-2024-003',
    orderId: 'ORD-2024-103',
    customer: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    amount: 1450.00,
    currency: 'USD',
    method: 'Credit Card',
    cardLast4: '1234',
    cardBrand: 'Mastercard',
    status: 'Completed',
    transactionId: 'txn_1122334455',
    paymentDate: '2024-01-14',
    processingFee: 42.05,
    netAmount: 1407.95,
    gateway: 'Stripe',
    description: 'Open transport - Seattle to Austin',
    refundAmount: 0,
    chargebackAmount: 0
  },
  {
    id: 'PAY-2024-004',
    orderId: 'ORD-2024-104',
    customer: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    amount: 1120.00,
    currency: 'USD',
    method: 'Credit Card',
    cardLast4: '5678',
    cardBrand: 'American Express',
    status: 'Refunded',
    transactionId: 'txn_5566778899',
    paymentDate: '2024-01-10',
    processingFee: 32.48,
    netAmount: 1087.52,
    gateway: 'Stripe',
    description: 'Enclosed transport - Boston to Denver',
    refundAmount: 1120.00,
    chargebackAmount: 0
  },
  {
    id: 'PAY-2024-005',
    orderId: 'ORD-2024-105',
    customer: 'Tom Brown',
    customerEmail: 'tom@example.com',
    amount: 890.00,
    currency: 'USD',
    method: 'Credit Card',
    cardLast4: '9876',
    cardBrand: 'Visa',
    status: 'Failed',
    transactionId: 'txn_9988776655',
    paymentDate: '2024-01-12',
    processingFee: 0,
    netAmount: 0,
    gateway: 'Stripe',
    description: 'Open transport - Phoenix to Portland',
    refundAmount: 0,
    chargebackAmount: 0
  },
  {
    id: 'PAY-2024-006',
    orderId: 'ORD-2024-106',
    customer: 'Lisa Chen',
    customerEmail: 'lisa@example.com',
    amount: 750.00,
    currency: 'USD',
    method: 'PayPal',
    cardLast4: null,
    cardBrand: null,
    status: 'Disputed',
    transactionId: 'txn_4433221100',
    paymentDate: '2024-01-13',
    processingFee: 22.50,
    netAmount: 727.50,
    gateway: 'PayPal',
    description: 'Open transport - Dallas to Miami',
    refundAmount: 0,
    chargebackAmount: 750.00
  }
]

const statusColors = {
  'Completed': 'bg-green-100 text-green-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Failed': 'bg-red-100 text-red-800',
  'Refunded': 'bg-blue-100 text-blue-800',
  'Disputed': 'bg-orange-100 text-orange-800',
}

const statusIcons = {
  'Completed': CheckCircle,
  'Pending': Clock,
  'Failed': XCircle,
  'Refunded': RefreshCw,
  'Disputed': AlertTriangle,
}

const methodColors = {
  'Credit Card': 'bg-blue-100 text-blue-800',
  'Bank Transfer': 'bg-green-100 text-green-800',
  'PayPal': 'bg-purple-100 text-purple-800',
  'Cash': 'bg-gray-100 text-gray-800',
}

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPayment, setSelectedPayment] = useState<typeof payments[0] | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterMethod, setFilterMethod] = useState('all')

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod
    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalRevenue = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0)
  const totalRefunds = payments.reduce((sum, p) => sum + p.refundAmount, 0)
  const totalChargebacks = payments.reduce((sum, p) => sum + p.chargebackAmount, 0)
  const totalFees = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.processingFee, 0)

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12.3%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      name: 'Processing Fees',
      value: `$${totalFees.toLocaleString()}`,
      change: '+8.1%',
      icon: Banknote,
      color: 'text-blue-600'
    },
    {
      name: 'Refunds',
      value: `$${totalRefunds.toLocaleString()}`,
      change: '-2.4%',
      icon: RefreshCw,
      color: 'text-orange-600'
    },
    {
      name: 'Disputes',
      value: `$${totalChargebacks.toLocaleString()}`,
      change: '+15.7%',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments Overview</h1>
        <p className="mt-2 text-gray-600">Monitor transactions and financial performance</p>
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
              <p className={`text-xs mt-1 flex items-center ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change.startsWith('+') ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Credit Cards</span>
                </div>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Banknote className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Bank Transfer</span>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">PayPal</span>
                </div>
                <span className="text-sm font-medium">7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Today</span>
                  <span>$12,450</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>This Week</span>
                  <span>$78,920</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '82%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>This Month</span>
                  <span>$234,567</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-1 rounded-full">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </div>
                <div className="text-sm">
                  <p>Payment completed</p>
                  <p className="text-gray-500">$1,250 - 2 min ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-1 rounded-full">
                  <AlertTriangle className="h-3 w-3 text-orange-600" />
                </div>
                <div className="text-sm">
                  <p>Dispute opened</p>
                  <p className="text-gray-500">$750 - 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-1 rounded-full">
                  <RefreshCw className="h-3 w-3 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p>Refund processed</p>
                  <p className="text-gray-500">$1,120 - 3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete payment history and details</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                Process Refund
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by payment ID, customer, or transaction ID..."
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
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
              <option value="Disputed">Disputed</option>
            </select>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="PayPal">PayPal</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Payment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Order</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Method</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => {
                  const StatusIcon = statusIcons[payment.status as keyof typeof statusIcons]
                  return (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{payment.id}</p>
                          <p className="text-sm text-gray-500">{payment.transactionId}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{payment.customer}</p>
                          <p className="text-sm text-gray-500">{payment.customerEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-blue-600">{payment.orderId}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            methodColors[payment.method as keyof typeof methodColors]
                          }`}>
                            {payment.method}
                          </span>
                          {payment.cardLast4 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {payment.cardBrand} ****{payment.cardLast4}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">${payment.amount.toLocaleString()}</p>
                          {payment.processingFee > 0 && (
                            <p className="text-xs text-gray-500">
                              Fee: ${payment.processingFee.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[payment.status as keyof typeof statusColors]
                        }`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedPayment(payment)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Payment Details</h2>
              <Button variant="ghost" onClick={() => setSelectedPayment(null)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Payment Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Payment ID:</span>
                    <p className="text-gray-700">{selectedPayment.id}</p>
                  </div>
                  <div>
                    <span className="font-medium">Transaction ID:</span>
                    <p className="text-gray-700">{selectedPayment.transactionId}</p>
                  </div>
                  <div>
                    <span className="font-medium">Order ID:</span>
                    <p className="text-blue-600 font-medium">{selectedPayment.orderId}</p>
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span>
                    <p className="text-gray-700">${selectedPayment.amount.toLocaleString()} {selectedPayment.currency}</p>
                  </div>
                  <div>
                    <span className="font-medium">Processing Fee:</span>
                    <p className="text-gray-700">${selectedPayment.processingFee.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Net Amount:</span>
                    <p className="text-gray-700 font-medium">${selectedPayment.netAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Gateway:</span>
                    <p className="text-gray-700">{selectedPayment.gateway}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Transaction Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${
                      statusColors[selectedPayment.status as keyof typeof statusColors]
                    }`}>
                      {selectedPayment.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Payment Method:</span>
                    <p className="text-gray-700">{selectedPayment.method}</p>
                  </div>
                  {selectedPayment.cardLast4 && (
                    <div>
                      <span className="font-medium">Card Details:</span>
                      <p className="text-gray-700">{selectedPayment.cardBrand} ending in {selectedPayment.cardLast4}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Payment Date:</span>
                    <p className="text-gray-700">{new Date(selectedPayment.paymentDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="text-gray-700">{selectedPayment.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2">
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Customer:</span>
                    <p className="text-gray-700">{selectedPayment.customer}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-gray-700">{selectedPayment.customerEmail}</p>
                  </div>
                </div>
              </div>
              
              {(selectedPayment.refundAmount > 0 || selectedPayment.chargebackAmount > 0) && (
                <div className="col-span-2">
                  <h3 className="font-semibold mb-3">Adjustments</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedPayment.refundAmount > 0 && (
                      <div>
                        <span className="font-medium">Refund Amount:</span>
                        <p className="text-red-600 font-medium">${selectedPayment.refundAmount.toFixed(2)}</p>
                      </div>
                    )}
                    {selectedPayment.chargebackAmount > 0 && (
                      <div>
                        <span className="font-medium">Chargeback Amount:</span>
                        <p className="text-red-600 font-medium">${selectedPayment.chargebackAmount.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between mt-6">
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                  Close
                </Button>
                {selectedPayment.status === 'Completed' && (
                  <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Process Refund
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}