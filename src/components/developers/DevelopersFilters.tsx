import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
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
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange, currentSearch]);

  const handleReset = () => {
    setLocalSearch("");
    onSearchChange("");
    onStatusChange("All");
  };

  const hasActiveFilters = currentSearch !== "" || currentStatus !== "All";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-2.5" />
        <Input
          placeholder="Search developers..."
          className="pl-9 rtl:pl-3 rtl:pr-9"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch("")}
            className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground rtl:left-2.5 rtl:right-auto"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <Select value={currentStatus} onValueChange={(val) => val && onStatusChange(val)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" onClick={handleReset} className="px-2">
          Reset Filters
        </Button>
      )}
    </div>
  );
}
