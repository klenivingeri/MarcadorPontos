import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Privacidade | TruKando",
  description: "Politica de privacidade do TruKando.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacidade"
      title="Politica de Privacidade"
      intro="Esta pagina explica quais dados o TruKando pode guardar e como eles sao usados dentro do proprio navegador."
    >
      <p>
        O app pode salvar informacoes como nome dos times, placares, historico de
        partidas, preferencias de tema e estado de consentimento usando o armazenamento
        local do navegador.
      </p>
      <p>
        Quando os anuncios estiverem ativos, provedores de publicidade podem usar
        cookies, identificadores ou tecnologias semelhantes para exibir anuncios,
        medir performance e limitar repeticao.
      </p>
      <p>
        Nao vendemos dados pessoais diretamente. O usuario pode limpar o historico e
        as preferencias locais a qualquer momento apagando os dados do navegador.
      </p>
      <p>
        Se voce quiser uma versao juridicamente revisada, vale adaptar este texto ao
        dominio final e ao modelo real de monetizacao.
      </p>
    </LegalPageShell>
  );
}
