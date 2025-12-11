"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// TIPAGEM DO MODAL
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

// MODAL COMPONENT -----------------------------------------
function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white text-black max-w-2xl w-full rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black text-xl hover:text-red-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <div className="text-gray-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}

// TIPAGEM DO FOOTER
interface FooterProps {
  openModal: (value: string) => void;
}

// HEADER --------------------------------------------------
function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="h-10 w-32 flex items-center">
        <img src="/logo.png" alt="Logo OXI" className="h-10 object-contain" />
      </div>

      <nav className="hidden md:flex gap-6 text-white text-sm">
        <a href="#oqoxi" className="hover:text-[#FF746C]">O que é a OXI?</a>
        <a href="#beneficios" className="hover:text-[#FF746C]">Benefícios</a>
        <a href="#cadastro" className="hover:text-[#FF746C]">Cadastro</a>
      </nav>
    </header>
  );
}

// FOOTER --------------------------------------------------
function Footer({ openModal }: FooterProps) {
  return (
    <footer className="w-full bg-black text-white py-12 mt-32 flex flex-col items-center gap-6 border-t border-white/10">

      <img src="/logo.png" alt="Logo" className="h-12 object-contain" />

      <div className="flex gap-6 text-sm">
        <button onClick={() => openModal("termos")} className="hover:text-[#FF746C]">
          Termos de Uso
        </button>

        <button onClick={() => openModal("bmotor")} className="hover:text-[#FF746C]">
          Clube de Beneficios Motoristas
        </button>

        <button onClick={() => openModal("bpassa")} className="hover:text-[#FF746C]">
          Clube de Beneficios Passageiros
        </button>
      </div>

      <p className="text-sm opacity-70">
        © {new Date().getFullYear()} OXI Mobilidade — Todos os direitos reservados.
      </p>
    </footer>
  );
}

