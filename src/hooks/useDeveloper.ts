import { useQuery } from "@tanstack/react-query";
import { fetchDeveloperById } from "@/api/developers";

export function useDeveloper(id: string) {
  return useQuery({
    queryKey: ["developer", id],
    queryFn: () => fetchDeveloperById(id),
    enabled: !!id,
  });
}
