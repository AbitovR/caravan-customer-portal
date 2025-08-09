'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Calendar, Package, Truck, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'

export default function NewQuotePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    pickupLocation: '',
    pickupZip: '',
    deliveryLocation: '',
    deliveryZip: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: new Date().getFullYear(),
    vehicleType: 'sedan',
    transportType: 'open',
    preferredDate: '',
    flexibleDates: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    // Here you would submit to your API
    console.log('Submitting quote:', formData)
    router.push('/dashboard/quotes')
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Get a Quote</h1>
        <p className="mt-2 text-gray-600">Get an instant quote for your vehicle shipment</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1">
              <div className="relative">
                <div className={`h-2 ${i < step ? 'bg-orange-600' : i === step ? 'bg-orange-400' : 'bg-gray-200'} rounded-full`} />
                <div className={`absolute -top-1 left-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {i}
                </div>
              </div>
              <p className="text-xs mt-3 text-gray-600">
                {i === 1 ? 'Route' : i === 2 ? 'Vehicle' : i === 3 ? 'Schedule' : 'Review'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Shipping Route</CardTitle>
              <CardDescription>Where are you shipping from and to?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Pickup Location</label>
                <div className="flex space-x-2">
                  <Input
                    name="pickupLocation"
                    placeholder="City, State"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                  <Input
                    name="pickupZip"
                    placeholder="ZIP Code"
                    value={formData.pickupZip}
                    onChange={handleInputChange}
                    className="w-32"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Delivery Location</label>
                <div className="flex space-x-2">
                  <Input
                    name="deliveryLocation"
                    placeholder="City, State"
                    value={formData.deliveryLocation}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                  <Input
                    name="deliveryZip"
                    placeholder="ZIP Code"
                    value={formData.deliveryZip}
                    onChange={handleInputChange}
                    className="w-32"
                  />
                </div>
              </div>
              <Button onClick={handleNext} className="w-full">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>Tell us about your vehicle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Year</label>
                  <Input
                    type="number"
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Make</label>
                  <Input
                    name="vehicleMake"
                    placeholder="Toyota"
                    value={formData.vehicleMake}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Model</label>
                  <Input
                    name="vehicleModel"
                    placeholder="Camry"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                  <option value="van">Van</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Transport Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, transportType: 'open' }))}
                    className={`p-4 border rounded-lg ${
                      formData.transportType === 'open' ? 'border-orange-600 bg-orange-50' : ''
                    }`}
                  >
                    <Truck className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Open Transport</p>
                    <p className="text-xs text-gray-600">Most economical</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, transportType: 'enclosed' }))}
                    className={`p-4 border rounded-lg ${
                      formData.transportType === 'enclosed' ? 'border-orange-600 bg-orange-50' : ''
                    }`}
                  >
                    <Package className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Enclosed Transport</p>
                    <p className="text-xs text-gray-600">Maximum protection</p>
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule & Contact</CardTitle>
              <CardDescription>When do you need shipping?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Preferred Pickup Date</label>
                <Input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="flexibleDates"
                  checked={formData.flexibleDates}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 rounded"
                />
                <label className="text-sm">My dates are flexible (+/- 3 days)</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Review Your Quote</CardTitle>
              <CardDescription>Confirm your shipping details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Estimated Price</span>
                  <span className="text-2xl font-bold text-orange-600">$1,250</span>
                </div>
                <p className="text-xs text-gray-600">Final price may vary based on carrier availability</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Route</p>
                  <p className="font-medium">{formData.pickupLocation} → {formData.deliveryLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vehicle</p>
                  <p className="font-medium">
                    {formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transport Type</p>
                  <p className="font-medium capitalize">{formData.transportType} Transport</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pickup Date</p>
                  <p className="font-medium">
                    {formData.preferredDate} {formData.flexibleDates && '(Flexible)'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                  <p className="text-sm">{formData.email}</p>
                  <p className="text-sm">{formData.phone}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Submit Quote Request
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}