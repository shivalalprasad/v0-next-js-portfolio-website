export interface DevInfo {
  _id: string
  _creationTime: number
  image: string
  name: string
  info: string
  email: string
  links: {
    github?: string
    linkedin?: string
    leetcode?: string
  }
}

export interface Project {
  _id: string
  _creationTime: number
  title: string
  description: string
  image: string
  technologies: string[]
  date: string
  links: {
    github?: string
    live?: string
  }
}

export interface AboutData {
  _id: string
  _creationTime: number
  image: string
  bio: string[]
  skills: string[]
}
