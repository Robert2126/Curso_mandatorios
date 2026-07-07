import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { createAnswerOption, markAnswerOptionAsCorrect } from "@/lib/admin/option-actions";
import { getQuestionWithOptions } from "@/lib/admin/option-queries";
import { requireAdminSession } from "@/lib/auth/require-session";

type PageProps = {
  params: Promise<{ questionId: string }>;
};

export default async function QuestionOptionsPage({ params }: PageProps) {
  await requireAdminSession();
  const resolvedParams = await params;
  const questionId = Number(resolvedParams.questionId);
  const question = await getQuestionWithOptions(questionId);

  return (
    <AppShell>
      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Banco de preguntas</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Opciones de respuesta</h1>
          <p className="mt-3 max-w-3xl text-slate-500">{question.statement}</p>
          <p className="mt-2 text-sm text-slate-500">Curso: {question.course.name} | Tema: {question.topic?.title ?? "Sin tema"}</p>
        </div>

        <form action={createAnswerOption} className="grid gap-4 rounded-card border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <input type="hidden" name="questionId" value={question.id} />
          <AdminFormField label="Texto de la opcion" name="text" required placeholder="Escriba la opcion de respuesta" />
          <AdminFormField label="Orden" name="order" type="number" defaultValue={question.options.length + 1} />
          <AdminFormField label="Retroalimentacion" name="feedback" placeholder="Explique por que esta opcion es correcta o incorrecta" />
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
            <input type="checkbox" name="isCorrect" />
            Marcar como respuesta correcta
          </label>
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-secondary" type="submit">
            Crear opcion
          </button>
        </form>

        <div className="space-y-3">
          {question.options.map((option) => (
            <article key={option.id} className="rounded-card border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary">Opcion {option.order}</p>
                  <p className="mt-1 text-sm text-slate-700">{option.text}</p>
                  <p className="mt-2 text-xs text-slate-500">{option.feedback ?? "Sin retroalimentacion"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={option.isCorrect ? "rounded-full bg-softGreen px-3 py-1 text-xs font-semibold text-primary" : "rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500"}>
                    {option.isCorrect ? "Correcta" : "Incorrecta"}
                  </span>
                  {!option.isCorrect ? (
                    <form action={markAnswerOptionAsCorrect}>
                      <input type="hidden" name="questionId" value={question.id} />
                      <input type="hidden" name="optionId" value={option.id} />
                      <button className="rounded-xl border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-softGreen" type="submit">
                        Marcar correcta
                      </button>
                    </form>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link href="/admin/preguntas" className="inline-flex rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-softGreen">
          Volver a preguntas
        </Link>
      </section>
    </AppShell>
  );
}
