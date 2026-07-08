import { Project } from "@/types/project";

type Props = {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
};

export default function ProjectTable({ projects, onEdit, onDelete }: Props) {
  function getStatusClasses(status: string) {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "on hold":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  function getProgress(status: string) {
    switch (status.toLowerCase()) {
      case "completed":
        return 100;
      case "active":
        return 65;
      case "on hold":
        return 35;
      default:
        return 0;
    }
  }

  function getProgressColor(status: string) {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-600";
      case "active":
        return "bg-blue-600";
      case "on hold":
        return "bg-yellow-500";
      default:
        return "bg-slate-500";
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-slate-50 text-sm font-semibold text-slate-600">
            <th className="p-4">Project</th>
            <th className="p-4">Status</th>
            <th className="p-4">Progress</th>
            <th className="p-4">Deadline</th>
            <th className="p-4">Team Member</th>
            <th className="p-4">Budget</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => {
            const progress = getProgress(project.status);

            return (
              <tr
                key={project.id}
                className="border-t transition duration-200 hover:bg-slate-50"
              >
                <td className="p-4 font-semibold text-slate-900">
                  {project.name}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </td>

                <td className="w-56 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full transition-all ${getProgressColor(
                          project.status
                        )}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <span className="text-sm font-medium text-slate-600">
                      {progress}%
                    </span>
                  </div>
                </td>

                <td className="p-4 text-slate-600">{project.deadline}</td>
                <td className="p-4 text-slate-600">{project.teamMember}</td>

                <td className="p-4 font-semibold text-slate-800">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(project.budget)}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(project)}
                      className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition-all duration-200 hover:scale-105 hover:bg-blue-200 active:scale-95"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => onDelete(project.id)}
                      className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition-all duration-200 hover:scale-105 hover:bg-red-200 active:scale-95"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {projects.length === 0 && (
            <tr>
              <td colSpan={7} className="py-16 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-6xl">🔍</div>

                  <h3 className="mt-4 text-xl font-bold text-slate-800">
                    No projects found
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Try another search, change the filter, or add a new project.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}