// PAGE ----------------------------------------------------
export default function Page() {
  const [modal, setModal] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const botaoRefs = useRef<HTMLAnchorElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addBotaoRef = (el: HTMLAnchorElement | null) => {
    if (el && !botaoRefs.current.includes(el)) {
      botaoRefs.current.push(el);
    }
  };

  useEffect(() => {
    const heroTween = gsap.from(heroRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power3.out",
    });

    const sectionTweens = sectionsRef.current.map((sec, i) =>
      gsap.from(sec, {
        scrollTrigger: { trigger: sec, start: "top 85%" },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.05,
      })
    );

    const buttonTweens = botaoRefs.current.map((btn) =>
      gsap.to(btn, {
        scale: 1.04,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.2,
        delay: Math.random() * 0.6,
      })
    );

    return () => {
      heroTween.kill();
      sectionTweens.forEach((t) => t?.kill());
      buttonTweens.forEach((t) => t?.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <Header />

      <main className="bg-black text-white min-h-screen w-full overflow-x-hidden font-sans pt-16">

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative w-full h-screen flex flex-col justify-center items-center text-center px-6"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('/passageiro-motorista.jpg')" }}
          />

          <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            OXI Mobilidade
          </h1>

          <p className="relative text-lg md:text-xl max-w-2xl text-gray-300 mb-6">
            Mobilidade urbana moderna, acessível e inteligente — feita para facilitar a vida de motoristas e passageiros.
          </p>

          <div className="relative flex gap-4 mt-4 flex-wrap justify-center">
            <a
              ref={addBotaoRef}
              href="https://oximobilidade.wordpress.com/pre-cadastro-motoristas/"
              target="_blank"
              className="inline-flex items-center justify-center bg-[#FF746C] hover:bg-[#ff5a50] transition transform px-10 py-4 rounded-full text-lg font-semibold shadow-xl"
            >
              Seja Motorista
            </a>

            <a
              ref={addBotaoRef}
              href="https://oximobilidade.wordpress.com/pre-cadastro-passageiros/"
              target="_blank"
              className="inline-flex items-center justify-center bg-white text-black hover:bg-gray-200 transition transform px-10 py-4 rounded-full text-lg font-semibold shadow-xl"
            >
              Seja Passageiro
            </a>
          </div>
        </section>

        {/* SOBRE */}
        <section ref={addToRefs} id="oqoxi" className="py-28 px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">O que é a OXI?</h2>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
            A OXI é uma plataforma de mobilidade criada para oferecer uma experiência justa,
            confortável e acessível. Um app leve e direto ao ponto, pensado para motoristas que querem
            autonomia e oportunidades reais — e para passageiros que buscam viagens seguras, rápidas e com preço justo.
          </p>
        </section>

        {/* BENEFÍCIOS */}
        <section id="beneficios" ref={addToRefs} className="py-24 px-8">
          <h2 className="text-4xl text-center font-bold mb-16">Por que escolher a OXI?</h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Tarifas mais baixas</h3>
              <p className="text-gray-400">Viagens acessíveis e preços realmente justos.</p>
            </div>

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Transparência total</h3>
              <p className="text-gray-400">Valores claros — sem taxas escondidas, nunca.</p>
            </div>

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Qualidade de vida</h3>
              <p className="text-gray-400">Suporte emocional, financeiro e bem-estar pra motoristas.</p>
            </div>

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Crescimento real</h3>
              <p className="text-gray-400">Oportunidades além das corridas.</p>
            </div>

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Apoio com o veículo</h3>
              <p className="text-gray-400">Manutenção, financiamento e suporte automotivo.</p>
            </div>

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Auxílio combustível diário</h3>
              <p className="text-gray-400">Redução real dos custos pra quem roda sempre.</p>
            </div>

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Manutenção garantida</h3>
              <p className="text-gray-400">Ajuda de até R$ 1.000 a cada 3 meses.</p>
            </div>

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Segurança reforçada</h3>
              <p className="text-gray-400">Tecnologia, verificação e suporte humano imediato.</p>
            </div>

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Suporte 24/7</h3>
              <p className="text-gray-400">Atendimento humano a qualquer hora.</p>
            </div>

            <div className="bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Pix instantâneo</h3>
              <p className="text-gray-400">Receba suas corridas na hora, sem burocracia.</p>
            </div>

          </div>
        </section>

        {/* CTA FINAL */}
        <section id="cadastro" ref={addToRefs} className="py-32 px-6 text-center bg-[#FF746C] text-black">
          <h2 className="text-5xl font-bold mb-6">Entre na nova era da mobilidade</h2>

          <div className="flex gap-4 justify-center mt-6 flex-wrap">
            <a
              ref={addBotaoRef}
              href="https://oximobilidade.wordpress.com/pre-cadastro-motoristas/"
              target="_blank"
              className="inline-flex items-center justify-center bg-black text-white hover:bg-gray-900 transition transform px-10 py-4 rounded-full text-lg font-semibold shadow-xl"
            >
              Seja Motorista
            </a>

            <a
              ref={addBotaoRef}
              href="https://oximobilidade.wordpress.com/pre-cadastro-passageiros/"
              target="_blank"
              className="inline-flex items-center justify-center bg-white text-black hover:bg-gray-100 transition transform px-10 py-4 rounded-full text-lg font-semibold shadow-xl"
            >
              Seja Passageiro
            </a>
          </div>
        </section>

        <Footer openModal={setModal} />
      </main>

      {/* -------- MODAIS -------- */}

      <Modal
        open={modal === "termos"}
        onClose={() => setModal(null)}
        title="Termos de Uso"
      >
        <p>Termo de uso da OXI plataforma de tecnologia e mobilidade urbana.


Por este instrumento particular, as partes têm entre si, justo e acertado o presente regulamento, que se regerá pelos itens seguintes e pelas condições descritas no presente.    

A)	ANJO PLATAFORMA DE TECNOLOGIA E SERVIÇOS LTDA, inscrita no CNPJ 29.619.619/0001-60, situada na Estrada da Uruçanga estrada nº 45, Jacarepaguá, Rio de Janeiro, RJ - CEP 22.750-030.
       Nesta se faz presente com nome fantasia OXI de plataforma de tecnologia e mobilidade urbana.

1. Introdução
Ao utilizar o aplicativo OXI plataforma de tecnologia e mobilidade urbana o usuário confere a nós seus dados pessoais e, por isso, estamos comprometidos em manter essa confiança. Nesse sentido, iniciaremos esclarecendo nossas práticas de privacidade.
O presente aviso tem por objetivo descrever os dados pessoais ("dados") que coletamos, a forma como os utilizamos e compartilhamos, bem como as opções disponíveis ao usuário em relação a esses dados. Sugerimos que este aviso seja lido em conjunto com a nossa visão geral da privacidade, a qual destaca os principais aspectos relacionados às nossas práticas de privacidade.
2. Perspectiva geral
2.1. Âmbito
Esta Política de Privacidade se aplica a todos os usuários dos serviços da OXI em todo o mundo, incluindo usuários de aplicativos, websites, recursos ou outros serviços da OXI.
Esta Política de Privacidade descreve como a OXI e suas afiliadas coletam e utilizam dados. Essa Política de Privacidade se aplica a todos os usuários da OXI em todo o mundo, especificamente a:
Usuários: pessoas que solicitam ou recebem serviços de transporte e relacionados por meio de suas contas OXI
Motoristas: pessoas que fornecem serviços de transporte para usuários de forma independente ou por meio de empresas parceiras de transporte.
Destinatários de pedidos: pessoas que solicitam e/ou recebem refeições ou outros produtos e serviços para entrega ou retirada. Isso inclui pessoas que usam recursos de checkout como convidados para acessar serviços de entrega ou retirada sem precisar criar e/ou fazer login em suas contas.
Parceiros de entrega: pessoas que prestam serviços de entrega por meio da OXI
Usuários convidados: pessoas que recebem serviços de viagem e entregas solicitados por outros proprietários de contas OXI, incluindo aqueles que recebem serviços organizados por clientes da OXI ou por amigos, familiares ou outros proprietários de contas individuais.
Esta Política de Privacidade também rege outras coletas de dados pela OXI relacionadas aos seus serviços. Por exemplo, podemos coletar informações de contato de proprietários ou funcionários de restaurantes ou outros comerciantes nos aplicativos OXI; informações de contato de indivíduos que gerenciam e usam contas de clientes empresariais; ou dados de pessoas que iniciaram, mas não concluíram suas inscrições como motoristas ou parceiros de entrega.
Todas as pessoas sujeitas a esta Política de Privacidade são denominadas "usuários" nesta Política de Privacidade.
As práticas de privacidade da OXI estão sujeitas às leis aplicáveis nos locais onde o aplicativo está disponível. Isso significa que a OXI só se envolverá nas práticas descritas neste aviso em um determinado país ou região se as leis desses locais permitirem. Além disso, para os usuários em 
Brasil, a OXI está em conformidade com a Lei Geral de Proteção de Dados (LGPD) e informações adicionais sobre as práticas de privacidade da OXI são fornecidas abaixo.

Responsabilidade pelo tratamento de dados pessoais e transferências na OXI: A Global Eletrônica Tech. é a controladora dos dados pessoais coletados em conexão com o uso dos serviços OXI No Brasil.  Coleta e utiliza dados pessoais apenas quando tem bases legais adequadas, de acordo com a LGPD.

Finalidades do tratamento de dados pessoais pela OXI : A empresa responsável  pode coletar e utilizar dados pessoais dos usuários para as seguintes finalidades:
Fornecer os serviços e recursos solicitados pelos usuários; obter o consentimento dos usuários para o tratamento de seus dados pessoais;
Cumprir as obrigações legais e regulatórias aplicáveis;
Defender-se em processos judiciais, administrativos ou arbitrais;
Proteger a vida e a segurança dos usuários;
Atender aos interesses legítimos da OXI ou de terceiros;
Proteger contra fraudes e outras atividades ilegais;
Proteger o crédito.

Se tiver alguma dúvida sobre as nossas práticas num determinado país ou região, contate-nos por nossos meios oficiais.
2.2. Transferência e controle de dados

A Global eletrônica Tech é a controladora dos dados pessoais coletados no uso dos serviços da OXI gerencia e processa dados pessoais em todo o mundo, a fim de fornecer uma experiência sem problemas aos usuários, independentemente de onde estejam. A OXI respeita os direitos de proteção de dados dos usuários, independentemente do país em que residam.
Para oferecer os serviços aos usuários em todo o mundo, a OXI pode transferir dados pessoais para outros países, além do país de residência do usuário. Além disso, os usuários podem acessar seus dados pessoais em outros países após deixarem o país em que os serviços foram prestados. 
A OXI transfere dados pessoais com base em acordos com seus usuários, nas instruções ou consentimento prévio dos usuários, em decisões de adequação para os países relevantes ou em outros mecanismos de transferência disponíveis de acordo com a lei aplicável, como cláusulas contratuais.
A OXI  também pode transferir dados pessoais para responder a um pedido de dados pessoais de uma autoridade policial. Para oferecer salvaguardas adicionais a essas transferências de dados, a OXI aplica um procedimento interno robusto para processar esses pedidos. A OXI só divulga dados pessoais a autoridades policiais de acordo com os requisitos regulatórios das leis aplicáveis, como a LGPD.
Com o intuito de prover proteção de dados equivalente em todos os lugares onde presta seus serviços, a OXI  implementou as seguintes medidas em âmbito global:
Políticas e procedimentos para limitar o acesso e o processamento de dados pessoais para finalidades específicas.
Treinamento específico do pessoal responsável pela gestão de dados pessoais.
Política governamental de acesso a dados que restringe o acesso governamental aos dados, salvo quando a divulgação for obrigatória pelas leis aplicáveis, quando houver risco iminente de danos pessoais graves ou quando houver consentimento.
Para facilitar o exercício dos seus direitos de proteção de dados, a OXI disponibiliza canais oficiais para esse fim, onde as solicitações serão tratadas centralmente em nome do controlador de dados relevante. Quaisquer questionamentos, comentários ou reclamações relacionados às práticas de proteção de dados da OXI devem ser encaminhados pelos nossos canais oficiais.

3. Recolhimento e utilização dos dados

A OXI realiza a coleta de dados através das seguintes fontes:
3.1. Dados fornecidos pelos usuários

A OXI coleta dados quando os usuários criam ou atualizam suas contas ou realizam pedidos por meio de suas funcionalidades, tais como localização, uso da aplicação e dados do dispositivo, além de dados de outras fontes, como outros usuários ou proprietários de contas, parceiros de negócios, fornecedores, fornecedores de soluções financeiras e de seguros e autoridades governamentais.

Informações de perfil de usuário: a OX coleta dados como nome, e-mail, número de telefone, nome e palavra-passe de início de sessão, endereço, fotografia de perfil, informações de pagamento ou dados bancários (incluindo informações de verificação de pagamento), carta de condução e outros documentos governamentais (que podem incluir o número de documento, data de nascimento, gênero e fotografia). Além disso, inclui informações do veículo ou seguro dos motoristas e parceiros de entrega, informações dos contatos de emergência, configurações do usuário e certificados de saúde ou estado físico para fornecer serviços utilizando as aplicações OXI.

Informações sobre verificação de antecedentes (motoristas e parceiros de entrega): isto inclui informações enviadas durante o processo de candidatura do motorista/parceiro de entrega, como o histórico de condução ou registro criminal (caso a lei permita), estado da carteira de condução, nomes alternativos conhecidos, endereços anteriores e o direito de trabalhar. Essas informações podem ser coletadas por um fornecedor autorizado em nome da OXI.

Fotografias de verificação de identidade: isto inclui fotografias de usuários (como selfies) e/ou documentos identificativos emitidos pelo governo (como carteiras de motorista ou passaportes). Essas fotografias poderão ser utilizadas para verificar a identidade de um usuário, por exemplo, com tecnologias de verificação facial.

Dados demográficos: a OXI pode coletar dados demográficos sobre os usuários, como a data de nascimento/idade, gênero ou profissão, quando necessário para determinados serviços ou programas OXI, como entregas de bebidas alcoólicas ou funcionalidades de segurança que permitem às usuárias mulheres definir a preferência de fornecer ou receber serviços de/para outras mulheres ("Preferência de usuárias mulheres").

Conteúdos de usuário: a OXI coleta os dados enviados pelos usuários quando entram em contato com o suporte ao cliente, atribuem classificações ou opiniões sobre outros usuários, restaurantes ou comerciantes, ou entram em contato de outra forma com a OXI. Isso pode incluir fotografias ou gravações de áudio ou vídeo enviadas por usuários no âmbito de um pedido de apoio ao cliente. Isso também inclui meta dados relacionados com o método que utiliza para se comunicar com a OXI.

3.2. Dados coletados durante a utilização dos serviços da 

Dados de localização (motoristas e parceiros de entrega): coletamos dados precisos ou aproximados de localização dos dispositivos móveis dos motoristas e parceiros de entrega quando a aplicação OXI está em execução em primeiro plano (aberta e visível na tela) ou em segundo plano (aberta, mas não visível na tela). Também quando está fechado e/ou background.

Dados de localização (usuários e destinatários de pedidos): coletamos informações precisas ou aproximadas de localização dos dispositivos móveis dos usuários e destinatários de pedidos, caso permitam em suas configurações do dispositivo.
A OXI coleta esses dados desde o momento em que um serviço é solicitado até sua conclusão. Os usuários e destinatários de pedidos podem usar os aplicativos da OXI sem permitir a coleta de dados de localização de seus dispositivos móveis. No entanto, isso pode afetar algumas funcionalidades dos aplicativos OXI. Por exemplo, um usuário que não permita o acesso aos dados de localização precisará inserir manualmente o endereço de coleta.
Além disso, os dados precisos de localização coletados dos dispositivos dos motoristas durante as viagens são associados às contas dos usuários, mesmo que estes não tenham permitido a coleta de dados precisos de localização. Esses dados são usados para gerar recibos, suporte ao cliente, detecção de fraudes, seguros e litígios.

Informações de transação: coletamos informações sobre transações relacionadas ao uso dos nossos serviços, incluindo o tipo de serviços solicitados ou fornecidos; detalhes de viagens ou pedidos (como data e hora, endereços de coleta e entrega distância percorrida e itens pedidos); e informações sobre transações de pagamento (como o nome e a localização de restaurantes ou comerciantes, valores cobrados e formas de pagamento). Também associamos o nome do usuário ao nome de qualquer pessoa que utilize o respectivo código promocional.

Dados de uso: coletamos dados sobre como os usuários interagem com nossos serviços, incluindo datas e horários de acesso, páginas ou funcionalidades do aplicativo visualizadas, tipo de navegador, falhas do aplicativo e outras atividades do sistema.

Dados do dispositivo: coletamos dados sobre os dispositivos usados para acessar nossos serviços, incluindo modelos de hardware, endereço IP do dispositivo ou outros identificadores exclusivos do dispositivo, sistemas operacionais e suas versões, software, idiomas preferidos, identificadores de publicidade, dados de movimento do dispositivo e dados da rede móvel.

Dados de comunicação: coletamos dados relacionados a comunicações telefônicas, de texto ou no aplicativo entre usuários que são possíveis através dos aplicativos da OXI. Isso inclui data e hora, bem como o conteúdo de mensagens de texto ou no aplicativo. Também podemos coletar o conteúdo de chamadas telefônicas apenas quando os usuários forem notificados com antecedência de que a chamada poderá ser gravada.

3.3. Fontes de dados externas:

Usuários que participam em nossos programas de indicação, os quais fornecem dados da pessoa indicada por meio deste usuário.
Proprietários de contas OXI que solicitam serviços para outros usuários, como amigos ou familiares, ou que permitem que outros usuários solicitem e/ou recebam serviços por meio de suas contas comerciais.
Usuários ou outras pessoas que fornecem informações em relação a reclamações ou litígios.
Parceiros de negócios da OXI por meio dos quais os usuários criam ou acessam suas contas OXI, tais como fornecedores de serviços de pagamento, serviços de redes sociais, aplicativos ou sites que utilizam as APIs da OXI ou cujas APIs são usadas pela OXI
Parceiros de negócios da OXI que oferecem cartões de débito ou crédito emitidos por instituições financeiras em parceria com a OXI, conforme divulgado nos Termos e Condições do cartão.
Fornecedores que auxiliam na verificação da identidade, antecedentes e elegibilidade para trabalhar dos usuários, ou na verificação dos usuários em relação a sanções, combate ao branqueamento de capitais ou requisitos de "conheça o seu cliente".
Fornecedores de seguros, veículos ou serviços financeiros para motoristas e/ou parceiros de entrega.
Empresas parceiras de transporte no caso de motoristas ou parceiros de entrega que utilizam nossos serviços por meio de uma conta associada a uma empresa desse tipo.
Fontes acessíveis ao público.
Fornecedores de serviços de marketing ou revendedores de dados cujos dados a OXI utiliza para fins de marketing ou pesquisa.
Autoridades policiais, autoridades de saúde pública e outras autoridades governamentais.

4. Como utilizamos os dados pessoais
Como a OXI é uma empresa que presta serviços de transporte, entregas e outros produtos e serviços, utilizamos os dados pessoais para garantir a confiabilidade e conveniência dos serviços. Ademais, os dados são utilizados para os seguintes fins:
Reforçar a segurança e proteção dos nossos usuários e serviços;
Prestar suporte ao cliente;
Realizar pesquisas e desenvolvimento;
Permitir a comunicação entre os usuários;
Para fins de marketing e publicidade;
Enviar comunicações não relacionadas a fins de marketing aos usuários;
Cumprir procedimentos legais.
5. Cookies e tecnologias de terceiros

Cookies e tecnologias de terceiros são utilizados pela OXI e seus parceiros em seus websites, aplicativos, e-mails e anúncios online, com o propósito de autenticar usuários, salvar preferências e configurações, determinar a popularidade de conteúdos, fornecer e avaliar a eficácia de campanhas publicitárias, analisar tendências e tráfego de sites, e compreender comportamentos online e interesses das pessoas que interagem com nossos serviços.
Também podemos permitir que terceiros nos forneçam medições de audiências e serviços analíticos, além de apresentar anúncios em nosso nome na Internet, monitorando e comunicando-nos sobre o desempenho desses anúncios. Essas entidades podem utilizar cookies, web beacons, SDK e outras tecnologias para identificar os dispositivos utilizados pelos visitantes para acessar nossos websites, bem como quando acessam outros sites e serviços online.
6. Compartilhamento e divulgação dos dados

A OXI pode compartilhar dados pessoais com outros usuários, a pedido do próprio usuário ou para fornecer serviços e recursos que exijam tal compartilhamento. Além disso, podemos compartilhar dados com nossas afiliadas, subsidiárias e parceiros de negócios por razões legais ou em conexão com litígios ou reclamações. Os dados pessoais também podem ser compartilhados com fornecedores de serviços terceirizados e parceiros de negócios da OXI. Podemos compartilhar dados com o proprietário da conta OXI e o público em geral, conforme exigido por lei ou com consentimento prévio do usuário.
7. Retenção e eliminação de dados

A OXI retém os dados pessoais dos utilizadores pelo tempo necessário para cumprir os objetivos estabelecidos acima, incluindo a prestação de serviços e o cumprimento das obrigações legais. A duração da retenção varia dependendo do tipo de dados e da categoria do utilizador, bem como dos objetivos para os quais foram coletados. A retenção dos dados pode ser estendida por motivos legais ou regulatórios, segurança, proteção e prevenção de fraudes, ou para resolver problemas relacionados com a conta do utilizador, como pagamentos pendentes ou reclamações ou litígios não resolvidos.
A OXI permite que os utilizadores solicitem a eliminação das suas contas em qualquer momento, usando os canais oficiais disponíveis. Se tal pedido for feito, a OXI eliminará a conta e os dados do utilizador, salvo nos casos em que a retenção é exigida por motivos legais ou regulatórios, segurança, proteção e prevenção de fraudes, ou para resolver problemas relacionados com a conta do utilizador. No caso de motoristas e parceiros de entrega, a OXI deve manter suas contas e dados por um período legal de retenção após a solicitação de exclusão. Em geral, os dados dos utilizadores e destinatários de pedidos são excluídos após 90 dias da solicitação de exclusão, a menos que seja necessária a retenção por motivos acima mencionados.
8 – Link do clube de benefícios e fidelidade dos motoristas OXI.
9 – Link do clube de benefícios e fidelidade dos passageiros OXI.
</p>
      </Modal>

      <Modal
        open={modal === "bmotor"}
        onClose={() => setModal(null)}
        title="Clube de Benefícios Motoristas"
      >
        <p>Regulamento do clube de benefícios dos motoristas parceiros da OXI plataforma de mobilidade urbana.


Por este instrumento particular, as partes têm entre si, justo e acertado o presente regulamento, que se regerá pelos itens seguintes e pelas condições descritas no presente.    




A)	ANJO PLATAFORMA DE TECNOLOGIA E SERVIÇOS LTDA, inscrita no CNPJ 29.619.619/0001-60, situada na Estrada da Uruçanga estrada nº 45, Jacarepaguá, Rio de Janeiro, RJ - CEP 22.750-030.
Nesta se faz presente com nome fantasia OXI plataforma de mobilidade urbana.



