import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "Sobre" },
    { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacidade" },
  { href: "/terms", label: "Termos" },
  { href: "/contact", label: "Contato" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/35 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/45">
          TruKando © 2026
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-[0.28em] text-white/55">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
