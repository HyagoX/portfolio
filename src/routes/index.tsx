import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

import profileImg from "@/assets/profile.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

/**
 * ===================================================================
 *  PORTFÓLIO PESSOAL — HYAGO
 *  Dark mode · frosted glass · monocromático
 * ===================================================================
 *
 *  FORMULÁRIO DE CONTATO (Formspree)
 *  -----------------------------------------------------------------
 *  Para receber as mensagens em hyagojmaria@gmail.com:
 *  1. Crie uma conta gratuita em https://formspree.io
 *  2. Crie um "New Project" → "New Form" e confirme o e-mail de destino
 *     (hyagojmaria@gmail.com). O Formspree gera um endpoint do tipo
 *     https://formspree.io/f/xxxxxxxx (o "xxxxxxxx" é o ID do form).
 *  3. Cole o ID abaixo em FORMSPREE_FORM_ID.
 *  Sem isso, o formulário continua funcionando visualmente, mas o envio
 *  retorna erro até o ID ser preenchido.
 */
const FORMSPREE_FORM_ID = "SEU_ID_DO_FORMSPREE"; // <-- substitua aqui
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
const CONTACT_EMAIL = "hyagojmaria@gmail.com";

/* ---------- Dados ---------- */
const skills = [
  { name: "HTML", desc: "Estrutura semântica e limpa." },
  { name: "CSS", desc: "Design responsivo e moderno." },
  { name: "JavaScript", desc: "Interatividade leve e fluida." },
  { name: "Python", desc: "Automação e dados." },
];

const aiSkill = {
  name: "Ferramentas de Inteligência Artificial",
  desc: "Uso de IA para acelerar criação, copy e prototipagem.",
};

type Project = {
  title: string;
  description: string;
  image: string;
  tag: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "Nimbus Fintech",
    description:
      "Landing page de captação com foco em conversão e velocidade de carregamento.",
    image: project1,
    tag: "Fintech",
    link: "#",
  },
  {
    title: "Vita Wellness",
    description:
      "Página de vendas para curso online com copy persuasiva e checkout otimizado.",
    image: project2,
    tag: "Educação",
    link: "#",
  },
  {
    title: "Café Aurora",
    description:
      "Site institucional responsivo com formulário de contato e integração de agendamentos.",
    image: project3,
    tag: "Marca local",
    link: "#",
  },
];

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