Introdução principal:
A OXI plataforma de mobilidade urbana foi desenvolvida para gerar mais viabilidade e conforto de forma justa e harmônica nos transportes de passageiros por aplicativo, gerando maneiras de bonificação para os motoristas e passageiros em produtos e serviços das empresas parceiras cadastradas no nicho em referência (baterias veicular, seguros e proteção veicular, pneus, amortecedores e dentre outros) e consultas online gratuitas em setores específicos como, por exemplo: (Psicologia, acessória jurídica Educação financeira e entre outra).


1 - Pode realizar o cadastro, motorista com autorização na carteira CNH (atividade remunerada) e que sejam maiores de idade, ou seja, igual ou maior de 18 anos de idade.
2 - Pode realizar o cadastro, motoristas ou passageiros que tenham acesso a Internet para baixar o aplicativo OXI mobilidade urbana.
3 - Todos os produtos e serviços dos nossos parceiros dentro da plataforma OXI inclusive a ajuda manutenção, estão condicionado ao clube de benefícios e fidelidade da OXI plataforma de mobilidade urbana.


4 - Prazo mínima de carência para os motoristas parceiros participarem do clube de benefícios da OXI plataforma de mobilidade urbana será de três meses com uma meta diária nesse período de 150,00 na semana de 06 dias, contando a parti da primeira corrida efetuada na plataforma OXI.
4.1 Nesse período com a diária no valor de R$ 150,00 na semana de 06 dias no prazo de três meses é possível gerar fundo garantidor para participação do motorista parceiro no clube de benefícios OXI, podendo ter uma variação nas tarifas  de até 10% sobre o valor da diária.
5 - Na plataforma OXI o percentual maior de ganhos são direcionados aos motoristas parceiros, onde os mesmos tem acesso facilitado a diversos benefícios através do clube de benefícios e fidelidade OXI como exemplo de produtos e serviço de empresas parceiras que poderão ser encontradas dentro da plataforma OXI: (baterias veicular, seguros e proteção veicular, pneus, amortecedores e dentre outros).

