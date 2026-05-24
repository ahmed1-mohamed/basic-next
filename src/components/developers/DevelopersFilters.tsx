import { useEffect, useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DevelopersFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  currentStatus: string;
  currentSearch: string;
}

export function DevelopersFilters({
  onSearchChange,
  onStatusChange,
  currentStatus,
  currentSearch,
}: DevelopersFiltersProps) {
  const [localSearch, setLocalSearch] = useState(currentSearch);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== currentSearch) {
        onSearchChange(localSearch);
      }
    }, 400); // 400ms is a sweet spot for perceived performance

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange, currentSearch]);

  const handleReset = () => {
    setLocalSearch("");
    onSearchChange("");
    onStatusChange("All");
  };

  const hasActiveFilters = currentSearch !== "" || currentStatus !== "All";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-1">
      <div className="relative flex-1 w-full sm:max-w-md group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#0F7A6C] transition-colors rtl:left-auto rtl:right-3.5" />
        <Input
          placeholder="Search developers by name..."
          className="pl-10 py-5 rtl:pl-4 rtl:pr-10 bg-white border-gray-200 shadow-sm rounded-xl focus-visible:ring-[#0F7A6C]/20 focus-visible:border-[#0F7A6C] transition-all"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-1 rounded-full transition-colors rtl:left-3.5 rtl:right-auto"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center w-full sm:w-auto gap-3">
        <div className="relative w-full sm:w-[200px]">
          <Select value={currentStatus} onValueChange={(val) => val && onStatusChange(val)}>
            <SelectTrigger className="w-full bg-white border-gray-200 py-5 shadow-sm rounded-xl focus:ring-[#0F7A6C]/20 focus:border-[#0F7A6C] transition-all">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent className="border-gray-100 shadow-xl rounded-xl">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="active">Active Developers</SelectItem>
              <SelectItem value="inactive">Inactive Developers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            onClick={handleReset} 
            className="px-4 py-5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all whitespace-nowrap"
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
