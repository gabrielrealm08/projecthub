import { FolderKanban } from "lucide-react";

type HeaderProps = {
  onAddProject: () => void;
};

export default function Header({ onAddProject }: HeaderProps) {
  return (
    <header className="mb-8 rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-600 p-3">
              <FolderKanban size={28} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
                Project Management Platform
              </p>

              <h1 className="text-4xl font-bold">ProjectHub</h1>
            </div>
          </div>

          <p className="mt-4 max-w-xl text-slate-300">
            Manage projects, deadlines, budgets and team members from one
            dashboard.
          </p>
        </div>

        <button
          onClick={onAddProject}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95"
        >
          + Add Project
        </button>
      </div>
    </header>
  );
}