Bônus de manutenção veicular (fundo garantidor).
6 – Os primeiros cadastros de motorista parceiro na plataforma OXI poderão ter direito a um bônus de até R$ 1.000,00 cada três meses, relativo à ajuda manutenção veicular dos serviços prioritários que envolvem a categoria, se tiver dentro do regulamento de benefícios e fidelidade da plataforma OXI, com metas diárias de 150,00 na semana de 06 dias.
6.1 - Para o motorista ter acesso ao bônus de manutenção veicular o mesmo tem de autorizar a sua participação no clube de benefícios e fidelidade OXI clicando em concordar com o regulamento.
6.2 – O bônus de manutenção veicular consiste em estar cadastrado no clube de benefícios e fidelidade OXI realizar uma diária mínima de 150,00 na semana de 6 dias ou 900,00 na semana de 06 dias, ficando opcional os dias de trabalho dos motoristas parceiros.
6.3 - Para que o bônus de manutenção veicular seja ativado, o saldo dos motoristas parceiros em relação ao clube de benefícios e fidelidade OXI deverá ser equiparado ou suficiente as suas necessidades na aquisição de produtos e serviços das empresas parceiras, sempre respeitando o regulamento dos produtos ou serviços em evidência a ser requisitado.
6.4 - No prazo trimestral o bônus de manutenção veicular poderá ser ativado automaticamente se o motorista parceiro estiver seguindo todas as normas do regulamento em dia, ou seja, diária mínima de 150,00 por dia no prazo trimestral e entre outras.
6.5 - O prazo de validade do bônus de manutenção veicular de até R$ 1.000,00 a cada três meses poderá ser de 01 a 4 ciclos de três meses cada ciclo. Nesta fica como exclusividade da administração OXI prorrogar ou encerra a promoção ao término de cada ciclo. 





