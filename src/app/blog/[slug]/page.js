import BlogArticle from "@/components/BlogArticle";

const articles = {
  "como-jogar-truco": {
    title: "Como Jogar Truco",
    date: "2026-04-10",
    author: "47Dev",
    eyebrow: "Regras Básicas",
    content: (
      <>
        <p>
          O Truco é um jogo de cartas rápido e emocionante, popular na América do
          Sul. Neste guia, explicaremos as regras básicas para você começar a jogar.
        </p>

        <h2 className="mt-8 text-2xl font-bold">O Objetivo</h2>
        <p>
          O objetivo é ser o primeiro a acumular pontos suficientes para vencer a
          partida. O jogo é jogado em sets, e a equipe que vencer a maioria dos sets
          vence a partida.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Componentes</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>Um baralho de 40 cartas (sem 8, 9 e 10)</li>
          <li>2 a 4 jogadores (2v2 é o padrão)</li>
          <li>Sistema de pontuação simples</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Valores das Cartas</h2>
        <p className="mt-4">As cartas têm os seguintes valores em ordem crescente:</p>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li><strong>4, 5, 6, 7:</strong> Valores nominais</li>
          <li><strong>Q (Dama):</strong> 10 pontos</li>
          <li><strong>J (Valete):</strong> 11 pontos</li>
          <li><strong>K (Rei):</strong> 12 pontos</li>
          <li><strong>A (Ás):</strong> 13 pontos</li>
          <li><strong>2:</strong> 1 ponto</li>
          <li><strong>3:</strong> 2 pontos</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Dinâmica de Jogo</h2>
        <p>
          Cada jogador recebe 3 cartas. O primeiro a colocar uma carta começa a
          rodada. Os jogadores devem seguir o naipe ou jogar um coringa. Quem tiver
          a carta mais alta vence a rodada e seus pontos são adicionados ao placar da
          equipe.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Rounds (Manilhas)</h2>
        <p>
          Cada rodada é chamada de "mão" ou "round". O vencedor da mão coloca a próxima
          carta. O jogo continua até que uma equipe atinja o número de pontos necessários
          para vencer o set.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Dicas para Começar</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>Comunicação com seu companheiro é essencial</li>
          <li>Guarde as cartas altas para momentos críticos</li>
          <li>Observe o padrão de jogo dos adversários</li>
          <li>Mantenha a calma e divirta-se</li>
        </ul>

        <p className="mt-8">
          Agora que você conhece os básicos, é hora de colocar suas cartas na mesa!
          Use o TruKando para rastrear seu progresso e dominar cada partida.
        </p>
      </>
    ),
  },
  "estrategias-truco": {
    title: "Estratégias e Dicas para Vencer",
    date: "2026-04-12",
    author: "47Dev",
    eyebrow: "Estratégia Avançada",
    content: (
      <>
        <p>
          Agora que você domina as regras básicas do Truco, é hora de elevar seu jogo
          a outro nível. Confira estas estratégias avançadas para conquistar mais
          vitórias.
        </p>

        <h2 className="mt-8 text-2xl font-bold">1. Comunicação Silenciosa</h2>
        <p>
          Seus olhos são seus melhores aliados. Desenvolva um sistema de sinais com
          seu parceiro para comunicar a força de sua mão sem levantar suspeitas dos
          adversários.
        </p>

        <h2 className="mt-8 text-2xl font-bold">2. Leitura de Padrões</h2>
        <p>
          Observe como seus adversários jogam. Alguns defendem cartas altas, outros
          descartam estrategicamente. Reconhecer padrões é fundamental para antecipar
          seus movimentos.
        </p>

        <h2 className="mt-8 text-2xl font-bold">3. Gestão de Risco</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>Não aposte tudo em uma única rodada</li>
          <li>Equilibre ofensa e defesa</li>
          <li>Saiba quando recuar estrategicamente</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">4. Economia de Cartas Altas</h2>
        <p>
          Mantenha suas cartas mais fortes para momentos críticos. Não desperdice um
          Ás quando um 6 resolveria a situação.
        </p>

        <h2 className="mt-8 text-2xl font-bold">5. Pressão Psicológica</h2>
        <p>
          O Truco é tanto um jogo de cartas quanto um jogo de mente. Use sua postura,
          expressões e padrões de jogo para criar dúvida nos adversários.
        </p>

        <h2 className="mt-8 text-2xl font-bold">6. Estude Seus Adversários</h2>
        <p>
          Cada jogador tem um estilo. Alguns são agressivos, outros defensivos. Adapte
          sua estratégia conforme você aprende seus padrões.
        </p>

        <h2 className="mt-8 text-2xl font-bold">7. Mantenha Registros</h2>
        <p>
          Use o TruKando para rastrear seus resultados. Identificar tendências em suas
          vitórias e derrotas ajuda a refinar sua estratégia ao longo do tempo.
        </p>

        <p className="mt-8">
          Lembre-se: O Truco é um jogo dinâmico onde improviso e adaptação são tão
          importantes quanto a estratégia. Pratique, observe e evolua constantemente!
        </p>
      </>
    ),
  },
  "historia-truco": {
    title: "A História do Truco",
    date: "2026-04-14",
    author: "47Dev",
    eyebrow: "História e Cultura",
    content: (
      <>
        <p>
          O Truco é mais do que um jogo — é parte da cultura e tradição de vários
          países. Conheça a história por trás dessa diversão que une pessoas há
          séculos.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Origem Misteriosa</h2>
        <p>
          Embora não haja documentação exata, acredita-se que o Truco tenha origem
          nas cartas dos mouros que chegaram à Península Ibérica. As primeiras
          evidências de um jogo semelhante aparecem na Espanha medieval.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Evolução Europeia</h2>
        <p>
          Entre os séculos XVI e XVII, o Truco evoluiu na Espanha. O jogo se tornou
          popular entre a nobreza e entre o povo, com variações regionais que
          persistem até hoje.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Chegada à América Latina</h2>
        <p>
          Através dos colonizadores espanhóis, o Truco chegou à América Latina. Na
          Argentina, Brasil e Uruguai, o jogo se enraizou profundamente na cultura,
          com variações locais que refletem a identidade de cada país.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Truco no Brasil</h2>
        <p>
          No Brasil, o Truco é particularmente popular no interior, especialmente em
          São Paulo e Minas Gerais. É jogado em confraternizações, festas juninas e
          entre amigos. O jogo é sinônimo de diversão, camaradagem e noites
          memoráveis.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Tradição Viva</h2>
        <p>
          Hoje, o Truco continua sendo um símbolo de conexão social. Famílias,
          amigos e comunidades se reúnem para jogar. A digitalização do jogo através
          de aplicativos como o TruKando mantém essa tradição viva na era moderna.
        </p>

        <h2 className="mt-8 text-2xl font-bold">O Futuro do Truco</h2>
        <p>
          A tradição do Truco não desaparece — ela evolui. Plataformas digitais,
          competições online e ferramentas como o TruKando garantem que novas gerações
          descubram a emoção e a alegria deste jogo clássico.
        </p>

        <p className="mt-8">
          Cada partida que você joga é um link com essa história rica. Você não está
          apenas jogando Truco — você está participando de uma tradição que une
          continentes e gerações.
        </p>
      </>
    ),
  },
  "como-usar-trukando": {
    title: "Como Usar o TruKando",
    date: "2026-04-15",
    author: "47Dev",
    eyebrow: "Tutorial",
    content: (
      <>
        <p>
          O TruKando é projetado para ser intuitivo e rápido. Este guia quer dizer
          como aproveitar ao máximo todas as suas funcionalidades.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Começando</h2>
        <p>
          1. Abra o TruKando no seu navegador ou dispositivo móvel<br/>
          2. Na tela inicial, clique em "Iniciar Partida"<br/>
          3. Configure os nomes das duas equipes<br/>
          4. Escolha quantos sets deseja jogar (1, 3, 5 ou 7)<br/>
          5. Comece a jogar!
        </p>

        <h2 className="mt-8 text-2xl font-bold">Durante o Jogo</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li><strong>Adicionar Pontos:</strong> Toque nos botões laterais para aumentar o placar</li>
          <li><strong>Remover Pontos:</strong> Use o botão "-" para corrigir erros</li>
          <li><strong>Sets:</strong> O aplicativo rastreia automaticamente os sets vencidos</li>
          <li><strong>Tempo Real:</strong> Veja quanto tempo a partida já durou</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Configurações</h2>
        <p>
          Personalizar sua experiência:
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li><strong>Tema:</strong> Escolha entre temas claros e escuros</li>
          <li><strong>Wallpaper:</strong> Adicione uma imagem de fundo personalizada (URL)</li>
          <li><strong>Vibração:</strong> Ative ou desative feedback háptico nos botões</li>
          <li><strong>Posição dos Botões:</strong> Personalize o layout dos controles</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Histórico</h2>
        <p>
          Todas as suas partidas são salvas automaticamente. Acesse o "Histórico" para:
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>Revisar placar final e duração</li>
          <li>Ver estatísticas de cada equipe</li>
          <li>Acompanhar sua progressão e ganhos de XP</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Eventos Especiais</h2>
        <p>
          Fique atento ao "Pato" — um evento especial que ocorre quando há uma diferença
          significativa de pontos entre os times. Isso adiciona um elemento de diversão
          e estratégia ao seu jogo.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Dicas Extras</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>Use modo fullscreen para melhor visualização</li>
          <li>Seus dados são salvos localmente — não precisa de internet contínua</li>
          <li>Divida a tela com seu parceiro para acompanhar em tempo real</li>
        </ul>

        <p className="mt-8">
          Pronto! Você agora domina o TruKando. Divirta-se e boa sorte nas suas
          partidas!
        </p>
      </>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const article = articles[params.slug];
  if (!article) return {};
  return {
    title: `${article.title} | TruKando Blog`,
    description: article.title,
  };
}

export default function ArticlePage({ params }) {
  const article = articles[params.slug];

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-white/60">Artigo não encontrado</p>
      </div>
    );
  }

  return (
    <BlogArticle
      title={article.title}
      date={article.date}
      author={article.author}
      eyebrow={article.eyebrow}
      content={article.content}
    />
  );
}
