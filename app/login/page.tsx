"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Check, Copy } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [copiedUser, setCopiedUser] = useState(false)
  const [copiedPass, setCopiedPass] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleCopy = async (text: string, type: 'user' | 'pass') => {
    await navigator.clipboard.writeText(text)
    if (type === 'user') {
      setCopiedUser(true)
      setTimeout(() => setCopiedUser(false), 2000)
    } else {
      setCopiedPass(true)
      setTimeout(() => setCopiedPass(false), 2000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(username, password)
    if (success) {
      router.push("/events")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-4 bg-dot-pattern">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/95 backdrop-blur-sm" />

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md rounded-[32px] border-[#E5E7EB] shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-6">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center text-base">
            Login to access private events and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 rounded-xl bg-white border-[#E5E7EB] focus:border-primary focus:ring-primary"
                placeholder="Enter your username"
              />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Test value:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('hacker', 'user')}
                  className="group flex items-center gap-2 px-2 py-1 bg-gray-100 rounded font-mono hover:bg-gray-200 transition-colors"
                >
                  <code>hacker</code>
                  {copiedUser ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-xl bg-white border-[#E5E7EB] focus:border-primary focus:ring-primary"
                placeholder="Enter your password"
              />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Test value:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('htn2025', 'pass')}
                  className="group flex items-center gap-2 px-2 py-1 bg-gray-100 rounded font-mono hover:bg-gray-200 transition-colors"
                >
                  <code>htn2025</code>
                  {copiedPass ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

