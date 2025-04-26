import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  devInfo: defineTable({
    image: v.string(),
    name: v.string(),
    info: v.string(),
    email: v.string(),
    links: v.object({
      github: v.optional(v.string()),
      linkedin: v.optional(v.string()),
      leetcode: v.optional(v.string()),
    }),
  }),

  projects: defineTable({
    title: v.string(),
    description: v.string(),
    image: v.string(),
    technologies: v.array(v.string()),
    date: v.string(),
    links: v.object({
      github: v.optional(v.string()),
      live: v.optional(v.string()),
    }),
  }),

  aboutData: defineTable({
    image: v.string(),
    bio: v.array(v.string()),
    skills: v.array(v.string()),
  }),
})
