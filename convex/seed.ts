import { mutation } from "./_generated/server"

export const seedDevInfo = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if we already have dev info
    const existingDevInfo = await ctx.db.query("devInfo").first()
    if (existingDevInfo) {
      return "Dev info already exists"
    }

    // Insert dev info
    await ctx.db.insert("devInfo", {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXs5upcyp5XmnL2TTO8Qxe-zSMfqQ3vlxvZM3ieMVzikc_D-_qcbDL9JGPz7E-7fxMJZud6S3OccDLth1dWfscrOBRxzSfd6juVfPddki2S0jHqF2XOjHbWMPGjJt662PwM4q-nbtZ7bzf6dphy-a-7kkvCpqjTLKaR3oD62iiOCNPSI80cYDNREDVYbc28AD9VwUaV8S7i9ZE9tBnXa5Nsq-bPM0Z08kRxURK1snZpsjI-6oZh_kTqBq-_5kPE-0vX3L-DZZ1m-_8-NIEWLYjCSRizGqfUax0B86JB57a50EtnZdzyGdFg1YXEKK9OyJd7JxZ3Hc0BXpGZF-iidZ8ZubCLvb9F7CLgVmOfpy3FhJBebopNdopym-xFb5PK4VRfG5Dmsd2Vecm78yBRTFYya1xYcdnMsrcGs1GKK1OepeiKJ8a6MhhsSBVOgmN55FyfEUo3GQOx3ympJbxjYd6GY655VW74eTbmHATy031itJX9jTjKciRpV8qgxl7xWn_XiF8pTD1stTz2mrvb-F_a0XVq8TlhjtzabO0gxAzvL2PdYvhUfUf8tVHQVkjPSMENLNojIyAV1whPxnIHjmovaVSAS20930BHtMAewosztmeZZHX4Xc1dkl04OxvvDn5NTImnnB6jSJ9X64Kavo3tNL9cSoHJBkB252N-7Qy7teMbwkDiHNbgSzQtc-4Pf3qiXqUOTTpJWAQFrrKU80XUDRBA_vtuV5wuhuZ8ftKlRCszEywSadyym6j1jp8CV3i3b2kCRyYVswVPRl_mad6B8mYXOlO6VdGh1WtAg8f7d_ILqEW3qa7_x3FIgAhiTQEwsppqzducZrRuIxfILRwgt-MO6MuC2BKEWLaTMveXxsJlZa-A2xiJQ_0r0QEXgPACBsH35W3ZARuTZKgR4NpnFDNDYHeyPgrXx4LSPlrQihZyMYanaKMZG_VygMRXeiR0OsGRR_4CDvoRuZwSrN6XD587=s360-c-no",
      name: "Shivalal Prasad",
      info: "I'm passionate about building web experiences that are fast, accessible, and user-friendly. Specializing in modern JavaScript frameworks and responsive design.",
      email: "shivalalprasad04+portfolio.contact@gmail.com",
      links: {
        github: "https://github.com/shivalalprasad",
        linkedin: "https://www.linkedin.com/in/shivalalprasad",
        leetcode: "https://leetcode.com/u/shivalalprasad",
      },
    })

    return "Dev info seeded successfully"
  },
})

export const seedProjects = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if we already have projects
    const existingProjects = await ctx.db.query("projects").first()
    if (existingProjects) {
      return "Projects already exist"
    }

    // Insert projects
    await ctx.db.insert("projects", {
      title: "Physics Dep",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      image: "https://shivalalprasad.vercel.app/images/Physics_16x9.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      date: "January 2023",
      links: {
        github: "https://github.com/shivalalprasad/Physics-next-sanity",
        live: "https://physics-liart.vercel.app/",
      },
    })

    await ctx.db.insert("projects", {
      title: "Appareal Store",
      description: "A collaborative task management application with real-time updates and team workspaces.",
      image: "https://shivalalprasad.vercel.app/images/ApparelStore_16x9.png",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      date: "March 2023",
      links: {
        github: "https://github.com/shivalalprasad/Apparel-Store",
        live: "https://apparel-stores.vercel.app/",
      },
    })

    await ctx.db.insert("projects", {
      title: "Dulingo Clone",
      description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
      image: "https://shivalalprasad.vercel.app/images/Duolingo_16x9.png",
      technologies: ["React", "OpenWeather API", "Chart.js", "Styled Components"],
      date: "June 2023",
      links: {
        github: "https://github.com/shivalalprasad/lingoo",
        live: "https://lingoo-shivalal-prasad.vercel.app/",
      },
    })

    await ctx.db.insert("projects", {
      title: "Red Bus Landing Page Clone",
      description: "A personal portfolio website showcasing projects and skills with a modern, responsive design.",
      image: "https://shivalalprasad.vercel.app/images/redbus_16x9.png",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
      date: "September 2023",
      links: {
        github: "https://github.com/shivalalprasad/RedBus-landing-page-clone",
        live: "https://shivalalprasad.vercel.app/Projects/RedBus/index.html",
      },
    })

    return "Projects seeded successfully"
  },
})

export const seedAboutData = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if we already have about data
    const existingAboutData = await ctx.db.query("aboutData").first()
    if (existingAboutData) {
      return "About data already exists"
    }

    // Insert about data
    await ctx.db.insert("aboutData", {
      image: "https://shivalalprasad.vercel.app/images/hero.jpg",
      bio: [
        "I'm a passionate web developer with over 5 years of experience building modern, responsive web applications. I specialize in JavaScript frameworks like React and Next.js, and I'm always eager to learn new technologies.",
        "My approach to development focuses on creating clean, maintainable code that delivers exceptional user experiences. I believe in the power of well-designed interfaces and efficient backend systems working together.",
        "When I'm not coding, you can find me hiking, reading tech blogs, or contributing to open-source projects.",
      ],
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Tailwind CSS",
        "GraphQL",
        "REST APIs",
        "MongoDB",
        "PostgreSQL",
        "Git",
        "CI/CD",
        "AWS",
        "Docker",
        "Responsive Design",
      ],
    })

    return "About data seeded successfully"
  },
})
