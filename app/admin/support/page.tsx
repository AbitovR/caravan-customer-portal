'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Mail,
  Phone,
  Calendar,
  Tag,
  Star,
  Reply,
  Archive,
  Flag,
  Users,
  TrendingUp,
  Target
} from 'lucide-react'

const tickets = [
  {
    id: 'TKT-2024-001',
    subject: 'Delivery delay inquiry',
    customer: 'David Lee',
    customerEmail: 'david@example.com',
    customerPhone: '(555) 111-2222',
    orderId: 'ORD-2024-101',
    priority: 'High',
    status: 'Open',
    category: 'Delivery',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    description: 'Customer inquiring about delayed delivery. Originally scheduled for yesterday but driver had mechanical issues.',
    tags: ['urgent', 'delivery', 'delay'],
    rating: null,
    responseTime: 2.5, // hours
    resolutionTime: null
  },
  {
    id: 'TKT-2024-002',
    subject: 'Payment issue - card declined',
    customer: 'Lisa Chen',
    customerEmail: 'lisa.chen@email.com',
    customerPhone: '(555) 333-4444',
    orderId: 'ORD-2024-102',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Payment',
    assignedTo: 'Mike Wilson',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-16T11:45:00Z',
    description: 'Payment failed during checkout. Customer reports card should be working. Need to investigate with payment processor.',
    tags: ['payment', 'technical'],
    rating: null,
    responseTime: 1.2,
    resolutionTime: null
  },
  {
    id: 'TKT-2024-003',
    subject: 'Document verification problem',
    customer: 'Robert Taylor',
    customerEmail: 'r.taylor@company.com',
    customerPhone: '(555) 555-6666',
    orderId: 'ORD-2024-103',
    priority: 'Low',
    status: 'Pending Customer',
    category: 'Documentation',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-01-14T16:20:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    description: 'Documents uploaded by customer are unclear. Requested new photos of vehicle registration.',
    tags: ['documentation', 'photos'],
    rating: null,
    responseTime: 0.8,
    resolutionTime: null
  },
  {
    id: 'TKT-2024-004',
    subject: 'Refund request - damaged vehicle',
    customer: 'Emily Davis',
    customerEmail: 'emily.davis@gmail.com',
    customerPhone: '(555) 777-8888',
    orderId: 'ORD-2024-104',
    priority: 'High',
    status: 'Escalated',
    category: 'Claims',
    assignedTo: 'Admin User',
    createdAt: '2024-01-13T08:45:00Z',
    updatedAt: '2024-01-15T16:10:00Z',
    description: 'Customer reports vehicle damage during transport. Photos provided show scratches on passenger door. Insurance claim may be needed.',
    tags: ['refund', 'damage', 'insurance'],
    rating: null,
    responseTime: 4.5,
    resolutionTime: null
  },
  {
    id: 'TKT-2024-005',
    subject: 'Great service feedback',
    customer: 'Tom Rodriguez',
    customerEmail: 'tom.r@business.net',
    customerPhone: '(555) 999-0000',
    orderId: 'ORD-2024-105',
    priority: 'Low',
    status: 'Closed',
    category: 'Feedback',
    assignedTo: 'Mike Wilson',
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T15:45:00Z',
    description: 'Customer very happy with service. Driver was professional and delivery was on time. Wants to know about loyalty program.',
    tags: ['positive', 'feedback', 'loyalty'],
    rating: 5,
    responseTime: 0.5,
    resolutionTime: 1.25
  },
  {
    id: 'TKT-2024-006',
    subject: 'Pickup time change request',
    customer: 'Maria Garcia',
    customerEmail: 'maria@example.org',
    customerPhone: '(555) 222-3333',
    orderId: 'ORD-2024-106',
    priority: 'Medium',
    status: 'Resolved',
    category: 'Scheduling',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-12T10:15:00Z',
    description: 'Customer needs to change pickup time due to work schedule conflict. Rescheduled for following day.',
    tags: ['scheduling', 'pickup'],
    rating: 4,
    responseTime: 2.1,
    resolutionTime: 22.9
  }
]

