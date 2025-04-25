"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Code } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { fetchDevInfo } from "@/lib/data"
import type { DevInfo } from "@/lib/types"

export function HeroSection() {
  const [devInfo, setDevInfo] = useState<DevInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9])

  useEffect(() => {
    const getDevInfo = async () => {
      try {
        const data = await fetchDevInfo()
        setDevInfo(data)
      } catch (error) {
        console.error("Error fetching DevInfo:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getDevInfo()
  }, [])

  if (isLoading) {
    return (
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="h-[400px] rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        </div>
      </section>
    )
  }

  if (!devInfo) return null

  return (
    <section ref={ref} className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Circular Developer Image */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/30 p-1 relative overflow-hidden">
              <Image
                src={devInfo.image || "/placeholder.svg?height=400&width=400"}
                alt="Developer portrait"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -z-10 w-full h-full rounded-full bg-primary/10 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          <motion.div style={{ y, opacity, scale }} className="relative">
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hi. I&apos;m <span className="text-primary">{devInfo.name || "Dev"}</span>.
              <br />
              <motion.span
                className="text-4xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                A Web Developer.
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="max-w-[600px] text-lg text-slate-700 dark:text-slate-300 mb-8"
          >
            {devInfo.info ||
              "I'm passionate about building web experiences that are fast, accessible, and user-friendly. Specializing in modern JavaScript frameworks and responsive design."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Button asChild size="lg" className="group">
              <Link href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex space-x-6"
          >
            <Link
              href={devInfo.links.github || "https://github.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors hover:scale-110 transform duration-200"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href={devInfo.links.linkedin || "https://linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href={devInfo.links.leetcode || "https://leetcode.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors hover:scale-110 transform duration-200"
            >
              <Code size={24} />
              <span className="sr-only">LeetCode</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
