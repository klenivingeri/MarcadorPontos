import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Sobre | TruKando",
  description: "Sobre o TruKando - Conheça a história, missão e funcionalidades do aplicativo.",
};

export default function AboutPage() {
  return (
    <LegalPageShell
      eyebrow="Institucional"
      title="Sobre o TruKando"
      intro="TruKando é um marcador de pontos reativo para partidas de Truco, desenvolvido com foco em velocidade, experiência visual imersiva e controle de histórico offline."
    >
      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          Missão
        </h2>
        <p className="mb-4">
          Democratizar o acesso a ferramentas de controle de partidas, eliminando a necessidade
          de papel, calculadora ou apps pesados. TruKando é rápido, leve e funciona offline.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          O Problema
        </h2>
        <p className="mb-4">
          Quando você joga Truco com amigos, a experiência é frequentemente interrompida por:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Perda de pontuação anotada em papéis</li>
          <li>Discussões sobre o placar correto</li>
          <li>Falta de histórico de partidas jogadas</li>
          <li>Impossibilidade de rastrear progresso ou performance</li>
          <li>Dependência de telas pequenas ou listas</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          A Solução
        </h2>
        <p className="mb-4">
          TruKando foi criado para resolver esses problemas com uma abordagem simples:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li><strong>Velocidade:</strong> Interface otimizada para ações rápidas</li>
          <li><strong>Visual Imersivo:</strong> Tela cheia, sem distrações, foco no jogo</li>
          <li><strong>Histórico Completo:</strong> Todas as suas partidas salvas e consultáveis</li>
          <li><strong>Offline-First:</strong> Funciona sem internet, dados salvos localmente</li>
          <li><strong>Personalização:</strong> Temas, wallpapers, vibrações e mais</li>
          <li><strong>Sistema de XP:</strong> Acompanhe seu progresso e nível</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          Funcionalidades Principais
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Arena de Jogo:</strong> Interface reativa com controles grandes e responsivos
          </li>
          <li>
            <strong>Gestão de Sets:</strong> Suporte para partidas de 1, 3, 5 ou 7 sets
          </li>
          <li>
            <strong>Evento Especial (Pato):</strong> Animações visuais quando há grande diferença de pontos
          </li>
          <li>
            <strong>Histórico de Partidas:</strong> Acesso completo a todas as partidas jogadas com estatísticas
          </li>
          <li>
            <strong>Configurações Avançadas:</strong> Personalize temas, wallpapers e comportamento
          </li>
          <li>
            <strong>Sistema de XP:</strong> Ganhe pontos de experiência e suba de nível
          </li>
          <li>
            <strong>Dark Mode:</strong> Suporte completo para tema claro e escuro
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          Tecnologia
        </h2>
        <p className="mb-4">
          TruKando foi desenvolvido com tecnologias modernas:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li><strong>Next.js:</strong> Framework React otimizado para performance</li>
          <li><strong>Tailwind CSS:</strong> Estilização rápida e responsiva</li>
          <li><strong>Context API:</strong> Gerenciamento de estado centralizado</li>
          <li><strong>localStorage:</strong> Persistência de dados offline</li>
          <li><strong>PWA:</strong> Instalável como app nativo</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          Design Philosophy
        </h2>
        <p className="mb-4">
          Nosso design segue princípios de simplicidade e foco:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Sem Distrações:</strong> Interface limpa focada apenas no que importa
          </li>
          <li>
            <strong>Mobile-First:</strong> Otimizado para smartphones, responsivo em qualquer dispositivo
          </li>
          <li>
            <strong>Glassmorphism:</strong> Efeitos visuais modernos que mantêm foco no conteúdo
          </li>
          <li>
            <strong>Animações Suaves:</strong> Transições que não atrapalham a experiência
          </li>
          <li>
            <strong>Acessibilidade:</strong> Suporte a diferentes temas e modos de alto contraste
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          Desenvolvedor
        </h2>
        <p className="mb-4">
          TruKando é desenvolvido e mantido por <strong>47Dev</strong>, um time dedicado a criar
          ferramentas que melhoram a experiência de jogos sociais e entretenimento.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          Privacidade e Dados
        </h2>
        <p className="mb-4">
          Sua privacidade é importante para nós. Todos os seus dados são:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Armazenados <strong>apenas localmente</strong> no seu dispositivo</li>
          <li>Nunca enviados para servidores externos (exceto para anúncios)</li>
          <li>Completamente sob seu controle</li>
          <li>Protegidos por políticas de privacidade robustas</li>
        </ul>
        <p className="mt-4">
          Leia nossa <a href="/privacy" className="font-bold underline hover:text-white">Política de Privacidade</a> para
          detalhes completos.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          Suporte e Contato
        </h2>
        <p className="mb-4">
          Tem dúvidas, sugestões ou encontrou um bug? Entre em contato através da página de{" "}
          <a
            href="/contact"
            className="font-bold underline hover:text-white"
          >
            contato
          </a>
          . Suas contribuições nos ajudam a melhorar!
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          Blog
        </h2>
        <p className="mb-4">
          Visite nosso <a href="/blog" className="font-bold underline hover:text-white">blog</a> para
          guias, dicas sobre Truco, histórias do jogo e tutoriais de como usar o TruKando.
        </p>
      </section>

      <section className="mt-8 border-t border-white/20 pt-6">
        <p className="text-[12px] text-white/50">
          <strong>Desenvolvido por:</strong> 47Dev<br />
          <strong>Lançamento:</strong> 2026<br />
          <strong>Status:</strong> Em Desenvolvimento Ativo<br />
          <strong>Licença:</strong> Proprietária
        </p>
      </section>
    </LegalPageShell>
  );
}
