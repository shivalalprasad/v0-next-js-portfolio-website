"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white/10 dark:bg-slate-900/20 backdrop-blur-md rounded-b-2xl shadow-lg"
          />
        )}
      </AnimatePresence>

      <nav
        className={`flex items-center justify-between max-w-7xl mx-auto transition-all duration-300 ${isScrolled ? "py-3" : "py-5"}`}
      >
        <Link href="/" className="text-lg font-medium relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-primary font-bold">Dev</span>Portfolio
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 relative z-10">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors
                    ${
                      pathname === item.href
                        ? "bg-primary/20 text-primary dark:bg-primary/30"
                        : "hover:bg-white/20 dark:hover:bg-white/10"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-4">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center relative z-10">
          <ModeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-2 p-2 rounded-md text-gray-600 dark:text-gray-300"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pt-2 pb-4 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-b-lg relative z-10"
          >
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium
                      ${
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
