"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-session";
import { prisma } from "@/lib/prisma";

type CsvRow = Record<string, string>;

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsv(text: string) {
  const lines = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce<CsvRow>((row, header, index) => {
      row[header] = values[index] ?? "";
      return row;
    }, {});
  });
}

function getCorrectIndex(value: string) {
  const normalized = value.trim().toUpperCase();
  const letters = ["A", "B", "C", "D"];
  const letterIndex = letters.indexOf(normalized);

  if (letterIndex >= 0) {
    return letterIndex;
  }

  const numericIndex = Number(normalized) - 1;
  return Number.isInteger(numericIndex) && numericIndex >= 0 && numericIndex <= 3 ? numericIndex : -1;
}

export async function importQuestionsFromCsv(formData: FormData) {
  await requireAdminSession();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return { imported: 0 };
  }

  const text = await file.text();
  const rows = parseCsv(text);
  let imported = 0;

  for (const row of rows) {
    const courseId = Number(row.courseId);
    const topicId = row.topicId ? Number(row.topicId) : null;
    const statement = row.statement?.trim();
    const correctIndex = getCorrectIndex(row.correctOption ?? "");

    if (!courseId || !statement || correctIndex < 0) {
      continue;
    }

    const options = [
      { text: row.optionA, feedback: row.feedbackA },
      { text: row.optionB, feedback: row.feedbackB },
      { text: row.optionC, feedback: row.feedbackC },
      { text: row.optionD, feedback: row.feedbackD },
    ].filter((option) => option.text?.trim());

    if (options.length < 2 || !options[correctIndex]) {
      continue;
    }

    await prisma.question.create({
      data: {
        courseId,
        topicId,
        statement,
        generalFeedback: row.generalFeedback || null,
        active: true,
        options: {
          create: options.map((option, index) => ({
            text: option.text.trim(),
            feedback: option.feedback?.trim() || null,
            order: index + 1,
            isCorrect: index === correctIndex,
          })),
        },
      },
    });

    imported += 1;
  }

  revalidatePath("/admin/importar");
  revalidatePath("/admin/preguntas");

  return { imported };
}
