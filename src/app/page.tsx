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
  FileText,
  ImageIcon,
  Download,
  Moon,
  Sun,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatedText } from "~/components/animated-text";
import { useTheme } from "@/components/theme-provider";

// Project data
const projects = [
  {
    title: "Aicquire",
    description:
      "AI-driven applicant tracking system for efficient candidate management",
    image: "/aicquireImage.png",
    badges: ["AI", "Web App", "HR Tech", "Tested"],
    summary:
      "Efficiently manage candidates, streamline workflows, and unlock your team's full potential with AI-powered hiring tools.",
    link: "https://aicquire.com/",
  },
  {
    title: "GiGi POS",
    description: "Intuitive point-of-sale system for businesses",
    image: "/posImage.png",
    badges: ["Web", "Mobile", "POS", "Tested"],
    summary:
      "A powerful, intuitive point-of-sale system designed to enhance efficiency and improve customer experience.",
    link: "https://gigipos.com/",
  },
  {
    title: "Zukify",
    description:
      "Subscription discount platform connecting users with merchants",
    image: "/zukifyImage.png",
    badges: ["Web", "Mobile", "E-commerce", "Tested"],
    summary:
      "Revolutionary online community that transforms the traditional landscape of acquiring discounts and perks through a pioneering approach.",
    link: "https://www.zukify.com/",
  },
  {
    title: "Payruler Learn LMS",
    description: "Comprehensive learning management system",
    image: "/lmsImage.png",
    badges: ["Education", "Web App", "LMS", "Tested"],
    summary:
      "Delivers diverse courses, interactive learning, and personalized progress tracking to help students and organizations succeed.",
    link: "https://lms.tundra.dxform.ph/",
  },
  {
    title: "MAYPLAKA",
    description: "Vehicle plate number tracking and delivery system",
    image: "/mayplakaImage.png",
    badges: ["Web App", "Tracking", "Tested"],
    summary:
      "Track your plate number status, set up appointments, or have it delivered to your address when available.",
    link: "https://www.mayplaka.com/",
  },
  {
    title: "DBM Marketplace",
    description: "E-commerce online marketplace platform",
    image: "/dbmImage.png",
    badges: ["E-commerce", "Marketplace", "Tested"],
    summary:
      "A comprehensive e-commerce platform connecting buyers and sellers in an online marketplace environment.",
    link: "https://dbm-marketplace.vercel.app/",
  },
  {
    title: "Gigi Logistics Platform",
    description: "Multi-role logistics and delivery platform",
    image: "/gigiImage.png",
    badges: ["Web", "Mobile", "Logistics", "Developed & Tested"],
    summary:
      "Full-featured platform supporting on-demand services like express delivery, item purchasing, and food delivery with real-time tracking.",
    link: "",
    comingSoon: true,
  },
  {
    title: "Lemur Survey",
    description:
      "Comprehensive survey platform with offline and online capabilities",
    image: "/lemurSurveyImage.png",
    badges: [
      "Web Admin",
      "Mobile App",
      "Offline Support",
      "Developed & Tested",
    ],
    summary:
      "A versatile survey application that works both online and offline. Features a mobile app for data collection and a web admin interface for survey management, analysis, and reporting.",
    link: "https://play.google.com/store/apps/details?id=com.lemursurvey.app&hl=en",
  },
  {
    title: "Oras AI",
    description:
      "Oras AI is a smart time tracker that helps teams track, manage, and create projects with ease. Boost productivity with intelligent features your team will actually enjoy using.",
    image: "/orasaiImage.png",
    badges: ["Web", "Timetracker", "Tested"],
    summary:
      "Track time effortlessly, organize your projects, and make data-driven decisions with Oras AI’s intuitive and team-friendly interface.",
    link: "https://oras.ai/",
  },
  {
    title: "Visitor System",
    description: "User check-in/out tracking and scheduling system",
    image: "/placeholder.svg",
    badges: ["Web App", "Tracking", "Scheduling", "Developed"],
    summary:
      "A comprehensive system for tracking visitor check-ins and check-outs, managing schedules, and generating reports. Developed during internship at Skanlog.",
    link: "",
    comingSoon: true,
  },
  {
    title: "Calendar Application",
    description: "Scheduling and appointment management system",
    image: "/placeholder.svg",
    badges: ["Web App", "Scheduling", "Developed"],
    summary:
      "An intuitive calendar application for scheduling and managing appointments with notification features. Created during Skanlog ELEV Internship program.",
    link: "",
    comingSoon: true,
  },
  {
    title: "Central File System",
    description: "Centralized document management solution",
    image: "/placeholder.svg",
    badges: ["Web App", "File Management", "Developed"],
    summary:
      "A centralized file system for efficient document management, sharing, and collaboration. Built as part of the Skanlog internship program.",
    link: "",
    comingSoon: true,
  },
];

