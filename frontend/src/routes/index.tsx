import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Upload, Sparkles, Bot, BarChart3, Wand2, ShieldCheck,
  Zap, FileText, Brain, LineChart, Github, BookOpen, CheckCircle2, FileSpreadsheet,
} from "lucide-react";
import { Logo } from "@/components/dp/Logo";
import { ThemeToggle } from "@/components/dp/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DataPilot AI — Your AI Data Analyst" },
      { name: "description", content: "Upload any CSV and get instant AI-powered profiling, visualizations, insights, and reports." },
      { property: "og:title", content: "DataPilot AI — Your AI Data Analyst" },
      { property: "og:description", content: "Upload any CSV and get instant AI-powered profiling, visualizations, insights, and reports." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Nav />
      <Hero />
      <Features />
      <AgentsStrip />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 px-4 sm:px-8 pt-4">
      <div className="max-w-7xl mx-auto glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-soft">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#agents" className="hover:text-foreground transition">AI Agents</a>
          <a href="#" className="hover:text-foreground transition inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> Docs</a>
          <a href="#" className="hover:text-foreground transition inline-flex items-center gap-1.5"><Github className="h-3.5 w-3.5" /> GitHub</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/dashboard" className="hidden sm:inline-flex h-9 px-4 items-center rounded-xl gradient-bg text-white text-sm font-medium shadow-glow hover:opacity-95 transition">
            Launch app
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-4 sm:px-8 pt-20 pb-24">
      <div className="absolute inset-0 mesh-bg opacity-60 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 gradient-bg" />
              </span>
              5 AI agents working in concert
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
              Your <span className="gradient-text">AI Data</span><br /> Analyst.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Upload any CSV dataset and instantly receive intelligent profiling,
              visualizations, AI insights, cleaning recommendations, and professional reports —
              all in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="group inline-flex items-center gap-2 h-12 px-6 rounded-xl gradient-bg text-white font-medium shadow-glow hover:shadow-elegant transition-all">
                <Upload className="h-4 w-4" /> Upload Dataset
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link to="/dashboard" search={{ demo: true } as never} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl glass-strong font-medium hover:shadow-soft transition-all">
                <Sparkles className="h-4 w-4 text-primary" /> View Demo
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["12k+", "rows / sec"],
                ["5", "AI agents"],
                ["< 3s", "to insights"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-semibold gradient-text">{n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-[520px] animate-slide-up" style={{ animationDelay: "0.15s" }}>
      {/* Main dashboard card */}
      <div className="absolute inset-0 rounded-3xl glass-strong shadow-elegant overflow-hidden">
        <div className="p-5 border-b border-border/60 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <div className="ml-3 text-xs text-muted-foreground font-mono">customer_transactions_2024.csv</div>
          <div className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success font-medium">Analyzed</div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[["12,483", "Rows"], ["18", "Columns"], ["92%", "Quality"]].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-card/60 border border-border/60 p-3">
                <div className="text-xs text-muted-foreground">{l}</div>
                <div className="text-lg font-semibold mt-0.5">{v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-card/60 border border-border/60 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium">Monthly revenue</div>
              <div className="text-[10px] text-muted-foreground">+34% YoY</div>
            </div>
            <svg viewBox="0 0 300 80" className="w-full h-20">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.22 300)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="oklch(0.7 0.22 300)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 60 L30 55 L60 50 L90 40 L120 45 L150 30 L180 35 L210 22 L240 25 L270 12 L300 8 L300 80 L0 80 Z" fill="url(#g1)" />
              <path d="M0 60 L30 55 L60 50 L90 40 L120 45 L150 30 L180 35 L210 22 L240 25 L270 12 L300 8" fill="none" stroke="oklch(0.56 0.24 295)" strokeWidth="2" />
            </svg>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 flex items-start gap-3">
            <div className="h-8 w-8 shrink-0 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium">Insight Agent</div>
              <div className="text-xs text-muted-foreground mt-0.5 truncate">
                Customers with 10%+ discounts are 2.3× more likely to return.
              </div>
            </div>
            <div className="ml-auto text-[10px] text-primary font-semibold">94%</div>
          </div>
        </div>
      </div>

      {/* Floating insight chip */}
      <div className="absolute -left-4 top-24 glass-strong rounded-2xl px-4 py-3 shadow-glow animate-float hidden sm:flex items-center gap-3 max-w-[240px]">
        <Brain className="h-5 w-5 text-primary shrink-0" />
        <div>
          <div className="text-xs font-medium">Anomaly detected</div>
          <div className="text-[10px] text-muted-foreground">47 rows · Germany · Mar 14</div>
        </div>
      </div>

      {/* Floating agent badge */}
      <div className="absolute -right-3 bottom-20 glass-strong rounded-2xl p-4 shadow-glow animate-float hidden sm:block" style={{ animationDelay: "1.5s" }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <div className="text-xs font-medium">5 / 5 agents</div>
        </div>
        <div className="flex -space-x-2">
          {[Bot, Wand2, BarChart3, Brain, FileText].map((Icon, i) => (
            <div key={i} className="h-7 w-7 rounded-full gradient-bg ring-2 ring-card flex items-center justify-center">
              <Icon className="h-3.5 w-3.5 text-white" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Features() {
  const items = [
    { icon: FileSpreadsheet, title: "Instant profiling", desc: "Schema, types, distributions, and quality scoring within seconds of upload." },
    { icon: Wand2, title: "Smart cleaning", desc: "AI-suggested fixes for duplicates, nulls, outliers, and inconsistent formats." },
    { icon: LineChart, title: "Auto visualizations", desc: "The right chart for the right column — histograms, correlations, trends, more." },
    { icon: Brain, title: "AI insights", desc: "Correlations, anomalies, leakage warnings, and business recommendations." },
    { icon: ShieldCheck, title: "Privacy first", desc: "Your data stays in your workspace. No training, no leaking." },
    { icon: Zap, title: "Built for speed", desc: "Optimized for large CSVs and snappy, fluid interactions throughout." },
  ];
  return (
    <section id="features" className="px-4 sm:px-8 py-24 relative">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3">Capabilities</div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Everything you need to <span className="gradient-text">understand</span> your data.</h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((f, i) => (
            <div key={f.title} className="group rounded-2xl glass p-6 hover:shadow-glow hover:-translate-y-0.5 transition-all animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:gradient-bg group-hover:text-white transition-all">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold">{f.title}</div>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentsStrip() {
  const agents = [
    { icon: FileSpreadsheet, name: "Profile" },
    { icon: Wand2, name: "Cleaning" },
    { icon: BarChart3, name: "Visualization" },
    { icon: Brain, name: "Insight" },
    { icon: FileText, name: "Report" },
  ];
  return (
    <section id="agents" className="px-4 sm:px-8 py-24">
      <div className="max-w-7xl mx-auto rounded-3xl glass-strong p-10 sm:p-14 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" />
        <div className="relative grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3">Multi-agent system</div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Five specialist agents. <span className="gradient-text">One workspace.</span></h2>
            <p className="mt-5 text-muted-foreground max-w-lg">
              Each agent owns a stage of the analysis pipeline and collaborates in real time — so you see results as they're discovered.
            </p>
          </div>
          <div className="relative">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" fill="none">
              <defs>
                <linearGradient id="ln" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.56 0.24 295)" stopOpacity="0" />
                  <stop offset="50%" stopColor="oklch(0.7 0.22 300)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="oklch(0.56 0.24 295)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M60 60 C 200 60, 200 160, 340 160" stroke="url(#ln)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M60 260 C 200 260, 200 160, 340 160" stroke="url(#ln)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M60 160 L 340 160" stroke="url(#ln)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
            <div className="relative grid grid-cols-2 gap-4">
              {agents.map((a, i) => (
                <div key={a.name} className={`rounded-2xl glass p-4 flex items-center gap-3 shadow-soft animate-slide-up ${i === 4 ? "col-span-2 justify-self-center w-1/2 min-w-[180px]" : ""}`} style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                    <a.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{a.name} Agent</div>
                    <div className="text-[11px] text-success flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> ready</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-4 sm:px-8 pb-24">
      <div className="max-w-5xl mx-auto rounded-3xl gradient-bg p-12 sm:p-16 text-center text-white shadow-glow relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 20%, white, transparent 40%)" }} />
        <h2 className="relative text-4xl sm:text-5xl font-semibold tracking-tight">Ready to meet your AI analyst?</h2>
        <p className="relative mt-4 text-white/85 max-w-xl mx-auto">Drop in a CSV and let DataPilot do the rest. No setup, no boilerplate.</p>
        <Link to="/dashboard" className="relative inline-flex items-center gap-2 mt-8 h-12 px-7 rounded-xl bg-white text-primary font-medium hover:bg-white/95 transition">
          <Upload className="h-4 w-4" /> Upload your dataset <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 sm:px-8 pb-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <Logo />
        <div>© 2026 DataPilot AI · Crafted with care for data teams.</div>
      </div>
    </footer>
  );
}