Bônus de manutenção veicular reduzido:
7 – O bônus de manutenção veicular reduzido acontece quando motorista parceiro não consegue alcançar a meta estipulada no prazo de três meses, ficando abaixo no mínimo de 50 % o mesmo terá direito ao bônus de manutenção veicular reduzido que corresponde diária abaixo de 150,00 sendo aceitável no mínimo R$ 75,00 onde o mesmo terá direito de até R$ 400,00 a cada três mês.  

Bônus de manutenção veicular com antecedência:
8 - A ajuda promocional de manutenção poderá ser ativada com antecedência através do motorista parceiro após o prazo de 02 meses dentro do regulamento do clube de fidelidade OXI, em caso de extrema necessidade comprovada para aquisição de produtos e serviços dos parceiros OXI presente na cláusula (9 Letras ABCD).

8.1 Para que o bônus de manutenção veicular de antecedência seja ativada, o saldo dos motoristas parceiros em relação ao clube de benefícios e fidelidade OXI deverá ser equiparado ou suficiente as suas necessidades na aquisição de produtos e serviços das empresas parceiras conforme clausula (9 Letras ABCD).


9 - Das taxas do Bônus de manutenção veicular:
9.1 As possíveis redução das taxas de serviços ou compensação das mesmas, são valores que irão contribuir para gerar bônus de manutenção veicular que estão proporcionalmente alinhadas ao valor diário de R$ 150,00.
9.2 Taxas de repasse obrigatório aos órgãos competentes
9.3 Taxas de serviços da OXI plataforma de mobilidade urbana. 
10 - Das campanhas comerciais nos vidros traseiros dos veículos dos motoristas parceiros.
10.1 Com objetivos de manter os benefícios mencionados nesta em ralação ao clube de benefícios OXI, as campanhas comerciais nos vidros traseiros dos veículos dos motoristas parceiros fica de exclusividade OXI, para a mesma definir o meio de divulgação que poderá ser efetuado no vidro traseiro.
10.2 Com exclusividade no vidro traseiro do motorista parceiro que participar do clube de benefícios OXI, a mesma poderá ceder ou não 50% ao motorista parceiro em relação ao valor da publicidade efetuada no vidro traseiro do veículo do motorista parceiro. 

 Acesso aos produtos dos parceiros da plataforma OXI, através do clube de benefícios.
