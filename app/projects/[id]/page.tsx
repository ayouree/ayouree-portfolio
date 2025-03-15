import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProject } from "@/lib/data"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = await getProject(params.id)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `Portfolio | ${project.title}`,
    description: project.description.substring(0, 160),
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <Link href="/projects">
        <Button variant="ghost" className="mb-8 gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Button>
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{project.title}</h1>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>

          <div className="flex space-x-4 pt-8">
            {project.demoUrl && (
              <Button asChild className="gap-1">
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" className="gap-1">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={project.image || "/placeholder.svg?height=400&width=600"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Project Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-medium text-muted-foreground">Date</dt>
                <dd>{project.date}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Client</dt>
                <dd>{project.client || "Personal Project"}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Role</dt>
                <dd>{project.role}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

