"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Globe, Mail, Phone, Building2, ExternalLink } from "lucide-react";
import { useDeveloper } from "@/hooks/useDeveloper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function DeveloperProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: developer, isLoading, isError } = useDeveloper(resolvedParams.id);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-red-100 p-4 mb-4">
          <Building2 className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Developer Not Found</h2>
        <p className="text-muted-foreground max-w-sm">
          The developer you are looking for doesn't exist or an error occurred while fetching the data.
        </p>
        <Button onClick={() => router.push("/dashboard/developers")} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4 rtl:rotate-180" />
          Back to Developers
        </Button>
      </div>
    );
  }

  if (isLoading || !developer) {
    return (
      <div className="space-y-8 p-6 pb-16 max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-[380px] w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[200px] w-full rounded-2xl" />
            <Skeleton className="h-[250px] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 p-6 pb-16 max-w-8xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/developers")}
          className="w-fit hover:bg-gray-100 transition-colors border-gray-200 shadow-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4 rtl:rotate-180" />
          Back to Developers
        </Button>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#0F7A6C]/10 to-transparent -z-10" />

            <div className="mx-auto mb-6 relative">
              {developer.logo ? (
                <div className="h-40 w-40 rounded-full mx-auto p-2 bg-white shadow-lg border border-gray-50 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={developer.logo}
                    alt={developer.name}
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-40 w-40 rounded-full mx-auto p-2 bg-white shadow-lg border border-gray-50 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-[#0F7A6C]/10 to-[#0F7A6C]/5 text-[#0F7A6C] flex items-center justify-center text-5xl font-bold">
                    {String(developer.name || "?").charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
              {developer.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <Badge
                variant={developer.status === "active" ? "default" : "secondary"}
                className={`px-3 py-1 rounded-full font-medium ${developer.status === "active"
                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
                  }`}
              >
                {developer.status === "active" ? "Active" : "Inactive"}
              </Badge>
              {developer.is_top && (
                <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 px-3 py-1 rounded-full font-medium">
                  ★ Top Developer
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
              <div className="p-2 bg-[#0F7A6C]/10 rounded-lg">
                <Building2 className="h-5 w-5 text-[#0F7A6C]" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">About the Developer</h2>
            </div>
            {developer.description ? (
              <p className="text-gray-600 leading-relaxed text-base whitespace-pre-wrap">
                {developer.description}
              </p>
            ) : (
              <p className="text-gray-400 italic">No description provided for this developer.</p>
            )}
          </div>

          {/* Contact Details */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="p-3 bg-gray-50 group-hover:bg-white rounded-full shadow-sm transition-colors">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                  <p className="font-medium text-gray-900 truncate">
                    {developer.email || <span className="text-gray-400 italic font-normal">Not provided</span>}
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="p-3 bg-gray-50 group-hover:bg-white rounded-full shadow-sm transition-colors">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                  <p className="font-medium text-gray-900">
                    {developer.phone_number || <span className="text-gray-400 italic font-normal">Not provided</span>}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-2 group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="p-3 bg-gray-50 group-hover:bg-white rounded-full shadow-sm transition-colors">
                  <Globe className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Website</p>
                  {developer.website ? (
                    <a
                      href={developer.website.startsWith('http') ? developer.website : `https://${developer.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#0F7A6C] hover:text-[#005F54] hover:underline"
                    >
                      {developer.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <p className="text-gray-400 italic font-normal">Not provided</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}