const statusColors = {
  'Open': 'bg-red-100 text-red-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Pending Customer': 'bg-blue-100 text-blue-800',
  'Escalated': 'bg-purple-100 text-purple-800',
  'Resolved': 'bg-green-100 text-green-800',
  'Closed': 'bg-gray-100 text-gray-800',
}

const statusIcons = {
  'Open': AlertCircle,
  'In Progress': Clock,
  'Pending Customer': User,
  'Escalated': Flag,
  'Resolved': CheckCircle,
  'Closed': XCircle,
}

const priorityColors = {
  'High': 'text-red-600',
  'Medium': 'text-yellow-600',
  'Low': 'text-green-600',
}

const categoryColors = {
  'Delivery': 'bg-blue-100 text-blue-800',
  'Payment': 'bg-green-100 text-green-800',
  'Documentation': 'bg-purple-100 text-purple-800',
  'Claims': 'bg-red-100 text-red-800',
  'Feedback': 'bg-yellow-100 text-yellow-800',
  'Scheduling': 'bg-orange-100 text-orange-800',
}

export default function AdminSupportPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterAssigned, setFilterAssigned] = useState('all')

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory
    const matchesAssigned = filterAssigned === 'all' || ticket.assignedTo === filterAssigned
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssigned
  })

  const openTickets = tickets.filter(t => ['Open', 'In Progress', 'Escalated'].includes(t.status)).length
  const avgResponseTime = tickets.filter(t => t.responseTime).reduce((sum, t) => sum + t.responseTime, 0) / tickets.filter(t => t.responseTime).length
  const avgRating = tickets.filter(t => t.rating).reduce((sum, t) => sum + (t.rating || 0), 0) / tickets.filter(t => t.rating).length

  const stats = [
    {
      name: 'Open Tickets',
      value: openTickets.toString(),
      icon: MessageSquare,
      color: 'text-red-600'
    },
    {
      name: 'Avg Response Time',
      value: `${avgResponseTime.toFixed(1)}h`,
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      name: 'Customer Rating',
      value: `${avgRating.toFixed(1)}/5`,
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      name: 'Resolution Rate',
      value: `${Math.round((tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length / tickets.length) * 100)}%`,
      icon: Target,
      color: 'text-green-600'
    }
  ]

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) return `${Math.round(diffInHours * 60)} minutes ago`
    if (diffInHours < 24) return `${Math.round(diffInHours)} hours ago`
    return `${Math.round(diffInHours / 24)} days ago`
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
        <p className="mt-2 text-gray-600">Manage customer support requests and inquiries</p>
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
              <p className="text-xs text-gray-500 mt-1">Updated real-time</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryColors).map(([category, colorClass]) => {
                const count = tickets.filter(t => t.category === category).length
                const percentage = Math.round((count / tickets.length) * 100)
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                        {category}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{count} ({percentage}%)</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Sarah Johnson</span>
                </div>
                <span className="text-sm font-medium">12 tickets</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Mike Wilson</span>
                </div>
                <span className="text-sm font-medium">8 tickets</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Admin User</span>
                </div>
                <span className="text-sm font-medium">3 tickets</span>
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
                <div className="bg-red-100 p-1 rounded-full">
                  <AlertCircle className="h-3 w-3 text-red-600" />
                </div>
                <div className="text-sm">
                  <p>New high priority ticket</p>
                  <p className="text-gray-500">TKT-2024-007 - 5 min ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-1 rounded-full">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </div>
                <div className="text-sm">
                  <p>Ticket resolved</p>
                  <p className="text-gray-500">TKT-2024-006 - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-1 rounded-full">
                  <Clock className="h-3 w-3 text-yellow-600" />
                </div>
                <div className="text-sm">
                  <p>Response overdue</p>
                  <p className="text-gray-500">TKT-2024-001 - 6 hours</p>
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
              <CardTitle>Support Queue</CardTitle>
              <CardDescription>All customer support tickets and requests</CardDescription>
            </div>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tickets by ID, customer, subject, or order..."
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
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Customer">Pending Customer</option>
              <option value="Escalated">Escalated</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="Delivery">Delivery</option>
              <option value="Payment">Payment</option>
              <option value="Documentation">Documentation</option>
              <option value="Claims">Claims</option>
              <option value="Feedback">Feedback</option>
              <option value="Scheduling">Scheduling</option>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Ticket</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Assigned</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => {
                  const StatusIcon = statusIcons[ticket.status as keyof typeof statusIcons]
                  return (
                    <tr key={ticket.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{ticket.id}</p>
                          <p className="text-sm text-blue-600">{ticket.orderId}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{ticket.customer}</p>
                          <p className="text-sm text-gray-500">{ticket.customerEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium max-w-xs truncate">{ticket.subject}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {ticket.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                              {tag}
                            </span>
                          ))}
                          {ticket.tags.length > 2 && (
                            <span className="text-xs text-gray-500">+{ticket.tags.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          categoryColors[ticket.category as keyof typeof categoryColors]
                        }`}>
                          {ticket.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-medium ${
                          priorityColors[ticket.priority as keyof typeof priorityColors]
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[ticket.status as keyof typeof statusColors]
                        }`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{ticket.assignedTo}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm">{getTimeAgo(ticket.updatedAt)}</p>
                          {ticket.rating && (
                            <div className="flex items-center mt-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs ml-1">{ticket.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(ticket)}>
                            <Reply className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Archive className="h-4 w-4" />
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

      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Ticket Details - {selectedTicket.id}</h2>
              <Button variant="ghost" onClick={() => setSelectedTicket(null)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{selectedTicket.subject}</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedTicket.description}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[selectedTicket.status as keyof typeof statusColors]
                    }`}>
                      {selectedTicket.status}
                    </span>
                    <span className={`text-sm font-medium ${
                      priorityColors[selectedTicket.priority as keyof typeof priorityColors]
                    }`}>
                      {selectedTicket.priority} Priority
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      categoryColors[selectedTicket.category as keyof typeof categoryColors]
                    }`}>
                      {selectedTicket.category}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedTicket.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Response Area</h4>
                  <textarea
                    className="w-full h-32 p-3 border rounded-md resize-none"
                    placeholder="Type your response here..."
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                      <Button size="sm" variant="outline">
                        <Flag className="h-4 w-4 mr-2" />
                        Escalate
                      </Button>
                    </div>
                    <Button size="sm">
                      <Reply className="h-4 w-4 mr-2" />
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Customer Information</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Name:</span>
                      <p className="text-gray-700">{selectedTicket.customer}</p>
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>
                      <p className="text-gray-700">{selectedTicket.customerEmail}</p>
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>
                      <p className="text-gray-700">{selectedTicket.customerPhone}</p>
                    </div>
                    <div>
                      <span className="font-medium">Order:</span>
                      <p className="text-blue-600 font-medium">{selectedTicket.orderId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Ticket Details</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Created:</span>
                      <p className="text-gray-700">{formatDateTime(selectedTicket.createdAt)}</p>
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span>
                      <p className="text-gray-700">{formatDateTime(selectedTicket.updatedAt)}</p>
                    </div>
                    <div>
                      <span className="font-medium">Assigned To:</span>
                      <p className="text-gray-700">{selectedTicket.assignedTo}</p>
                    </div>
                    <div>
                      <span className="font-medium">Response Time:</span>
                      <p className="text-gray-700">{selectedTicket.responseTime.toFixed(1)} hours</p>
                    </div>
                    {selectedTicket.resolutionTime && (
                      <div>
                        <span className="font-medium">Resolution Time:</span>
                        <p className="text-gray-700">{selectedTicket.resolutionTime.toFixed(1)} hours</p>
                      </div>
                    )}
                    {selectedTicket.rating && (
                      <div>
                        <span className="font-medium">Customer Rating:</span>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < selectedTicket.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm">{selectedTicket.rating}/5</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Customer
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Customer
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Reassign Ticket
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Follow-up
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                Close
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline">
                  Mark as Resolved
                </Button>
                <Button>
                  Save & Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}