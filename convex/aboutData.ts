import { query } from "./_generated/server"

export const get = query({
  handler: async (ctx) => {
    const aboutData = await ctx.db.query("aboutData").collect()
    // Return the first aboutData entry or null if none exists
    return aboutData.length > 0 ? aboutData[0] : null
  },
})