11 - Acesso aos produtos e serviços de maneira facilitada das empresas parceiras, onde poderão ser financiados pelos mesmos e os motoristas parceiros poderão pagar os seguintes itens abaixo, através das respectivas corridas concluídas podendo ser abatidas de forma gradativas ou através do bônus de manutenção veicular conforme regulamento de cada ponto abaixo representados pelas letras: A/B/C/D/E).

A - Proteção veicular ou seguro veicular. 
B - Pneus.	
C - Baterias veicular 
D - Amortecedores 
E - Financiamentos Veículos novos e usados. 

A.1 - Proteção veicular ou seguro veicular, Através do clube de benefícios da plataforma OXI o motorista parceiros poderá escolher entre as empresas parceiras da modalidade em referência.
A.2 – O pagamento de proteção veicular ou seguro veicular poderá acontecer através de empresas parceiras da plataforma OXI ou poderá acontecer o pagamento do mesmo através do próprio motorista parceiro.
A.3 – O pagamento do seguro veicular ou proteção veicular mediante ao clube de benefícios OXI poderá ser abatido de forma gradativa através das corridas realizadas no período, sempre resguardado mediante ao fundo garantidor, ou seja, bônus de manutenção veicular.
A.4 – Para os produtos ou serviços que tiverem prazo de validade, o mesmo será colocado em evidência para que o motorista parceiro possa receber mensagens do prazo de validade dos mesmos.


