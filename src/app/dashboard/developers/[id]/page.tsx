"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit2, Globe, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { useDeveloper } from "@/hooks/useDeveloper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function DeveloperProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: developer, isLoading, isError } = useDeveloper(resolvedParams.id);

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Developer Not Found</h2>
        <p className="text-muted-foreground">The developer you are looking for does not exist or an error occurred.</p>
        <Button onClick={() => router.push("/dashboard/developers")} variant="outline">
          Back to Developers
        </Button>
      </div>
    );
  }

  if (isLoading || !developer) {
    return (
      <div className="space-y-6 p-6 pb-16">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-[200px] md:col-span-1 rounded-xl" />
          <Skeleton className="h-[200px] md:col-span-2 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 pb-16 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/developers")}
          className="w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Developers
        </Button>
        <h1 className="text-3xl font-bold tracking-tight flex-1 sm:text-center sm:-ml-[140px] pointer-events-none">
          Developer Profile
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <div className="rounded-xl border bg-card p-6 text-center shadow-sm flex flex-col items-center">
            {developer.logo ? (
              <img
                src={developer.logo}
                alt={developer.name}
                className="h-32 w-32 rounded-full object-cover border-4 border-muted/50 mb-4"
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl font-bold mb-4">
                {String(developer.name || "?").charAt(0).toUpperCase()}
              </div>
            )}

            <h2 className="text-2xl font-bold">{developer.name}</h2>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Badge variant={developer.status === "active" ? "default" : "secondary"} className={developer.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}>
                {developer.status}
              </Badge>
              {developer.is_top && (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">
                  Top Developer
                </Badge>
              )}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Contact Info</h3>

            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="truncate">{developer.email || "Not provided"}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              <span>{developer.phone_number || "Not provided"}</span>
            </div>

            {developer.website && (
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                <a href={developer.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">
                  {developer.website}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-lg border-b pb-2 mb-4">About the Developer</h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed text-lg">
              {developer.description || "No description provided for this developer."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
