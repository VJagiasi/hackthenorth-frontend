"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { LogOut } from "lucide-react"
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

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 max-w-screen-lg flex items-center justify-between h-16">
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
                <AlertDialogContent className="rounded-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sign Out</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to sign out? You'll need to sign in again to access private events.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={logout}
                      className="rounded-lg bg-red-500 hover:bg-red-600"
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
    </nav>
  )
}

