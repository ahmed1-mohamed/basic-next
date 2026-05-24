import Link from "next/link";
import { Edit2, Trash2, Eye, Building2, MapPin, Mail, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Developer } from "@/types/developer";

interface DevelopersTableProps {
  developers: Developer[];
  onEdit: (developer: Developer) => void;
  onDelete: (developer: Developer) => void;
}

export function DevelopersTable({ developers, onEdit, onDelete }: DevelopersTableProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <Table>
          <TableHeader className="bg-gray-50/80 border-b border-gray-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-gray-600 uppercase tracking-wider text-xs py-4">Developer</TableHead>
              <TableHead className="font-semibold text-gray-600 uppercase tracking-wider text-xs">Contact</TableHead>
              <TableHead className="font-semibold text-gray-600 uppercase tracking-wider text-xs">Location</TableHead>
              <TableHead className="font-semibold text-gray-600 uppercase tracking-wider text-xs">Status</TableHead>
              <TableHead className="text-right font-semibold text-gray-600 uppercase tracking-wider text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {developers.map((dev, index) => (
              <TableRow 
                key={dev.id || `dev-${index}`} 
                className="group transition-all duration-300 hover:bg-gray-50/50 border-b border-gray-50"
              >
                <TableCell className="py-4 align-top">
                  <div className="flex items-start gap-4">
                    {dev.logo ? (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
                        <img src={dev.logo} alt={dev.name} className="h-full w-full object-contain p-1" />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F7A6C]/10 to-[#0F7A6C]/5 text-[#0F7A6C] font-bold text-lg shadow-inner ring-1 ring-[#0F7A6C]/10">
                        {String(dev.name || "?").charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div className="flex flex-col">
                      <Link 
                        href={`/dashboard/developers/${dev.id}`}
                        className="font-bold text-gray-900 transition-colors hover:text-[#0F7A6C] flex items-center gap-2"
                      >
                        {dev.name || "Unknown"}
                        {dev.is_top && (
                          <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            Top
                          </span>
                        )}
                      </Link>
                      <span className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Building2 className="h-3 w-3" />
                        {dev.total_projects || 0} Projects
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="align-top">
                  <div className="flex flex-col gap-1.5">
                    {dev.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        <span className="truncate max-w-[150px]">{dev.email}</span>
                      </div>
                    )}
                    {dev.phone_number && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        <span>{dev.phone_number}</span>
                      </div>
                    )}
                    {!dev.email && !dev.phone_number && (
                      <span className="text-sm text-gray-400 italic">No contact info</span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="align-top">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>
                      {dev.cities ? `${dev.cities}, ` : ''}
                      {dev.country_name || "N/A"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="align-top pt-5">
                  <Badge 
                    variant={dev.status === "active" ? "default" : "secondary"} 
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      dev.status === "active" 
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200" 
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
                    }`}
                  >
                    {dev.status || "Unknown"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right align-top pt-4">
                  <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 transition-opacity group-hover:opacity-100">
                    <Link
                      href={`/dashboard/developers/${dev.id}`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "h-9 w-9 text-[#0F7A6C] hover:bg-[#0F7A6C]/10 hover:text-[#005F54] rounded-lg border border-transparent hover:border-[#0F7A6C]/20 transition-all"
                      )}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(dev)}
                      className="h-9 w-9 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg border border-transparent hover:border-blue-200 transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(dev)}
                      className="h-9 w-9 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg border border-transparent hover:border-rose-200 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
