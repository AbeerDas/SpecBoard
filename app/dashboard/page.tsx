'use client'

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, GitBranch, Users, Clock, AlertTriangle } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  const handleSpecClick = (specId: string) => {
    router.push(`/editor?spec=${specId}`)
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
              <nav className="hidden sm:flex space-x-4">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Dashboard
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search specs by meaning..."
                  className="pl-10 w-48 lg:w-64 bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500"
                />
              </div>
              <Link href="/editor">
                <Button className="bg-white text-gray-950 hover:bg-gray-200">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">New Spec</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Your Specifications</h1>
          <p className="text-gray-400">Manage and refine your AI-driven specifications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-400">Active Specs</CardTitle>
              <div className="text-xl sm:text-2xl font-bold text-white">12</div>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-400">AI Enhancements</CardTitle>
              <div className="text-xl sm:text-2xl font-bold text-white">47</div>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-400">Clarifier Responses</CardTitle>
              <div className="text-xl sm:text-2xl font-bold text-white">89</div>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-400">Clarity Score</CardTitle>
              <div className="text-xl sm:text-2xl font-bold text-green-400">94%</div>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Specs */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recent Specifications</h2>
          
          <Card 
            className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
            onClick={() => handleSpecClick('auth-system')}
          >
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 min-w-0 flex-1">
                  <CardTitle className="text-white break-words">E-commerce Platform Specification</CardTitle>
                  <CardDescription className="text-gray-400 break-words">
                    Complete specification for building a modern e-commerce platform with React, Next.js, and Stripe integration
                  </CardDescription>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />1 hour ago
                    </div>
                    <div className="flex items-center">
                      <GitBranch className="h-4 w-4 mr-1" />
                      v3.2
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />2 collaborators
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-green-400 border-green-400/30">
                    Active
                  </Badge>
                  <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                    Frontend
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
            onClick={() => handleSpecClick('api-design')}
          >
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 min-w-0 flex-1">
                  <CardTitle className="text-white break-words">REST API Design Specification</CardTitle>
                  <CardDescription className="text-gray-400 break-words">
                    Comprehensive API specification for user management, authentication, and data operations
                  </CardDescription>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />2 days ago
                    </div>
                    <div className="flex items-center">
                      <GitBranch className="h-4 w-4 mr-1" />
                      v2.1
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />3 collaborators
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-green-400 border-green-400/30">
                    Active
                  </Badge>
                  <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                    Backend
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
            onClick={() => handleSpecClick('mobile-app')}
          >
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-white break-words">Mobile App UI Specification</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                  </div>
                  <CardDescription className="text-gray-400 break-words">
                    React Native mobile application with offline capabilities and push notifications
                  </CardDescription>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />1 week ago
                    </div>
                    <div className="flex items-center">
                      <GitBranch className="h-4 w-4 mr-1" />
                      v1.8
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />4 collaborators
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                    Needs Review
                  </Badge>
                  <Badge variant="outline" className="text-green-400 border-green-400/30">
                    Mobile
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
