'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Save, GitBranch, Users, CheckCircle, HelpCircle, Eye, Zap, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { EnhancementOptionsDropdown } from "@/components/enhancement-options"
import { ClarifierResponse, EnhancedData, EnhancementOptions, DEFAULT_ENHANCEMENT_OPTIONS } from "@/types/enhancement"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"



export default function EditorPage() {
  const searchParams = useSearchParams()
  const specId = searchParams.get('spec') || 'new'
  const [specification, setSpecification] = useState('')
  const [title, setTitle] = useState('')
  const [isSaved, setIsSaved] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [clarifierResponse, setClarifierResponse] = useState('')
  const [clarifierResponses, setClarifierResponses] = useState<ClarifierResponse>({})
  const [thoughtClarifiers, setThoughtClarifiers] = useState<string[]>([
    "How should error handling be implemented across the application?",
    "What specific performance metrics should be tracked and monitored?",
    "Which third-party integrations require fallback strategies?"
  ])
  const [enhancedData, setEnhancedData] = useState<EnhancedData | null>(null)
  const [enhancementError, setEnhancementError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [enhancementOptions, setEnhancementOptions] = useState<EnhancementOptions>(DEFAULT_ENHANCEMENT_OPTIONS)
  const [showEnhancementOptions, setShowEnhancementOptions] = useState(false)

  // Load specification based on ID or default
  useEffect(() => {
    if (specId === 'auth-system') {
      setTitle('E-commerce Platform Specification')
      setSpecification(`# E-commerce Platform Specification

## Project Overview
Build a modern, scalable e-commerce platform that allows users to browse products, manage their cart, process payments, and track orders. The platform should be built with React, Next.js, and integrate with Stripe for payment processing.

## Core Features

### User Authentication & Management
- User registration and login system
- Password reset functionality
- User profile management
- Order history tracking
- Wishlist functionality

### Product Catalog
- Product browsing with categories and filters
- Product search functionality
- Product detail pages with images and descriptions
- Inventory management
- Product reviews and ratings

### Shopping Cart & Checkout
- Add/remove items from cart
- Cart persistence across sessions
- Secure checkout process
- Multiple payment methods (Stripe integration)
- Order confirmation and email notifications

## Technical Requirements

### Frontend
- React 18 with TypeScript
- Next.js 14 with App Router
- Tailwind CSS for styling
- Responsive design for mobile and desktop
- SEO optimization
- Performance optimization (lazy loading, caching)

### Backend
- Next.js API routes
- PostgreSQL database with Prisma ORM
- Authentication with NextAuth.js
- File upload handling for product images
- Email service integration

## Success Criteria
- All core features implemented and tested
- Payment processing works seamlessly
- Mobile responsiveness across devices
- Performance benchmarks met
- Security audit passed`)
    } else if (specId === 'api-design') {
      setTitle('REST API Design Specification')
      setSpecification(`# REST API Design Specification

## API Overview
Design and implement a comprehensive REST API for user management, authentication, and data operations. The API should follow RESTful principles and provide secure, scalable endpoints for a web application.

## Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- API key management for external integrations
- Rate limiting per user/API key
- OAuth 2.0 support for third-party integrations

## Core Endpoints

### Authentication Endpoints
- POST /api/auth/login - User login
- POST /api/auth/register - User registration
- POST /api/auth/logout - User logout
- POST /api/auth/refresh - Token refresh
- POST /api/auth/forgot-password - Password reset request
- POST /api/auth/reset-password - Password reset confirmation

### User Management
- GET /api/users - List users (admin only)
- GET /api/users/:id - Get user details
- PUT /api/users/:id - Update user profile
- DELETE /api/users/:id - Delete user account
- GET /api/users/me - Get current user profile

## Technical Specifications
- JSON format for all requests and responses
- Consistent error response structure
- Proper HTTP status codes
- Request validation and sanitization`)
    } else if (specId === 'mobile-app') {
      setTitle('Mobile App UI Specification')
      setSpecification(`# Mobile App UI Specification

## App Overview
Develop a React Native mobile application with offline capabilities, push notifications, and a modern, intuitive user interface. The app should work seamlessly on both iOS and Android platforms.

## Core Features

### User Interface
- Modern, clean design following platform guidelines
- Dark and light theme support
- Smooth animations and transitions
- Gesture-based navigation
- Accessibility features

### Offline Capabilities
- Data synchronization when online
- Offline data storage and access
- Queue management for offline actions
- Conflict resolution for data sync

### Push Notifications
- Real-time notifications
- Notification categories and actions
- Badge count management
- Deep linking from notifications`)
    } else {
      setTitle('New Specification')
      setSpecification(`# New Specification

## Overview
Describe your project or feature here...

## Requirements
- List your requirements
- Be specific about functionality
- Include technical constraints

## Success Criteria
- Define what success looks like
- Include measurable outcomes`)
    }
  }, [specId])

  const handleGenerate = async (isRetry = false) => {
    if (!specification.trim()) {
      alert('Please enter a specification before generating enhancements.')
      return
    }

    setIsGenerating(true)
    setEnhancementError(null)
    
    if (!isRetry) {
      setRetryCount(0)
    }
    
    try {
      const response = await fetch('/api/enhance-spec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          specification,
          clarifierResponses,
          enhancementOptions
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: EnhancedData = await response.json()
      
      // Validate the response
      if (!data.enhanced_specification || !data.thought_clarifiers) {
        throw new Error('Invalid response format from server')
      }

      setEnhancedData(data)
      setThoughtClarifiers(data.thought_clarifiers)
      setRetryCount(0) // Reset retry count on success
      
    } catch (error) {
      console.error('Error generating enhancement:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate enhancement'
      setEnhancementError(errorMessage)
      
      // Show user-friendly error message with retry option
      if (retryCount < 2) {
        setRetryCount(prev => prev + 1)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRetry = () => {
    handleGenerate(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/save-spec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          specification,
          specId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save specification')
      }

      const result = await response.json()
      setIsSaved(true)
      alert(result.message)
    } catch (error) {
      console.error('Error saving specification:', error)
      alert('Failed to save specification. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmitResponse = async () => {
    if (!clarifierResponse.trim()) {
      alert('Please enter a response before submitting.')
      return
    }

    const currentQuestion = thoughtClarifiers.find(q => !clarifierResponses[q])
    if (!currentQuestion) {
      alert('No active question to respond to.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion,
          response: clarifierResponse,
          specId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit response')
      }

      const result = await response.json()
      
      // Update local state
      setClarifierResponses(prev => ({
        ...prev,
        [currentQuestion]: clarifierResponse
      }))
      setClarifierResponse('')
      
      alert(result.message)
    } catch (error) {
      console.error('Error submitting response:', error)
      alert('Failed to submit response. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSpecificationChange = (value: string) => {
    setSpecification(value)
    setIsSaved(false)
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setIsSaved(false)
  }

  const handleApplyEnhancement = () => {
    if (enhancedData) {
      setSpecification(enhancedData.enhanced_specification)
      setIsSaved(false)
      setEnhancedData(null)
      setEnhancementError(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-xl font-bold text-white">
                SpecBoard
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Link href="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
                <span>/</span>
                <span className="text-white truncate max-w-xs">{title || 'New Specification'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-400 hover:text-white">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-400 hover:text-white">
                <Users className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                size="sm" 
                className="bg-white text-gray-950 hover:bg-gray-200"
                onClick={handleSave}
                disabled={isSaved || isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                <span className="hidden sm:inline">
                  {isSaving ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor Header */}
          <div className="border-b border-gray-800 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 flex-1 min-w-0">
                <Input
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-lg sm:text-xl font-semibold bg-transparent border-none p-0 text-white focus:ring-0"
                  placeholder="Enter specification title..."
                />
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <GitBranch className="h-4 w-4 mr-1" />
                    main
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />2 collaborators
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400/30">
                    v3.2
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <EnhancementOptionsDropdown
                  options={enhancementOptions}
                  onOptionsChange={setEnhancementOptions}
                  isOpen={showEnhancementOptions}
                  onOpenChange={setShowEnhancementOptions}
                />
                <Button 
                  onClick={() => handleGenerate(false)}
                  disabled={isGenerating}
                  className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Zap className="h-4 w-4 mr-2" />
                  )}
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-auto">
            {/* Main Specification Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Current Specification</label>
              <Textarea
                value={specification}
                onChange={(e) => handleSpecificationChange(e.target.value)}
                className="min-h-[400px] bg-gray-900 border-gray-800 text-gray-100 font-mono text-sm resize-y"
                placeholder="Write your specification here..."
              />
            </div>

            {/* Enhanced Response Display */}
            {enhancedData && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white text-lg">AI Enhanced Specification</CardTitle>
                  <Button 
                    size="sm" 
                    onClick={handleApplyEnhancement}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Apply Enhancement
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="bg-gray-800 p-4 rounded text-sm text-gray-100 overflow-auto max-h-96 border">
                        <pre className="whitespace-pre-wrap break-words font-mono">
                          {enhancedData.enhanced_specification}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhancement Error Display */}
            {enhancementError && (
              <Card className="bg-red-900/20 border-red-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <CardTitle className="text-red-400 text-lg">Enhancement Error</CardTitle>
                    </div>
                    {retryCount < 2 && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-700 text-red-300 hover:bg-red-900/30"
                        onClick={handleRetry}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        Retry ({2 - retryCount} left)
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-red-300 text-sm break-words mb-3">{enhancementError}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-red-700 text-red-300 hover:bg-red-900/30"
                      onClick={() => setEnhancementError(null)}
                    >
                      Dismiss
                    </Button>
                    {retryCount >= 2 && (
                      <p className="text-xs text-red-400 self-center">
                        Maximum retries reached. Please try again later or modify your specification.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-800 bg-gray-950">
          <div className="p-4 border-b border-gray-800">
            <h3 className="font-semibold text-white mb-4">Thought Clarifier</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-gray-300">Specification structure is clear</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {thoughtClarifiers.map((question, index) => {
                  const isAnswered = clarifierResponses[question]
                  const isCurrentQuestion = !isAnswered && !thoughtClarifiers.slice(0, index).some(q => !clarifierResponses[q])
                  
                  return (
                    <div key={question} className="space-y-2">
                      <div className="flex items-start space-x-2">
                        {isAnswered ? (
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <HelpCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="text-sm flex-1 min-w-0">
                          <p className={`${isAnswered ? 'text-gray-400' : 'text-gray-300'} mb-1 break-words`}>
                            {question}
                          </p>
                          {isAnswered && (
                            <p className="text-xs text-green-300 bg-gray-800 p-2 rounded break-words">
                              {clarifierResponses[question]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {/* Input field for current question */}
                {thoughtClarifiers.some(q => !clarifierResponses[q]) && (
                  <div className="space-y-2">
                    <Input
                      value={clarifierResponse}
                      onChange={(e) => setClarifierResponse(e.target.value)}
                      placeholder="Type your response here..."
                      className="bg-gray-800 border-gray-700 text-gray-100 text-sm"
                    />
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleSubmitResponse}
                      disabled={isSubmitting || !clarifierResponse.trim()}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : null}
                      {isSubmitting ? 'Submitting...' : 'Submit Response'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-white mb-4">Version History</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">v3.2</span>
                <span className="text-gray-500">Current</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">v3.1</span>
                <span className="text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">v3.0</span>
                <span className="text-gray-500">1 day ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">v2.8</span>
                <span className="text-gray-500">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
