'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  Package,
  Calendar,
  Download,
  Filter,
  MapPin,
  Clock,
  Target,
  Eye,
  Star,
  Truck,
  CreditCard,
  FileText,
  MessageSquare
} from 'lucide-react'

const monthlyRevenue = [
  { month: 'Jan', revenue: 234567, orders: 156, customers: 89 },
  { month: 'Feb', revenue: 198432, orders: 132, customers: 78 },
  { month: 'Mar', revenue: 267890, orders: 178, customers: 102 },
  { month: 'Apr', revenue: 289765, orders: 194, customers: 115 },
  { month: 'May', revenue: 312456, orders: 208, customers: 128 },
  { month: 'Jun', revenue: 345672, orders: 231, customers: 142 },
  { month: 'Jul', revenue: 356789, orders: 239, customers: 148 },
  { month: 'Aug', revenue: 378901, orders: 252, customers: 156 },
  { month: 'Sep', revenue: 392145, orders: 261, customers: 163 },
  { month: 'Oct', revenue: 401234, orders: 267, customers: 167 },
  { month: 'Nov', revenue: 423567, orders: 282, customers: 174 },
  { month: 'Dec', revenue: 445678, orders: 296, customers: 183 }
]

const topRoutes = [
  { from: 'Los Angeles, CA', to: 'New York, NY', count: 45, revenue: 56250 },
  { from: 'Miami, FL', to: 'Chicago, IL', count: 38, revenue: 41800 },
  { from: 'Seattle, WA', to: 'Austin, TX', count: 32, revenue: 46400 },
  { from: 'Boston, MA', to: 'Denver, CO', count: 28, revenue: 33600 },
  { from: 'Phoenix, AZ', to: 'Portland, OR', count: 25, revenue: 22250 },
  { from: 'Dallas, TX', to: 'Atlanta, GA', count: 23, revenue: 25300 },
  { from: 'San Diego, CA', to: 'Las Vegas, NV', count: 21, revenue: 16800 },
  { from: 'Tampa, FL', to: 'Nashville, TN', count: 19, revenue: 22800 }
]

const serviceTypes = [
  { type: 'Open Transport', count: 245, percentage: 68, revenue: 306250 },
  { type: 'Enclosed Transport', count: 89, percentage: 25, revenue: 142400 },
  { type: 'Expedited Shipping', count: 18, percentage: 5, revenue: 32400 },
  { type: 'White Glove Service', count: 8, percentage: 2, revenue: 20000 }
]

const customerSatisfaction = [
  { metric: 'Overall Rating', value: 4.7, target: 4.5, trend: '+0.2' },
  { metric: 'On-time Delivery', value: 94, target: 90, trend: '+2%' },
  { metric: 'Customer Support', value: 4.8, target: 4.6, trend: '+0.1' },
  { metric: 'Value for Money', value: 4.5, target: 4.3, trend: '+0.3' },
  { metric: 'Recommendation Rate', value: 89, target: 85, trend: '+4%' }
]

