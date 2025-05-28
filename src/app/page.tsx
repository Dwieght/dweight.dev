"use client";

import { useState, useEffect, useRef } from "react";
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
  ArrowUp,
  Sparkles,
  Zap,
  Code,
  Award,
  Eye,
  Star,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Globe,
  Smartphone,
  Monitor,
  Shield,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Briefcase,
  Calendar,
  MapPin,
  Rocket,
  Target,
  Layers,
  Database,
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
import { Loader } from "@/components/ui/loader";
import { FooterSection } from "~/components/FooterSection";
import { ContactSection } from "~/components/ContactSection";
import { IntegrationExperience } from "~/components/IntegrationExperience";

// Enhanced project data with more details
const projects = [
  {
    title: "Aicquire",
    description:
      "AI-driven applicant tracking system for efficient candidate management",
    image: "/aicquireImage.png",
    badges: ["AI", "Web App", "HR Tech", "Tested"],
    category: "AI & Automation",
    status: "Live",
    impact: "95% efficiency boost",
    users: "500+ companies",
    summary:
      "Efficiently manage candidates, streamline workflows, and unlock your team's full potential with AI-powered hiring tools.",
    link: "https://aicquire.com/",
    featured: true,
    technologies: ["React", "AI/ML", "Node.js", "MongoDB"],
    year: "2024",
  },
  {
    title: "GiGi POS",
    description: "Intuitive point-of-sale system for businesses",
    image: "/posImage.png",
    badges: ["Web", "Mobile", "POS", "Tested"],
    category: "Business Solutions",
    status: "Live",
    impact: "40% faster transactions",
    users: "200+ businesses",
    summary:
      "A powerful, intuitive point-of-sale system designed to enhance efficiency and improve customer experience.",
    link: "https://gigipos.com/",
    featured: true,
    technologies: ["React Native", "Next.js", "PostgreSQL", "Stripe"],
    year: "2024",
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
    category: "Data Collection",
    status: "Live",
    impact: "10K+ surveys collected",
    users: "50+ organizations",
    summary:
      "A versatile survey application that works both online and offline. Features a mobile app for data collection and a web admin interface.",
    link: "https://play.google.com/store/apps/details?id=com.lemursurvey.app&hl=en",
    featured: true,
    technologies: ["React Native", "React", "SQLite", "Node.js"],
    year: "2024",
  },
  {
    title: "Zukify",
    description:
      "Subscription discount platform connecting users with merchants",
    image: "/zukifyImage.png",
    badges: ["Web", "Mobile", "E-commerce", "Tested"],
    category: "E-commerce",
    status: "Live",
    impact: "50K+ active users",
    users: "1000+ merchants",
    summary:
      "Revolutionary online community that transforms the traditional landscape of acquiring discounts and perks.",
    link: "https://www.zukify.com/",
    featured: false,
    technologies: ["React", "Next.js", "MongoDB", "Stripe"],
    year: "2024",
  },
  {
    title: "Payruler Learn LMS",
    description: "Comprehensive learning management system",
    image: "/lmsImage.png",
    badges: ["Education", "Web App", "LMS", "Tested"],
    category: "Education Tech",
    status: "Live",
    impact: "2000+ students",
    users: "100+ instructors",
    summary:
      "Delivers diverse courses, interactive learning, and personalized progress tracking to help students succeed.",
    link: "https://lms.tundra.dxform.ph/",
    featured: false,
    technologies: ["React", "Node.js", "MongoDB", "WebRTC"],
    year: "2024",
  },
  {
    title: "MAYPLAKA",
    description: "Vehicle plate number tracking and delivery system",
    image: "/mayplakaImage.png",
    badges: ["Web App", "Tracking", "Tested"],
    category: "Government Tech",
    status: "Live",
    impact: "Gov partnership",
    users: "10K+ citizens",
    summary:
      "Track your plate number status, set up appointments, or have it delivered to your address when available.",
    link: "https://www.mayplaka.com/",
    featured: false,
    technologies: ["React", "Node.js", "PostgreSQL", "SMS API"],
    year: "2024",
  },
];

