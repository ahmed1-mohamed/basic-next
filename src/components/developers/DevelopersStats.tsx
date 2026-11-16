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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="group rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] relative overflow-hidden">
          <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${stat.bgColor} opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-white/50 shadow-sm ring-1 ring-black/5 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-1">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
