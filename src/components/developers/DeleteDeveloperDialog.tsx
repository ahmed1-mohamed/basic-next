import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteDeveloper } from "@/hooks/useDeleteDeveloper";
import { toast } from "sonner";
import { Developer } from "@/types/developer";

interface DeleteDeveloperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  developer?: Developer | null;
}

export function DeleteDeveloperDialog({
  open,
  onOpenChange,
  developer,
}: DeleteDeveloperDialogProps) {
  const deleteMutation = useDeleteDeveloper();

  const handleDelete = async () => {
    if (!developer) return;

    try {
      await deleteMutation.mutateAsync(developer.id);
      toast.success("Developer deleted successfully");
      onOpenChange(false);
    } catch {
      toast.error("Failed to delete developer. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this developer?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete <strong>{developer?.name}</strong> from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Developer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
