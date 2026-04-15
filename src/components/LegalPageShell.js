import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export default function LegalPageShell({ eyebrow, title, intro, children }) {
  return (
    <div className="min-h-screen tru-page-bg tru-page-text">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/55 transition-colors hover:text-white"
          >
            Inicio
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            {eyebrow}
          </span>
        </div>

        <section className="flex-1 rounded-[2rem] border border-white/10 bg-white/5 px-5 py-6 shadow-2xl backdrop-blur-md sm:px-8 sm:py-10">
          <header className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
              {eyebrow}
            </p>
            <h1 className="text-3xl font-black uppercase italic tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              {intro}
            </p>
          </header>

          <div className="space-y-6 text-sm leading-7 text-white/75 sm:text-base">
            {children}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
