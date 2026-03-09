import { queryOptions } from "@tanstack/react-query";
import type { TeamMember } from "@/lib/types/team";

async function fetchTeamMembers(): Promise<TeamMember[]> {
  const mod = await import("@/lib/data/team.json");
  return mod.default as TeamMember[];
}

export const teamQueryOptions = queryOptions({
  queryKey: ["team"],
  queryFn: fetchTeamMembers,
});
