export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Aula Mandatorios</p>
          <h1 className="mt-3 text-2xl font-bold text-primary">Ingreso al sistema</h1>
          <p className="mt-2 text-sm text-slate-500">Herramienta personal de preparacion y autoevaluacion.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="cedula">
              Cedula
            </label>
            <input
              id="cedula"
              name="cedula"
              type="text"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-secondary"
              placeholder="Numero de cedula"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Contrasena
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-secondary"
              placeholder="Contrasena"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:bg-secondary"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Esta plataforma no reemplaza evaluaciones institucionales oficiales.
        </p>
      </section>
    </main>
  );
}
