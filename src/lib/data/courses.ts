import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function getCoursesForUser(userId: string) {
  const courses = await prisma.course.findMany({
    where: { active: true },
    include: {
      cycle: true,
      topics: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
      mockExams: {
        where: { active: true },
      },
      progress: {
        where: { userId },
      },
    },
    orderBy: [{ cycle: { order: "asc" } }, { order: "asc" }],
  });

  return courses.map((course) => {
    const completedTopics = course.progress.filter((item) => item.completed && item.topicId).length;
    const totalTopics = course.topics.length;
    const progressPercentage = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;

    return {
      ...course,
      totalTopics,
      completedTopics,
      progressPercentage,
      mockExamsCount: course.mockExams.length,
    };
  });
}

export async function getCourseDetailForUser(courseId: number, userId: string) {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      active: true,
    },
    include: {
      cycle: true,
      topics: {
        where: { active: true },
        include: {
          resources: {
            where: { active: true },
            orderBy: { order: "asc" },
          },
          progress: {
            where: { userId },
          },
        },
        orderBy: { order: "asc" },
      },
      resources: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
      mockExams: {
        where: { active: true },
        orderBy: { id: "asc" },
      },
      progress: {
        where: { userId },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const completedTopics = course.topics.filter((topic) => topic.progress.some((item) => item.completed)).length;
  const totalTopics = course.topics.length;
  const progressPercentage = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return {
    ...course,
    completedTopics,
    totalTopics,
    progressPercentage,
  };
}
