import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Users, Search, Code, TestTube, Zap } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">SpecBoard</h1>
              <Badge variant="outline" className="text-gray-400 border-gray-700">
                🧭 DEMO
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden sm:flex text-gray-300 hover:text-white">
                Sign In
              </Button>
              <Link href="/dashboard">
                <Button className="bg-white text-gray-950 hover:bg-gray-200">Try Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Reclaiming Developer Intent
            <br />
            <span className="text-xl sm:text-3xl text-gray-400">in the Age of AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            The first specification platform built for prompt-driven software. Version, refine, and share the
            instructions that inform AI-assisted systems.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-white text-gray-950 hover:bg-gray-200">
                Explore Demo
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Key Concept */}
      <section className="py-12 sm:py-16 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">The New Source Code</h2>
            <p className="text-gray-300 text-base sm:text-lg">
              <span className="text-white font-mono">Prompt + Specification</span> is the new source code.
              <br />
              <span className="text-gray-500">Code is just the compiled result.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white">
            A Specification IDE, Not Just a Prompt Log
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <GitBranch className="h-8 w-8 text-gray-400 mb-2" />
                <CardTitle className="text-white">Version Control</CardTitle>
                <CardDescription className="text-gray-400">
                  Git-style diffs, branching, and change history for specifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Users className="h-8 w-8 text-gray-400 mb-2" />
                <CardTitle className="text-white">Team Collaboration</CardTitle>
                <CardDescription className="text-gray-400">
                  Pull requests for structured communication, not just code
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Search className="h-8 w-8 text-gray-400 mb-2" />
                <CardTitle className="text-white">Semantic Search</CardTitle>
                <CardDescription className="text-gray-400">Query specs by meaning, not just keywords</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Code className="h-8 w-8 text-gray-400 mb-2" />
                <CardTitle className="text-white">Code Round-Tripping</CardTitle>
                <CardDescription className="text-gray-400">
                  Traceability from generated code back to original intent
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <TestTube className="h-8 w-8 text-gray-400 mb-2" />
                <CardTitle className="text-white">Spec-Based Testing</CardTitle>
                <CardDescription className="text-gray-400">
                  Define expected behaviors as evaluation criteria
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <Zap className="h-8 w-8 text-gray-400 mb-2" />
                <CardTitle className="text-white">AI Enhancement</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-powered specification refinement and improvement
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-12 sm:py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">GitHub for Structured Communication</h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
            Imagine a future where the primary artifact of software teams is not code, but intention. Where
            specifications allow teams to collaborate on shared understanding, enabling faster iteration, clearer
            thinking, and safer systems.
          </p>
          <div className="text-gray-500 text-sm">
            Specifications are no longer a side effect — they are the build process.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">SpecBoard Demo • Built for the age of prompt-driven software</p>
        </div>
      </footer>
    </div>
  )
}
