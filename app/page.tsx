"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden bg-dot-pattern">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/95 backdrop-blur-sm" />

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 max-w-3xl"
        >
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-primary">September 15-17, 2024</h2>
            <h1 className="text-4xl sm:text-6xl font-bold">
              <span className="gradient-text">Hack the North</span>
              <br />
              Event Directory
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover workshops, activities, and tech talks at Canada's biggest hackathon. Join us for an unforgettable
            weekend of innovation and collaboration.
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="/events">Browse Events</Link>
            </Button>
            {!isAuthenticated && (
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/login">Hacker Login</Link>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

