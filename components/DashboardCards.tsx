import {
  CalendarClock,
  CheckCircle2,
  CirclePause,
  FolderKanban,
  Wallet,
} from "lucide-react";
import { Project } from "@/types/project";

type Props = {
  projects: Project[];
};

export default function DashboardCards({ projects }: Props) {
  const total = projects.length;
  const active = projects.filter((project) => project.status === "active").length;
  const onHold = projects.filter((project) => project.status === "on hold").length;
  const completed = projects.filter((project) => project.status === "completed").length;

  const totalBudget = projects.reduce(
    (sum, project) => sum + project.budget,
    0
  );

  const dueThisWeek = projects.filter((project) => {
    const today = new Date();
    const deadline = new Date(project.deadline);
    const nextWeek = new Date();

    nextWeek.setDate(today.getDate() + 7);

    return deadline >= today && deadline <= nextWeek;
  }).length;

  const cards = [
    {
      title: "Total Projects",
      value: total,
      icon: FolderKanban,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Active",
      value: active,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "On Hold",
      value: onHold,
      icon: CirclePause,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "bg-slate-200 text-slate-700",
    },
    {
      title: "Total Budget",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(totalBudget),
      icon: Wallet,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Due This Week",
      value: dueThisWeek,
      icon: CalendarClock,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <section className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {card.value}
                </h2>
              </div>

              <div className={`rounded-2xl p-3 ${card.color}`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}