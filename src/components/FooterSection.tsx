"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Heart,
  Coffee,
  Code,
  MapPin,
  Calendar,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Dwieght",
    icon: Github,
    color: "hover:text-gray-900",
    description: "Check out my repositories",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/dweight-dewey-fuentes-692078200",
    icon: Linkedin,
    color: "hover:text-blue-600",
    description: "Connect professionally",
  },
  {
    name: "Email",
    href: "mailto:dwieghtpro@gmail.com",
    icon: Mail,
    color: "hover:text-red-500",
    description: "Send me an email",
  },
];

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export const FooterSection: React.FC = () => {
  const [isLoadingCV, setIsLoadingCV] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCVClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoadingCV(true);

    setTimeout(() => {
      setIsLoadingCV(false);
      window.location.href = "/cv";
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                    Dweight Dewey Fuentes
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Full-Stack Developer passionate about creating innovative
                    digital solutions that solve real-world problems and deliver
                    exceptional user experiences.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge className="bg-indigo-600/20 text-indigo-300 border-indigo-500/30">
                      <Code className="w-3 h-3 mr-1" />
                      Full-Stack Developer
                    </Badge>
                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                      <MapPin className="w-3 h-3 mr-1" />
                      Cebu City, PH
                    </Badge>
                    <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                      Available for Projects
                    </Badge>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-200">
                    Connect With Me
                  </h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <Link
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                          title={social.description}
                        >
                          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:border-white/40">
                            <Icon
                              className={`h-6 w-6 text-gray-300 transition-colors duration-300 ${social.color}`}
                            />
                          </div>

                          {/* Tooltip */}
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                            {social.description}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-gray-200">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleQuickLinkClick(link.href)}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 bg-indigo-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services/Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-gray-200">
                  Services
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                    Web Development
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                    Mobile App Development
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                    UI/UX Design
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                    Quality Assurance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                    Technical Consulting
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ready to Work Together?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Lets bring your ideas to life with cutting-edge technology and
                  creative solutions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <Link href="#contact">Get In Touch</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    <Link
                      href="/cv"
                      onClick={handleCVClick}
                      className="flex items-center gap-2"
                    >
                      {isLoadingCV ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                      {isLoadingCV ? "Loading..." : "Download CV"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <span>
                    © {new Date().getFullYear()} Dweight Dewey Fuentes.
                  </span>
                  <span className="hidden md:inline">All rights reserved.</span>
                  <div className="flex items-center gap-1 ml-2">
                    <span>Made with</span>
                    <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
                    <span>and</span>
                    <Coffee className="h-4 w-4 text-amber-500" />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Last updated: {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CV Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            size="sm"
            className="rounded-full w-12 h-12 bg-gray-800/80 backdrop-blur-sm text-white border border-white/20 hover:bg-gray-700/80 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}

        {/* CV Download Button */}
        <Button
          asChild
          className="rounded-full shadow-lg hover:shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 px-6"
        >
          <Link
            href="/cv"
            onClick={handleCVClick}
            className="flex items-center gap-2"
          >
            {isLoadingCV ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
              <FileText className="h-5 w-5" />
            )}
            <span className="hidden sm:inline">
              {isLoadingCV ? "Loading..." : "View CV"}
            </span>
          </Link>
        </Button>
      </div>
    </>
  );
};
