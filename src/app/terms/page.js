import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Termos | TruKando",
  description: "Termos de uso do TruKando.",
};

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Termos"
      title="Termos de Uso"
      intro="Ao usar o TruKando, voce concorda com as regras basicas de uso desta aplicacao."
    >
      <p>
        O site e fornecido no estado atual, sem garantia de disponibilidade continua,
        ausencia de erros ou compatibilidade com todos os dispositivos.
      </p>
      <p>
        O usuario e responsavel por conferir os nomes dos times, o placar e o
        historico antes de considerar uma partida encerrada.
      </p>
      <p>
        E proibido tentar manipular o sistema, explorar falhas ou interferir no
        funcionamento da aplicacao de forma indevida.
      </p>
      <p>
        O uso continuado do site indica aceite destes termos e das politicas
        associadas, incluindo a politica de privacidade e o aviso de cookies.
      </p>
    </LegalPageShell>
  );
}
