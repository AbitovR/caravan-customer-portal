'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, Calendar, MapPin, DollarSign, Clock, ChevronRight, Plus } from 'lucide-react'

const quotes = [
  {
    id: 'QT-2024-001',
    status: 'active',
    expiresAt: '2024-02-15',
    pickupLocation: 'Los Angeles, CA',
    deliveryLocation: 'New York, NY',
    vehicle: '2022 Toyota Camry',
    transportType: 'Open',
    price: 1250,
    estimatedDays: 7,
    createdAt: '2024-01-15',
  },
  {
    id: 'QT-2024-002',
    status: 'expired',
    expiresAt: '2024-01-10',
    pickupLocation: 'Miami, FL',
    deliveryLocation: 'Chicago, IL',
    vehicle: '2021 Honda Accord',
    transportType: 'Enclosed',
    price: 1450,
    estimatedDays: 5,
    createdAt: '2023-12-10',
  },
  {
    id: 'QT-2024-003',
    status: 'active',
    expiresAt: '2024-02-20',
    pickupLocation: 'Seattle, WA',
    deliveryLocation: 'Austin, TX',
    vehicle: '2023 Tesla Model 3',
    transportType: 'Enclosed',
    price: 1850,
    estimatedDays: 6,
    createdAt: '2024-01-20',
  },
]

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800' },
  expired: { label: 'Expired', color: 'bg-red-100 text-red-800' },
  converted: { label: 'Converted', color: 'bg-blue-100 text-blue-800' },
}

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedQuote, setSelectedQuote] = useState<typeof quotes[0] | null>(null)

  const filteredQuotes = quotes.filter(quote =>
    quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Quotes</h1>
        <p className="mt-2 text-gray-600">Manage and track your shipping quotes</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <Input
          placeholder="Search quotes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Link href="/dashboard/quotes/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Get New Quote
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {filteredQuotes.map((quote) => {
            const status = statusConfig[quote.status as keyof typeof statusConfig]
            const isExpired = new Date(quote.expiresAt) < new Date()
            
            return (
              <Card
                key={quote.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedQuote?.id === quote.id ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => setSelectedQuote(quote)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{quote.id}</CardTitle>
                      <CardDescription className="mt-1">
                        Created {new Date(quote.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isExpired ? statusConfig.expired.color : status.color
                    }`}>
                      {isExpired ? 'Expired' : status.label}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Package className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">{quote.vehicle}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{quote.pickupLocation} → {quote.deliveryLocation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{quote.estimatedDays} days</span>
                      </div>
                      <div className="text-xl font-bold text-orange-600">
                        ${quote.price}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedQuote ? (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quote Details</CardTitle>
                <CardDescription>{selectedQuote.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                  <p className="font-medium">{selectedQuote.vehicle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Route</p>
                  <p className="font-medium">{selectedQuote.pickupLocation}</p>
                  <p className="text-sm text-gray-500">to</p>
                  <p className="font-medium">{selectedQuote.deliveryLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Transport Type</p>
                  <p className="font-medium">{selectedQuote.transportType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estimated Transit</p>
                  <p className="font-medium">{selectedQuote.estimatedDays} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-2xl font-bold text-orange-600">${selectedQuote.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valid Until</p>
                  <p className="font-medium">
                    {new Date(selectedQuote.expiresAt).toLocaleDateString()}
                  </p>
                </div>
                
                {selectedQuote.status === 'active' && new Date(selectedQuote.expiresAt) > new Date() && (
                  <div className="pt-4 space-y-2">
                    <Button className="w-full">
                      Book This Quote
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download PDF
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Need a Quote?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get an instant quote for your vehicle shipment in just a few clicks.
                </p>
                <Link href="/dashboard/quotes/new">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Get New Quote
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}