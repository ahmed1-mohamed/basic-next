import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeveloper } from "@/api/developers";
import { CreateDeveloperPayload } from "@/types/developer";

export function useCreateDeveloper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDeveloperPayload) => createDeveloper(payload),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["developers"] });
    },
  });
}
