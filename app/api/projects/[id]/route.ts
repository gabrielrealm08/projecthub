import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  const body = await request.json();

  const project = await prisma.project.update({
    where: {
      id: Number(id),
    },
    data: {
      name: body.name,
      status: body.status,
      deadline: new Date(body.deadline),
      teamMember: body.teamMember,
      budget: Number(body.budget),
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  _request: Request,
  { params }: Props
) {
  const { id } = await params;

  await prisma.project.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Project deleted successfully",
  });
}