import { Project } from "@/types/project";

type Props = {
  projects: Project[];
};

export default function StatsCards({ projects }: Props) {
  const total = projects.length;
  const active = projects.filter((p) => p.status === "active").length;
  const hold = projects.filter((p) => p.status === "on hold").length;
  const completed = projects.filter(
    (p) => p.status === "completed"
  ).length;

  const cards = [
    { title: "Total Projects", value: total },
    { title: "Active", value: active },
    { title: "On Hold", value: hold },
    { title: "Completed", value: completed },
  ];

  return (
    <section className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1"
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {card.value}
          </h2>
        </div>
      ))}
    </section>
  );
}