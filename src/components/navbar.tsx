"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect } from "react"
import { LogOut } from "lucide-react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest
    const scrollingDown = currentScrollY > lastScrollY
    const scrollDifference = Math.abs(currentScrollY - lastScrollY)

    // Only trigger hide/show if we've scrolled more than 20px
    if (scrollDifference > 20) {
      setIsVisible(!scrollingDown)
      setLastScrollY(currentScrollY)
    }
  })

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur-sm z-50"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-8 max-w-[900px] flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/hackthenorthlogo.png"
            alt="Hack the North Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-bold text-xl gradient-text">
            Hack the North
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                className="gap-2"
                onClick={() => setShowLogoutDialog(true)}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>

              <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <AlertDialogContent className="max-w-[360px] max-h-[85vh] mx-4 rounded-xl p-6 overflow-y-auto">
                  <AlertDialogHeader className="space-y-3">
                    <AlertDialogTitle className="text-lg">Sign Out</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm">
                      Are you sure you want to sign out? You'll need to sign in again to access private events.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-4 gap-2">
                    <AlertDialogCancel className="rounded-lg text-sm h-9">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={logout}
                      className="rounded-lg bg-red-500 hover:bg-red-600 text-sm h-9"
                    >
                      Sign Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <Button asChild variant="default">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

