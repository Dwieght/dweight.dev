"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Image as ImageIcon,
  Download,
  Calendar,
  Clock,
  ExternalLink,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Certificate {
  title: string;
  type: string;
  date?: string;
  image: string;
  isPdf: boolean;
  link: string;
  category?: string;
  issuer?: string;
  description?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  index,
}) => {
  const fileIcon = certificate.isPdf ? (
    <FileText className="h-6 w-6 text-indigo-600" />
  ) : (
    <ImageIcon className="h-6 w-6 text-indigo-600" />
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 h-full">
          <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50">
            {certificate.isPdf ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-white/80 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-8 w-8 text-indigo-600" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium bg-white/80 px-3 py-1 rounded-full">
                    Click to view PDF
                  </span>
                </div>
              </div>
            ) : (
              <Image
                src={certificate.image || "/placeholder.svg"}
                alt={certificate.title}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            )}

            {/* Category Badge */}
            {certificate.category && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-white/90 text-indigo-700 border-indigo-200 backdrop-blur-sm text-xs">
                  {certificate.category}
                </Badge>
              </div>
            )}

            {/* Date Badge */}
            {certificate.date && (
              <div className="absolute top-3 right-3">
                <Badge
                  variant="secondary"
                  className="bg-white/90 backdrop-blur-sm text-xs"
                >
                  {certificate.date.split(" ").pop()} {/* Show year only */}
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-bold group-hover:text-indigo-600 transition-colors duration-300 mb-2 line-clamp-2">
                {certificate.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {certificate.type}
                  </Badge>
                  {certificate.issuer && (
                    <span className="text-xs text-gray-500">
                      by {certificate.issuer}
                    </span>
                  )}
                </div>

                {certificate.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {certificate.description}
                  </p>
                )}

                {certificate.date && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {certificate.date}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {fileIcon}
                <span className="text-xs">
                  {certificate.isPdf ? "PDF Document" : "Image Certificate"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="group-hover:bg-indigo-50 group-hover:text-indigo-600 text-xs px-3 py-1"
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-5xl h-auto max-h-[90vh] overflow-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {certificate.title}
          </DialogTitle>
          <DialogDescription className="text-base space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-indigo-100 text-indigo-800">
                Certificate of {certificate.type}
              </Badge>
              {certificate.category && (
                <Badge variant="secondary">{certificate.category}</Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
              {certificate.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{certificate.date}</span>
                </div>
              )}
              {certificate.issuer && (
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">•</span>
                  <span>Issued by {certificate.issuer}</span>
                </div>
              )}
            </div>

            {certificate.description && (
              <p className="text-gray-600 mt-2">{certificate.description}</p>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col items-center">
          {certificate.isPdf ? (
            <div className="w-full h-[75vh] bg-gray-100 rounded-xl overflow-hidden shadow-inner border">
              <iframe
                src={`${certificate.image}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full"
                title={certificate.title}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="relative w-full max-h-[75vh] flex justify-center bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-6 border">
              <Image
                src={certificate.image || "/placeholder.svg"}
                alt={certificate.title}
                width={800}
                height={600}
                className="object-contain max-h-[70vh] rounded-lg shadow-xl border border-white"
                quality={95}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-8 pt-6 border-t gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                {fileIcon}
                <span>
                  {certificate.isPdf ? "PDF Document" : "Image Certificate"}
                </span>
              </div>
              {certificate.date && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Issued {certificate.date}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                className="bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
              >
                <Link
                  href={certificate.image}
                  download={`${certificate.title.replace(
                    /\s+/g,
                    "_"
                  )}_Certificate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Link>
              </Button>

              <Button
                asChild
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <Link
                  href={certificate.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in New Tab
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateCard;
