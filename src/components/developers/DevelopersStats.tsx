import { Users, Star, Activity, UserMinus } from "lucide-react";
import { Developer } from "@/types/developer";

interface DevelopersStatsProps {
  developers?: Developer[];
  isLoading: boolean;
}

export function DevelopersStats({ developers, isLoading }: DevelopersStatsProps) {
  const totalDevelopers = developers?.length || 0;
  const topDevelopers = developers?.filter(dev => dev.is_top).length || 0;
  const activeDevelopers = developers?.filter(dev => dev.status === "active").length || 0;
  const inactiveDevelopers = developers?.filter(dev => dev.status !== "active").length || 0;

  const stats = [
    {
      title: "Total Developers",
      value: isLoading ? "-" : totalDevelopers.toString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Top Developers",
      value: isLoading ? "-" : topDevelopers.toString(),
      icon: Star,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Active Developers",
      value: isLoading ? "-" : activeDevelopers.toString(),
      icon: Activity,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Inactive Developers",
      value: isLoading ? "-" : inactiveDevelopers.toString(),
      icon: UserMinus,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
