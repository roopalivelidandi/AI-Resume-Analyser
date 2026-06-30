import { Link } from "@tanstack/react-router";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 group">
      <div className="relative h-9 w-9 rounded-xl gradient-bg shadow-glow flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-8" />
          <circle cx="9" cy="11" r="1.4" fill="currentColor" />
          <circle cx="13" cy="15" r="1.4" fill="currentColor" />
          <circle cx="21" cy="7" r="1.4" fill="currentColor" />
        </svg>
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight">DataPilot <span className="gradient-text">AI</span></span>
        <span className="text-[10px] text-muted-foreground tracking-wider uppercase">Intelligent Analytics</span>
      </div>
    </Link>
  );
}
