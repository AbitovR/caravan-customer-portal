'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Gift, Users, DollarSign, Share2, Copy, Mail, MessageCircle, CheckCircle, Clock } from 'lucide-react'

const referralStats = {
  totalReferred: 5,
  successfulReferrals: 3,
  pendingReferrals: 2,
  totalEarned: 150,
  availableBalance: 50,
  lifetimeEarnings: 250,
}

const referralHistory = [
  {
    id: '1',
    email: 'john.d***@gmail.com',
    status: 'completed',
    reward: 50,
    date: '2024-01-10',
    orderCompleted: true,
  },
  {
    id: '2',
    email: 'sarah.m***@yahoo.com',
    status: 'completed',
    reward: 50,
    date: '2023-12-15',
    orderCompleted: true,
  },
  {
    id: '3',
    email: 'mike.w***@outlook.com',
    status: 'pending',
    reward: 50,
    date: '2024-01-18',
    orderCompleted: false,
  },
  {
    id: '4',
    email: 'lisa.t***@gmail.com',
    status: 'completed',
    reward: 50,
    date: '2023-11-20',
    orderCompleted: true,
  },
  {
    id: '5',
    email: 'david.r***@hotmail.com',
    status: 'pending',
    reward: 50,
    date: '2024-01-20',
    orderCompleted: false,
  },
]

export default function ReferralsPage() {
  const [referralCode] = useState('JOHN50')
  const [referralLink] = useState(`https://caravantransport.io/signup?ref=${referralCode}`)
  const [inviteEmail, setInviteEmail] = useState('')
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sendInvite = () => {
    // Handle email invite
    console.log('Sending invite to:', inviteEmail)
    setInviteEmail('')
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Referral Program</h1>
        <p className="mt-2 text-gray-600">Earn $50 for every friend who completes their first shipment</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Referred</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.totalReferred}</div>
            <p className="text-xs text-gray-500 mt-1">Friends invited</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Successful Referrals</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.successfulReferrals}</div>
            <p className="text-xs text-gray-500 mt-1">Completed first order</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Earned</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${referralStats.totalEarned}</div>
            <p className="text-xs text-gray-500 mt-1">${referralStats.availableBalance} available</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Referral Link</CardTitle>
              <CardDescription>
                Your friends get $25 off their first shipment, and you earn $50 when they complete it!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Your Referral Code</label>
                <div className="mt-2 flex space-x-2">
                  <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border">
                    <p className="text-lg font-mono font-bold text-orange-600">{referralCode}</p>
                  </div>
                  <Button onClick={() => copyToClipboard(referralCode)}>
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Your Referral Link</label>
                <div className="mt-2 flex space-x-2">
                  <Input value={referralLink} readOnly className="font-mono text-sm" />
                  <Button onClick={() => copyToClipboard(referralLink)}>
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="flex-1" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Share via Email
                </Button>
                <Button className="flex-1" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Share via SMS
                </Button>
                <Button className="flex-1" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  More Options
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invite by Email</CardTitle>
              <CardDescription>Send a personalized invitation to your friends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter friend's email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <Button onClick={sendInvite}>Send Invite</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
              <CardDescription>Track your referrals and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralHistory.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`h-2 w-2 rounded-full ${
                        referral.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{referral.email}</p>
                        <p className="text-xs text-gray-500">{referral.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {referral.status === 'completed' ? `+$${referral.reward}` : 'Pending'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {referral.orderCompleted ? 'Order completed' : 'Awaiting first order'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-green-600">${referralStats.availableBalance}</p>
                  <p className="text-sm text-gray-600 mt-1">Available for withdrawal</p>
                </div>
                <Button className="w-full">Withdraw Rewards</Button>
                <Button className="w-full" variant="outline">Apply to Next Order</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-600">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium">Share Your Link</p>
                    <p className="text-xs text-gray-500">Send your unique referral link to friends</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-600">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium">Friend Signs Up</p>
                    <p className="text-xs text-gray-500">They get $25 off their first shipment</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-600">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium">Earn Rewards</p>
                    <p className="text-xs text-gray-500">Get $50 when they complete their first order</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>• Referral must be a new customer</li>
                <li>• Reward credited after first order completion</li>
                <li>• No limit on number of referrals</li>
                <li>• Rewards expire after 12 months</li>
                <li>• Cannot refer yourself or existing customers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}