// Skills data
const skills = [
  { name: "React", icon: "/reactIcon.png" },
  { name: "Next.js", icon: "/nextIcon.png" },
  { name: "TypeScript", icon: "/typescriptIcon.png" },
  { name: "Tailwind CSS", icon: "/tailwindIcon.png" },
  { name: "Node.js", icon: "/nodejsIcon.png" },
  { name: "MongoDB", icon: "/mongodbIcon.png" },
  { name: "PostgreSQL", icon: "/postgresqlIcon.png" },
  { name: "Git", icon: "/gitIcon.png" },
];

// Certificate data
const certificates = [
  {
    title: "Introduction to Web Security Threats",
    type: "Webinar Attendance",
    date: "December 10, 2020",
    image: "/Web_Security_Threats.pdf",
    isPdf: true,
    link: "#",
  },
  {
    title: "9th ICT Congress 2022",
    type: "Participation",
    description: "Embracing AI Synergies. Shaping Today's Gen Zs",
    image: "/Fuentes_Dwieght_2022_ICT_Congress_Certificate_-_Participation.pdf",
    isPdf: true,
    link: "#",
  },
  {
    title: "Full-Stack Dev Road Map",
    type: "Attendance",
    date: "March 12, 2021",
    image: "/Full_Stack_Road_Map.pdf",
    isPdf: true,
    link: "#",
  },
  {
    title: "How to build a signature service as a designer",
    type: "Participation",
    date: "July 1, 2021",
    image: "/design_hill_certificate.png",
    isPdf: false,
    link: "#",
  },
  {
    title: "School of Agility, Grit, & Entrepreneurship",
    type: "Attendance",
    date: "December 29, 2020",
    image: "/school_of_agility.png",
    isPdf: false,
    link: "#",
  },
  {
    title: "Alliance Jumpstart Program",
    type: "Completion",
    description: "Successfully completed for S.Y 2023-2024",
    image: "/placeholder.jpg",
    isPdf: false,
    link: "#",
  },
  {
    title: "Skanlog ELEV Internship Program",
    type: "Completion",
    description:
      "Successfully completed 540 hours focusing on software development",
    date: "February 5, 2024 - May 2, 2024",
    image: "/placeholder.jpg",
    isPdf: false,
    link: "#",
  },
];

// Component for project cards
const ProjectCard = ({ project }: any) => (
  <Card className="overflow-hidden group">
    <div className="relative h-48 overflow-hidden bg-slate-100">
      {project.image ? (
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-xl font-bold">{project.title}</h3>
        </div>
      )}
    </div>
    <CardHeader>
      <CardTitle>{project.title}</CardTitle>
      <CardDescription>{project.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.badges.map((badge: any, index: any) => (
          <Badge key={index}>{badge}</Badge>
        ))}
      </div>
      <p className="text-sm text-muted-foreground line-clamp-3">
        {project.summary}
      </p>
    </CardContent>
    <CardFooter className="flex justify-between">
      {project.comingSoon ? (
        <Button variant="outline" size="sm" disabled>
          <span className="flex items-center">
            <ExternalLink className="mr-2 h-4 w-4" /> Coming Soon
          </span>
        </Button>
      ) : (
        <Button size="sm" asChild>
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
          </Link>
        </Button>
      )}
    </CardFooter>
  </Card>
);

// Component for skill cards
const SkillCard = ({ skill }: any) => (
  <Card className="flex flex-col items-center p-6 hover:border-primary/50 transition-colors">
    <div className="rounded-full bg-primary/10 p-3 mb-4 relative w-12 h-12 flex items-center justify-center">
      <Image
        src={skill.icon || "/placeholder.svg"}
        alt={skill.name}
        width={24}
        height={24}
        className="object-contain"
      />
    </div>
    <h3 className="font-medium">{skill.name}</h3>
  </Card>
);

