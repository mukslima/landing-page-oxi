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
        <a href="#oqoxi" className="hover:text-[#FF746C]">
          O que é a OXI?
        </a>
        <a href="#beneficios" className="hover:text-[#FF746C]">
          Benefícios
        </a>
        <a href="#cadastro" className="hover:text-[#FF746C]">
          Cadastro
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
        <section ref={addToRefs} id="oqoxi" className="py-28 px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">O que é a OXI?</h2>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            A OXI é uma plataforma de transporte e mobilidade criada para facilitar a vida de motoristas e passageiros.
            Um app leve, rápido e direto ao ponto — feito para oferecer viagens mais justas, confortáveis e seguras, 
            enquanto dá aos motoristas mais autonomia, apoio e oportunidades reais.
          </p>
        </section>

        {/* BENEFÍCIOS */}
        <section id="beneficios" ref={addToRefs} className="py-24 px-8">
          <h2 className="text-4xl text-center font-bold mb-16">Por que escolher a OXI?</h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">

            {/* TARIFAS MAIS BAIXAS */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Tarifas mais baixas</h3>
              <p className="text-gray-400 text-sm">
                Viagens mais baratas sem sacrificar a qualidade.
              </p>
            </div>

            {/* TRANSPARÊNCIA */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Transparência total</h3>
              <p className="text-gray-400 text-sm">
                Nada de surpresa: valores claros pra motoristas e passageiros.
              </p>
            </div>

            {/* QUALIDADE DE VIDA */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Qualidade de vida</h3>
              <p className="text-gray-400 text-sm">
                Apoio em saúde emocional, financeira e bem-estar.
              </p>
            </div>

            {/* OPORTUNIDADES */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Crescimento real</h3>
              <p className="text-gray-400 text-sm">
                A OXI cria oportunidades além das corridas.
              </p>
            </div>

            {/* VEÍCULO */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Apoio com o veículo</h3>
              <p className="text-gray-400 text-sm">
                Manutenção, financiamento e suporte pra manter o carro em dia.
              </p>
            </div>

            {/* COMBUSTÍVEL */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Auxílio combustível diário</h3>
              <p className="text-gray-400 text-sm">
                Redução real de custos pra quem roda todos os dias.
              </p>
            </div>

            {/* MANUTENÇÃO */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Manutenção garantida</h3>
              <p className="text-gray-400 text-sm">
                Ajuda de até R$ 1.000 a cada 3 meses para motoristas.
              </p>
            </div>

            {/* SEGURANÇA */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Segurança primeiro</h3>
              <p className="text-gray-400 text-sm">
                Tecnologia + verificação rígida + suporte humano imediato.
              </p>
            </div>

            {/* SUPORTE */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Suporte 24/7</h3>
              <p className="text-gray-400 text-sm">
                Atendimento humano sempre disponível.
              </p>
            </div>

            {/* PAGAMENTO */}
            <div className="bg-[#0b0b0b] p-10 rounded-3xl shadow-lg border border-[#222] hover:-translate-y-2 transition-transform">
              <h3 className="text-xl font-semibold mb-3">Pix instantâneo</h3>
              <p className="text-gray-400 text-sm">
                Receba suas corridas na hora, sem taxas escondidas.
              </p>
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

        <Footer />
      </main>
    </>
  );
}
