import Image from "next/image";
import { getSession } from "@/lib/auth";

const authErrors: Record<string, string> = {
  google_denied: "O acesso com Google foi cancelado.",
  invalid_state: "A sessão de autenticação expirou. Tenta novamente.",
  token_exchange_failed: "Não foi possível concluir a autenticação com Google.",
  profile_failed: "Não foi possível obter o perfil Google.",
  auth_config_missing:
    "A autenticação Google ainda não está configurada neste ambiente.",
};

type HomeProps = {
  searchParams: Promise<{
    auth_error?: string;
  }>;
};

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      viewBox="0 0 24 24"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.78-.07-1.53-.2-2.23H12v4.22h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.52Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.24-2.51c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.88A6 6 0 0 1 6.1 12c0-.65.11-1.28.31-1.88V7.53H3.07A10 10 0 0 0 2 12c0 1.61.39 3.14 1.07 4.47l3.34-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.99c1.47 0 2.78.5 3.82 1.5l2.87-2.87C16.95 3 14.7 2 12 2a10 10 0 0 0-8.93 5.53l3.34 2.59C7.2 7.75 9.4 5.99 12 5.99Z"
      />
    </svg>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const [session, resolvedSearchParams] = await Promise.all([
    getSession(),
    searchParams,
  ]);
  const authError = resolvedSearchParams.auth_error
    ? authErrors[resolvedSearchParams.auth_error]
    : null;

  return (
    <div className="min-h-screen bg-[#f7f2ea] text-[#17332f]">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-lg bg-[#1f6f63] text-sm font-bold text-[#f7f2ea]">
            PP
          </div>
          <span className="text-lg font-semibold">Pladur Pro</span>
        </div>
        {session ? (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-center gap-3">
              {session.user.picture ? (
                <Image
                  src={session.user.picture}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-full"
                />
              ) : (
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dce8e3] text-sm font-semibold">
                  {session.user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {session.user.name}
                </p>
                <p className="truncate text-xs text-[#60736f]">
                  {session.user.email}
                </p>
              </div>
            </div>
            <form action="/api/auth/logout" method="post">
              <button className="h-11 w-full rounded-md border border-[#cfc4b2] px-4 text-sm font-semibold transition hover:bg-white sm:w-auto">
                Sair
              </button>
            </form>
          </div>
        ) : (
          <a
            href="/api/auth/google"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#1f6f63] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18594f] sm:w-auto"
          >
            <GoogleIcon />
            Entrar com Google
          </a>
        )}
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-5 pb-10 pt-6 sm:px-8 lg:grid-cols-[1fr_380px] lg:pt-16">
        <section className="flex flex-col justify-center">
          {authError ? (
            <p className="mb-4 rounded-md border border-[#e7b5a0] bg-[#fff1eb] px-4 py-3 text-sm font-semibold text-[#994421]">
              {authError}
            </p>
          ) : null}
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#9a6a12]">
            Orçamentos de pladur
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            {session
              ? `Olá, ${session.user.name}. Vamos continuar o teu trabalho.`
              : "Clientes, obras, medições e orçamentos guardados na tua conta."}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#49645f]">
            {session
              ? "A tua sessão Google está ativa. A próxima etapa é ligar clientes, obras e orçamentos a esta conta."
              : "A primeira versão será simples: entra com Google, cria os dados da obra e volta mais tarde sem perder informação."}
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
              ["Sessão", session ? "Ativa" : "Off"],
              ["Clientes", "0"],
              ["Obras abertas", "0"],
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
