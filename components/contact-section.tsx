"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send, ArrowRight } from "lucide-react"
import { useData } from "@/lib/data-context"

export function ContactSection() {
  const { devInfo, isLoading } = useData()

  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Always initialize hooks, regardless of loading state
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])
  const topMotionY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const bottomMotionY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after submission
    setFormState({
      name: "",
      email: "",
      message: "",
    })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  // If loading, show a loading skeleton
  if (isLoading) {
    return (
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="h-[400px] rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        </div>
      </section>
    )
  }

  // Otherwise, show the full contact section
  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        style={{ y: topMotionY }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        style={{ y: bottomMotionY }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div style={{ y }} className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-700 dark:text-slate-300"
          >
            Have a project in mind or want to chat? Feel free to reach out!
          </motion.p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <motion.div
                className="flex items-start space-x-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Email</h3>
                  <p className="text-slate-700 dark:text-slate-300">{devInfo?.email || "hello@example.com"}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Social</h3>
                  <p className="text-slate-700 dark:text-slate-300">
                    Find me on{" "}
                    <a
                      href={devInfo?.links?.linkedin || "https://linkedin.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      LinkedIn
                    </a>{" "}
                    and{" "}
                    <a
                      href={devInfo?.links?.github || "https://github.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Let's work together</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  I'm currently available for freelance work and open to new opportunities.
                </p>
                <Button asChild variant="outline" className="group">
                  <a href="#projects">
                    View my portfolio
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-6 text-center h-full flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Message Sent!</h3>
                  <p className="text-green-700 dark:text-green-400">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4 p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[120px]"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="mr-2"
                          >
                            ⏳
                          </motion.span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
