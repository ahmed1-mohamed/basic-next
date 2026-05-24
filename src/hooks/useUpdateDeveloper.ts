import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeveloper } from "@/api/developers";
import { UpdateDeveloperPayload } from "@/types/developer";

export function useUpdateDeveloper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateDeveloperPayload) => {
      const { id, ...payload } = variables;
      return updateDeveloper(id, payload);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["developers"] });
    },
  });
}
