import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProjects } from "@/lib/data"

export const metadata: Metadata = {
  title: "Portfolio | Projects",
  description: "Explore my projects and work",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Projects</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            A collection of my work, side projects, and experiments
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden flex flex-col">
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
                <CardDescription>{project.description.substring(0, 120)}...</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {project.demoUrl && (
                  <Button asChild size="sm" variant="outline" className="gap-1">
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild size="sm" variant="outline" className="gap-1">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub <Github className="h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

