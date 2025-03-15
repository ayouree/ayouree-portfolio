import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAboutData } from "@/lib/data"

export const metadata: Metadata = {
  title: "Portfolio | About",
  description: "Learn more about me and my professional journey",
}

export default async function AboutPage() {
  const aboutData = await getAboutData()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{aboutData.name}</h1>
            <p className="text-xl text-muted-foreground">{aboutData.title}</p>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4 pt-4">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: aboutData.bio }} />
              </div>
            </TabsContent>
            <TabsContent value="experience" className="space-y-4 pt-4">
              {aboutData.experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{exp.position}</h3>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="education" className="space-y-4 pt-4">
              {aboutData.education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <span className="text-sm text-muted-foreground">{edu.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm">{edu.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <div className="flex space-x-4">
            <Link href="/contact">
              <Button className="gap-1">
                <Mail className="h-4 w-4" /> Contact Me
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" className="gap-1">
                View Projects <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={aboutData.image || "/placeholder.svg?height=250&width=250"}
              alt={aboutData.name}
              width={250}
              height={250}
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {aboutData.skills.map((skill, index) => (
                <div key={index} className="rounded-full bg-muted px-3 py-1 text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

