export type ProjectStatus = "active" | "on hold" | "completed";

export type Project = {
  id: number;
  name: string;
  status: ProjectStatus;
  deadline: string;
  teamMember: string;
  budget: number;
};