// Enhanced skills with proficiency levels and categories
const skillCategories = {
  frontend: {
    title: "Frontend Development",
    icon: Monitor,
    color: "from-blue-500 to-cyan-500",
    skills: [
      {
        name: "React",
        icon: "/reactIcon.png",
        level: 95,
        experience: "",
      },
      {
        name: "Next.js",
        icon: "/nextIcon.png",
        level: 90,
        experience: "",
      },
      {
        name: "TypeScript",
        icon: "/typescriptIcon.png",
        level: 85,
        experience: "",
      },
      {
        name: "Tailwind CSS",
        icon: "/tailwindIcon.png",
        level: 95,
        experience: "",
      },
    ],
  },
  backend: {
    title: "Backend & Database",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    skills: [
      {
        name: "Node.js",
        icon: "/nodejsIcon.png",
        level: 80,
        experience: "",
      },
      {
        name: "MongoDB",
        icon: "/mongodbIcon.png",
        level: 75,
        experience: "",
      },
      {
        name: "PostgreSQL",
        icon: "/postgresqlIcon.png",
        level: 70,
        experience: "",
      },
      { name: "Git", icon: "/gitIcon.png", level: 90, experience: "" },
    ],
  },
};

// Enhanced certificates with more details
const certificates = [
  {
    title: "Introduction to Web Security Threats",
    type: "Webinar Attendance",
    date: "December 10, 2020",
    image: "/Web_Security_Threats.pdf",
    isPdf: true,
    category: "Security",
    issuer: "Tech Conference",
    credentialId: "WS-2020-001",
    skills: ["Web Security", "Threat Analysis"],
  },
  {
    title: "9th ICT Congress 2022",
    type: "Participation",
    description: "Embracing AI Synergies. Shaping Today's Gen Zs",
    date: "2022",
    image: "/Fuentes_Dwieght_2022_ICT_Congress_Certificate_-_Participation.pdf",
    isPdf: true,
    category: "AI & Technology",
    issuer: "ICT Congress",
    credentialId: "ICT-2022-001",
    skills: ["AI Technology", "Innovation"],
  },
  {
    title: "Alliance Jumpstart Program",
    type: "Completion",
    description: "Successfully completed for S.Y 2023-2024",
    date: "2024",
    image: "/placeholder.jpg",
    isPdf: false,
    category: "Professional Development",
    issuer: "Alliance Software Inc",
    credentialId: "AJS-2024-001",
    skills: ["Software Development", "Project Management"],
  },
  {
    title: "Skanlog ELEV Internship Program",
    type: "Completion",
    description:
      "Successfully completed 540 hours focusing on software development",
    date: "February 5, 2024 - May 2, 2024",
    image: "/placeholder.jpg",
    isPdf: false,
    category: "Internship",
    issuer: "Skanlog",
    credentialId: "SELEV-2024-001",
    skills: ["Full-Stack Development", "Testing"],
  },
  {
    title: "Full-Stack Dev Road Map",
    type: "Attendance",
    date: "March 12, 2021",
    image: "/Full_Stack_Road_Map.pdf",
    isPdf: true,
    category: "Development",
    issuer: "Dev Conference",
    credentialId: "FSRM-2021-001",
    skills: ["Full-Stack", "Career Planning"],
  },
];

// Stats for the hero section
const stats = [
  { label: "Projects Tested and Completed", value: "15+", icon: Briefcase },
  { label: "Years Experience", value: "1+", icon: Calendar },
  { label: "Happy Clients", value: "50+", icon: Users },
  { label: "Technologies", value: "10+", icon: Code },
];

