import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutGrid, Database, Wand2, BarChart3, Sparkles, FileText, Settings as SettingsIcon,
  Upload, ArrowLeft, Search, Download, Share2, ChevronRight, CheckCircle2, Loader2,
  AlertTriangle, TrendingUp, Lightbulb, Target, Shield, Brain, FileSpreadsheet,
  Maximize2, RefreshCw, ImageIcon, Bot,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter, Legend, AreaChart, Area,
} from "recharts";
import { Logo } from "@/components/dp/Logo";
import { ThemeToggle } from "@/components/dp/ThemeToggle";
import {
  overview, profileRows, recommendations, insights, amountHistogram,
  categoryShare, monthlyTrend, scatterData, correlations, agents, datasetName,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Workspace · DataPilot AI" },
      { name: "description", content: "Your AI-powered data analytics workspace." },
    ],
  }),
  component: Dashboard,
});

type Section = "overview" | "profile" | "cleaning" | "viz" | "insights" | "reports" | "settings";

const PALETTE = ["#7C3AED", "#A855F7", "#C084FC", "#DDD6FE", "#9333EA", "#6D28D9"];

function Dashboard() {
  const [section, setSection] = useState<Section>("overview");
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  return (
    <div className="min-h-screen flex">
      <Sidebar section={section} setSection={setSection} disabled={!uploaded} />
      <main className="flex-1 min-w-0 flex flex-col">
        <TopBar section={section} uploaded={uploaded} />
        <div className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {!uploaded ? (
            loading ? (
              <LoadingExperience onDone={() => { setLoading(false); setUploaded(true); }} />
            ) : (
              <UploadScreen onUpload={(analysis) => { console.log("Backend Response:", analysis); setAnalysis(analysis); setLoading(true); }} />
            )
          ) : (
            <div key={section} className="animate-slide-up">
              {section === "overview" && <Overview />}
              {section === "profile" && <Profile />}
              {section === "cleaning" && <Cleaning />}
              {section === "viz" && <Visualizations />}
              {section === "insights" && <Insights />}
              {section === "reports" && <Reports />}
              {section === "settings" && <SettingsPanel />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ---------------- Sidebar / TopBar ---------------- */

const NAV: { id: Section; label: string; icon: any }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "profile", label: "Data Profile", icon: Database },
  { id: "cleaning", label: "Cleaning", icon: Wand2 },
  { id: "viz", label: "Visualizations", icon: BarChart3 },
  { id: "insights", label: "AI Insights", icon: Sparkles },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

function Sidebar({ section, setSection, disabled }: { section: Section; setSection: (s: Section) => void; disabled: boolean }) {
  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
      <div className="p-5 border-b border-sidebar-border">
        <Logo />
      </div>
      <nav className="p-3 space-y-1 flex-1">
        {NAV.map((n) => {
          const active = section === n.id;
          return (
            <button
              key={n.id}
              onClick={() => !disabled && setSection(n.id)}
              disabled={disabled}
              className={[
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                active
                  ? "gradient-bg text-white shadow-glow"
                  : "text-sidebar-foreground hover:bg-accent/60",
                disabled && "opacity-40 cursor-not-allowed",
              ].join(" ")}
            >
              <n.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{n.label}</span>
              {active && <ChevronRight className="h-3.5 w-3.5 ml-auto" />}
            </button>
          );
        })}
      </nav>
      <div className="p-4">
        <div className="rounded-2xl glass p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <div className="text-xs font-medium">All agents online</div>
          </div>
          <div className="text-[11px] text-muted-foreground">5 specialists ready to analyze.</div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ section, uploaded }: { section: Section; uploaded: boolean }) {
  return (
    <header className="sticky top-0 z-30 h-16 px-6 lg:px-8 flex items-center gap-4 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <Link to="/" className="lg:hidden flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>
      <div className="hidden lg:block">
        <div className="text-xs text-muted-foreground">Workspace</div>
        <div className="text-sm font-medium capitalize">
          {uploaded ? NAV.find((n) => n.id === section)?.label : "Upload"}
        </div>
      </div>
      {uploaded && (
        <div className="hidden md:flex items-center gap-2 ml-4 rounded-xl glass px-3 py-1.5 text-xs">
          <FileSpreadsheet className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono">{datasetName}</span>
          <span className="text-muted-foreground">· 3.4 MB</span>
        </div>
      )}
      <div className="ml-auto flex items-center gap-2">
        <button className="hidden sm:inline-flex h-9 px-3 items-center gap-2 rounded-xl glass text-sm hover:shadow-soft transition">
          <Search className="h-3.5 w-3.5" /> <span className="text-muted-foreground">Search</span>
        </button>
        <ThemeToggle />
        <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center text-white text-xs font-semibold shadow-glow">DP</div>
      </div>
    </header>
  );
}

/* ---------------- Upload ---------------- */

function UploadScreen({ onUpload }: {   onUpload: (analysis: any) => void; }) {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const start = async (file: File) => {
    setFileName(file.name);
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p === null) return 0;
        return Math.min(90, p + 8);
      });
    }, 120);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/upload/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const analysis = await response.json();

      clearInterval(timer);

      setProgress(100);

      setTimeout(() => {
        onUpload(analysis);
      }, 500);

    } catch (error) {

      clearInterval(timer);

      console.error(error);

      alert("Upload failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-10">
      <div className="text-center mb-10 animate-slide-up">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-4">
          <Sparkles className="h-3 w-3 text-primary" /> Start a new analysis
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Upload a CSV to begin</h1>
        <p className="text-muted-foreground mt-2">
          Drop in a dataset and DataPilot's agents will profile, clean, visualize, and explain it.
        </p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {e.preventDefault();setDragging(false);const file = e.dataTransfer.files?.[0];if (file) {start(file);}}}
        onClick={() => inputRef.current?.click()}
        className={[
          "relative cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all glass-strong",
          dragging ? "border-primary shadow-glow scale-[1.01]" : "border-border hover:border-primary/50 hover:shadow-elegant",
        ].join(" ")}
      >
        <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={(e) => {const file = e.target.files?.[0];if (file) {start(file);}}} />
        {progress === null ? (
          <>
            <div className="mx-auto h-16 w-16 rounded-2xl gradient-bg flex items-center justify-center shadow-glow mb-5 animate-float">
              <Upload className="h-7 w-7 text-white" />
            </div>
            <div className="text-lg font-medium">Drop your CSV here</div>
            <div className="text-sm text-muted-foreground mt-1">or click to browse · up to 100MB</div>
            <button className="mt-6 inline-flex h-10 px-5 items-center gap-2 rounded-xl gradient-bg text-white text-sm font-medium shadow-glow">
              <Upload className="h-4 w-4" /> Choose file
            </button>
            <div className="mt-8 flex flex-wrap justify-center gap-2 text-[11px] text-muted-foreground">
              <div className="mt-8 text-[11px] text-muted-foreground">
                  Demo datasets coming soon...
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-md mx-auto text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{fileName}</div>
                <div className="text-xs text-muted-foreground">{progress < 100 ? "Uploading…" : "Upload complete"}</div>
              </div>
              <div className="text-sm font-semibold">{Math.round(progress)}%</div>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full gradient-bg transition-all" style={{ width: `${progress}%` }} />
            </div>
            {progress >= 100 && (
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-success">
                <CheckCircle2 className="h-4 w-4" /> Uploaded — starting agents…
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Loading Experience ---------------- */

const LOAD_STAGES = [
  { label: "Uploading dataset", icon: Upload },
  { label: "Profiling data", icon: Database },
  { label: "Cleaning dataset", icon: Wand2 },
  { label: "Generating visualizations", icon: BarChart3 },
  { label: "Finding insights", icon: Sparkles },
  { label: "Preparing report", icon: FileText },
];

function LoadingExperience({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= LOAD_STAGES.length) { const t = setTimeout(onDone, 400); return () => clearTimeout(t); }
    const t = setTimeout(() => setStep((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <div className="max-w-2xl mx-auto pt-16">
      <div className="text-center mb-10">
        <div className="relative inline-block">
          <div className="h-20 w-20 rounded-3xl gradient-bg shadow-glow flex items-center justify-center mx-auto animate-pulse-glow">
            <Brain className="h-9 w-9 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">Agents are analyzing your data</h2>
        <p className="text-sm text-muted-foreground mt-1">This usually takes just a few seconds.</p>
      </div>
      <div className="rounded-2xl glass-strong p-2">
        {LOAD_STAGES.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={s.label} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ background: active ? "color-mix(in oklab, var(--primary) 8%, transparent)" : undefined }}>
              <div className={[
                "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-all",
                done ? "bg-success/15 text-success" : active ? "gradient-bg text-white shadow-glow" : "bg-muted text-muted-foreground",
              ].join(" ")}>
                {done ? <CheckCircle2 className="h-4 w-4" /> : active ? <Loader2 className="h-4 w-4 animate-spin" /> : <s.icon className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-[11px] text-muted-foreground">{done ? "completed" : active ? "in progress…" : "queued"}</div>
              </div>
              {active && <div className="text-[10px] text-primary font-semibold">…</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Overview ---------------- */

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n.toLocaleString()}{suffix}</>;
}

function Overview() {
  const cards = [
    { label: "Total rows", value: overview.rows, icon: Database, accent: "from-primary to-primary-glow" },
    { label: "Total columns", value: overview.columns, icon: LayoutGrid },
    { label: "Missing values", value: overview.missing, icon: AlertTriangle, tone: "warning" as const },
    { label: "Duplicate rows", value: overview.duplicates, icon: RefreshCw, tone: "warning" as const },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">A quick snapshot of your dataset's health.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-xl glass text-sm hover:shadow-soft transition inline-flex items-center gap-2"><RefreshCw className="h-3.5 w-3.5" /> Re-run agents</button>
          <button className="h-9 px-4 rounded-xl gradient-bg text-white text-sm shadow-glow inline-flex items-center gap-2"><Download className="h-3.5 w-3.5" /> Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={c.label} className="rounded-2xl glass-strong p-5 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-all animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between">
              <div className="text-xs text-muted-foreground">{c.label}</div>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${c.tone === "warning" ? "bg-warning/15 text-warning" : "bg-primary/10 text-primary"}`}>
                <c.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight">
              <CountUp to={c.value} />
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">Updated just now</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4">
        <QualityScoreCard score={overview.qualityScore} />
        <AgentWorkflow />
      </div>

      <div className="rounded-2xl glass-strong p-5 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium">Monthly revenue trend</div>
            <div className="text-xs text-muted-foreground">Auto-detected time series</div>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-success/15 text-success font-medium">+34% YoY</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 295)" />
              <XAxis dataKey="m" stroke="oklch(0.55 0.04 285)" fontSize={11} />
              <YAxis stroke="oklch(0.55 0.04 285)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2} fill="url(#ov)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function QualityScoreCard({ score }: { score: number }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const off = c - (score / 100) * c;
  return (
    <div className="rounded-2xl glass-strong p-6 shadow-soft flex flex-col">
      <div className="text-sm font-medium">Data quality score</div>
      <div className="text-xs text-muted-foreground">Aggregated across completeness, consistency, validity.</div>
      <div className="flex-1 grid place-items-center py-4">
        <div className="relative h-40 w-40">
          <svg viewBox="0 0 140 140" className="-rotate-90">
            <circle cx="70" cy="70" r={r} stroke="oklch(0.93 0.02 295)" strokeWidth="10" fill="none" />
            <defs>
              <linearGradient id="qg" x1="0" x2="1">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <circle
              cx="70" cy="70" r={r}
              stroke="url(#qg)" strokeWidth="10" fill="none"
              strokeDasharray={c} strokeDashoffset={off}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-4xl font-semibold gradient-text"><CountUp to={score} /></div>
              <div className="text-[11px] text-muted-foreground">/ 100</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
        {[["Completeness", 96], ["Consistency", 90], ["Validity", 89]].map(([l, v]) => (
          <div key={l as string} className="rounded-lg bg-muted/60 py-2">
            <div className="font-semibold">{v}%</div>
            <div className="text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentWorkflow() {
  return (
    <div className="rounded-2xl glass-strong p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-medium flex items-center gap-2"><Bot className="h-4 w-4 text-primary" /> Live agent workflow</div>
          <div className="text-xs text-muted-foreground">Five agents collaborating on your dataset.</div>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">streaming</span>
      </div>
      <div className="space-y-2">
        {agents.map((a, i) => {
          const isDone = a.status === "done";
          const isRun = a.status === "running";
          return (
            <div key={a.name} className="relative rounded-xl border border-border/60 p-3 flex items-center gap-3 bg-card/50">
              <div className={[
                "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                isDone ? "bg-success/15 text-success" : isRun ? "gradient-bg text-white shadow-glow" : "bg-muted text-muted-foreground",
              ].join(" ")}>
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : isRun ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{a.name}</div>
                <div className="text-[11px] text-muted-foreground truncate">{a.desc}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[11px] text-muted-foreground">{isDone ? a.time : isRun ? "running" : "queued"}</div>
                {isDone && <div className="text-[11px] text-primary font-semibold">{a.conf}%</div>}
              </div>
              {i < agents.length - 1 && <div className="absolute left-[28px] -bottom-2 h-2 w-px bg-border" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Profile ---------------- */

function Profile() {
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<"name" | "missingPct" | "unique">("name");
  const filtered = useMemo(() => {
    return profileRows
      .filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))
      .filter((r) => typeFilter === "all" || r.type === typeFilter)
      .sort((a, b) => {
        const av = a[sortKey] as any, bv = b[sortKey] as any;
        return typeof av === "string" ? av.localeCompare(bv) : av - bv;
      });
  }, [q, typeFilter, sortKey]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Data profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Per-column statistics and type detection.</p>
      </div>

      <div className="rounded-2xl glass-strong shadow-soft overflow-hidden">
        <div className="p-4 flex flex-wrap items-center gap-2 border-b border-border/60">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search columns…"
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-muted/50 border border-transparent focus:border-primary/40 focus:bg-card outline-none text-sm transition"
            />
          </div>
          <div className="flex items-center gap-1 rounded-xl glass p-1">
            {["all", "numeric", "categorical", "datetime", "text"].map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 h-8 rounded-lg text-xs capitalize transition ${typeFilter === t ? "gradient-bg text-white" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
            ))}
          </div>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as any)} className="h-10 px-3 rounded-xl glass text-sm">
            <option value="name">Sort: name</option>
            <option value="missingPct">Sort: missing %</option>
            <option value="unique">Sort: unique</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground bg-muted/40">
                {["Column", "Type", "Missing %", "Unique", "Mean", "Median", "Min", "Max", "Std"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.name} className="border-t border-border/60 hover:bg-accent/30 transition">
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3"><TypeChip type={r.type} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${r.missingPct > 10 ? "bg-warning" : "gradient-bg"}`} style={{ width: `${Math.min(100, r.missingPct * 4)}%` }} />
                      </div>
                      <span className="text-xs tabular-nums">{r.missingPct.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{r.unique.toLocaleString()}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{fmt(r.mean)}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{fmt(r.median)}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{fmt(r.min)}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{fmt(r.max)}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{fmt(r.std)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function fmt(n?: number) { return n === undefined ? "—" : n.toLocaleString(undefined, { maximumFractionDigits: 2 }); }
function TypeChip({ type }: { type: string }) {
  const map: Record<string, string> = {
    numeric: "bg-primary/10 text-primary",
    categorical: "bg-accent text-accent-foreground",
    datetime: "bg-warning/15 text-warning",
    text: "bg-muted text-muted-foreground",
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${map[type]}`}>{type}</span>;
}

/* ---------------- Cleaning ---------------- */

function Cleaning() {
  const [applied, setApplied] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Cleaning recommendations</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-suggested fixes, ranked by confidence and impact.</p>
        </div>
        <div className="text-xs text-muted-foreground">{applied.size} of {recommendations.length} applied</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((r, i) => {
          const isApplied = applied.has(r.id);
          return (
            <div key={r.id} className="rounded-2xl glass-strong p-5 shadow-soft hover:shadow-elegant transition-all animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-glow">
                  <Wand2 className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-sm font-semibold">{r.title}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{r.category}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{r.reason}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Meter label="Confidence" value={r.confidence} />
                <div>
                  <div className="text-[11px] text-muted-foreground mb-1">Impact</div>
                  <div className={`text-xs font-medium ${r.impact === "High" ? "text-warning" : r.impact === "Medium" ? "text-primary" : "text-muted-foreground"}`}>{r.impact}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="h-9 px-3 text-xs rounded-lg glass hover:shadow-soft transition">Preview changes</button>
                <button
                  disabled={isApplied}
                  onClick={() => setApplied((s) => new Set(s).add(r.id))}
                  className={[
                    "h-9 px-3 text-xs rounded-lg ml-auto inline-flex items-center gap-1.5 transition",
                    isApplied ? "bg-success/15 text-success" : "gradient-bg text-white shadow-glow hover:opacity-95",
                  ].join(" ")}
                >
                  {isApplied ? <><CheckCircle2 className="h-3.5 w-3.5" /> Applied</> : "Apply"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
        <span>{label}</span><span className="tabular-nums">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full gradient-bg transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

/* ---------------- Visualizations ---------------- */

const tooltipStyle = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid color-mix(in oklab, #7C3AED 15%, transparent)",
  borderRadius: 12,
  fontSize: 12,
  boxShadow: "0 8px 24px -8px rgba(124,58,237,0.2)",
};

const CHART_TYPES = ["Bar", "Pie", "Line", "Scatter", "Heatmap"] as const;
type ChartType = typeof CHART_TYPES[number];

function Visualizations() {
  const [type, setType] = useState<ChartType>("Bar");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Visualizations</h1>
          <p className="text-sm text-muted-foreground mt-1">DataPilot picked the best chart — feel free to switch.</p>
        </div>
        <div className="flex items-center gap-1 rounded-xl glass p-1">
          {CHART_TYPES.map((c) => (
            <button key={c} onClick={() => setType(c)} className={`px-3 h-8 text-xs rounded-lg transition ${type === c ? "gradient-bg text-white" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-4">
        <div className="rounded-2xl glass-strong p-5 shadow-soft">
          <ChartHeader title={`${type} chart`} subtitle="Recommended for `amount` distribution" />
          <div className="h-80">{renderChart(type)}</div>
        </div>
        <div className="rounded-2xl glass-strong p-5 shadow-soft">
          <ChartHeader title="Category share" subtitle="Auto-detected categorical column" />
          <div className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>
                  {categoryShare.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl glass-strong p-5 shadow-soft">
          <ChartHeader title="Monthly trend" subtitle="Revenue & orders over time" />
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 295)" />
                <XAxis dataKey="m" stroke="oklch(0.55 0.04 285)" fontSize={11} />
                <YAxis stroke="oklch(0.55 0.04 285)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="orders" stroke="#C084FC" strokeWidth={2.5} dot={{ r: 3 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl glass-strong p-5 shadow-soft">
          <ChartHeader title="Correlation heatmap" subtitle="Pearson correlation across numeric columns" />
          <Heatmap />
        </div>
      </div>
    </div>
  );
}

function ChartHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <div className="flex items-center gap-1">
        {[Maximize2, ImageIcon, Download].map((I, i) => (
          <button key={i} className="h-7 w-7 rounded-lg hover:bg-accent/60 grid place-items-center text-muted-foreground transition">
            <I className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
}

function renderChart(t: ChartType) {
  if (t === "Bar" || t === "Pie") {
    if (t === "Pie") {
      return (
        <ResponsiveContainer>
          <PieChart>
            <Pie data={amountHistogram} dataKey="count" nameKey="bin" outerRadius={110}>
              {amountHistogram.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      );
    }
    return (
      <ResponsiveContainer>
        <BarChart data={amountHistogram}>
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 295)" />
          <XAxis dataKey="bin" stroke="oklch(0.55 0.04 285)" fontSize={11} />
          <YAxis stroke="oklch(0.55 0.04 285)" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "color-mix(in oklab, #7C3AED 8%, transparent)" }} />
          <Bar dataKey="count" fill="url(#bg)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  if (t === "Line") {
    return (
      <ResponsiveContainer>
        <LineChart data={monthlyTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 295)" />
          <XAxis dataKey="m" stroke="oklch(0.55 0.04 285)" fontSize={11} />
          <YAxis stroke="oklch(0.55 0.04 285)" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  if (t === "Scatter") {
    return (
      <ResponsiveContainer>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 295)" />
          <XAxis dataKey="x" stroke="oklch(0.55 0.04 285)" fontSize={11} name="age" />
          <YAxis dataKey="y" stroke="oklch(0.55 0.04 285)" fontSize={11} name="amount" />
          <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={scatterData} fill="#A855F7" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
  return <Heatmap />;
}

function Heatmap() {
  const labels = correlations[0] as unknown as string[];
  const matrix = correlations.slice(1) as unknown as number[][];
  const color = (v: number) => {
    const a = Math.abs(v);
    return `oklch(${0.97 - a * 0.45} ${0.02 + a * 0.22} 295)`;
  };
  return (
    <div className="overflow-x-auto">
      <table className="text-xs mx-auto">
        <thead>
          <tr><th></th>{labels.map((l) => <th key={l} className="px-2 py-1 font-medium text-muted-foreground">{l}</th>)}</tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <td className="px-2 py-1 font-medium text-muted-foreground">{labels[i]}</td>
              {row.map((v, j) => (
                <td key={j} className="p-1">
                  <div className="h-12 w-12 rounded-lg grid place-items-center font-medium tabular-nums" style={{ background: color(v), color: Math.abs(v) > 0.5 ? "white" : "oklch(0.3 0.05 285)" }}>
                    {v.toFixed(2)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Insights ---------------- */

function Insights() {
  const iconMap: Record<string, any> = {
    trending: TrendingUp, alert: AlertTriangle, lightbulb: Lightbulb,
    target: Target, sparkles: Sparkles, shield: Shield,
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">AI insights</h1>
        <p className="text-sm text-muted-foreground mt-1">What our Insight Agent discovered in your data.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {insights.map((ins, i) => {
          const Icon = iconMap[ins.icon] ?? Sparkles;
          return (
            <div key={ins.id} className="group rounded-2xl glass-strong p-5 shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-glow">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{ins.category}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ins.priority === "High" ? "bg-warning/15 text-warning" : "bg-primary/10 text-primary"}`}>{ins.priority}</span>
                  </div>
                  <div className="text-sm font-semibold mt-2 leading-snug">{ins.title}</div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{ins.detail}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                <Meter label="Confidence" value={ins.confidence} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Reports ---------------- */

function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Report</h1>
          <p className="text-sm text-muted-foreground mt-1">A polished, shareable summary of this analysis.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-xl glass text-sm inline-flex items-center gap-2"><Share2 className="h-3.5 w-3.5" /> Share</button>
          <button className="h-9 px-4 rounded-xl glass text-sm inline-flex items-center gap-2"><Download className="h-3.5 w-3.5" /> CSV</button>
          <button className="h-9 px-4 rounded-xl gradient-bg text-white text-sm shadow-glow inline-flex items-center gap-2"><Download className="h-3.5 w-3.5" /> PDF</button>
        </div>
      </div>

      <div className="rounded-3xl glass-strong shadow-elegant overflow-hidden">
        <div className="p-8 border-b border-border/60 mesh-bg">
          <div className="text-[11px] uppercase tracking-wider text-primary font-semibold">DataPilot AI · Report</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Customer transactions analysis</h2>
          <div className="text-sm text-muted-foreground mt-1">Generated 28 Jun 2026 · {datasetName}</div>
        </div>

        <Section title="Executive summary">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The dataset is high quality (92/100) with minor cleanup required.
            Mobile is the strongest acquisition channel and discounts above 10% strongly correlate
            with repeat purchases. A small anomaly cluster from Germany on Mar 14 warrants review.
          </p>
        </Section>

        <Section title="Dataset overview">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[["Rows", "12,483"], ["Columns", "18"], ["Missing", "342"], ["Quality", "92/100"]].map(([l, v]) => (
              <div key={l} className="rounded-xl bg-muted/40 p-3">
                <div className="text-[11px] text-muted-foreground">{l}</div>
                <div className="text-base font-semibold mt-0.5">{v}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Key chart">
          <div className="h-60 rounded-xl bg-muted/30 p-3">
            <ResponsiveContainer>
              <BarChart data={amountHistogram}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 295)" />
                <XAxis dataKey="bin" fontSize={11} stroke="oklch(0.55 0.04 285)" />
                <YAxis fontSize={11} stroke="oklch(0.55 0.04 285)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" fill="#7C3AED" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Top insights">
          <ul className="space-y-3">
            {insights.slice(0, 4).map((i) => (
              <li key={i.id} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium">{i.title}</div>
                  <div className="text-xs text-muted-foreground">{i.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Recommendations">
          <ul className="space-y-2">
            {recommendations.slice(0, 4).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted/40 px-3 py-2">
                <div className="text-sm">{r.title}</div>
                <div className="text-[11px] text-primary font-semibold">{r.confidence}%</div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="p-8 border-b border-border/60 last:border-0">
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">{title}</div>
      {children}
    </section>
  );
}

/* ---------------- Settings ---------------- */

function SettingsPanel() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Personalize your DataPilot workspace.</p>
      </div>

      <SettingRow title="Theme" desc="Switch between light, dark, or system.">
        <div className="flex items-center gap-1 rounded-xl glass p-1">
          {["Light", "Dark", "System"].map((t, i) => (
            <button key={t} className={`px-3 h-8 text-xs rounded-lg ${i === 0 ? "gradient-bg text-white" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
      </SettingRow>
      <SettingRow title="Default export format" desc="Used when downloading reports.">
        <select className="h-10 px-3 rounded-xl glass text-sm"><option>PDF</option><option>CSV</option><option>JSON</option></select>
      </SettingRow>
      <SettingRow title="Language" desc="Interface language.">
        <select className="h-10 px-3 rounded-xl glass text-sm"><option>English</option><option>Français</option><option>Deutsch</option><option>日本語</option></select>
      </SettingRow>
      <SettingRow title="Email notifications" desc="When agents finish analyzing a dataset.">
        <Toggle defaultOn />
      </SettingRow>
      <SettingRow title="Anomaly alerts" desc="Notify me about high-priority insights.">
        <Toggle defaultOn />
      </SettingRow>
    </div>
  );
}

function SettingRow({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass-strong p-5 shadow-soft flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button onClick={() => setOn((v) => !v)} className={`h-7 w-12 rounded-full p-0.5 transition ${on ? "gradient-bg" : "bg-muted"}`}>
      <div className={`h-6 w-6 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}
