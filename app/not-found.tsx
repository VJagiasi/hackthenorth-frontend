import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 bg-grid-small-black/[0.2] relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient-xy" />
      
      {/* Browser-style window */}
      <div className="w-full max-w-2xl mx-auto mb-8 rounded-lg border shadow-2xl bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 relative">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b px-4 py-2.5 bg-muted/50">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse delay-75" />
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse delay-150" />
          </div>
          <div className="flex-1 text-center text-sm font-medium text-muted-foreground select-none">
            Error 404 - Page Not Found - Hack The North
          </div>
        </div>
        
        <div className="text-center space-y-6 p-8 relative">
          {/* Glitch effect container */}
          <div className="relative inline-block">
            <h1 className="text-9xl font-bold gradient-text animate-bounce-slow">404</h1>
            <div className="absolute -inset-0.5 text-9xl font-bold gradient-text opacity-50 blur-sm animate-pulse">404</div>
          </div>
          
          <h2 className="text-3xl font-semibold animate-fade-in">Hack Gone Wrong!</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto animate-fade-in-up">
            Looks like you've ventured into uncharted territory. Even the best hackers sometimes take an unexpected route!
          </p>
          
          <div className="flex gap-4 justify-center mt-8 animate-fade-in-up delay-200">
            <Button asChild variant="default" className="animate-pulse hover:animate-none">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" className="animate-pulse hover:animate-none delay-75">
              <a href="https://hackthenorth.com" target="_blank" rel="noopener noreferrer">
                Visit Hack The North
              </a>
            </Button>
          </div>
          
          {/* Enhanced Matrix rain effect */}
          <div className="mt-12 font-mono text-sm overflow-hidden">
            <pre className="text-primary/50 animate-matrix-rain-fast">
              {`01001000 01010100 01001110`}
            </pre>
            <pre className="text-primary/40 animate-matrix-rain-medium">
              {`10101010 11001100 10101010`}
            </pre>
            <pre className="text-primary/30 animate-matrix-rain-slow">
              {`01001000 01000001 01000011`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
} 