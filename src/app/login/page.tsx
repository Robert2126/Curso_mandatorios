type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = params?.error;

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Aula Mandatorios</p>
          <h1 className="mt-3 text-2xl font-bold text-primary">Ingreso al sistema</h1>
          <p className="mt-2 text-sm text-slate-500">Herramienta personal de preparacion y autoevaluacion.</p>
        </div>

        {error ? (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            No fue posible iniciar sesion. Verifica la cedula y la contrasena.
          </div>
        ) : null}

        <form className="space-y-5" action="/api/auth/login" method="post">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="cedula">
              Cedula
            </label>
            <input
              id="cedula"
              name="cedula"
              type="text"
              required
              autoComplete="username"
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
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-secondary"
              placeholder="Contrasena"
            />
          </div>

          <button
            type="submit"
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
