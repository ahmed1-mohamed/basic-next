import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDeveloper } from "@/api/developers";

export function useDeleteDeveloper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteDeveloper(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["developers"] });
    },
  });
}
