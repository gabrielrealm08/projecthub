"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardCards from "@/components/DashboardCards";
import Header from "@/components/Header";
import ProjectTable from "@/components/ProjectTable";
import { Project, ProjectStatus } from "@/types/project";
import Footer from "@/components/Footer";

type ProjectForm = {
  name: string;
  status: ProjectStatus;
  deadline: string;
  teamMember: string;
  budget: string;
};

const emptyForm: ProjectForm = {
  name: "",
  status: "active",
  deadline: "",
  teamMember: "",
  budget: "",
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  function showToast(message: string) {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  }

  async function fetchProjects() {
    const response = await fetch("/api/projects");
    const data = await response.json();

    const formattedProjects = data.map((project: any) => ({
      ...project,
      deadline: project.deadline.slice(0, 10),
    }));

    setProjects(formattedProjects);
  }

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = status === "all" || project.status === status;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }

      if (sortBy === "budget-high") {
        return b.budget - a.budget;
      }

      if (sortBy === "budget-low") {
        return a.budget - b.budget;
      }

      return b.id - a.id;
    });
  }, [projects, search, status, sortBy]);

  function openAddModal() {
    setEditingProject(null);
    setForm(emptyForm);
    setFormError("");
    setIsProjectModalOpen(true);
  }

  function openEditModal(project: Project) {
    setEditingProject(project);
    setForm({
      name: project.name,
      status: project.status,
      deadline: project.deadline,
      teamMember: project.teamMember,
      budget: String(project.budget),
    });
    setFormError("");
    setIsProjectModalOpen(true);
  }

  async function saveProject() {
    if (!form.name || !form.deadline || !form.teamMember || !form.budget) {
      setFormError("Please complete all fields before saving the project.");
      return;
    }

    const url = editingProject
      ? `/api/projects/${editingProject.id}`
      : "/api/projects";

    const method = editingProject ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setIsProjectModalOpen(false);
    setFormError("");
    showToast(
      editingProject
        ? "Project updated successfully."
        : "Project created successfully."
    );
    await fetchProjects();
  }

  async function confirmDeleteProject() {
    if (!projectToDelete) return;

    await fetch(`/api/projects/${projectToDelete.id}`, {
      method: "DELETE",
    });

    setProjectToDelete(null);
    showToast("Project deleted successfully.");
    await fetchProjects();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      {toastMessage && (
        <div className="fixed right-6 top-6 z-50 rounded-xl border border-green-200 bg-green-50 px-5 py-3 font-medium text-green-700 shadow-lg">
          {toastMessage}
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <Header onAddProject={openAddModal} />

        <DashboardCards projects={projects} />

        <section className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
              <p className="mt-1 text-sm text-slate-500">
                Search, filter, sort, add, edit and manage project records.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 outline-none focus:border-blue-600"
              />

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-600"
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="on hold">On hold</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-600"
              >
                <option value="newest">Newest first</option>
                <option value="name">Project name</option>
                <option value="deadline">Deadline</option>
                <option value="budget-high">Budget high to low</option>
                <option value="budget-low">Budget low to high</option>
              </select>
            </div>
          </div>

          <ProjectTable
            projects={filteredProjects}
            onEdit={openEditModal}
            onDelete={(id) => {
              const selectedProject = projects.find(
                (project) => project.id === id
              );

              if (selectedProject) {
                setProjectToDelete(selectedProject);
              }
            }}
          />
        </section>
      </div>

      {isProjectModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-2xl font-bold text-slate-900">
              {editingProject ? "Edit Project" : "Add Project"}
            </h2>

            <p className="mb-5 text-sm text-slate-500">
              Enter project details including status, deadline, team member and
              budget.
            </p>

            {formError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {formError}
              </div>
            )}

            <div className="space-y-4">
              <input
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Project name"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 outline-none focus:border-blue-600"
              />

              <select
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status: event.target.value as ProjectStatus,
                  })
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-600"
              >
                <option value="active">Active</option>
                <option value="on hold">On hold</option>
                <option value="completed">Completed</option>
              </select>

              <input
                type="date"
                value={form.deadline}
                onChange={(event) =>
                  setForm({ ...form, deadline: event.target.value })
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-600"
              />

              <input
                value={form.teamMember}
                onChange={(event) =>
                  setForm({ ...form, teamMember: event.target.value })
                }
                placeholder="Assigned team member"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 outline-none focus:border-blue-600"
              />

              <input
                type="number"
                value={form.budget}
                onChange={(event) =>
                  setForm({ ...form, budget: event.target.value })
                }
                placeholder="Budget"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 outline-none focus:border-blue-600"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="rounded-lg border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={saveProject}
                className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {projectToDelete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              Delete project?
            </h2>

            <p className="mt-3 text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                {projectToDelete.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setProjectToDelete(null)}
                className="rounded-lg border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteProject}
                className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}