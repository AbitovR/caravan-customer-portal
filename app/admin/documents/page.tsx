'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FileText, 
  Search, 
  Filter, 
  MoreVertical, 
  Download,
  Eye,
  Check,
  X,
  Clock,
  AlertTriangle,
  Upload,
  Camera,
  Shield,
  User,
  Calendar,
  CheckCircle
} from 'lucide-react'

const documents = [
  {
    id: 'DOC-2024-001',
    orderId: 'ORD-2024-101',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    documentType: 'Vehicle Registration',
    fileName: 'registration_toyota_camry.pdf',
    fileSize: '2.4 MB',
    uploadDate: '2024-01-15',
    status: 'Approved',
    reviewedBy: 'Admin User',
    reviewDate: '2024-01-16',
    notes: 'Document verified successfully. Valid registration.',
    category: 'Vehicle Documents',
    isRequired: true,
    expiryDate: '2025-01-15'
  },
  {
    id: 'DOC-2024-002',
    orderId: 'ORD-2024-102',
    customer: 'Jane Smith',
    customerEmail: 'jane@example.com',
    documentType: 'Driver License',
    fileName: 'license_jane_smith.jpg',
    fileSize: '1.8 MB',
    uploadDate: '2024-01-16',
    status: 'Pending Review',
    reviewedBy: null,
    reviewDate: null,
    notes: null,
    category: 'Identity Documents',
    isRequired: true,
    expiryDate: '2026-03-20'
  },
  {
    id: 'DOC-2024-003',
    orderId: 'ORD-2024-103',
    customer: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    documentType: 'Insurance Certificate',
    fileName: 'insurance_ford_f150.pdf',
    fileSize: '1.2 MB',
    uploadDate: '2024-01-14',
    status: 'Rejected',
    reviewedBy: 'Admin User',
    reviewDate: '2024-01-15',
    notes: 'Document expired. Please upload current insurance certificate.',
    category: 'Insurance Documents',
    isRequired: true,
    expiryDate: '2023-12-31'
  },
  {
    id: 'DOC-2024-004',
    orderId: 'ORD-2024-104',
    customer: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    documentType: 'Vehicle Photos',
    fileName: 'bmw_x5_photos.zip',
    fileSize: '15.7 MB',
    uploadDate: '2024-01-10',
    status: 'Approved',
    reviewedBy: 'Admin User',
    reviewDate: '2024-01-11',
    notes: 'All required photos provided. Vehicle condition documented.',
    category: 'Vehicle Photos',
    isRequired: true,
    expiryDate: null
  },
  {
    id: 'DOC-2024-005',
    orderId: 'ORD-2024-105',
    customer: 'Tom Brown',
    customerEmail: 'tom@example.com',
    documentType: 'Title Certificate',
    fileName: 'title_mercedes_c_class.pdf',
    fileSize: '3.1 MB',
    uploadDate: '2024-01-12',
    status: 'Needs Review',
    reviewedBy: null,
    reviewDate: null,
    notes: null,
    category: 'Vehicle Documents',
    isRequired: true,
    expiryDate: null
  },
  {
    id: 'DOC-2024-006',
    orderId: 'ORD-2024-101',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    documentType: 'Pickup Authorization',
    fileName: 'pickup_auth_john_doe.pdf',
    fileSize: '856 KB',
    uploadDate: '2024-01-17',
    status: 'Approved',
    reviewedBy: 'Admin User',
    reviewDate: '2024-01-17',
    notes: 'Authorized person confirmed for vehicle pickup.',
    category: 'Authorization Documents',
    isRequired: false,
    expiryDate: '2024-02-17'
  }
]

const statusColors = {
  'Approved': 'bg-green-100 text-green-800',
  'Pending Review': 'bg-yellow-100 text-yellow-800',
  'Rejected': 'bg-red-100 text-red-800',
  'Needs Review': 'bg-orange-100 text-orange-800',
}

const statusIcons = {
  'Approved': CheckCircle,
  'Pending Review': Clock,
  'Rejected': X,
  'Needs Review': AlertTriangle,
}

const categoryColors = {
  'Vehicle Documents': 'bg-blue-100 text-blue-800',
  'Identity Documents': 'bg-purple-100 text-purple-800',
  'Insurance Documents': 'bg-green-100 text-green-800',
  'Vehicle Photos': 'bg-orange-100 text-orange-800',
  'Authorization Documents': 'bg-gray-100 text-gray-800',
}

