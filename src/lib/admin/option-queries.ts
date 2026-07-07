import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function getQuestionWithOptions(questionId: number) {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: {
      course: true,
      topic: true,
      options: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!question) {
    notFound();
  }

  return question;
}
