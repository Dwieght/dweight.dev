import { Download, FileText } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { GitlabIcon as GitHub, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
export const ContactSection = () => {
  const [isLoadingCV, setIsLoadingCV] = useState(false);

  const handleCVClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoadingCV(true);

    setTimeout(() => {
      setIsLoadingCV(false);
      window.location.href = "/cv";
    }, 1000);
  };
  return (
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
                href="/cv"
                download
                onClick={handleCVClick}
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                View CV <Download className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