B.1 – Clube de benefícios OXI através de aquisição de pneus segue o mesmo entendimento das clausulas (A1, A2, A3 e A4).
C.1 - Clube de benefícios OXI através de aquisição de baterias segue o mesmo entendimento das clausulas (A1, A2, A3 e A4).
D.1 - Clube de benefícios OXI através de aquisição de amortecedores segue o mesmo entendimento das clausulas (A1, A2, A3 e A4).
E.1 - Clube de benefícios OXI através de financiamento de veículos novos e usados, temos um regulamento mais especifico com critérios a serem definidos a parti da ativação do mesmo
Das consultoria online:
12 - Consultorias online gratuitas para motoristas parceiros e seus familiares (vide regulamento).
A - Ajuda psicológica 
B - Ajuda jurídica 
C - Educação financeira 
D - Nutricionista 
E - Coaching de carreira 
F - Educador Físico.

A - Ajuda psicológica 
A.1- Consulta online psicológica:
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios para ser direcionado para a página do mesmo e em consulta online da área de  psicologia, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
O motorista parceiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online, se o motorista parceiro não tiver condições financeiras, o mesmo terá que ser direcionado a um órgão público competente mais próximo.
Caso o motorista parceiro tenha recursos financeiros para pagar a consulta, a mesma será de valor de consulta popular a ser definido com o profissional da área em referência, onde o profissional terá de repassar 10% do valor da consulta para plataforma OXI ou empresa parceira responsável.

B - Ajuda jurídica 
B.1- Consulta online jurídica:


No menu do app OX, no termo de uso clicar no clube de benefícios para ser direcionado para a página do mesmo e em consulta online da área de  jurídica, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
O motorista parceiro poderá ter direito a duas consultas online gratuita, se for confirmada a causa e o motorista tiver interesse em prosseguir e for de comum acordo com a assessoria jurídica, havendo sucesso, ou seja, causa for ganha, a assessoria jurídica terá direito a 30% do valor total da causa onde a mesma terá de repassar 10% para OXI ou empresa parceira responsável.

C - Educação financeira 
C.1 - Consulta online Educador financeiro:
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios para ser direcionado para a página do mesmo e em consulta online da área de  educador financeiro , agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
Em caso de atraso, terá uma tolerância de 5 minutos.
O motorista parceiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online e o motorista desejar prosseguir com as consultas de forma remunerada, será cobrado o valor de consulta popular, a ser definido com o profissional onde  terá de repassar 10% do valor da consulta  para plataforma OXI ou empresa responsável.


D - Nutricionista 
D.1 - Consulta online Nutricionista:
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios para ser direcionado para a página do mesmo e em consulta online da área de  nutrição, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
Em caso de atraso, terá uma tolerância de 5 minutos.
O motorista parceiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online e o motorista desejar prosseguir com as consultas de forma remunerada, será cobrado o valor de consulta popular, a ser definido com o profissional onde  terá de repassar 10% do valor da consulta  para plataforma OXI ou empresa responsável.

E - Coaching de carreira 
E.1 - Consulta online Coaching de carreira 
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios para ser direcionado para a página do mesmo e em consulta online da área de  coaching de carreira, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
Em caso de atraso, terá uma tolerância de 5 minutos.
O motorista parceiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online e o motorista desejar prosseguir com as consultas de forma remunerada, será cobrado o valor de consulta popular, a ser definido com o profissional onde terá de repassar 10% do valor da consulta  para plataforma OXI ou empresa responsável.
F - Educador Físico.
F.1 - Consulta online educador físico: 
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios para ser direcionado para a página do mesmo e em consulta online da área de   educador físico, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
Em caso de atraso, terá uma tolerância de 5 minutos.
O motorista parceiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online e o motorista desejar prosseguir com as consultas de forma remunerada, será cobrado o valor de consulta popular, a ser definido com o profissional onde  terá de repassar 10% do valor da consulta  para plataforma OXI ou empresa responsável.
</p>
      </Modal>

      <Modal
        open={modal === "bpassa"}
        onClose={() => setModal(null)}
        title="Clube de Benefícios Passageiros"
      >
        <p>Regulamento do clube de benefícios dos passageiros da OXI plataforma de mobilidade urbana.


