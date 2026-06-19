export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f2ea] text-[#17332f]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-lg bg-[#1f6f63] text-sm font-bold text-[#f7f2ea]">
            PP
          </div>
          <span className="text-lg font-semibold">Pladur Pro</span>
        </div>
        <button className="h-11 rounded-md bg-[#1f6f63] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18594f]">
          Entrar com Google
        </button>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-5 pb-10 pt-6 sm:px-8 lg:grid-cols-[1fr_380px] lg:pt-16">
        <section className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#9a6a12]">
            Orçamentos de pladur
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Clientes, obras, medições e orçamentos guardados na tua conta.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#49645f]">
            A primeira versão será simples: entra com Google, cria os dados da
            obra e volta mais tarde sem perder informação.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Clientes", "Obras", "PDF"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[#ded4c2] bg-white/70 px-4 py-3 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-lg border border-[#ded4c2] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold">Resumo</h2>
            <span className="rounded-md bg-[#f4b942]/25 px-2 py-1 text-xs font-semibold text-[#7a520b]">
              MVP
            </span>
          </div>
          <div className="space-y-4">
            {[
              ["Clientes", "0"],
              ["Obras abertas", "0"],
              ["Orçamentos", "0"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-[#eee5d7] pb-3 last:border-0 last:pb-0"
              >
                <span className="text-sm text-[#60736f]">{label}</span>
                <span className="text-xl font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