/* ---------- Hook: revelar elementos ao rolar ---------- */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window) || elements.length === 0) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hyago — Landing Pages de Alta Conversão" },
      {
        name: "description",
        content:
          "Especialista em desenvolvimento de landing pages simples, rápidas e de alta conversão.",
      },
      { property: "og:title", content: "Hyago — Landing Pages de Alta Conversão" },
      {
        property: "og:description",
        content:
          "Especialista em desenvolvimento de landing pages simples, rápidas e de alta conversão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background font-body text-foreground">
      <BackgroundOrbs />

      {/* ===================== HEADER / MENU ===================== */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        {/* ===================== HERO ===================== */}
        <HeroSection />

        {/* ===================== SOBRE / HABILIDADES ===================== */}
        <SkillsSection />

        {/* ===================== PROJETOS ===================== */}
        <ProjectsSection />

        {/* ===================== CONTATO ===================== */}
        <ContactSection />
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-6 sm:flex-row">
          <p className="font-display text-lg font-semibold tracking-tight">
            Hyago<span className="text-foreground/40">.</span>
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Hyago — Feito com atenção aos detalhes.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Orbs de luz no fundo ---------- */
function BackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Orbs brancas/cinza flutuando para criar profundidade */}
      <div
        className="absolute -left-32 -top-40 size-[520px] rounded-full bg-foreground/[0.07] blur-[130px]"
        style={{ animation: "drift 16s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-40 top-1/3 size-[560px] rounded-full bg-foreground/[0.05] blur-[150px]"
        style={{ animation: "drift 20s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute bottom-0 left-1/4 size-[460px] rounded-full bg-foreground/[0.04] blur-[130px]"
        style={{ animation: "drift 24s ease-in-out infinite" }}
      />
    </div>
  );
}

/* ---------- Header fixo ---------- */
function Header({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2">
      <nav className="glass-panel flex items-center justify-between rounded-2xl px-5 py-3 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]">
        {/* Logo */}
        <a href="#inicio" className="font-display text-lg font-semibold tracking-tight">
          Hyago<span className="text-foreground/40">.</span>
        </a>

        {/* Links — desktop */}
        <div className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA — desktop */}
        <a
          href="#contato"
          className="hidden rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent md:inline-flex"
        >
          Vamos conversar
        </a>

        {/* Botão menu — mobile */}
        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex size-9 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/5 text-foreground md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[5px]">
            <span
              className={`h-[2px] w-5 bg-foreground transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-[2px] w-5 bg-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[2px] w-5 bg-foreground transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Menu suspenso — mobile */}
      {menuOpen && (
        <div className="glass-panel mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="mt-1 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            Vamos conversar
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function HeroSection() {
  return (
    <section id="inicio" className="mx-auto max-w-5xl px-6 pb-28 pt-40 md:pt-44">
      <div className="reveal glass-panel rounded-[2rem] p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] md:p-14">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
          {/* Foto de perfil redonda */}
          <div className="shrink-0">
            <div className="rounded-full bg-gradient-to-br from-foreground/25 to-foreground/5 p-1.5">
              <img
                src={profileImg}
                alt="Foto de perfil de Hyago"
                width={192}
                height={192}
                className="size-40 rounded-full object-cover md:size-48"
              />
            </div>
          </div>

          {/* Texto de impacto */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-foreground/70">
              <span className="size-1.5 rounded-full bg-foreground" />
              Disponível para novos projetos
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Hyago <span className="text-foreground/40">—</span>{" "}
              <span className="text-foreground">Landing Pages</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/65 md:text-lg">
              Especialista em desenvolvimento de Landing Pages simples, rápidas e
              de alta conversão.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="#projetos"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-accent"
              >
                Ver projetos
              </a>
              <a
                href="#contato"
                className="rounded-xl border border-foreground/15 bg-foreground/5 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-foreground/10"
              >
                Fale comigo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sobre / Habilidades ---------- */
function SkillsSection() {
  return (
    <section id="sobre" className="mx-auto max-w-5xl px-6 py-14">
      <div className="reveal">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-foreground/40">
          Sobre & Habilidades
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Ferramentas que transformam ideias em vendas
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/55">
          Combino código limpo e estética minimalista para construir páginas que
          carregam rápido e convertem visitantes em clientes.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            className="reveal glass-panel rounded-2xl p-6 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.07]"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <p className="font-display text-lg font-medium">{skill.name}</p>
            <p className="mt-1 text-sm text-foreground/50">{skill.desc}</p>
          </div>
        ))}

        {/* Card de IA — ocupa 2 colunas, com leve destaque */}
        <div className="reveal col-span-2 rounded-2xl border border-foreground/15 bg-gradient-to-br from-foreground/[0.08] to-foreground/[0.02] p-6 backdrop-blur-xl transition-colors hover:border-foreground/25">
          <p className="font-display text-lg font-medium">{aiSkill.name}</p>
          <p className="mt-1 text-sm text-foreground/60">{aiSkill.desc}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projetos ---------- */
function ProjectsSection() {
  return (
    <section id="projetos" className="mx-auto max-w-5xl px-6 py-14">
      <div className="reveal">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-foreground/40">
          Projetos
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Trabalhos em destaque
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {projects.map((project, i) => (
          <article
            key={project.title}
            className="reveal group overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-foreground/[0.07]"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {/* Imagem do projeto */}
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={`Preview do projeto ${project.title}`}
                width={1024}
                height={656}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <span className="text-xs uppercase tracking-[0.18em] text-foreground/40">
                {project.tag}
              </span>
              <h3 className="mt-1 font-display text-lg font-medium">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                {project.description}
              </p>
              <a
                href={project.link}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-all group-hover:gap-2"
              >
                Ver Projeto <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="reveal mt-6 text-xs text-foreground/40">
        * Projetos fictícios para demonstração — substitua pelos seus trabalhos
        reais.
      </p>
    </section>
  );
}

/* ---------- Contato ---------- */
type Status = "idle" | "sending" | "success" | "error";

function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-foreground/40 focus:bg-foreground/10 focus:outline-none";

  return (
    <section id="contato" className="mx-auto max-w-5xl px-6 pb-28 pt-14">
      <div className="reveal glass-panel rounded-[2rem] p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] md:p-12">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Coluna de texto */}
          <div>
            <p className="font-display text-xs uppercase tracking-[0.25em] text-foreground/40">
              Contato
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Vamos criar sua próxima landing page
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/60">
              Envie sua mensagem e recebo diretamente no e-mail{" "}
              <span className="text-foreground">{CONTACT_EMAIL}</span>. Respondo em
              até 24h.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-flex items-center text-sm font-medium underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Formulário */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* E-mail de destino (Formspree usa _replyto) */}
            <input type="hidden" name="_replyto" value={CONTACT_EMAIL} />
            {/* Assunto padrão para organizar a caixa de entrada */}
            <input type="hidden" name="_subject" value="Novo contato via portfólio" />

            <div>
              <label htmlFor="nome" className="mb-1.5 block text-xs text-foreground/50">
                Nome
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                autoComplete="name"
                placeholder="Seu nome"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs text-foreground/50">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="voce@email.com"
                className={inputClasses}
              />
            </div>

            <div>
              <label
                htmlFor="mensagem"
                className="mb-1.5 block text-xs text-foreground/50"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={4}
                required
                placeholder="Conte sobre o seu projeto"
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensagem"}
            </button>

            {/* Feedback de envio */}
            {status === "success" && (
              <p className="rounded-lg border border-foreground/15 bg-foreground/5 px-4 py-3 text-sm text-foreground">
                Mensagem enviada com sucesso! Em breve eu respondo. ✦
              </p>
            )}
            {status === "error" && (
              <p className="rounded-lg border border-foreground/15 bg-foreground/5 px-4 py-3 text-sm text-foreground/70">
                Ocorreu um erro ao enviar. Tente novamente ou escreva direto
                para {CONTACT_EMAIL}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
