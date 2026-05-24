import { useQuery } from "@tanstack/react-query";
import { fetchDevelopers } from "@/api/developers";
import { FetchDevelopersParams } from "@/types/developer";

export function useDevelopers(params: FetchDevelopersParams) {
  return useQuery({
    queryKey: ["developers", params],
    queryFn: () => fetchDevelopers(params),
    placeholderData: (previousData) => previousData,
  });
}