export default function AdminDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDocument, setSelectedDocument] = useState<typeof documents[0] | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = [
    {
      name: 'Total Documents',
      value: documents.length.toString(),
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      name: 'Pending Review',
      value: documents.filter(d => d.status === 'Pending Review' || d.status === 'Needs Review').length.toString(),
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      name: 'Approved Today',
      value: documents.filter(d => d.status === 'Approved' && d.reviewDate === '2024-01-17').length.toString(),
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      name: 'Rejected',
      value: documents.filter(d => d.status === 'Rejected').length.toString(),
      icon: X,
      color: 'text-red-600'
    }
  ]

  const approveDocument = (docId: string) => {
    // In a real app, this would make an API call
    console.log('Approving document:', docId)
  }

  const rejectDocument = (docId: string) => {
    // In a real app, this would make an API call
    console.log('Rejecting document:', docId)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Document Review</h1>
        <p className="mt-2 text-gray-600">Review and manage customer documents</p>
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
              <p className="text-xs text-gray-500 mt-1">Updated in real-time</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Document Queue</CardTitle>
              <CardDescription>Review and approve customer documents</CardDescription>
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents by ID, customer, or type..."
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
              <option value="Pending Review">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Needs Review">Needs Review</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="Vehicle Documents">Vehicle Documents</option>
              <option value="Identity Documents">Identity Documents</option>
              <option value="Insurance Documents">Insurance Documents</option>
              <option value="Vehicle Photos">Vehicle Photos</option>
              <option value="Authorization Documents">Authorization Documents</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Document</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Order</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Upload Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((document) => {
                  const StatusIcon = statusIcons[document.status as keyof typeof statusIcons]
                  return (
                    <tr key={document.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 p-2 rounded">
                            <FileText className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{document.id}</p>
                            <p className="text-sm text-gray-500">{document.fileName}</p>
                            <p className="text-xs text-gray-400">{document.fileSize}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{document.customer}</p>
                          <p className="text-sm text-gray-500">{document.customerEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-blue-600">{document.orderId}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <p className="text-sm font-medium">{document.documentType}</p>
                          {document.isRequired && (
                            <span className="text-red-500 text-xs">*</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          categoryColors[document.category as keyof typeof categoryColors]
                        }`}>
                          {document.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[document.status as keyof typeof statusColors]
                        }`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {document.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedDocument(document)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {(document.status === 'Pending Review' || document.status === 'Needs Review') && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-green-600 hover:text-green-700"
                                onClick={() => approveDocument(document.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => rejectDocument(document.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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

      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Document Details</h2>
              <Button variant="ghost" onClick={() => setSelectedDocument(null)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Document Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Document ID:</span>
                    <p className="text-gray-700">{selectedDocument.id}</p>
                  </div>
                  <div>
                    <span className="font-medium">File Name:</span>
                    <p className="text-gray-700">{selectedDocument.fileName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>
                    <p className="text-gray-700">{selectedDocument.documentType}</p>
                  </div>
                  <div>
                    <span className="font-medium">Category:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${
                      categoryColors[selectedDocument.category as keyof typeof categoryColors]
                    }`}>
                      {selectedDocument.category}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">File Size:</span>
                    <p className="text-gray-700">{selectedDocument.fileSize}</p>
                  </div>
                  <div>
                    <span className="font-medium">Required:</span>
                    <p className="text-gray-700">{selectedDocument.isRequired ? 'Yes' : 'No'}</p>
                  </div>
                  {selectedDocument.expiryDate && (
                    <div>
                      <span className="font-medium">Expiry Date:</span>
                      <p className="text-gray-700">{new Date(selectedDocument.expiryDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Review Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${
                      statusColors[selectedDocument.status as keyof typeof statusColors]
                    }`}>
                      {selectedDocument.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Upload Date:</span>
                    <p className="text-gray-700">{new Date(selectedDocument.uploadDate).toLocaleDateString()}</p>
                  </div>
                  {selectedDocument.reviewedBy && (
                    <>
                      <div>
                        <span className="font-medium">Reviewed By:</span>
                        <p className="text-gray-700">{selectedDocument.reviewedBy}</p>
                      </div>
                      <div>
                        <span className="font-medium">Review Date:</span>
                        <p className="text-gray-700">{selectedDocument.reviewDate ? new Date(selectedDocument.reviewDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </>
                  )}
                  {selectedDocument.notes && (
                    <div>
                      <span className="font-medium">Review Notes:</span>
                      <p className="text-gray-700 mt-1 p-2 bg-gray-50 rounded">{selectedDocument.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-span-2">
                <h3 className="font-semibold mb-3">Customer & Order</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Customer:</span>
                    <p className="text-gray-700">{selectedDocument.customer}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-gray-700">{selectedDocument.customerEmail}</p>
                  </div>
                  <div>
                    <span className="font-medium">Order ID:</span>
                    <p className="text-blue-600 font-medium">{selectedDocument.orderId}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                  Close
                </Button>
                {(selectedDocument.status === 'Pending Review' || selectedDocument.status === 'Needs Review') && (
                  <>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}