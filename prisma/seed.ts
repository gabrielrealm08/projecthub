import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        name: "Website Redesign",
        status: "active",
        deadline: new Date("2026-08-12"),
        teamMember: "Sarah Johnson",
        budget: 4500,
      },
      {
        name: "Mobile App Launch",
        status: "on hold",
        deadline: new Date("2026-09-01"),
        teamMember: "David Smith",
        budget: 9000,
      },
      {
        name: "CRM Setup",
        status: "completed",
        deadline: new Date("2026-07-20"),
        teamMember: "Grace Lee",
        budget: 6200,
      },
      {
        name: "Client Billing Portal",
        status: "active",
        deadline: new Date("2026-10-05"),
        teamMember: "Michael Brown",
        budget: 7300,
      },
    ],
  });

  console.log("Database seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });