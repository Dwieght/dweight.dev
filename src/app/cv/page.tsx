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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";

export default function CVPage() {
  const { theme } = useTheme();
  const [isPrinting, setIsPrinting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

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
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import("html2pdf.js")).default;

      const element = cvRef.current;
      const opt = {
        margin: 10,
        filename: "dweight-fuentes-cv.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();

      // Optional: Show success message
      console.log("PDF generated successfully");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-background print:bg-white">
      {/* Navigation - hidden when printing */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/" aria-label="Back to home">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-bold text-xl">Curriculum Vitae</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button
              onClick={generatePdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isGeneratingPdf ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </header>

      {/* CV Content */}
      <main className="container py-8 max-w-4xl mx-auto print:py-2">
        <div
          ref={cvRef}
          className={`space-y-8 print:space-y-6 ${
            isPrinting ? "printing" : ""
          }`}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 print:border-gray-200">
              <Image
                src="/dweightproImage.jpg"
                alt="Dweight Dewey Fuentes"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">Dweight Dewey Fuentes</h1>
              <p className="text-xl text-muted-foreground mt-1">
                Front-End Web Developer
              </p>

              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                <Link
                  href="mailto:dwieghtpro@gmail.com"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-4 w-4" /> dwieghtpro@gmail.com
                </Link>
                <Link
                  href="https://linkedin.com/in/dweight-dewey-fuentes-692078200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />{" "}
                  linkedin.com/in/dweight-dewey-fuentes
                </Link>
                <Link
                  href="https://github.com/Dwieght"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <Github className="h-4 w-4" /> github.com/Dwieght
                </Link>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <section>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">
              Professional Summary
            </h2>
            <p className="text-muted-foreground">
              Hardworking and passionate job seeker with strong organizational
              skills eager to secure entry-level Front-End Web Developer
              position. Ready to help team achieve company goals. Experienced
              working with teams to produce impactful, leading-edge websites
              that engage customers and deliver business results. Well-versed in
              design standards and user preferences.
            </p>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">JavaScript</Badge>
              <Badge variant="secondary">HTML5</Badge>
              <Badge variant="secondary">CSS3</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">Node.js</Badge>
              <Badge variant="secondary">MongoDB</Badge>
              <Badge variant="secondary">PostgreSQL</Badge>
              <Badge variant="secondary">Git</Badge>
              <Badge variant="secondary">ASP.NET</Badge>
              <Badge variant="secondary">SQL Server</Badge>
              <Badge variant="secondary">UI/UX Design</Badge>
              <Badge variant="secondary">Quality Assurance</Badge>
            </div>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">
              Professional Experience
            </h2>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg">Front-End Developer</h3>
                      <p className="text-muted-foreground">
                        DXform Ph, Cebu City
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        1402B The Meridian, Golam Drive, Kasambagan, Cebu City
                        Philippines 6000
                      </p>
                    </div>
                    <p className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      August 2024 - Present
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 list-disc pl-5">
                    <li>
                      Tested the Aicquire AI-driven applicant tracking system
                      for efficient candidate management.
                    </li>
                    <li>
                      Built GiGi POS, an intuitive point-of-sale system for
                      businesses with web and mobile interfaces.
                    </li>
                    <li>
                      Tested Zukify, a subscription discount platform connecting
                      users with merchants.
                    </li>
                    <li>
                      Tested Payruler Learn LMS, a comprehensive learning
                      management system.
                    </li>
                    <li>
                      Tested MAYPLAKA, a vehicle plate number tracking and
                      delivery system.
                    </li>
                    <li>
                      Tested DBM Marketplace, an e-commerce online marketplace
                      platform.
                    </li>
                    <li>
                      Contributed to Gigi Logistics Platform, a multi-role
                      logistics and delivery platform.
                    </li>
                    <li>
                      Developed and Tested Lemur Survey, a comprehensive survey
                      platform with offline and online capabilities.
                    </li>
                    <li>
                      Tested Oras AI, a smart time tracker that helps teams
                      track, manage, and create projects.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg">
                        Software Development Intern
                      </h3>
                      <p className="text-muted-foreground">
                        Skanlog ELEV Internship Program, Cebu City
                      </p>
                    </div>
                    <p className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      February 2024 - May 2024
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 list-disc pl-5">
                    <li>
                      Successfully completed 540 hours of intensive software
                      development training.
                    </li>
                    <li>
                      Developed a Calendar application for scheduling and
                      appointment management.
                    </li>
                    <li>
                      Created a Central file system for efficient document
                      management and sharing.
                    </li>
                    <li>
                      Built a Visitor System with the following features:
                      <ul className="ml-4 mt-2 space-y-1 list-circle">
                        <li>
                          User check-in and check-out tracking functionality
                        </li>
                        <li>Schedule management and date organization</li>
                        <li>
                          Developed comprehensive test cases for quality
                          assurance
                        </li>
                      </ul>
                    </li>
                    <li>
                      Received recognition for exceptional interest, knowledge,
                      and dedication towards becoming an efficient IT
                      Professional.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg">
                        Alliance Jumpstart Program
                      </h3>
                      <p className="text-muted-foreground">
                        Alliance Software Inc, Cebu City
                      </p>
                    </div>
                    <p className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      June 2023 - December 2023
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 list-disc pl-5">
                    <li>
                      Worked with team members to provide operational system
                      support.
                    </li>
                    <li>
                      Established team priorities, maintained schedules and
                      monitored performance.
                    </li>
                    <li>
                      Used ASP.NET, JavaScript and SQL Server to develop new
                      applications.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg">
                        Quality Assurance Intern
                      </h3>
                      <p className="text-muted-foreground">
                        DepEd Regional Office VII, Cebu City
                      </p>
                    </div>
                    <p className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      May 2017 - December 2020
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 list-disc pl-5">
                    <li>
                      Interacted with customers by phone, email, or in-person to
                      provide information.
                    </li>
                    <li>
                      Analyzed problems and worked with teams to develop
                      solutions.
                    </li>
                    <li>
                      Sorted and organized files, spreadsheets, and reports.
                    </li>
                    <li>
                      Performed root cause analysis to identify and resolve
                      quality issues and defects.
                    </li>
                    <li>
                      Established and tracked quality department goals and
                      objectives.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">
              Key Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">
                    Professional Portfolio
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Aicquire</h4>
                      <p className="text-sm text-muted-foreground">
                        AI-driven applicant tracking system for efficient
                        candidate management. Efficiently manage candidates,
                        streamline workflows, and unlock your team&apos;s full
                        potential with AI-powered hiring tools.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">GiGi POS</h4>
                      <p className="text-sm text-muted-foreground">
                        Intuitive point-of-sale system for businesses. A
                        powerful, intuitive point-of-sale system designed to
                        enhance efficiency and improve customer experience.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Zukify</h4>
                      <p className="text-sm text-muted-foreground">
                        Subscription discount platform connecting users with
                        merchants. Revolutionary online community that
                        transforms the traditional landscape of acquiring
                        discounts and perks.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Payruler Learn LMS</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive learning management system that delivers
                        diverse courses, interactive learning, and personalized
                        progress tracking.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Mayplaka</h4>
                      <p className="text-sm text-muted-foreground">
                        Vehicle plate number tracking and delivery system. Track
                        your plate number status, set up appointments, or have
                        it delivered to your address when available.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">
                        Calendar Application (Skanlog)
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Scheduling and appointment management system with
                        intuitive interface and notification features.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Visitor System (Skanlog)</h4>
                      <p className="text-sm text-muted-foreground">
                        User check-in/out tracking and scheduling system.
                        Created and managed data for users who time in and out,
                        with schedule management functionality and comprehensive
                        test cases.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Central File System (Skanlog)
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Centralized document management solution for efficient
                        file organization, sharing, and collaboration.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Certificates */}
          <section>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">
              Certificates & Accomplishments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">
                        Alliance Jumpstart Program
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Successfully completed for S.Y 2023-2024
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">
                        Introduction to Web Security Threats
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Webinar Attendance - December 10, 2020
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">9th ICT Congress 2022</h3>
                      <p className="text-sm text-muted-foreground">
                        Embracing AI Synergies. Shaping Today&apos;s Gen Zs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Full-Stack Dev Road Map</h3>
                      <p className="text-sm text-muted-foreground">
                        Attendance - March 12, 2021
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">
                        SKANLOG ELEV Internship program
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        focusing on software development. Commended from
                        February 5, 2024 to May 02, 2024
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">Education</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg">
                        Bachelor of Science in Information Technology
                      </h3>
                      <p className="text-muted-foreground">
                        University of Cebu
                      </p>
                    </div>
                    <p className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      Graduated 2023
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg">Senior High School</h3>
                      <p className="text-muted-foreground">
                        University of Cebu - Main Campus
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ICT Strand - Programming
                      </p>
                    </div>
                    <p className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      Graduated 2017
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5cm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
