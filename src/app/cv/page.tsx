"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Download,
  ArrowLeft,
  Printer,
  Mail,
  Linkedin,
  Github,
  Sun,
  Moon,
  MapPin,
  Calendar,
  Star,
  Award,
  Code,
  Briefcase,
  GraduationCap,
  Zap,
  Eye,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";

export default function CVPage() {
  const { theme, setTheme } = useTheme();
  const [isPrinting, setIsPrinting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [activeSection, setActiveSection] = useState("summary");
  const cvRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const generatePdf = async () => {
    if (!cvRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = cvRef.current;

      const opt = {
        margin: [10, 8, 10, 8],
        filename: "dweight-fuentes-cv.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
        pagebreak: {
          mode: "avoid-all",
          before: ".page-break-before",
        },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const skillCategories = {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
    backend: ["Node.js", "ASP.NET", "MongoDB", "PostgreSQL", "SQL Server"],
    tools: ["Git", "UI/UX Design", "Quality Assurance"],
  };

  const navigationItems = [
    { id: "summary", label: "Summary", icon: Eye },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Zap },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "certificates", label: "Certificates", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 print:bg-white">
      {/* Floating Navigation */}
      <nav className="fixed top-20 right-6 z-50 print:hidden">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-2">
          <div className="flex flex-col gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-3 rounded-xl transition-all duration-200 group relative ${
                    activeSection === item.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div className="absolute right-full ml-3 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Header with Actions */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/30 print:hidden">
        <div className="container flex h-16 items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="rounded-xl">
              <Link href="/" aria-label="Back to home">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-bold text-lg">Curriculum Vitae</h1>
              <p className="text-xs text-slate-500">Interactive Resume</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handlePrint}
              className="rounded-xl border-slate-200 dark:border-slate-700"
            >
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <Button
              onClick={generatePdf}
              disabled={isGeneratingPdf}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingPdf ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 max-w-6xl mx-auto print:py-4 pl-24 print:pl-0">
        <div ref={cvRef} className="space-y-8 print:space-y-6">
          {/* Hero Section */}
          <section className="relative">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl print:bg-slate-800">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-white/30 shadow-xl">
                    <Image
                      src="/dweightproImage.jpg"
                      alt="Dweight Dewey Fuentes"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                    Dweight Dewey Fuentes
                  </h1>
                  <p className="text-xl lg:text-2xl text-blue-100 mb-4">
                    Front-End Web Developer
                  </p>
                  <p className="text-blue-100 mb-6 max-w-2xl">
                    Passionate developer crafting exceptional digital
                    experiences with modern web technologies. Turning ideas into
                    elegant, user-friendly solutions.
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <Link
                      href="mailto:dwieghtpro@gmail.com"
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">dwieghtpro@gmail.com</span>
                    </Link>
                    <Link
                      href="https://linkedin.com/in/dweight-dewey-fuentes-692078200"
                      target="_blank"
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="text-sm">LinkedIn</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://github.com/Dwieght"
                      target="_blank"
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all"
                    >
                      <Github className="h-4 w-4" />
                      <span className="text-sm">GitHub</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Professional Summary */}
          <section id="summary">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Professional Summary</h2>
            </div>

            <Card className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-8">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                  Hardworking and passionate front-end developer with strong
                  organizational skills and a keen eye for detail. Experienced
                  in building impactful, modern websites that engage users and
                  deliver exceptional business results. Well-versed in current
                  design standards, user experience principles, and cutting-edge
                  web technologies.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      1+
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      15+
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Projects Completed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      10+
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Technologies
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Skills */}
          <section id="skills">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold">Technical Skills</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <Card
                  key={category}
                  className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl"
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 capitalize flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          category === "frontend"
                            ? "bg-blue-500"
                            : category === "backend"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                      ></div>
                      {category === "frontend"
                        ? "Frontend"
                        : category === "backend"
                        ? "Backend"
                        : "Tools & Others"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Professional Experience */}
          <section id="experience">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold">Professional Experience</h2>
            </div>

            <div className="space-y-6">
              {/* Current Role */}
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold">Front-End Developer</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        DXform Ph, Cebu City
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-slate-600 dark:text-slate-400">
                        <MapPin className="h-4 w-4" />
                        <span>1402B The Meridian, Golam Drive, Kasambagan</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        August 2024 - Present
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {[
                      "Tested Aicquire AI-driven applicant tracking system",
                      "Built GiGi POS point-of-sale system with web/mobile interfaces",
                      "Tested Zukify subscription discount platform",
                      "Tested Payruler Learn comprehensive LMS",
                      "Tested MAYPLAKA vehicle tracking system",
                      "Tested DBM Marketplace e-commerce platform",
                      "Contributed to Gigi Logistics Platform",
                      "Developed and tested Lemur Survey platform",
                      "Tested Oras AI smart time tracker",
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-700 dark:text-slate-300">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Other Experiences */}
              {[
                {
                  title: "Software Development Intern",
                  company: "Skanlog ELEV Internship Program, Cebu City",
                  period: "February 2024 - May 2024",
                  achievements: [
                    "Completed 540 hours of intensive software development training",
                    "Developed Calendar application for scheduling management",
                    "Created Central file system for document management",
                    "Built comprehensive Visitor System with check-in/out tracking",
                    "Received recognition for exceptional dedication and knowledge",
                  ],
                },
                {
                  title: "Alliance Jumpstart Program",
                  company: "Alliance Software Inc, Cebu City",
                  period: "June 2023 - December 2023",
                  achievements: [
                    "Provided operational system support with team members",
                    "Established priorities and monitored team performance",
                    "Developed applications using ASP.NET, JavaScript, and SQL Server",
                  ],
                },
                {
                  title: "Quality Assurance Intern",
                  company: "DepEd Regional Office VII, Cebu City",
                  period: "May 2017 - December 2020",
                  achievements: [
                    "Interacted with customers via multiple communication channels",
                    "Analyzed problems and developed solutions with teams",
                    "Organized files, spreadsheets, and reports systematically",
                    "Performed root cause analysis for quality issues",
                  ],
                },
              ].map((job, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{job.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {job.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">{job.period}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="page-break-before"></div>

          {/* Key Projects */}
          <section id="projects">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold">Key Projects</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  name: "Aicquire",
                  desc: "AI-driven applicant tracking system for efficient candidate management with advanced hiring tools.",
                },
                {
                  name: "GiGi POS",
                  desc: "Intuitive point-of-sale system designed to enhance business efficiency and customer experience.",
                },
                {
                  name: "Zukify",
                  desc: "Revolutionary subscription discount platform connecting users with merchants and exclusive perks.",
                },
                {
                  name: "Payruler Learn LMS",
                  desc: "Comprehensive learning management system with interactive courses and progress tracking.",
                },
                {
                  name: "Mayplaka",
                  desc: "Vehicle plate number tracking and delivery system with appointment scheduling.",
                },
                {
                  name: "Calendar Application",
                  desc: "Scheduling and appointment management system with intuitive interface and notifications.",
                },
                {
                  name: "Visitor System",
                  desc: "Check-in/out tracking system with schedule management and comprehensive testing.",
                },
                {
                  name: "Central File System",
                  desc: "Centralized document management solution for efficient organization and collaboration.",
                },
              ].map((project, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h3>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {project.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Education */}
          <section id="education">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold">Education</h2>
            </div>

            <div className="space-y-4">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
                    <div>
                      <h3 className="text-lg font-bold">
                        Bachelor of Science in Information Technology
                      </h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                        University of Cebu
                      </p>
                    </div>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium">
                        Graduated 2023
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
                    <div>
                      <h3 className="text-lg font-bold">Senior High School</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Lahug Night High School
                      </p>
                      <p className="text-sm text-slate-500">
                        General Academic Strand
                      </p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full">
                      <span className="text-sm">Graduated 2017</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Certificates */}
          <section id="certificates">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold">
                Certificates & Accomplishments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Alliance Jumpstart Program",
                  desc: "Successfully completed for S.Y 2023-2024",
                },
                {
                  title: "Introduction to Web Security Threats",
                  desc: "Webinar Attendance - December 10, 2020",
                },
                {
                  title: "9th ICT Congress 2022",
                  desc: "Embracing AI Synergies. Shaping Today's Gen Zs",
                },
                {
                  title: "Full-Stack Dev Road Map",
                  desc: "Attendance - March 12, 2021",
                },
                {
                  title: "SKANLOG ELEV Internship program",
                  desc: "Software development focus. Commended February 5 - May 02, 2024",
                },
              ].map((cert, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{cert.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {cert.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5cm;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:bg-white {
            background: white !important;
          }
          .print\\:bg-slate-800 {
            background: #1e293b !important;
          }
        }
      `}</style>
    </div>
  );
}
