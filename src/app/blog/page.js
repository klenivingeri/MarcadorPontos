import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Blog | TruKando",
  description: "Guias, dicas e estratégias sobre Truco e como usar o TruKando.",
};

const articles = [
  {
    slug: "como-jogar-truco",
    title: "Como Jogar Truco",
    excerpt: "Aprenda as regras básicas e o fluxo do jogo de Truco.",
    date: "2026-04-10",
    eyebrow: "Regras",
  },
  {
    slug: "estrategias-truco",
    title: "Estratégias e Dicas para Vencer",
    excerpt: "Técnicas avançadas para melhorar seu desempenho em partidas de Truco.",
    date: "2026-04-12",
    eyebrow: "Estratégia",
  },
  {
    slug: "historia-truco",
    title: "A História do Truco",
    excerpt: "Conheça as origens e evolução do jogo mais popular da América do Sul.",
    date: "2026-04-14",
    eyebrow: "História",
  },
  {
    slug: "como-usar-trukando",
    title: "Como Usar o TruKando",
    excerpt: "Guia completo para aproveitar todas as funcionalidades do aplicativo.",
    date: "2026-04-15",
    eyebrow: "Tutorial",
  },
];

export default function BlogPage() {
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
            Blog
          </span>
        </div>

        <section className="mb-12 flex-1">
          <header className="mb-12 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
              Conhecimento
            </p>
            <h1 className="mb-4 text-3xl font-black uppercase italic tracking-tight sm:text-5xl">
              Blog TruKando
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Explore guias, estratégias e histórias sobre Truco. Aprenda dicas para
              melhorar seu jogo e domine o TruKando.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="mb-2 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white/70">
                  {article.eyebrow}
                </span>
                <h2 className="mb-3 text-lg font-black uppercase italic tracking-tight sm:text-xl">
                  {article.title}
                </h2>
                <p className="mb-4 text-sm text-white/60 leading-6">
                  {article.excerpt}
                </p>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.15em]">
                  {new Date(article.date).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
