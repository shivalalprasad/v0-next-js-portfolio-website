"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { useData } from "@/lib/data-context"

export function AboutSection() {
  const { aboutData, isLoading } = useData()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Use useTransform to create motion values for parallax effects
  const topBgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const bottomBgY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"])
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"])

  if (isLoading) {
    return (
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="h-[400px] rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        </div>
      </section>
    )
  }

  if (!aboutData) return null

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-40 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        style={{ y: topBgY }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        style={{ y: bottomBgY }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y: imageY }} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={aboutData.image || "/placeholder.svg"}
                  alt="Developer portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-lg -z-10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary/20 rounded-lg -z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </motion.div>

          <motion.div style={{ y: contentY }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white"
            >
              About Me
            </motion.h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              {aboutData.bio.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
