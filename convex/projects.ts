import { query } from "./_generated/server"

export const list = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect()
    return projects
  },
})
