import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DevelopersPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DevelopersPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DevelopersPaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4 gap-4">
      <div className="flex-1 flex items-center justify-between sm:justify-start w-full gap-6">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-semibold">{startItem}</span> to{" "}
          <span className="text-gray-900 font-semibold">{endItem}</span> of{" "}
          <span className="text-gray-900 font-semibold">{totalItems}</span> results
        </p>
        
        <div className="hidden sm:flex items-center gap-2">
          <p className="text-sm text-gray-500 font-medium">Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(val) => onPageSizeChange(Number(val))}
          >
            <SelectTrigger className="h-8 w-[70px] bg-white border-gray-200">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-end">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-gray-200 text-gray-500 hover:text-gray-900 bg-white"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          <span className="sr-only">Previous Page</span>
        </Button>
        
        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <div key={`ellipsis-${index}`} className="h-8 w-8 flex items-center justify-center text-gray-400">
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              );
            }

            return (
              <Button
                key={`page-${page}`}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-lg text-sm font-medium transition-colors border-gray-200",
                  currentPage === page 
                    ? "bg-[#0F7A6C] text-white hover:bg-[#005F54] border-transparent shadow-sm shadow-[#0F7A6C]/20" 
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-gray-200 text-gray-500 hover:text-gray-900 bg-white"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>
    </div>
  );
}
