import Link from "next/link";
import { Edit2, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Developer } from "@/types/developer";

interface DevelopersTableProps {
  developers: Developer[];
  onEdit: (developer: Developer) => void;
  onDelete: (developer: Developer) => void;
}

export function DevelopersTable({ developers, onEdit, onDelete }: DevelopersTableProps) {
  return (
    <div className="rounded-xl border bg-white/50 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/80 border-b border-gray-100">
            <TableRow className="hover:bg-transparent">
              <TableHead>Developer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {developers.map((dev, index) => (
              <TableRow key={dev.id || `dev-${index}`} className="group transition-all duration-300 hover:bg-white hover:shadow-sm hover:-translate-y-[1px] border-b border-gray-50/50">
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F7A6C]/10 to-[#0F7A6C]/5 text-[#0F7A6C] font-bold text-lg shadow-inner ring-1 ring-white/50">
                      {String(dev.name || "?").charAt(0).toUpperCase()}
                    </div>
                    <Link 
                      href={`/dashboard/developers/${dev.id}`}
                      className="font-semibold text-gray-800 transition-all cursor-pointer px-2 py-1 -ml-2 rounded-md hover:bg-[#0F7A6C]/10 hover:text-[#0F7A6C]"
                    >
                      {dev.name || "Unknown"}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">{dev.email || "N/A"}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">{dev.phone_number || "N/A"}</div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center justify-center rounded-lg px-3 py-1 text-xs font-bold border transition-colors ${
                    dev.status === "active" 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-[0_2px_10px_rgb(16,185,129,0.1)]" 
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}>
                    {dev.status || "Unknown"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link 
                      href={`/dashboard/developers/${dev.id}`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "h-8 w-8 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                      )}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(dev)}
                      className="h-9 w-9 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg shadow-sm border border-transparent hover:border-blue-100"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(dev)}
                      className="h-9 w-9 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg shadow-sm border border-transparent hover:border-rose-100"
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