const recentActivity = [
  { time: '2 min ago', action: 'New order created', user: 'John Doe', value: '$1,250' },
  { time: '5 min ago', action: 'Payment processed', user: 'Jane Smith', value: '$890' },
  { time: '12 min ago', action: 'Document approved', user: 'Mike Johnson', value: '-' },
  { time: '18 min ago', action: 'Support ticket resolved', user: 'Sarah Wilson', value: '-' },
  { time: '25 min ago', action: 'Order delivered', user: 'Tom Brown', value: '$1,450' },
  { time: '32 min ago', action: 'Refund processed', user: 'Lisa Chen', value: '-$750' },
  { time: '45 min ago', action: 'New customer registered', user: 'David Lee', value: '-' }
]

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1]
  const previousMonth = monthlyRevenue[monthlyRevenue.length - 2]
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1)
  const orderGrowth = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders * 100).toFixed(1)
  const customerGrowth = ((currentMonth.customers - previousMonth.customers) / previousMonth.customers * 100).toFixed(1)

  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0)
  const totalOrders = monthlyRevenue.reduce((sum, month) => sum + month.orders, 0)
  const totalCustomers = monthlyRevenue.reduce((sum, month) => sum + month.customers, 0)
  const avgOrderValue = totalRevenue / totalOrders

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: `+${revenueGrowth}%`,
      icon: DollarSign,
      color: 'text-green-600',
      trend: 'up'
    },
    {
      name: 'Total Orders',
      value: totalOrders.toLocaleString(),
      change: `+${orderGrowth}%`,
      icon: Package,
      color: 'text-blue-600',
      trend: 'up'
    },
    {
      name: 'Active Customers',
      value: totalCustomers.toLocaleString(),
      change: `+${customerGrowth}%`,
      icon: Users,
      color: 'text-purple-600',
      trend: 'up'
    },
    {
      name: 'Avg Order Value',
      value: `$${avgOrderValue.toLocaleString()}`,
      change: '+3.2%',
      icon: TrendingUp,
      color: 'text-orange-600',
      trend: 'up'
    }
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-2 text-gray-600">Business insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
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
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Trend</CardTitle>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
                <option value="customers">Customers</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyRevenue.slice(-6).map((month) => {
                const value = selectedMetric === 'revenue' ? month.revenue 
                  : selectedMetric === 'orders' ? month.orders 
                  : month.customers
                const maxValue = Math.max(...monthlyRevenue.slice(-6).map(m => 
                  selectedMetric === 'revenue' ? m.revenue 
                    : selectedMetric === 'orders' ? m.orders 
                    : m.customers
                ))
                const percentage = (value / maxValue) * 100

                return (
                  <div key={month.month} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium">{month.month}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{width: `${percentage}%`}}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 text-sm text-gray-600 text-right">
                      {selectedMetric === 'revenue' ? `$${value.toLocaleString()}` : value.toLocaleString()}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Routes</CardTitle>
            <CardDescription>Most popular shipping routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRoutes.slice(0, 5).map((route, index) => (
                <div key={`${route.from}-${route.to}`} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{route.from}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {route.to}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{route.count} orders</p>
                    <p className="text-xs text-gray-500">${route.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Service Types</CardTitle>
            <CardDescription>Distribution by service category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceTypes.map((service) => (
                <div key={service.type}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{service.type}</span>
                    <span className="text-sm text-gray-500">{service.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{width: `${service.percentage}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{service.count} orders</span>
                    <span>${service.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSatisfaction.map((metric) => (
                <div key={metric.metric}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <span className="text-sm text-green-600 font-medium">{metric.trend}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-lg font-bold">
                      {metric.metric.includes('Rating') || metric.metric.includes('Value') 
                        ? `${metric.value}/5` 
                        : `${metric.value}%`}
                    </div>
                    <div className="text-xs text-gray-500">
                      Target: {metric.metric.includes('Rating') || metric.metric.includes('Value') 
                        ? `${metric.target}/5` 
                        : `${metric.target}%`}
                    </div>
                  </div>
                  {metric.metric.includes('Rating') || metric.metric.includes('Value') ? (
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(metric.value) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-green-600 h-1 rounded-full"
                        style={{width: `${metric.value}%`}}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Real-time system activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                    {activity.action.includes('order') ? (
                      <Package className="h-3 w-3 text-blue-600" />
                    ) : activity.action.includes('payment') ? (
                      <CreditCard className="h-3 w-3 text-green-600" />
                    ) : activity.action.includes('document') ? (
                      <FileText className="h-3 w-3 text-purple-600" />
                    ) : activity.action.includes('support') ? (
                      <MessageSquare className="h-3 w-3 text-orange-600" />
                    ) : activity.action.includes('delivered') ? (
                      <Truck className="h-3 w-3 text-green-600" />
                    ) : activity.action.includes('refund') ? (
                      <DollarSign className="h-3 w-3 text-red-600" />
                    ) : (
                      <Users className="h-3 w-3 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                  {activity.value !== '-' && (
                    <div className={`text-xs font-medium ${
                      activity.value.startsWith('-') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {activity.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key operational indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">97.2%</div>
                <p className="text-sm text-gray-600 mt-1">Delivery Success Rate</p>
                <div className="flex items-center justify-center mt-2 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +1.2% from last month
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.2h</div>
                <p className="text-sm text-gray-600 mt-1">Avg Response Time</p>
                <div className="flex items-center justify-center mt-2 text-xs text-green-600">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -0.8h from last month
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">14.2 days</div>
                <p className="text-sm text-gray-600 mt-1">Avg Delivery Time</p>
                <div className="flex items-center justify-center mt-2 text-xs text-green-600">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -1.1 days improvement
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">2.8%</div>
                <p className="text-sm text-gray-600 mt-1">Claim Rate</p>
                <div className="flex items-center justify-center mt-2 text-xs text-red-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3% from last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>Revenue breakdown and profitability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gross Revenue</span>
                <span className="font-bold">${totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Processing Fees</span>
                <span className="text-red-600">-$45,678</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Driver Payments</span>
                <span className="text-red-600">-$2,834,567</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Insurance Claims</span>
                <span className="text-red-600">-$23,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Refunds</span>
                <span className="text-red-600">-$12,890</span>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <span className="font-bold">Net Revenue</span>
                <span className="font-bold text-green-600">$1,189,435</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Profit Margin</span>
                <span className="text-sm text-gray-600">28.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}