Por este instrumento particular, as partes têm entre si, justo e acertado o presente regulamento, que se regerá pelos itens seguintes e pelas condições descritas no presente.    




A)	ANJO PLATAFORMA DE TECNOLOGIA E SERVIÇOS LTDA, inscrita no CNPJ 29.619.619/0001-60, situada na Estrada da Uruçanga estrada nº 45, Jacarepaguá, Rio de Janeiro, RJ - CEP 22.750-030.
Nesta se faz presente com nome fantasia OXI plataforma de mobilidade urbana.



Introdução principal:
A OXI plataforma de mobilidade urbana foi desenvolvida para gerar mais viabilidade e conforto de forma justa e harmônica nos transportes de passageiros por aplicativo, gerando maneiras de bonificação para os motoristas e passageiros em produtos e serviços das empresas parceiras cadastradas no nicho em referência (baterias veicular, seguros e proteção veicular, pneus, amortecedores e dentre outros) e consultas online gratuitas em setores específicos como, por exemplo: (Psicologia, acessória jurídica Educação financeira e entre outra).


1 - Pode realizar o cadastro o passageiro terá de ter  idade igual ou maior de 18 anos de idade.
2 - Pode realizar o cadastro o passageiro  terá de  acesso a Internet para baixar o aplicativo OXI mobilidade urbana.
3 - Todos os produtos e serviços dos nossos parceiros dentro da plataforma OXI inclusive o bônus de ajuda manutenção, estão condicionado ao clube de benefícios e fidelidade da OXI plataforma de mobilidade urbana.
Das consultorias online:
4 - Consultorias online gratuitas para passageiros, motoristas parceiros seus familiares.
A - Ajuda psicológica 
B - Ajuda jurídica 
C - Educação financeira 
D - Nutricionista 
E - Coaching de carreira 
F - Educador Físico.

A - Ajuda psicológica 
A.1- Consulta online psicológica:
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios de passageiros para ser direcionado para a página do mesmo e em consulta online da área de  psicologia, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
O passageiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online, se o motorista parceiro não tiver condições financeiras, o mesmo terá que ser direcionado a um órgão público competente mais próximo.
Caso o passageiro parceiro tenha recursos financeiros para pagar a consulta, a mesma será de valor de consulta popular a ser definido com o profissional da área em referência, onde o profissional terá de repassar 10% do valor da consulta para plataforma OXI ou empresa parceira responsável.

B - Ajuda jurídica 
B.1- Consulta online jurídica:


No menu do app OX, no termo de uso clicar no clube de benefícios para passageiros para ser direcionado para a página do mesmo e em consulta online da área de  jurídica, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
O passageiro poderá ter direito a duas consultas online gratuita, se for confirmada a causa e o motorista tiver interesse em prosseguir e for de comum acordo com a assessoria jurídica, havendo sucesso, ou seja, causa for ganha, a assessoria jurídica terá direito a 30% do valor total da causa onde a mesma terá de repassar 10% para OXI ou empresa parceira responsável.

C - Educação financeira 
C.1 - Consulta online Educador financeiro:
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios  passageiro para ser direcionado para a página do mesmo e em consulta online da área de  educador financeiro , agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
Em caso de atraso, terá uma tolerância de 5 minutos.
O passageiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online e o motorista desejar prosseguir com as consultas de forma remunerada, será cobrado o valor de consulta popular, a ser definido com o profissional onde  terá de repassar 10% do valor da consulta  para plataforma OXI ou empresa responsável.


D - Nutricionista 
D.1 - Consulta online Nutricionista:
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios passageiros para ser direcionado para a página do mesmo e em consulta online da área de  nutrição, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
Em caso de atraso, terá uma tolerância de 5 minutos.
O passageiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online e o motorista desejar prosseguir com as consultas de forma remunerada, será cobrado o valor de consulta popular, a ser definido com o profissional onde  terá de repassar 10% do valor da consulta  para plataforma OXI ou empresa responsável.

E - Coaching de carreira 
E.1 - Consulta online Coaching de carreira 
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios passageiro  para ser direcionado para a página do mesmo e em consulta online da área de  coaching de carreira, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
Em caso de atraso, terá uma tolerância de 5 minutos.
O passageiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online e o motorista desejar prosseguir com as consultas de forma remunerada, será cobrado o valor de consulta popular, a ser definido com o profissional onde terá de repassar 10% do valor da consulta  para plataforma OXI ou empresa responsável.

F - Educador Físico.
F.1 - Consulta online educador físico: 
No menu do app OXI, no termo de uso o usuário vai   clicar no clube de benefícios passageiros para ser direcionado para a página do mesmo e em consulta online da área de   educador físico, agendar consulta.
Vai abrir o calendário com as datas e horários disponíveis.
Cada consulta vai ter um tempo estimado de 20 a 30 minutos. 
Em caso de atraso, terá uma tolerância de 5 minutos.
O passageiro poderá ter direito a duas consultas online gratuita, se precisar ser atendido de forma presencial ou tiver necessidade de mais de duas consultas online e o motorista desejar prosseguir com as consultas de forma remunerada, será cobrado o valor de consulta popular, a ser definido com o profissional onde terá de repassar 10% do valor da consulta  para plataforma OXI ou empresa responsável.


5 – O passageiro poderá ter descontos em todos os produtos e serviços do clube de benefícios da plataforma OXI.
</p>
      </Modal>
    </>
  );
}
