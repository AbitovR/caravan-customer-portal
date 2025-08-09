'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Settings, 
  User,
  Shield,
  Bell,
  CreditCard,
  Mail,
  Database,
  Key,
  Globe,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Server,
  FileText,
  Users,
  Truck
} from 'lucide-react'

const systemSettings = {
  general: {
    companyName: 'Caravan Transport LLC',
    website: 'https://caravantransport.io',
    supportEmail: 'support@caravantransport.io',
    supportPhone: '(513) 570-0252',
    timezone: 'America/New_York',
    currency: 'USD',
    language: 'English',
    dateFormat: 'MM/DD/YYYY'
  },
  business: {
    businessHours: '8:00 AM - 6:00 PM EST',
    maxOrderDistance: 3000, // miles
    standardDeliveryTime: 7, // days
    expeditedDeliveryTime: 3, // days
    quotValidityPeriod: 14, // days
    baseServiceFee: 50,
    insuranceRate: 0.02, // 2% of vehicle value
    cancelationFee: 100
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    paymentAlerts: true,
    supportTickets: true,
    systemAlerts: true,
    marketingEmails: false
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: 30, // minutes
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15 // minutes
  },
  integrations: {
    stripeEnabled: true,
    paypalEnabled: false,
    googleMapsEnabled: true,
    sendgridEnabled: true,
    twilioEnabled: false,
    slackEnabled: false,
    webhooksEnabled: true
  }
}

const adminUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@caravantransport.io',
    role: 'Super Admin',
    lastLogin: '2024-01-20 09:30 AM',
    status: 'Active',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@caravantransport.io',
    role: 'Support Manager',
    lastLogin: '2024-01-19 04:45 PM',
    status: 'Active',
    permissions: ['support', 'documents', 'orders']
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@caravantransport.io',
    role: 'Operations',
    lastLogin: '2024-01-18 11:20 AM',
    status: 'Active',
    permissions: ['orders', 'payments', 'analytics']
  }
]

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState(systemSettings)
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'business', label: 'Business Rules', icon: Truck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'users', label: 'Admin Users', icon: Users }
  ]

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
    setUnsavedChanges(true)
  }

  const saveSettings = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings)
    setUnsavedChanges(false)
  }

  const resetSettings = () => {
    setSettings(systemSettings)
    setUnsavedChanges(false)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
            <p className="mt-2 text-gray-600">Configure system preferences and business rules</p>
          </div>
          {unsavedChanges && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="text-sm">Unsaved changes</span>
              </div>
              <Button variant="outline" onClick={resetSettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic company and system information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <Input
                      value={settings.general.companyName}
                      onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <Input
                      value={settings.general.website}
                      onChange={(e) => handleSettingChange('general', 'website', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Support Email</label>
                    <Input
                      value={settings.general.supportEmail}
                      onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Support Phone</label>
                    <Input
                      value={settings.general.supportPhone}
                      onChange={(e) => handleSettingChange('general', 'supportPhone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <select
                      value={settings.general.currency}
                      onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date Format</label>
                    <select
                      value={settings.general.dateFormat}
                      onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'business' && (
            <Card>
              <CardHeader>
                <CardTitle>Business Rules</CardTitle>
                <CardDescription>Configure operational parameters and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Hours</label>
                    <Input
                      value={settings.business.businessHours}
                      onChange={(e) => handleSettingChange('business', 'businessHours', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Order Distance (miles)</label>
                    <Input
                      type="number"
                      value={settings.business.maxOrderDistance}
                      onChange={(e) => handleSettingChange('business', 'maxOrderDistance', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Standard Delivery Time (days)</label>
                    <Input
                      type="number"
                      value={settings.business.standardDeliveryTime}
                      onChange={(e) => handleSettingChange('business', 'standardDeliveryTime', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expedited Delivery Time (days)</label>
                    <Input
                      type="number"
                      value={settings.business.expeditedDeliveryTime}
                      onChange={(e) => handleSettingChange('business', 'expeditedDeliveryTime', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Quote Validity Period (days)</label>
                    <Input
                      type="number"
                      value={settings.business.quotValidityPeriod}
                      onChange={(e) => handleSettingChange('business', 'quotValidityPeriod', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Base Service Fee ($)</label>
                    <Input
                      type="number"
                      value={settings.business.baseServiceFee}
                      onChange={(e) => handleSettingChange('business', 'baseServiceFee', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Insurance Rate (%)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={settings.business.insuranceRate * 100}
                      onChange={(e) => handleSettingChange('business', 'insuranceRate', parseFloat(e.target.value) / 100)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cancellation Fee ($)</label>
                    <Input
                      type="number"
                      value={settings.business.cancelationFee}
                      onChange={(e) => handleSettingChange('business', 'cancelationFee', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how the system sends notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Notification Channels</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(settings.notifications).slice(0, 4).map(([key, value]) => (
                        <label key={key} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Alert Types</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(settings.notifications).slice(4).map(([key, value]) => (
                        <label key={key} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure authentication and access control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center space-x-3 mb-4">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium">Require Two-Factor Authentication</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                    <Input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Password Length</label>
                    <Input
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Login Attempts</label>
                    <Input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.security.requireSpecialChars}
                        onChange={(e) => handleSettingChange('security', 'requireSpecialChars', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">Require Special Characters</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.security.requireNumbers}
                        onChange={(e) => handleSettingChange('security', 'requireNumbers', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">Require Numbers</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.security.requireUppercase}
                        onChange={(e) => handleSettingChange('security', 'requireUppercase', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">Require Uppercase Letters</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Account Lockout Duration (minutes)</label>
                    <Input
                      type="number"
                      value={settings.security.lockoutDuration}
                      onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Integrations</CardTitle>
                <CardDescription>Manage external service connections and API keys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Payment Gateways</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="font-medium">Stripe</p>
                            <p className="text-sm text-gray-500">Credit card processing</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            settings.integrations.stripeEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {settings.integrations.stripeEnabled ? 'Connected' : 'Disabled'}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSettingChange('integrations', 'stripeEnabled', !settings.integrations.stripeEnabled)}
                          >
                            {settings.integrations.stripeEnabled ? 'Disable' : 'Enable'}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-gray-500">Alternative payment method</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            settings.integrations.paypalEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {settings.integrations.paypalEnabled ? 'Connected' : 'Disabled'}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSettingChange('integrations', 'paypalEnabled', !settings.integrations.paypalEnabled)}
                          >
                            {settings.integrations.paypalEnabled ? 'Disable' : 'Enable'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Communication Services</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="font-medium">SendGrid</p>
                            <p className="text-sm text-gray-500">Email delivery service</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            settings.integrations.sendgridEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {settings.integrations.sendgridEnabled ? 'Connected' : 'Disabled'}
                          </span>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-6 w-6 text-purple-600" />
                          <div>
                            <p className="font-medium">Twilio</p>
                            <p className="text-sm text-gray-500">SMS notifications</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Disabled
                          </span>
                          <Button variant="outline" size="sm">Setup</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Other Services</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-6 w-6 text-red-600" />
                          <div>
                            <p className="font-medium">Google Maps</p>
                            <p className="text-sm text-gray-500">Location and routing services</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Connected
                          </span>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Server className="h-6 w-6 text-gray-600" />
                          <div>
                            <p className="font-medium">Webhooks</p>
                            <p className="text-sm text-gray-500">API event notifications</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            settings.integrations.webhooksEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {settings.integrations.webhooksEnabled ? 'Active' : 'Disabled'}
                          </span>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">API Keys</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowApiKeys(!showApiKeys)}
                      >
                        {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Stripe Secret Key</label>
                        <Input
                          type={showApiKeys ? 'text' : 'password'}
                          value={showApiKeys ? 'sk_live_...' : '••••••••••••••••'}
                          readOnly
                          className="font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Google Maps API Key</label>
                        <Input
                          type={showApiKeys ? 'text' : 'password'}
                          value={showApiKeys ? 'AIza...' : '••••••••••••••••'}
                          readOnly
                          className="font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">SendGrid API Key</label>
                        <Input
                          type={showApiKeys ? 'text' : 'password'}
                          value={showApiKeys ? 'SG.abc...' : '••••••••••••••••'}
                          readOnly
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'users' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Admin Users</CardTitle>
                    <CardDescription>Manage administrator accounts and permissions</CardDescription>
                  </div>
                  <Button>
                    <User className="h-4 w-4 mr-2" />
                    Add Admin User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Permissions</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Last Login</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {user.permissions.slice(0, 3).map((permission) => (
                                <span key={permission} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                                  {permission}
                                </span>
                              ))}
                              {user.permissions.length > 3 && (
                                <span className="text-xs text-gray-500">+{user.permissions.length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {user.lastLogin}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Key className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Lock className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}