import { prisma } from "@/lib/prisma";

export async function getAdminCycles() {
  return prisma.cycle.findMany({
    include: { _count: { select: { courses: true } } },
    orderBy: { order: "asc" },
  });
}

export async function getAdminCourses() {
  return prisma.course.findMany({
    include: {
      cycle: true,
      _count: { select: { topics: true, questions: true, mockExams: true } },
    },
    orderBy: { order: "asc" },
  });
}

export async function getAdminTopics() {
  return prisma.topic.findMany({
    include: {
      course: true,
      _count: { select: { resources: true, questions: true } },
    },
    orderBy: { order: "asc" },
  });
}

export async function getAdminQuestions() {
  return prisma.question.findMany({
    include: {
      course: true,
      topic: true,
      _count: { select: { options: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function getAdminMockExams() {
  return prisma.mockExam.findMany({
    include: {
      course: true,
      _count: { select: { attempts: true } },
    },
    orderBy: { id: "desc" },
  });
}

export async function getAdminFormOptions() {
  const cycles = await prisma.cycle.findMany({ where: { active: true }, orderBy: { order: "asc" } });
  const courses = await prisma.course.findMany({ where: { active: true }, orderBy: { order: "asc" } });
  const topics = await prisma.topic.findMany({ where: { active: true }, orderBy: { order: "asc" } });

  return { cycles, courses, topics };
}
