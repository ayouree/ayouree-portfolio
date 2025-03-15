import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import TypewriterEffect from "@/components/typewriter-effect"
import { getProjects } from "@/lib/data"
import { getTechStack } from "@/lib/data"

export const metadata: Metadata = {
  title: "Portfolio | Home",
  description: "My professional portfolio showcasing my projects and skills",
}

export default async function Home() {
  const projects = await getProjects(3) // Get 3 featured projects
  const techStack = await getTechStack()

  const words = [
    {
      text: "Build.",
      className: "text-primary",
    },
    {
      text: "Design.",
      className: "text-blue-500",
    },
    {
      text: "Develop.",
      className: "text-green-500",
    },
    {
      text: "Deploy.",
      className: "text-purple-500",
    },
  ]

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Hello, I'm a Developer
              </h1>
              <div className="h-16 md:h-20">
                <TypewriterEffect words={words} />
              </div>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                I create beautiful, functional websites and applications with modern technologies.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/projects">
                <Button className="gap-1">
                  View Projects <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Me</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Check out some of my recent work</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={project.image || "/placeholder.svg?height=400&width=600"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description.substring(0, 100)}...</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="outline" size="sm">
                        View Project
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Link href="/projects">
              <Button variant="outline" className="mt-4">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tech Stack</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Technologies I work with</p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {techStack.map((tech) => (
                <div
                  key={tech.id}
                  className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="relative h-12 w-12">
                    <Image
                      src={tech.icon || "/placeholder.svg?height=48&width=48"}
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">{tech.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Have a project in mind? Let's work together!
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-4">
              <div className="flex justify-center space-x-4">
                <Link href="/contact">
                  <Button className="gap-1">
                    <Mail className="h-4 w-4" /> Contact Me
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="gap-1">
                    <User className="h-4 w-4" /> About Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

