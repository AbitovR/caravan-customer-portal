'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HeadphonesIcon, Plus, Clock, CheckCircle, AlertCircle, MessageCircle, Send } from 'lucide-react'

const tickets = [
  {
    id: 'TKT-2024-001',
    subject: 'Question about delivery time',
    category: 'shipping',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-01-20T10:00:00Z',
    lastMessage: 'Hi, I wanted to check on the expected delivery date for my vehicle.',
    messages: [
      {
        id: '1',
        sender: 'You',
        message: 'Hi, I wanted to check on the expected delivery date for my vehicle. Can you provide an update?',
        createdAt: '2024-01-20T10:00:00Z',
      },
      {
        id: '2',
        sender: 'Support',
        message: 'Hello! Your vehicle is currently in transit and is expected to arrive on January 22nd, 2024.',
        createdAt: '2024-01-20T10:30:00Z',
      },
    ],
  },
  {
    id: 'TKT-2024-002',
    subject: 'Payment processing issue',
    category: 'billing',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2024-01-19T14:00:00Z',
    lastMessage: 'My payment was declined but I have sufficient funds.',
    messages: [
      {
        id: '1',
        sender: 'You',
        message: 'My payment was declined but I have sufficient funds. Please help resolve this.',
        createdAt: '2024-01-19T14:00:00Z',
      },
    ],
  },
  {
    id: 'TKT-2023-045',
    subject: 'Documentation requirements',
    category: 'other',
    priority: 'low',
    status: 'resolved',
    createdAt: '2023-12-15T09:00:00Z',
    lastMessage: 'Thank you for the clarification!',
    messages: [],
  },
]

const statusConfig = {
  open: { label: 'Open', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800', icon: Clock },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
}

const priorityConfig = {
  low: { label: 'Low', color: 'text-green-600' },
  medium: { label: 'Medium', color: 'text-yellow-600' },
  high: { label: 'High', color: 'text-red-600' },
  urgent: { label: 'Urgent', color: 'text-red-800 font-bold' },
}

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(tickets[0])
  const [newMessage, setNewMessage] = useState('')
  const [showNewTicket, setShowNewTicket] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedTicket) {
      // Here you would send the message to your API
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
        <p className="mt-2 text-gray-600">Get help with your shipments and account</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="mb-4">
            <Button 
              className="w-full"
              onClick={() => setShowNewTicket(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Support Ticket
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Tickets</CardTitle>
              <CardDescription>Click to view details</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {tickets.map((ticket) => {
                  const status = statusConfig[ticket.status as keyof typeof statusConfig]
                  const priority = priorityConfig[ticket.priority as keyof typeof priorityConfig]
                  
                  return (
                    <div
                      key={ticket.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedTicket?.id === ticket.id ? 'bg-orange-50' : ''
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium">{ticket.id}</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-1">{ticket.subject}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{ticket.lastMessage}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${priority.color}`}>{priority.label}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedTicket ? (
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedTicket.subject}</CardTitle>
                    <CardDescription>
                      {selectedTicket.id} • {selectedTicket.category} • Created {new Date(selectedTicket.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' && (
                    <Button variant="outline" size="sm">
                      Mark as Resolved
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'You' 
                          ? 'bg-orange-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-xs font-medium mb-1">
                          {message.sender}
                        </p>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'You' ? 'text-orange-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Quick Help</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="justify-start">
                        <HeadphonesIcon className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Live Chat
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-600">Email:</span>{' '}
                        <a href="mailto:support@caravantransport.io" className="text-orange-600 hover:underline">
                          support@caravantransport.io
                        </a>
                      </p>
                      <p>
                        <span className="text-gray-600">Phone:</span>{' '}
                        <a href="tel:+15135700252" className="text-orange-600 hover:underline">
                          (513) 570-0252
                        </a>
                      </p>
                      <p>
                        <span className="text-gray-600">Hours:</span>{' '}
                        Monday - Friday, 9:00 AM - 6:00 PM EST
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Frequently Asked Questions</h3>
                    <div className="space-y-2">
                      <Button variant="link" className="justify-start p-0 h-auto">
                        How do I track my shipment?
                      </Button>
                      <Button variant="link" className="justify-start p-0 h-auto">
                        What documents do I need?
                      </Button>
                      <Button variant="link" className="justify-start p-0 h-auto">
                        How do I update my payment method?
                      </Button>
                      <Button variant="link" className="justify-start p-0 h-auto">
                        What is your refund policy?
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}