import { prisma } from "@/lib/prisma";

export async function getDashboardData(userId: string) {
  const [coursesCount, topicsCount, mockExamsCount, completedTopics, latestProgress, latestAttempts] = await Promise.all([
    prisma.course.count({ where: { active: true } }),
    prisma.topic.count({ where: { active: true, course: { active: true } } }),
    prisma.mockExam.count({ where: { active: true, course: { active: true } } }),
    prisma.userProgress.count({ where: { userId, completed: true } }),
    prisma.userProgress.findMany({
      where: { userId },
      include: {
        course: true,
        topic: true,
      },
      orderBy: { lastAccessAt: "desc" },
      take: 5,
    }),
    prisma.mockExamAttempt.findMany({
      where: { userId },
      include: {
        mockExam: {
          include: {
            course: true,
          },
        },
      },
      orderBy: { startedAt: "desc" },
      take: 5,
    }),
  ]);

  const averageScore = latestAttempts.length
    ? latestAttempts.reduce((sum, attempt) => sum + Number(attempt.score100 ?? 0), 0) / latestAttempts.length
    : 0;

  return {
    coursesCount,
    topicsCount,
    mockExamsCount,
    completedTopics,
    averageScore,
    latestProgress,
    latestAttempts,
  };
}