// Component for certificate cards
const CertificateCard = ({ certificate }: any) => {
  const fileIcon = certificate.isPdf ? (
    <FileText className="h-6 w-6 text-primary" />
  ) : (
    <ImageIcon className="h-6 w-6 text-primary" />
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
          <div className="relative h-32 overflow-hidden bg-slate-50">
            {certificate.isPdf ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-12 w-12 text-primary/70" />
                  <span className="text-sm text-muted-foreground">
                    Click to view PDF
                  </span>
                </div>
              </div>
            ) : (
              <Image
                src={certificate.image || "/placeholder.svg"}
                alt={certificate.title}
                fill
                className="object-contain p-4"
              />
            )}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{certificate.title}</CardTitle>
            <CardDescription>
              <span className="font-medium">
                Certificate of {certificate.type}
              </span>
              {certificate.description && (
                <div className="mt-1">{certificate.description}</div>
              )}
              {certificate.date && (
                <div className="mt-1">{certificate.date}</div>
              )}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {fileIcon}
              <span>
                {certificate.isPdf ? "PDF Document" : "Image Certificate"}
              </span>
            </div>
            <Button variant="ghost" size="sm">
              View Certificate
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-auto max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{certificate.title}</DialogTitle>
          <DialogDescription>
            Certificate of {certificate.type}
            {certificate.date && ` • ${certificate.date}`}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col items-center">
          {certificate.isPdf ? (
            <div className="w-full h-[70vh] bg-slate-100 rounded-md overflow-hidden">
              <iframe
                src={`${certificate.image}#toolbar=0&navpanes=0`}
                className="w-full h-full"
                title={certificate.title}
              />
            </div>
          ) : (
            <div className="relative w-full max-h-[70vh] flex justify-center">
              <Image
                src={certificate.image || "/placeholder.svg"}
                alt={certificate.title}
                width={800}
                height={600}
                className="object-contain max-h-[70vh]"
              />
            </div>
          )}
          <div className="flex justify-end w-full mt-4">
            <Button asChild variant="outline">
              <Link
                href={certificate.image}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <header className="px-3 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <nav className="hidden md:flex gap-6 items-center">
            {["about", "projects", "skills", "certificates", "contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="text-sm font-medium hover:text-primary transition-colors capitalize"
                >
                  {item}
                </Link>
              )
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTheme()}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background">
            <nav className="grid gap-6 text-lg">
              {["about", "projects", "skills", "certificates", "contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`#${item}`}
                    className="flex w-full items-center rounded-md py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground capitalize"
                    onClick={toggleMenu}
                  >
                    {item}
                  </Link>
                )
              )}
              <button
                className="flex w-full items-center rounded-md py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  toggleMenu();
                }}
              >
                <div className="flex items-center gap-2">
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-5 w-5" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </div>
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="container py-12 space-y-24 p-3">
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
              <AnimatedText
                texts={[
                  "Full-Stack Developer architecting seamless digital experiences",
                  "Mobile App Developer engineering intuitive cross-platform solutions",
                  "Web Developer crafting pixel-perfect, high-performance interfaces",
                  "QA Specialist delivering flawless software through rigorous testing",
                ]}
              />
            </p>
            <p className="text-muted-foreground max-w-prose">
              I&apos;m passionate about creating intuitive and performant web
              applications that solve real-world problems. With expertise in
              React, Next.js, and modern backend technologies, I build solutions
              that are both beautiful and functional.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <Button asChild>
                <Link href="#contact">
                  Contact Me <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#projects">View My Work</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/cv" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> View CV
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
            {/* Static container with fixed size */}
            <div className="w-full h-full rounded-full relative overflow-hidden">
              {/* Spinning border using transform instead of changing layout */}
              <div className="absolute inset-[-5%] w-[110%] h-[110%] rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary origin-center animate-[spin_1s_linear_infinite]"></div>
              {/* Inner background with fixed size */}
              <div className="absolute inset-[4px] rounded-full bg-background"></div>
              {/* Image container with fixed size */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden">
                <Image
                  src="/dweightproImage.jpg"
                  alt="Dweight Dewey Fuentes"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
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
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
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
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-12 space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Certificates & Credentials
            </h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Professional certifications and educational achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <CertificateCard key={index} certificate={certificate} />
            ))}
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
                    href="mailto:dwieghtpro@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    dwieghtpro@gmail.com
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <Link
                    href="https://linkedin.com/in/dweight-dewey-fuentes-692078200"
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
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <Link
                    href="/resume.pdf"
                    download
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    Download Resume <Download className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8 px-3">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Dweight Dewey Fuentes. All rights
              reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://github.com/Dwieght"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHub className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link
              href="https://linkedin.com/in/dweight-dewey-fuentes-692078200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link href="mailto:dwieghtpro@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
      </footer>
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full shadow-lg" asChild>
          <Link href="/resume.pdf" download className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Resume
          </Link>
        </Button>
      </div>
    </div>
  );
}
