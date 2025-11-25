"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// HEADER --------------------------------------------------
function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="h-10 w-32 flex items-center">
        <img src="/logo.png" alt="Logo OXI" className="h-10 object-contain" />
      </div>

      <nav className="hidden md:flex gap-6 text-white text-sm">
        <a href="#features" className="hover:text-[#FF746C]">
          Recursos
        </a>
        <a href="#app" className="hover:text-[#FF746C]">
          App
        </a>
        <a href="#contato" className="hover:text-[#FF746C]">
          Contato
        </a>
      </nav>
    </header>
  );
}

// FOOTER --------------------------------------------------
function Footer() {
  return (
    <footer className="w-full bg-black text-white py-10 mt-32 flex flex-col items-center gap-4 border-t border-white/10">
      <img src="/logo.png" alt="Logo" className="h-12 object-contain" />

      <p className="text-sm opacity-70">
        © {new Date().getFullYear()} OXI Mobilidade — Todos os direitos reservados.
      </p>
    </footer>
  );
}

// PAGE ----------------------------------------------------
export default function Page() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const botaoRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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
          {/* Imagem principal */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('/passageiro-motorista.jpg')" }}
          />

          <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            OXI Mobilidade
          </h1>

          <p className="relative text-lg md:text-xl max-w-2xl text-gray-300 mb-6">
            Mobilidade urbana moderna, simples e acessível — do jeito que deveria ser.
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
        <section ref={addToRefs} id="features" className="py-28 px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">O que é a OXI?</h2>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            A OXI é uma plataforma de transporte e mobilidade que traz leveza,
            velocidade e praticidade para o seu dia a dia.
          </p>
        </section>

        {/* BENEFÍCIOS */}
        <section ref={addToRefs} className="py-24 px-8">
  <h2 className="text-4xl text-center font-bold mb-16">Por que escolher a OXI?</h2>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">

    {/* TARIFAS MAIS BAIXAS */}
    <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
      <h3 className="text-xl font-semibold mb-3">Tarifas mais baixas</h3>
      <p className="text-gray-400 text-sm">
        Viagens acessíveis para passageiros e mais ganhos para motoristas.
      </p>
    </div>

    {/* TRANSPARÊNCIA TOTAL */}
    <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
      <h3 className="text-xl font-semibold mb-3">Transparência total</h3>
      <p className="text-gray-400 text-sm">
        Sem taxas escondidas. Você sabe exatamente o que está pagando ou recebendo.
      </p>
    </div>

    {/* QUALIDADE DE VIDA */}
    <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
      <h3 className="text-xl font-semibold mb-3">Qualidade de vida</h3>
      <p className="text-gray-400 text-sm">
        Suporte em saúde mental, orientação financeira e bem-estar para nossos parceiros.
      </p>
    </div>

    {/* OPORTUNIDADES DE CRESCIMENTO */}
    <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
      <h3 className="text-xl font-semibold mb-3">Oportunidades de crescimento</h3>
      <p className="text-gray-400 text-sm">
        Mais do que corridas — a OXI conecta você a novas possibilidades.
      </p>
    </div>

    {/* APOIO NO VEÍCULO */}
    <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
      <h3 className="text-xl font-semibold mb-3">Apoio no veículo</h3>
      <p className="text-gray-400 text-sm">
        Manutenção, financiamento de carros novos e seminovos, proteção e seguro veicular.
      </p>
    </div>

    {/* AUXÍLIO COMBUSTÍVEL */}
    <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
      <h3 className="text-xl font-semibold mb-3">Auxílio combustível diário</h3>
      <p className="text-gray-400 text-sm">
        Apoio direto para reduzir custos e aumentar a renda dos motoristas.
      </p>
    </div>

    {/* MANUTENÇÃO GARANTIDA */}
    <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
      <h3 className="text-xl font-semibold mb-3">Manutenção garantida</h3>
      <p className="text-gray-400 text-sm">
        Receba até R$ 1.000 em ajuda de manutenção a cada três meses.
      </p>
    </div>

        {/* SEGURANÇA EM PRIMEIRO LUGAR */}
      <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
        <h3 className="text-xl font-semibold mb-3">Segurança em primeiro lugar</h3>
        <p className="text-gray-400 text-sm">
          Verificação rígida, proteção em viagens e suporte humano sempre disponível.
        </p>
      </div>
    {/* SUPORTE 24/7 */}
    <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
      <h3 className="text-xl font-semibold mb-3">Suporte 24/7</h3>
      <p className="text-gray-400 text-sm">
        Equipe dedicada pronta para ajudar motoristas e passageiros a qualquer hora.
      </p>
    </div>
    {/* PAGAMENTO RÁPIDO */}
    <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
      <h3 className="text-xl font-semibold mb-3">Pagamento no Pix</h3>
      <p className="text-gray-400 text-sm">
        Receba suas viagens na hora sem taxa escondida.
      </p>
    </div>
  </div>
</section>

        {/* MOCKUP APP */}
        <section ref={addToRefs} id="app" className="py-28 px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">Veja como será</h2>

          <div className="max-w-4xl mx-auto bg-[#0b0b0b] p-10 rounded-3xl border border-[#222] shadow-xl">
            <img
              src="/mockupapp.jpg"
              alt="Mockup do App"
              className="w-full h-auto rounded-2xl opacity-90"
            />
            <p className="mt-6 text-gray-400">Mockup provisório.</p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section ref={addToRefs} className="py-32 px-6 text-center bg-[#FF746C] text-black" id="contato">
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

        <Footer />
      </main>
    </>
  );
}
