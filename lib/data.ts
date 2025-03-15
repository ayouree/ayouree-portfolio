import fs from "fs"
import path from "path"

// Types
export interface Project {
  id: string
  title: string
  description: string
  content: string
  image?: string
  date: string
  client?: string
  role: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  featured?: boolean
}

export interface TechStack {
  id: string
  name: string
  icon?: string
}

export interface AboutData {
  name: string
  title: string
  bio: string
  image?: string
  skills: string[]
  experience: {
    position: string
    company: string
    period: string
    description: string
  }[]
  education: {
    degree: string
    institution: string
    period: string
    description: string
  }[]
}

export interface ContactInfo {
  email?: string
  phone?: string
  address?: string
  socialLinks: {
    name: string
    url: string
    icon: string
  }[]
}

// Helper function to read data from JSON file
function getData() {
  const filePath = path.join(process.cwd(), "data.json")
  const fileContents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(fileContents)
}

// Data access functions
export async function getProjects(limit?: number): Promise<Project[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const data = getData()
  const projects = data.projects

  if (limit) {
    return projects.slice(0, limit)
  }

  return projects
}

export async function getProject(id: string): Promise<Project | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const data = getData()
  const project = data.projects.find((p: Project) => p.id === id)
  return project || null
}

export async function getTechStack(): Promise<TechStack[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const data = getData()
  return data.techStack
}

export async function getAboutData(): Promise<AboutData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const data = getData()
  return data.about
}

export async function getContactInfo(): Promise<ContactInfo> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const data = getData()
  return data.contact
}

