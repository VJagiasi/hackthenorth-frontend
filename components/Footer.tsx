"use client"

import Image from "next/image"
import Link from "next/link"
import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container max-w-[900px] mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/hackthenorthlogo.png"
              alt="Hack the North Logo"
              width={32}
              height={32}
              className="w-8 h-8 opacity-80"
            />
          </div>
          
          {/* GitHub Link */}
          <Link
            href="https://github.com/VJagiasi/hackthenorth-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/10 hover:bg-black/20 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>GitHub Repo</span>
          </Link>
        </div>
      </div>
    </footer>
  )
} 