// Enhanced Project Card Component
const ProjectCard = ({ project, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      className={`overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 ${
        project.featured
          ? "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-slate-800 dark:via-purple-900/20 dark:to-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800"
          : "bg-white/80 dark:bg-slate-800/80"
      } backdrop-blur-sm ${
        index % 3 === 1
          ? "md:translate-y-8"
          : index % 3 === 2
          ? "md:translate-y-4"
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Star className="h-3 w-3" />
            Featured
          </div>
        </div>
      )}

      {/* Project image */}
      <div className="relative h-56 overflow-hidden">
        {project.image ? (
          <>
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? "scale-110 brightness-110" : "scale-100"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{project.year}</span>
                  <span>•</span>
                  <Users className="h-4 w-4" />
                  <span>{project.users}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
            <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300">
              {project.title}
            </h3>
          </div>
        )}

        {/* Status and category badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              project.status === "Live"
                ? "bg-green-500/90 text-white"
                : "bg-orange-500/90 text-white"
            }`}
          >
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              {project.status}
            </div>
          </div>
          <Badge
            variant="secondary"
            className="text-xs bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm"
          >
            {project.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
              {project.title}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {project.description}
            </CardDescription>
          </div>
        </div>

        {/* Impact metrics */}
        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">{project.impact}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        {/* Technology stack */}
        <div className="mb-4">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
            Tech Stack
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.map((tech: string, techIndex: number) => (
              <Badge
                key={techIndex}
                variant="outline"
                className="text-xs px-2 py-0.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.badges.map((badge: any, badgeIndex: any) => (
            <Badge
              key={badgeIndex}
              className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            >
              {badge}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        {project.link ? (
          <Button
            size="sm"
            asChild
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Explore Project
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled className="w-full">
            <Clock className="mr-2 h-4 w-4" />
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Enhanced Skill Card Component
const SkillCard = ({ skill, category }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                category.color
              } p-0.5 transition-transform duration-300 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            >
              <div className="w-full h-full rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center">
                <Image
                  src={skill.icon || "/placeholder.svg"}
                  alt={skill.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-1">{skill.name}</h3>
            <p className="text-sm text-slate-500 mb-3">{skill.experience}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Certificate Card Component
const CertificateCard = ({ certificate }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Security":
        return "from-red-500 to-pink-500";
      case "AI & Technology":
        return "from-purple-500 to-indigo-500";
      case "Professional Development":
        return "from-blue-500 to-cyan-500";
      case "Internship":
        return "from-green-500 to-emerald-500";
      case "Development":
        return "from-orange-500 to-yellow-500";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            {certificate.isPdf ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                <div className="text-center">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${getCategoryColor(
                      certificate.category
                    )} flex items-center justify-center mb-4 mx-auto shadow-lg`}
                  >
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-sm text-slate-500 font-medium">
                    PDF Certificate
                  </span>
                </div>
              </div>
            ) : (
              <Image
                src={certificate.image || "/placeholder.svg"}
                alt={certificate.title}
                fill
                className={`object-cover transition-transform duration-300 ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
              />
            )}

            {/* Category badge */}
            <div className="absolute top-4 right-4">
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(
                  certificate.category
                )} shadow-lg`}
              >
                {certificate.category}
              </div>
            </div>

            {/* Issuer badge */}
            <div className="absolute top-4 left-4">
              <div className="px-2 py-1 rounded-md text-xs font-medium bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                {certificate.issuer}
              </div>
            </div>
          </div>

          <CardHeader className="pb-2">
            <CardTitle className="text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {certificate.title}
            </CardTitle>
            <CardDescription className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" />
                <span className="font-medium">
                  Certificate of {certificate.type}
                </span>
              </div>
              {certificate.date && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>{certificate.date}</span>
                </div>
              )}
              {certificate.credentialId && (
                <div className="text-xs text-slate-400 font-mono">
                  ID: {certificate.credentialId}
                </div>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Skills gained */}
            {certificate.skills && (
              <div className="mb-3">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Skills Gained
                </div>
                <div className="flex flex-wrap gap-1">
                  {certificate.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {certificate.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {certificate.description}
              </p>
            )}
          </CardContent>

          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              size="sm"
              className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Certificate
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl h-auto max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            {certificate.title}
          </DialogTitle>
          <DialogDescription>
            <div className="space-y-1">
              <div>
                Certificate of {certificate.type} • Issued by{" "}
                {certificate.issuer}
              </div>
              {certificate.date && <div>{certificate.date}</div>}
              {certificate.credentialId && (
                <div className="font-mono text-xs">
                  Credential ID: {certificate.credentialId}
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center">
          {certificate.isPdf ? (
            <div className="w-full h-[70vh] bg-slate-100 rounded-lg overflow-hidden shadow-inner">
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
                className="object-contain max-h-[70vh] rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="flex justify-end w-full mt-4">
            <Button asChild variant="outline" className="shadow-md">
              <Link
                href={certificate.image}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Certificate
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme, setTheme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Update active section based on scroll position
      const sections = [
        "about",
        "projects",
        "skills",
        "certificates",
        "contact",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-20 right-5 z-50 print:hidden">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-2">
          <div className="flex flex-col gap-1">
            {["about", "projects", "skills", "certificates", "contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => {
                    document
                      .getElementById(item)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-3 rounded-xl transition-all duration-200 group relative ${
                    activeSection === item
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {item === "about" && <Eye className="h-5 w-5" />}
                  {item === "projects" && <Briefcase className="h-5 w-5" />}
                  {item === "skills" && <Code className="h-5 w-5" />}
                  {item === "certificates" && <Award className="h-5 w-5" />}
                  {item === "contact" && <Mail className="h-5 w-5" />}
                  <div className="absolute right-full ml-3 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none capitalize">
                    {item}
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/30">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative ms-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-lg">DF</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div>
              <span className="font-bold text-xl">Dweight Fuentes</span>
              <div className="text-xs text-slate-500">Full-Stack Developer</div>
            </div>
          </Link>

          <button
            onClick={toggleMenu}
            className="block md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <nav className="hidden md:flex gap-6 items-center me-5">
            {["about", "projects", "skills", "certificates", "contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className={`text-sm font-medium transition-all duration-200 capitalize relative group ${
                    activeSection === item
                      ? "text-blue-600 dark:text-blue-400"
                      : "hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-200 ${
                      activeSection === item ? "w-full" : "group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              )
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl hover:scale-110 transition-transform duration-200"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/30 shadow-xl">
            <nav className="container py-6 space-y-4">
              {["about", "projects", "skills", "certificates", "contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`#${item}`}
                    className="block py-3 px-4 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 capitalize transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={toggleMenu}
                  >
                    {item}
                  </Link>
                )
              )}
              <Button
                variant="ghost"
                onClick={() => {
                  toggleTheme();
                  toggleMenu();
                }}
                className="w-full justify-start text-lg font-medium py-3 px-4 h-auto rounded-xl"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-5 w-5 mr-3" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-3" />
                    Dark Mode
                  </>
                )}
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="container relative z-10 p-5">
        <section ref={heroRef} id="about" className="py-12 md:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Available for work
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500">
                      Cebu City, Philippines
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Dweight Dewey Fuentes
                  </span>
                </h1>

                <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 h-20 flex items-center">
                  <AnimatedText
                    texts={[
                      "Full-Stack Developer architecting seamless digital experiences",
                      "Mobile App Developer engineering intuitive cross-platform solutions",
                      "Web Developer crafting pixel-perfect, high-performance interfaces",
                      "QA Specialist delivering flawless software through rigorous testing",
                    ]}
                  />
                </div>
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                I&apos;m passionate about creating intuitive and performant web
                applications that solve real-world problems. With expertise in
                React, Next.js, and modern backend technologies, I build
                solutions that are both beautiful and functional.
              </p>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center group">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Link href="#contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Let&apos;s Connect
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-2 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                  <Link href="#projects">
                    <Eye className="mr-2 h-5 w-5" />
                    View My Work
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                >
                  <Link href="/cv">
                    <FileText className="mr-2 h-5 w-5" />
                    Download CV
                  </Link>
                </Button>
              </div>
            </div>

            {/* Enhanced profile image with floating elements */}
            <div className="relative flex justify-center lg:justify-end me-10">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Animated background rings */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full animate-spin-slow opacity-20"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full animate-spin-reverse opacity-30"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-spin-slow opacity-10"></div>

                {/* Profile container */}
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl group">
                  <Image
                    src="/dweightproImage.jpg"
                    alt="Dweight Dewey Fuentes"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>

                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
                  <Zap className="h-6 w-6 text-white" />
                </div>

                <div className="absolute top-1/2 -left-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
                  <Code className="h-5 w-5 text-white" />
                </div>

                <div className="absolute top-1/4 -right-8 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Projects Section */}
        <section id="projects" className="space-y-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Featured Projects
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              A showcase of my professional work and passion projects. Each
              project represents a unique challenge and demonstrates different
              aspects of my technical expertise.
            </p>
          </div>

          {/* Featured projects first */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <div key={index} className="lg:col-span-1">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
          </div>

          {/* Other projects */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">
              Other Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => !p.featured)
                .map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
          </div>

          <div className="text-center pt-8">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              <Link href="#contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me For More Projects
              </Link>
            </Button>
          </div>
        </section>

        {/* Enhanced Skills Section */}
        <section id="skills" className="space-y-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Skills & Technologies
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              The tools and technologies I use to bring ideas to life.
              Constantly learning and evolving with the latest industry trends
              and best practices.
            </p>
          </div>

          <div className="space-y-12">
            {Object.entries(skillCategories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <div key={key} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.skills.map((skill, index) => (
                      <SkillCard
                        key={index}
                        skill={skill}
                        category={category}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Enhanced Certificates Section */}
        <section id="certificates" className="space-y-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Certificates & Credentials
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Professional certifications and educational achievements that
              validate my expertise and commitment to continuous learning in the
              tech industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate, index) => (
              <CertificateCard key={index} certificate={certificate} />
            ))}
          </div>
        </section>

        {/* AI Integration Experience */}
        <IntegrationExperience />

        {/* Contact Section */}
        <ContactSection />
      </main>

      <FooterSection />

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
