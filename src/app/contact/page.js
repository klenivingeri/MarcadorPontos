import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Contato | TruKando",
  description: "Canal de contato do TruKando.",
};

export default function ContactPage() {
  return (
    <LegalPageShell
      eyebrow="Contato"
      title="Fale com a equipe"
      intro="Se voce encontrou um problema, quer sugerir uma melhoria ou precisa tratar de anuncios, use este canal de contato."
    >
      <p>
        E-mail: <span className="font-black text-white">libertti@live.com</span>
      </p>
      <p>
        Para assuntos sobre privacidade, anuncios ou correcoes no site, inclua o
        maximo de detalhes possivel para acelerar a resposta.
      </p>
      <p>
        Se este endereco ainda nao existir no seu dominio final, troque por um e-mail
        real antes de publicar.
      </p>
    </LegalPageShell>
  );
}
