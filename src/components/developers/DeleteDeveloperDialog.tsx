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
import { AlertTriangle, Loader2 } from "lucide-react";

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
  const isPending = deleteMutation.isPending;

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
    <AlertDialog open={open} onOpenChange={(val) => !isPending && onOpenChange(val)}>
      <AlertDialogContent className="sm:max-w-[425px] border-0 shadow-2xl rounded-2xl overflow-hidden p-0 bg-white">
        
        <div className="bg-red-50/80 p-8 flex flex-col items-center text-center border-b border-red-100">
          <div className="bg-red-100 p-4 rounded-full mb-5 shadow-sm shadow-red-200/50">
            <AlertTriangle className="h-10 w-10 text-red-600" strokeWidth={2.5} />
          </div>
          
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-gray-900 text-center">
              Delete Developer
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 mt-3 text-center leading-relaxed text-base">
              Are you sure you want to permanently delete <br />
              <strong className="text-gray-900 font-bold">{developer?.name}</strong>?
              <br className="mb-2" />
              This action cannot be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter className="p-5 bg-gray-50/80 sm:justify-center flex-col sm:flex-row gap-3">
          <AlertDialogCancel 
            disabled={isPending} 
            className="mt-0 w-full sm:w-1/2 border-gray-200 hover:bg-gray-100 bg-white text-gray-700 shadow-sm rounded-xl py-6 font-medium transition-colors"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 rounded-xl py-6 font-semibold transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Deleting...
              </span>
            ) : (
              "Yes, Delete it"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}
