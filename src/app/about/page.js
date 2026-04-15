import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Sobre | TruKando",
  description: "Saiba o que e o TruKando e como ele funciona.",
};

export default function AboutPage() {
  return (
    <LegalPageShell
      eyebrow="Institucional"
      title="Sobre o TruKando"
      intro="TruKando e um marcador de pontos para partidas de truco e outros jogos em equipe, com foco em velocidade, visual forte e controle de historico."
    >
      <p>
        O objetivo do projeto e facilitar a contagem de pontos, o fechamento de sets
        e o acompanhamento de vitorias sem depender de papel, planilha ou calculadora.
      </p>
      <p>
        A experiencia foi desenhada para celular, com telas de jogo em modo
        imersivo, historico local e ajustes visuais para diferentes orientacoes da
        tela.
      </p>
      <p>
        Se voce usa o site no navegador, seus dados principais ficam armazenados no
        proprio dispositivo.
      </p>
    </LegalPageShell>
  );
}
