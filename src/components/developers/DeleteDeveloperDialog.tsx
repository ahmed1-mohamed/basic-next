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
import { AlertTriangle } from "lucide-react";

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
      <AlertDialogContent className="sm:max-w-[425px] border-none shadow-2xl rounded-2xl overflow-hidden p-0">
        <div className="bg-red-50/50 p-6 flex flex-col items-center text-center border-b border-red-100">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-900 text-center">Delete Developer</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 mt-2 text-center">
              Are you sure you want to permanently delete <strong className="text-gray-900">{developer?.name}</strong>?
              This action cannot be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter className="p-4 bg-gray-50/50 sm:justify-center flex gap-2">
          <AlertDialogCancel disabled={deleteMutation.isPending} className="mt-0 w-full sm:w-auto border-gray-200 hover:bg-gray-100 rounded-lg">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md shadow-red-500/20 rounded-lg"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Yes, delete it"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
