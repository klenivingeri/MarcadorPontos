import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Privacidade | TruKando",
  description: "Política de privacidade do TruKando - Saiba como seus dados são protegidos.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacidade"
      title="Política de Privacidade"
      intro="Esta política explica como o TruKando coleta, usa e protege seus dados. Leia atentamente para entender nossas práticas de privacidade."
    >
      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          1. Informações que Coletamos
        </h2>
        <p className="mb-4">
          O TruKando coleta as seguintes informações, <strong>todas armazenadas localmente no seu dispositivo</strong>:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Nomes das equipes e dos times</li>
          <li>Placares, pontuações e histórico de partidas</li>
          <li>Preferências de tema e modo visual (claro/escuro)</li>
          <li>Configurações de vibração e posição de botões</li>
          <li>URL de wallpaper personalizado (se fornecido)</li>
          <li>Perfil de XP e nível de jogadores (progresso)</li>
          <li>Estado de consentimento de cookies e privacidade</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          2. Como Utilizamos Seus Dados
        </h2>
        <p className="mb-4">Usamos os dados coletados para:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>Permitir que você rastreie e controle partidas em tempo real</li>
          <li>Manter um histórico de seus jogos para consulta posterior</li>
          <li>Personalizar sua experiência (tema, wallpaper, preferências)</li>
          <li>Calcular e exibir progressão de XP e nível</li>
          <li>Melhorar o serviço através de análise de comportamento</li>
          <li>Cumprir obrigações legais (COPPA, LGPD, GDPR)</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          3. Armazenamento Local (LocalStorage)
        </h2>
        <p className="mb-4">
          <strong>Todos os seus dados são armazenados localmente no seu navegador</strong> usando
          a tecnologia localStorage. Isso significa:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Seus dados não são enviados para nossos servidores</li>
          <li>Você tem controle total sobre seus dados</li>
          <li>Os dados persistem mesmo depois que você fecha o navegador</li>
          <li>Você pode limpar seus dados apagando o histórico/cookies do navegador</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          4. Cookies e Tecnologias de Rastreamento
        </h2>
        <p className="mb-4">
          O TruKando não utiliza cookies diretamente. Porém, <strong>quando anúncios do Google
          AdSense estão ativos</strong>, terceiros (incluindo o Google) podem usar:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Cookies de publicidade</li>
          <li>Web beacons e pixels de rastreamento</li>
          <li>Identificadores únicos baseados em navegador</li>
          <li>Endereços IP e informações de localização (aproximada)</li>
        </ul>
        <p className="mt-4">
          Estas tecnologias são usadas para exibir anúncios relevantes, medir desempenho de
          campanhas e limitar a repetição de anúncios. Para saber mais, consulte a{" "}
          <a
            href="https://www.google.com/policies/privacy/partners/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline hover:text-white"
          >
            Política de Privacidade do Google
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          5. Compartilhamento de Dados
        </h2>
        <p className="mb-4">
          <strong>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros</strong>,
          exceto:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Provedores de anúncios (Google AdSense) para exibição de publicidade</li>
          <li>Quando exigido por lei ou determinação judicial</li>
          <li>Para proteção dos direitos, privacidade ou segurança do TruKando e usuários</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          6. Seu Controle e Direitos
        </h2>
        <p className="mb-4">Você tem os seguintes direitos:</p>
        <ul className="list-inside list-disc space-y-2">
          <li><strong>Acessar:</strong> Ver todos os dados que o TruKando armazena sobre você</li>
          <li><strong>Corrigir:</strong> Atualizar informações incorretas ou desatualizadas</li>
          <li><strong>Deletar:</strong> Remover seus dados limpando o armazenamento local do navegador</li>
          <li><strong>Portabilidade:</strong> Exportar seus dados em formato legível</li>
          <li><strong>Consentimento:</strong> Aceitar ou rejeitar certos tipos de rastreamento</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          7. Segurança de Dados
        </h2>
        <p className="mb-4">
          Implementamos medidas de segurança para proteger seus dados contra acesso não autorizado,
          alteração ou destruição. Porém, nenhum método de transmissão pela internet é 100% seguro.
          Use práticas seguras de navegação:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Mantenha seu navegador e SO atualizados</li>
          <li>Use senhas fortes no seu dispositivo</li>
          <li>Não compartilhe sua sessão com pessoas desconhecidas</li>
          <li>Verifique a segurança da conexão (HTTPS)</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          8. COPPA (Proteção de Crianças)
        </h2>
        <p className="mb-4">
          O TruKando não é direcionado a crianças menores de 13 anos. Não coletamos
          deliberadamente informações pessoalmente identificáveis de menores. Se soubermos que
          coletamos dados de uma criança menor de 13 anos, removeremos essas informações
          imediatamente.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          9. Conformidade com LGPD (Lei Geral de Proteção de Dados)
        </h2>
        <p className="mb-4">
          Para usuários no Brasil, o TruKando cumpre a LGPD. Você tem direitos de acesso,
          correção, eliminação e portabilidade de dados. Contate-nos através de{" "}
          <a
            href="/contact"
            className="font-bold underline hover:text-white"
          >
            contato
          </a>
          {" "}para exercer seus direitos LGPD.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          10. Conformidade com GDPR (Regulamento Geral de Proteção de Dados)
        </h2>
        <p className="mb-4">
          Para usuários na União Europeia, o TruKando cumpre o GDPR. Você tem direitos de
          acesso, correção, eliminação, portabilidade de dados, direito de objeção e direito
          de restrição de processamento.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          11. Retenção de Dados
        </h2>
        <p className="mb-4">
          Os dados são retidos enquanto você usar o TruKando e os manter em seu dispositivo.
          Você pode deletar seus dados a qualquer momento através das configurações do seu
          navegador. Após 24 meses de inatividade, você pode solicitar a exclusão permanente
          de seus dados.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          12. Alterações nesta Política
        </h2>
        <p className="mb-4">
          Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você
          sobre mudanças significativas publicando a nova versão nesta página com uma data
          de "Última Atualização" atualizada.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          13. Contato
        </h2>
        <p className="mb-4">
          Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou nossas
          práticas de privacidade, entre em contato conosco através da página de{" "}
          <a
            href="/contact"
            className="font-bold underline hover:text-white"
          >
            contato
          </a>
          .
        </p>
      </section>

      <section className="mt-8 border-t border-white/20 pt-6">
        <p className="text-[12px] text-white/50">
          <strong>Última Atualização:</strong> 16 de Abril de 2026<br />
          <strong>Responsável:</strong> 47Dev<br />
          <strong>Jurisdição:</strong> Brasil, com conformidade com LGPD, GDPR e COPPA
        </p>
      </section>
    </LegalPageShell>
  );
}
