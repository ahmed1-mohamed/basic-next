"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDevelopers } from "@/hooks/useDevelopers";
import { DevelopersStats } from "@/components/developers/DevelopersStats";
import { DevelopersFilters } from "@/components/developers/DevelopersFilters";
import { DevelopersTable } from "@/components/developers/DevelopersTable";
import { EmptyState } from "@/components/developers/EmptyState";
import { DeveloperFormDialog } from "@/components/developers/DeveloperFormDialog";
import { DeleteDeveloperDialog } from "@/components/developers/DeleteDeveloperDialog";
import { DevelopersSkeleton } from "@/components/developers/DevelopersSkeleton";
import { Developer } from "@/types/developer";

export default function DevelopersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);

  const { data, isLoading, isError, error } = useDevelopers({
    page,
    perPage: 10,
    search,
    status,
  });

  const handleEdit = (developer: Developer) => {
    setSelectedDeveloper(developer);
    setFormDialogOpen(true);
  };

  const handleDelete = (developer: Developer) => {
    setSelectedDeveloper(developer);
    setDeleteDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedDeveloper(null);
    setFormDialogOpen(true);
  };

  const hasFilters = search !== "" || status !== "All";

  useEffect(() => {
    if (isError && error) {
      toast.error(error instanceof Error ? error.message : "Failed to load developers. Please try again.");
    }
  }, [isError, error]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-6 p-6 pb-16"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Developers</h1>
          <p className="text-muted-foreground mt-1">
            Manage your developer team members and their account statuses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAdd} className="bg-[#0F7A6C] hover:bg-[#005F54] text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Developer
          </Button>
        </div>
      </motion.div>

      {isLoading ? (
        <motion.div variants={itemVariants} key="skeleton">
          <DevelopersSkeleton />
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="content"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <DevelopersStats developers={data?.data} isLoading={isLoading} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <DevelopersFilters
                currentSearch={search}
                currentStatus={status}
                onSearchChange={(val) => {
                  setSearch(val);
                  setPage(1);
                }}
                onStatusChange={(val) => {
                  setStatus(val);
                  setPage(1);
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              {data?.data && data.data.length > 0 ? (
                <div className="space-y-4">
                  <DevelopersTable
                    developers={data.data}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to{" "}
                      <span className="font-medium">
                        {Math.min(page * 10, data.meta?.total || 0)}
                      </span>{" "}
                      of <span className="font-medium">{data.meta?.total || 0}</span> developers
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page >= (data.meta?.totalPages || 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyState
                  hasFilters={hasFilters}
                  onClearFilters={() => {
                    setSearch("");
                    setStatus("All");
                    setPage(1);
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <DeveloperFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        developer={selectedDeveloper}
      />
      <DeleteDeveloperDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        developer={selectedDeveloper}
      />
    </motion.div>
  );
}
