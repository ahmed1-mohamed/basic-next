
import { Edit2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Developer } from "@/types/developer";

interface DevelopersTableProps {
  developers: Developer[];
  onEdit: (developer: Developer) => void;
  onDelete: (developer: Developer) => void;
}

export function DevelopersTable({ developers, onEdit, onDelete }: DevelopersTableProps) {
  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Developer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {developers.map((dev, index) => (
              <TableRow key={dev.id || `dev-${index}`} className="group transition-colors hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {String(dev.name || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="font-medium">{dev.name || "Unknown"}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">{dev.email || "N/A"}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">{dev.phone_number || "N/A"}</div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                    dev.status === "active" 
                      ? "bg-green-50 text-green-700 border-green-200" 
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}>
                    {dev.status || "Unknown"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(dev)}
                      className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(dev)}
                      className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
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
