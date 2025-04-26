import { query } from "./_generated/server"

export const get = query({
  handler: async (ctx) => {
    const devInfos = await ctx.db.query("devInfo").collect()
    // Return the first devInfo entry or null if none exists
    return devInfos.length > 0 ? devInfos[0] : null
  },
})
