import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export default function BlogArticle({ title, date, author, content, eyebrow }) {
  return (
    <div className="min-h-screen tru-page-bg tru-page-text">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/55 transition-colors hover:text-white"
          >
            ← Voltar
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            Blog
          </span>
        </div>

        <article className="flex-1 rounded-[2rem] border border-white/10 bg-white/5 px-5 py-6 shadow-2xl backdrop-blur-md sm:px-8 sm:py-10">
          <header className="mb-10">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
              {eyebrow}
            </p>
            <h1 className="mb-4 text-3xl font-black uppercase italic tracking-tight sm:text-4xl">
              {title}
            </h1>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <p>Por <strong className="text-white/80">{author}</strong></p>
              <p>{new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </header>

          <div className="prose prose-invert max-w-none space-y-6 text-sm leading-7 text-white/75 sm:text-base">
            {content}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
