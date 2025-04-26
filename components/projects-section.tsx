"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ProjectCard } from "./project-card"
import { useData } from "@/lib/data-context"

export function ProjectsSection() {
  const { projects, isLoading } = useData()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  return (
    <section id="projects" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["30%", "0%"]) }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div style={{ y }} className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto"
          >
            A selection of my recent work. Each project is unique and solves specific problems.
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
