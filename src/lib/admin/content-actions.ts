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

export async function createCycle(formData: FormData) {
  await requireAdminSession();

  const name = getString(formData, "name");
  const description = getString(formData, "description");
  const order = getNumber(formData, "order");

  if (!name) {
    return;
  }

  await prisma.cycle.create({
    data: {
      name,
      description: description || null,
      order,
      active: true,
    },
  });

  revalidatePath("/admin/ciclos");
}

export async function createCourse(formData: FormData) {
  await requireAdminSession();

  const cycleId = getNumber(formData, "cycleId");
  const name = getString(formData, "name");
  const description = getString(formData, "description");
  const order = getNumber(formData, "order");

  if (!cycleId || !name) {
    return;
  }

  await prisma.course.create({
    data: {
      cycleId,
      name,
      description: description || null,
      order,
      active: true,
    },
  });

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos");
}

export async function createTopic(formData: FormData) {
  await requireAdminSession();

  const courseId = getNumber(formData, "courseId");
  const title = getString(formData, "title");
  const objective = getString(formData, "objective");
  const summary = getString(formData, "summary");
  const order = getNumber(formData, "order");

  if (!courseId || !title) {
    return;
  }

  await prisma.topic.create({
    data: {
      courseId,
      title,
      objective: objective || null,
      summary: summary || null,
      order,
      active: true,
    },
  });

  revalidatePath("/admin/temas");
  revalidatePath("/cursos");
}

export async function createQuestion(formData: FormData) {
  await requireAdminSession();

  const courseId = getNumber(formData, "courseId");
  const topicId = getNumber(formData, "topicId") || null;
  const statement = getString(formData, "statement");
  const generalFeedback = getString(formData, "generalFeedback");

  if (!courseId || !statement) {
    return;
  }

  await prisma.question.create({
    data: {
      courseId,
      topicId,
      statement,
      generalFeedback: generalFeedback || null,
      active: true,
    },
  });

  revalidatePath("/admin/preguntas");
}

export async function createMockExam(formData: FormData) {
  await requireAdminSession();

  const courseId = getNumber(formData, "courseId");
  const name = getString(formData, "name");
  const description = getString(formData, "description");
  const numberOfQuestions = getNumber(formData, "numberOfQuestions");
  const timeLimitMin = getNumber(formData, "timeLimitMin");

  if (!courseId || !name || !numberOfQuestions || !timeLimitMin) {
    return;
  }

  await prisma.mockExam.create({
    data: {
      courseId,
      name,
      description: description || null,
      numberOfQuestions,
      timeLimitMin,
      approvalPercentage: 70,
      active: true,
    },
  });

  revalidatePath("/admin/simulacros");
}
