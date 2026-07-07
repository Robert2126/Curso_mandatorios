import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD ?? "change-me";
  const adminCedula = process.env.ADMIN_DEFAULT_CEDULA ?? "00000000";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const [studentRole, adminRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: "ESTUDIANTE" },
      update: {},
      create: {
        name: "ESTUDIANTE",
        description: "Usuario que estudia, practica, presenta simulacros y consulta progreso.",
      },
    }),
    prisma.role.upsert({
      where: { name: "ADMINISTRADOR" },
      update: {},
      create: {
        name: "ADMINISTRADOR",
        description: "Usuario autorizado para gestionar ciclos, cursos, temas, preguntas y simulacros.",
      },
    }),
  ]);

  const adminUser = await prisma.user.upsert({
    where: { cedula: adminCedula },
    update: {
      passwordHash,
      active: true,
    },
    create: {
      cedula: adminCedula,
      name: "Administrador Aula Mandatorios",
      passwordHash,
      active: true,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: studentRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: studentRole.id,
    },
  });

  const cycles = [
    { name: "Ciclo I", description: "Cursos mandatorios del primer ciclo.", order: 1 },
    { name: "Ciclo II", description: "Cursos mandatorios del segundo ciclo.", order: 2 },
    { name: "Ciclo III", description: "Cursos mandatorios del tercer ciclo.", order: 3 },
    { name: "Ciclo IV", description: "Cursos mandatorios del cuarto ciclo.", order: 4 },
  ];

  for (const cycle of cycles) {
    await prisma.cycle.upsert({
      where: { id: cycle.order },
      update: {
        name: cycle.name,
        description: cycle.description,
        order: cycle.order,
        active: true,
      },
      create: {
        id: cycle.order,
        name: cycle.name,
        description: cycle.description,
        order: cycle.order,
        active: true,
      },
    });
  }

  const cicloIv = await prisma.cycle.findFirstOrThrow({ where: { name: "Ciclo IV" } });

  const useOfForceCourse = await prisma.course.upsert({
    where: { id: 1 },
    update: {
      cycleId: cicloIv.id,
      name: "Uso de la Fuerza",
      description: "Curso orientado a principios, limites y criterios de actuacion relacionados con el uso de la fuerza.",
      estimatedDurationMin: 150,
      active: true,
    },
    create: {
      id: 1,
      cycleId: cicloIv.id,
      name: "Uso de la Fuerza",
      description: "Curso orientado a principios, limites y criterios de actuacion relacionados con el uso de la fuerza.",
      estimatedDurationMin: 150,
      order: 1,
      active: true,
    },
  });

  const topic = await prisma.topic.upsert({
    where: { id: 1 },
    update: {
      courseId: useOfForceCourse.id,
      title: "Principios de actuacion",
      objective: "Reconocer los principios que orientan una intervencion necesaria y proporcional.",
      summary: "Tema introductorio sobre criterios de legalidad, necesidad y proporcionalidad.",
      order: 1,
      active: true,
    },
    create: {
      id: 1,
      courseId: useOfForceCourse.id,
      title: "Principios de actuacion",
      objective: "Reconocer los principios que orientan una intervencion necesaria y proporcional.",
      summary: "Tema introductorio sobre criterios de legalidad, necesidad y proporcionalidad.",
      order: 1,
      active: true,
    },
  });

  const question = await prisma.question.upsert({
    where: { id: 1 },
    update: {
      courseId: useOfForceCourse.id,
      topicId: topic.id,
      statement: "Que principio exige adecuar la respuesta institucional al nivel de riesgo identificado?",
      difficulty: "MEDIA",
      generalFeedback: "La proporcionalidad exige correspondencia entre el riesgo identificado y la respuesta aplicada.",
      active: true,
    },
    create: {
      id: 1,
      courseId: useOfForceCourse.id,
      topicId: topic.id,
      statement: "Que principio exige adecuar la respuesta institucional al nivel de riesgo identificado?",
      difficulty: "MEDIA",
      generalFeedback: "La proporcionalidad exige correspondencia entre el riesgo identificado y la respuesta aplicada.",
      active: true,
    },
  });

  await prisma.answerOption.deleteMany({ where: { questionId: question.id } });
  await prisma.answerOption.createMany({
    data: [
      { questionId: question.id, text: "Proporcionalidad", isCorrect: true, order: 1, feedback: "Correcto. La respuesta debe guardar relacion con el riesgo." },
      { questionId: question.id, text: "Publicidad", isCorrect: false, order: 2, feedback: "Incorrecto. La publicidad no define la adecuacion al riesgo." },
      { questionId: question.id, text: "Jerarquia", isCorrect: false, order: 3, feedback: "Incorrecto. La jerarquia no corresponde al criterio central de proporcionalidad." },
      { questionId: question.id, text: "Celeridad", isCorrect: false, order: 4, feedback: "Incorrecto. La celeridad se relaciona con oportunidad, no con proporcionalidad." },
    ],
  });

  await prisma.mockExam.upsert({
    where: { id: 1 },
    update: {
      courseId: useOfForceCourse.id,
      name: "Simulacro Uso de la Fuerza",
      numberOfQuestions: 30,
      timeLimitMin: 45,
      approvalPercentage: 70,
      active: true,
    },
    create: {
      id: 1,
      courseId: useOfForceCourse.id,
      name: "Simulacro Uso de la Fuerza",
      description: "Simulacro personal con preguntas aleatorias y un solo intento.",
      numberOfQuestions: 30,
      timeLimitMin: 45,
      approvalPercentage: 70,
      active: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
