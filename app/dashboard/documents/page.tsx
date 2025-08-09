'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Upload, Download, Trash2, Eye, CheckCircle, AlertCircle } from 'lucide-react'

const documentTypes = {
  ID: { label: 'Driver License / ID', icon: FileText, required: true },
  INSURANCE: { label: 'Insurance Documents', icon: FileText, required: false },
  REGISTRATION: { label: 'Vehicle Registration', icon: FileText, required: true },
  TITLE: { label: 'Vehicle Title', icon: FileText, required: true },
  OTHER: { label: 'Other Documents', icon: FileText, required: false },
}

const mockDocuments = [
  {
    id: '1',
    name: 'drivers_license.pdf',
    type: 'ID',
    size: 245000,
    uploadedAt: '2024-01-15T10:30:00',
    status: 'verified',
    url: '#',
  },
  {
    id: '2',
    name: 'vehicle_registration.pdf',
    type: 'REGISTRATION',
    size: 180000,
    uploadedAt: '2024-01-14T15:45:00',
    status: 'pending',
    url: '#',
  },
  {
    id: '3',
    name: 'insurance_policy.pdf',
    type: 'INSURANCE',
    size: 520000,
    uploadedAt: '2024-01-13T09:20:00',
    status: 'verified',
    url: '#',
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [selectedType, setSelectedType] = useState<keyof typeof documentTypes>('ID')
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload here
    acceptedFiles.forEach((file) => {
      const newDoc = {
        id: Date.now().toString(),
        name: file.name,
        type: selectedType,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'pending',
        url: '#',
      }
      setDocuments((prev) => [...prev, newDoc])
    })
  }, [selectedType])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 10485760, // 10MB
  })

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <p className="mt-2 text-gray-600">Upload and manage your shipping documents</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Upload required documents for your shipments. Files must be PDF or images under 10MB.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Document Type</label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {Object.entries(documentTypes).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedType(key as keyof typeof documentTypes)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          selectedType === key
                            ? 'bg-orange-50 border-orange-500 text-orange-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{value.label}</span>
                          {value.required && <span className="text-red-500">*</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {isDragActive
                      ? 'Drop the files here...'
                      : 'Drag & drop files here, or click to select'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>
                {documents.length} document(s) uploaded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => {
                  const docType = documentTypes[doc.type as keyof typeof documentTypes]
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <FileText className="h-10 w-10 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {docType.label} • {formatFileSize(doc.size)} • {formatDate(doc.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.status === 'verified' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Pending
                          </span>
                        )}
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Document Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900">Required Documents</h4>
                  <ul className="mt-2 space-y-1 text-sm text-blue-700">
                    <li>• Valid Driver's License or ID</li>
                    <li>• Vehicle Registration</li>
                    <li>• Vehicle Title</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900">Optional Documents</h4>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    <li>• Insurance Documentation</li>
                    <li>• Power of Attorney</li>
                    <li>• Additional Photos</li>
                  </ul>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-2">Guidelines:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Files must be clear and legible</li>
                    <li>• Maximum file size: 10MB</li>
                    <li>• Accepted formats: PDF, PNG, JPG</li>
                    <li>• Documents are verified within 24 hours</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}