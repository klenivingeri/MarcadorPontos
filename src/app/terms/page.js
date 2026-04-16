import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Termos | TruKando",
  description: "Termos de Uso - Leia os termos completos para usar o TruKando.",
};

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Termos"
      title="Termos de Uso"
      intro="Ao acessar e usar o TruKando, você concorda em estar vinculado por estes Termos de Uso. Leia-os atentamente antes de prosseguir."
    >
      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          1. Aceitação dos Termos
        </h2>
        <p className="mb-4">
          Ao acessar e usar o TruKando, você concorda em estar legalmente vinculado por estes Termos.
          Se não concordar com qualquer parte destes Termos, você não poderá usar o aplicativo.
          O uso contínuo implica aceitação total destes Termos.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          2. Licença de Uso
        </h2>
        <p className="mb-4">
          O TruKando concede a você uma licença limitada, não exclusiva e revogável para usar
          este aplicativo apenas para fins pessoais e não comerciais. Você não pode transferir,
          vender, alugar ou compartilhar esta licença com terceiros.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          3. Isenção de Garantias
        </h2>
        <p className="mb-4">
          <strong>O TruKando é fornecido "no estado em que se encontra" sem garantias de qualquer tipo</strong>,
          expressas ou implícitas, incluindo:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Disponibilidade contínua e ininterrupta</li>
          <li>Ausência total de erros ou bugs</li>
          <li>Compatibilidade com todos os dispositivos e navegadores</li>
          <li>Adequação para fins específicos</li>
          <li>Acurácia dos dados ou funcionalidades</li>
        </ul>
        <p className="mt-4">
          Você usa o aplicativo por sua conta e risco. Não nos responsabilizamos por falhas
          técnicas, perda de dados ou problemas de compatibilidade.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          4. Limitação de Responsabilidade
        </h2>
        <p className="mb-4">
          <strong>Em nenhuma circunstância o TruKando (ou seus desenvolvedores, incluindo 47Dev)
          será responsável</strong> por danos indiretos, incidentais, especiais, consequentes ou
          punitivos, incluindo perda de dados, lucros ou oportunidades comerciais, mesmo que
          notificado sobre a possibilidade de tais danos.
        </p>
        <p className="mt-4">
          A responsabilidade máxima total por qualquer reclamação não ultrapassará R$ 100,00.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          5. Responsabilidade do Usuário
        </h2>
        <p className="mb-4">Você é responsável por:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>Verificar os nomes dos times, placares e histórico antes de finalizar partidas</li>
          <li>Manter a integridade e confidencialidade de suas dados locais</li>
          <li>Utilizar o aplicativo de forma legal e ética</li>
          <li>Não interferir com o funcionamento ou segurança do aplicativo</li>
          <li>Aceitar que dados podem ser perdidos se você limpar o armazenamento local do navegador</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          6. Condutas Proibidas
        </h2>
        <p className="mb-4">
          Você concorda em não fazer qualquer das seguintes ações enquanto usa o TruKando:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Tentar explorar vulnerabilidades ou falhas de segurança</li>
          <li>Tentar acessar dados não autorizados ou fazer engenharia reversa do código</li>
          <li>Interferir com a funcionalidade ou performance do aplicativo</li>
          <li>Usar o aplicativo para fins ilícitos ou prejudiciais</li>
          <li>Distribuir malware, vírus ou qualquer código prejudicial</li>
          <li>Manipular dados para criar registros fraudulentos</li>
          <li>Violar qualquer lei, regulamento ou acordo aplicável</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          7. Propriedade Intelectual
        </h2>
        <p className="mb-4">
          O TruKando e seu conteúdo (incluindo design, gráficos, texto, código e funcionalidades)
          são propriedade de 47Dev e são protegidos por leis de direitos autorais. Você não tem
          permissão para:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Copiar ou reproduzir qualquer conteúdo sem autorização</li>
          <li>Modificar, traduzir ou criar obras derivadas</li>
          <li>Distribuir ou vender o aplicativo ou partes dele</li>
          <li>Remover avisos de copyright ou propriedade</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          8. Armazenamento de Dados Local
        </h2>
        <p className="mb-4">
          Todos os seus dados são armazenados localmente no seu dispositivo usando localStorage.
          Você entende e concorda que:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Os dados não são sincronizados com servidores</li>
          <li>Você é responsável por fazer backups de seus dados</li>
          <li>Limpar o cache/cookies do navegador resultará em perda permanente de dados</li>
          <li>Mudanças de dispositivo ou navegador não transferirão seus dados automaticamente</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          9. Modificações dos Termos e Serviço
        </h2>
        <p className="mb-4">
          47Dev reserva-se o direito de modificar estes Termos e as funcionalidades do TruKando
          a qualquer momento. Mudanças significativas serão comunicadas através da atualização
          desta página. O uso contínuo após alterações constitui aceitação dos novos Termos.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          10. Interrupção de Serviço
        </h2>
        <p className="mb-4">
          47Dev pode interromper, suspender ou descontinuar o TruKando ou qualquer parte dele,
          com ou sem notificação. Não seremos responsáveis por nenhum dano resultante de tal
          interrupção ou descontinuação.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          11. Publicidade e Monetização
        </h2>
        <p className="mb-4">
          O TruKando pode exibir anúncios de terceiros (como Google AdSense). Você concorda que:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Anúncios podem ser exibidos durante o uso</li>
          <li>Terceiros podem coletar dados conforme suas políticas de privacidade</li>
          <li>Você não fará cliques fraudulentos ou manipulará anúncios</li>
          <li>Anunciantes terceiros não são responsáveis pelo conteúdo dos anúncios</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          12. Links Externos
        </h2>
        <p className="mb-4">
          O TruKando pode conter links para sites externos. Não nos responsabilizamos pelo
          conteúdo, precisão ou práticas de privacidade desses sites. Acesso a sites externos
          é por sua conta e risco, sujeito aos seus Termos de Uso.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          13. Política de Privacidade
        </h2>
        <p className="mb-4">
          O uso do TruKando também está sujeito à nossa{" "}
          <a
            href="/privacy"
            className="font-bold underline hover:text-white"
          >
            Política de Privacidade
          </a>
          . Leia-a para entender nossas práticas de dados.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          14. Lei Aplicável e Jurisdição
        </h2>
        <p className="mb-4">
          Estes Termos são regidos pelas leis da <strong>República Federativa do Brasil</strong>.
          Qualquer disputa será resolvida nos tribunais competentes de <strong>São Paulo, Brasil</strong>.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          15. Separabilidade
        </h2>
        <p className="mb-4">
          Se qualquer disposição destes Termos for considerada inválida, ilegal ou inaplicável,
          as disposições restantes permanecerão em pleno vigor.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          16. Contato
        </h2>
        <p className="mb-4">
          Para dúvidas sobre estes Termos, entre em contato através da página de{" "}
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
          <strong>Jurisdição:</strong> Brasil
        </p>
      </section>
    </LegalPageShell>
  );
}
