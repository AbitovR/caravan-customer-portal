'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Edit, Package } from 'lucide-react'

const reviews = [
  {
    id: '1',
    orderId: 'ORD-2023-015',
    vehicle: '2021 Honda Accord',
    route: 'Miami, FL → Chicago, IL',
    rating: 5,
    title: 'Excellent Service',
    comment: 'The entire process was smooth from start to finish. The driver was professional and kept me updated throughout the journey. My car arrived in perfect condition.',
    createdAt: '2023-12-15',
    response: 'Thank you for your wonderful feedback! We\'re thrilled to hear you had a great experience.',
    respondedAt: '2023-12-16',
  },
  {
    id: '2',
    orderId: 'ORD-2023-012',
    vehicle: '2022 Tesla Model 3',
    route: 'Los Angeles, CA → Seattle, WA',
    rating: 4,
    title: 'Good experience overall',
    comment: 'Delivery was a day late due to weather, but the communication was good and the car arrived safely.',
    createdAt: '2023-11-20',
    response: null,
    respondedAt: null,
  },
]

const ordersToReview = [
  {
    id: 'ORD-2024-002',
    vehicle: '2022 Toyota Camry',
    route: 'New York, NY → Miami, FL',
    deliveredAt: '2024-01-10',
  },
]

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(null)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const renderStars = (currentRating: number, size = 'h-5 w-5') => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= currentRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const renderInteractiveStars = () => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-8 w-8 cursor-pointer transition-colors ${
              star <= (hoveredRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <p className="mt-2 text-gray-600">Share your experience and read reviews from other customers</p>
      </div>

      {/* Orders to Review */}
      {ordersToReview.length > 0 && (
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle>Leave a Review</CardTitle>
            <CardDescription>Share your experience with recent orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ordersToReview.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Package className="h-10 w-10 text-orange-600" />
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.vehicle}</p>
                      <p className="text-xs text-gray-500">{order.route}</p>
                    </div>
                  </div>
                  <Button>Write Review</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Reviews</CardTitle>
              <CardDescription>Reviews you&apos;ve written for past orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedReview?.id === review.id ? 'ring-2 ring-orange-500' : ''
                    }`}
                    onClick={() => setSelectedReview(review)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{review.title}</p>
                        <p className="text-sm text-gray-600">{review.orderId} • {review.vehicle}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {renderStars(review.rating)}
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {review.route} • {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                    {review.response && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-xs font-medium text-gray-600 mb-1">Response from Caravan Transport</p>
                        <p className="text-sm text-gray-700">{review.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Review Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">4.5</p>
                  <div className="flex justify-center mt-2">
                    {renderStars(4.5)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Average Rating</p>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center space-x-2">
                      <span className="text-sm w-3">{stars}</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{ width: stars === 5 ? '60%' : stars === 4 ? '30%' : '10%' }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-10">
                        {stars === 5 ? '60%' : stars === 4 ? '30%' : '10%'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <p className="text-sm text-gray-600 mb-2">Total Reviews</p>
                  <p className="text-2xl font-bold">{reviews.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Write a New Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Your Rating</p>
                  {renderInteractiveStars()}
                </div>
                <textarea
                  className="w-full p-3 border rounded-lg text-sm"
                  rows={4}
                  placeholder="Share your experience..."
                />
                <Button className="w-full">Submit Review</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}