"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  GitlabIcon as GitHub,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Dweight Fuentes
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="block md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background">
            <nav className="grid gap-6 text-lg">
              <Link
                href="#about"
                className="flex w-full items-center rounded-md py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="#projects"
                className="flex w-full items-center rounded-md py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={toggleMenu}
              >
                Projects
              </Link>
              <Link
                href="#skills"
                className="flex w-full items-center rounded-md py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={toggleMenu}
              >
                Skills
              </Link>
              <Link
                href="#contact"
                className="flex w-full items-center rounded-md py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="container py-12 space-y-24">
        {/* Hero Section */}
        <section
          id="about"
          className="py-12 md:py-24 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I&apos;m{" "}
              <span className="text-primary">Dweight Dewey Fuentes</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Full-Stack Developer specializing in building exceptional digital
              experiences
            </p>
            <p className="text-muted-foreground max-w-prose">
              I&apos;m passionate about creating intuitive and performant web
              applications that solve real-world problems. With expertise in
              React, Next.js, and modern backend technologies, I build solutions
              that are both beautiful and functional.
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link href="#contact">
                  Contact Me <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src="/dweightproImage.jpg"
              alt="Dweight Dewey Fuentes"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              A selection of my professional work and projects I&apos;ve
              developed or tested
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Aicquire */}
            <Card className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden bg-purple-100">
                <Image
                  src="/aicquireImage.png"
                  alt="Aicquire"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Aicquire</CardTitle>
                <CardDescription>
                  AI-driven applicant tracking system for efficient candidate
                  management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>AI</Badge>
                  <Badge>Web App</Badge>
                  <Badge>HR Tech</Badge>
                  <Badge>Tested</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  Efficiently manage candidates, streamline workflows, and
                  unlock your team&apos;s full potential with AI-powered hiring
                  tools.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" asChild>
                  <Link
                    href="https://aicquire.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* GiGi POS */}
            <Card className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/posImage.png"
                  alt="GiGi POS"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>GiGi POS</CardTitle>
                <CardDescription>
                  Intuitive point-of-sale system for businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Web</Badge>
                  <Badge>Mobile</Badge>
                  <Badge>POS</Badge>
                  <Badge>Tested</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  A powerful, intuitive point-of-sale system designed to enhance
                  efficiency and improve customer experience.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" asChild>
                  <Link
                    href="https://gigipos.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Zukify */}
            <Card className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/zukifyImage.png"
                  alt="Zukify"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Zukify</CardTitle>
                <CardDescription>
                  Subscription discount platform connecting users with merchants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Web</Badge>
                  <Badge>Mobile</Badge>
                  <Badge>E-commerce</Badge>
                  <Badge>Tested</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  Revolutionary online community that transforms the traditional
                  landscape of acquiring discounts and perks through a
                  pioneering approach.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" asChild>
                  <Link
                    href="https://www.zukify.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* LMS */}
            <Card className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/lmsImage.png"
                  alt="LMS"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Payruler Learn LMS</CardTitle>
                <CardDescription>
                  Comprehensive learning management system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Education</Badge>
                  <Badge>Web App</Badge>
                  <Badge>LMS</Badge>
                  <Badge>Tested</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  Delivers diverse courses, interactive learning, and
                  personalized progress tracking to help students and
                  organizations succeed.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" asChild>
                  <Link
                    href="https://lms.tundra.dxform.ph/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* MAYPLAKA */}
            <Card className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/mayplakaImage.png"
                  alt="MAYPLAKA"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>MAYPLAKA</CardTitle>
                <CardDescription>
                  Vehicle plate number tracking and delivery system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Web App</Badge>
                  <Badge>Tracking</Badge>
                  <Badge>Tested</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  Track your plate number status, set up appointments, or have
                  it delivered to your address when available.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" asChild>
                  <Link
                    href="https://www.mayplaka.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* DBM Marketplace */}
            <Card className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/dbmImage.png"
                  alt="DBM Marketplace"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>DBM Marketplace</CardTitle>
                <CardDescription>
                  E-commerce online marketplace platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>E-commerce</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>Marketplace</Badge>
                  <Badge>Tested</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  A comprehensive e-commerce platform connecting buyers and
                  sellers in an online marketplace environment.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" asChild>
                  <Link
                    href="https://dbm-marketplace.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Gigi Logistics Platform */}
            <Card className="overflow-hidden group bg-gradient-to-br from-slate-50 to-slate-100">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-bold">Gigi Logistics Platform</h3>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Gigi Logistics Platform</CardTitle>
                <CardDescription>
                  Multi-role logistics and delivery platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Web</Badge>
                  <Badge>Mobile</Badge>
                  <Badge>Logistics</Badge>
                  <Badge>Developed & Tested</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  Full-featured platform supporting on-demand services like
                  express delivery, item purchasing, and food delivery with
                  real-time tracking.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" disabled>
                  <span className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" /> Coming Soon
                  </span>
                </Button>
              </CardFooter>
            </Card>
            {/* Lemur Survey */}
            <Card className="overflow-hidden group bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/lemurSurveyImage.png"
                  alt="DBM Marketplace"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Lemur Survey</CardTitle>
                <CardDescription>
                  Comprehensive survey platform with offline and online
                  capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Web Admin</Badge>
                  <Badge>Mobile App</Badge>
                  <Badge>Offline Support</Badge>
                  <Badge>Developed & Tested</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  A versatile survey application that works both online and
                  offline. Features a mobile app for data collection and a web
                  admin interface for survey management, analysis, and
                  reporting.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" asChild>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.lemursurvey.app&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center pt-8">
            <Button variant="outline" asChild>
              <Link href="#contact">Contact Me For More Projects</Link>
            </Button>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              The tools and technologies I work with
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="flex flex-col items-center p-6 hover:border-primary/50 transition-colors">
              <div className="rounded-full bg-primary/10 p-3 mb-4 relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/reactIcon.png"
                  alt="React"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium">React</h3>
            </Card>

            <Card className="flex flex-col items-center p-6 hover:border-primary/50 transition-colors">
              <div className="rounded-full bg-primary/10 p-3 mb-4 relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/nextIcon.png"
                  alt="React"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium">Next.js</h3>
            </Card>

            <Card className="flex flex-col items-center p-6 hover:border-primary/50 transition-colors">
              <div className="rounded-full bg-primary/10 p-3 mb-4 relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/typescriptIcon.png"
                  alt="React"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium">TypeScript</h3>
            </Card>

            <Card className="flex flex-col items-center p-6 hover:border-primary/50 transition-colors">
              <div className="rounded-full bg-primary/10 p-3 mb-4 relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/tailwindIcon.png"
                  alt="React"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium">Tailwind CSS</h3>
            </Card>

            <Card className="flex flex-col items-center p-6 hover:border-primary/50 transition-colors">
              <div className="rounded-full bg-primary/10 p-3 mb-4 relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/nodejsIcon.png"
                  alt="React"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium">Node.js</h3>
            </Card>

            <Card className="flex flex-col items-center p-6 hover:border-primary/50 transition-colors">
              <div className="rounded-full bg-primary/10 p-3 mb-4 relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/mongodbIcon.png"
                  alt="React"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium">MongoDB</h3>
            </Card>

            <Card className="flex flex-col items-center p-6 hover:border-primary/50 transition-colors">
              <div className="rounded-full bg-primary/10 p-3 mb-4 relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/postgresqlIcon.png"
                  alt="React"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium">PostgreSQL</h3>
            </Card>

            <Card className="flex flex-col items-center p-6 hover:border-primary/50 transition-colors">
              <div className="rounded-full bg-primary/10 p-3 mb-4 relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/gitIcon.png"
                  alt="React"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium">Git</h3>
            </Card>
          </div>
        </section>

        {/* AI Integration Experience */}
        <section className="py-12 space-y-8 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              AI Integration Experience
            </h2>
            <p className="text-muted-foreground max-w-[800px]">
              I have experience integrating and working with cutting-edge AI
              technologies
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm flex items-center gap-4 w-full md:w-auto">
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  className="h-8 w-8 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L1 21H23L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">GroqAI</h3>
                <p className="text-sm text-muted-foreground">
                  Integrated & Implemented
                </p>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-muted-foreground">
                I have successfully integrated GroqAI into applications,
                leveraging its powerful capabilities to enhance user experiences
                and application functionality. My experience includes
                implementing AI-driven features that improve performance and
                provide intelligent solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Have a project in mind or want to chat? Feel free to reach out!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <Card className="w-full md:w-auto">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <Link
                    href="mailto:dweightfuentes@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    dwieghtpro@gmail.com
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <Link
                    href="https://www.linkedin.com/in/dwieght-dewey-fuentes-692078200/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    linkedin.com/in/dweight-dewey-fuentes
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <GitHub className="h-5 w-5 text-primary" />
                  <Link
                    href="https://github.com/Dwieght"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    github.com/Dwieght
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Dweight Dewey Fuentes. All rights
              reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://github.com/dweightfuentes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHub className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link
              href="https://linkedin.com/in/dweight-fuentes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link href="mailto:dweightfuentes@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
