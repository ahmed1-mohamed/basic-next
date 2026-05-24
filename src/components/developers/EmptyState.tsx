import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters?: () => void;
  hasFilters: boolean;
}

export function EmptyState({ onClearFilters, hasFilters }: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center animate-in fade-in-50">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FolderSearch className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No developers found</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
        {hasFilters
          ? "We couldn't find any developers matching your current filters. Try adjusting them or clearing filters to see all developers."
          : "There are no developers in the system yet. Add a developer to get started."}
      </p>
      {hasFilters && (
        <Button variant="outline" onClick={onClearFilters}>
          Clear all filters
        </Button>
      )}
    </div>
  );
}
