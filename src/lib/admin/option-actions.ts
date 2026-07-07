"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-session";
import { prisma } from "@/lib/prisma";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

export async function createAnswerOption(formData: FormData) {
  await requireAdminSession();

  const questionId = getNumber(formData, "questionId");
  const text = getString(formData, "text");
  const feedback = getString(formData, "feedback");
  const order = getNumber(formData, "order");
  const isCorrect = formData.get("isCorrect") === "on";

  if (!questionId || !text) {
    return;
  }

  if (isCorrect) {
    await prisma.answerOption.updateMany({
      where: { questionId, isCorrect: true },
      data: { isCorrect: false },
    });
  }

  await prisma.answerOption.create({
    data: {
      questionId,
      text,
      feedback: feedback || null,
      order,
      isCorrect,
    },
  });

  revalidatePath(`/admin/preguntas/${questionId}/opciones`);
  revalidatePath("/admin/preguntas");
}

export async function markAnswerOptionAsCorrect(formData: FormData) {
  await requireAdminSession();

  const questionId = getNumber(formData, "questionId");
  const optionId = getNumber(formData, "optionId");

  if (!questionId || !optionId) {
    return;
  }

  await prisma.answerOption.updateMany({
    where: { questionId },
    data: { isCorrect: false },
  });

  await prisma.answerOption.update({
    where: { id: optionId },
    data: { isCorrect: true },
  });

  revalidatePath(`/admin/preguntas/${questionId}/opciones`);
  revalidatePath("/admin/preguntas");
}
