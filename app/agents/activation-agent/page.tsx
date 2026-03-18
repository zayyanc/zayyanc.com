"use client";

import { useState, useEffect, useRef } from "react";
import Nav from "../../components/Nav";

const TURNSTILE_SITE_KEY = "0x4AAAAAACskkmyTD2M7Y1mb";

const EXAMPLE_TRIGGERS = [
  {
    label: "First project, no deploy after 3 days",
    trigger: "User created first project but has not deployed after 3 days",
    userContext: { plan: "free", daysActive: 3, projectsCreated: 1, deploymentsCount: 0 },
  },
  {
    label: "Hit free plan rate limit twice this week",
    trigger: "User hit the free plan rate limit for the second time this week",
    userContext: { plan: "free", daysActive: 14, apiCallsThisWeek: 500, rateLimitHits: 2 },
  },
  {
    label: "Added a second seat for the first time",
    trigger: "User added a second seat to their workspace for the first time",
    userContext: { plan: "pro", daysActive: 7, teamSize: 2, deploymentsCount: 5 },
  },
];

const TOOL_LABELS: Record<string, { label: string; description: string }> = {
  get_user_history:  { label: "Message history",     description: "Checking prior contact" },
  check_suppression: { label: "Suppression check",   description: "Verifying opt-out status" },
  score_urgency:     { label: "Urgency score",        description: "Scoring behavioural signals" },
  decide_channel:    { label: "Channel decision",     description: "Committing routing decision" },
};

const CHANNEL_COLORS: Record<string, string> = {
  email:    "bg-[#0d2235] text-[#4da6ff]",
  "in-app": "bg-[#1a1a0d] text-[#b3a020]",
  both:     "bg-[#0d2e1a] text-[#3dd68c]",
  none:     "bg-[#1a1a1a] text-[#555]",
};

type ToolStatus = "pending" | "running" | "done";

type ToolStep = {
  toolName: string;
  toolCallId: string;
  status: ToolStatus;
  args: Record<string, unknown>;
  result: unknown;
};

type ChannelDecision = {
  channel: "email" | "in-app" | "both" | "none";
  reasoning: string;
  urgency: number;
};

type AgentOutput = {
  toolTrace: Array<{ toolName: string; args: Record<string, unknown>; result: unknown }>;
  decision: ChannelDecision | null;
  messages: { email: { subject: string; body: string }; inApp: { body: string } };
  steps: number;
};

type RunState = "idle" | "running" | "done" | "error";

function UrgencyDots({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i <= score ? "bg-white" : "bg-[#333]"}`} />
      ))}
      <span className="text-[11px] text-[#555] ml-1">{score}/5</span>
    </div>
  );
}

function ToolStepRow({ step, index }: { step: ToolStep; index: number }) {
  const [open, setOpen] = useState(false);
  const meta = TOOL_LABELS[step.toolName] ?? { label: step.toolName, description: "" };

  return (
    <div
      className={`border rounded-md overflow-hidden transition-all duration-300 ${
        step.status === "running"
          ? "border-[#2a2a2a] bg-[#0f0f0f]"
          : step.status === "done"
          ? "border-[#1a1a1a] bg-transparent"
          : "border-[#141414] bg-transparent opacity-40"
      }`}
    >
      <button
        onClick={() => step.status === "done" && setOpen(!open)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left ${step.status === "done" ? "hover:bg-[#0d0d0d] transition-colors cursor-pointer" : "cursor-default"}`}
      >
        {/* Index / status dot */}
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          {step.status === "pending" && (
            <span className="text-[11px] text-[#333] font-mono">{index + 1}</span>
          )}
          {step.status === "running" && (
            <span className="w-2 h-2 rounded-full bg-[#3dd68c] animate-pulse block" />
          )}
          {step.status === "done" && (
            <span className="text-[11px] text-[#3dd68c]">✓</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-[13px] font-medium transition-colors duration-200 ${
              step.status === "done" ? "text-[#ccc]" : step.status === "running" ? "text-white" : "text-[#444]"
            }`}>
              {meta.label}
            </span>
            {step.status === "running" && (
              <span className="text-[11px] text-[#3dd68c] animate-pulse">{meta.description}…</span>
            )}
            {step.status === "done" && (
              <span className="text-[11px] font-mono text-[#444]">{step.toolName}</span>
            )}
          </div>
        </div>

        {step.status === "done" && (
          <span className="text-[11px] text-[#333] flex-shrink-0">{open ? "↑" : "↓"}</span>
        )}
      </button>

      {open && step.status === "done" && (
        <div className="border-t border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3 space-y-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#444] mb-1">Input</p>
            <pre className="text-[11px] text-[#555] overflow-x-auto font-mono whitespace-pre-wrap">
              {JSON.stringify(step.args, null, 2)}
            </pre>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#444] mb-1">Output</p>
            <pre className="text-[11px] text-[#555] overflow-x-auto font-mono whitespace-pre-wrap">
              {JSON.stringify(step.result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

const TOOL_ORDER = ["get_user_history", "check_suppression", "score_urgency", "decide_channel"];

export default function ActivationAgentDemo() {
  const [selected, setSelected] = useState(0);
  const [runState, setRunState] = useState<RunState>("idle");
  const [steps, setSteps] = useState<ToolStep[]>([]);
  const [output, setOutput] = useState<AgentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Load Turnstile script once
  useEffect(() => {
    if (document.getElementById("cf-turnstile-script")) return;
    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // Render widget after script loads
  useEffect(() => {
    const render = () => {
      if (!turnstileRef.current || widgetIdRef.current) return;
      const w = (window as unknown as { turnstile?: { render: (el: HTMLElement, opts: unknown) => string; reset: (id: string) => void } }).turnstile;
      if (!w) return;
      widgetIdRef.current = w.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(null),
        "error-callback": () => setTurnstileToken(null),
      });
    };
    // Poll until turnstile global is available
    const interval = setInterval(() => {
      const w = (window as unknown as { turnstile?: unknown }).turnstile;
      if (w) { render(); clearInterval(interval); }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const resetTurnstile = () => {
    const w = (window as unknown as { turnstile?: { reset: (id: string) => void } }).turnstile;
    if (w && widgetIdRef.current) w.reset(widgetIdRef.current);
    setTurnstileToken(null);
  };

  const reset = (newIndex?: number) => {
    setRunState("idle");
    setSteps([]);
    setOutput(null);
    setError(null);
    resetTurnstile();
    if (newIndex !== undefined) setSelected(newIndex);
  };

  const run = async () => {
    setRunState("running");
    setSteps([]);
    setOutput(null);
    setError(null);

    // Initialise all 4 steps as pending
    setSteps(
      TOOL_ORDER.map((toolName, i) => ({
        toolName,
        toolCallId: `pending-${i}`,
        status: "pending",
        args: {},
        result: null,
      }))
    );

    try {
      const res = await fetch("https://activation-agent-gamma.vercel.app/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...EXAMPLE_TRIGGERS[selected], turnstileToken }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Parse SSE lines
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          let event: Record<string, unknown>;
          try { event = JSON.parse(raw); } catch { continue; }

          if (event.type === "tool_start") {
            const { toolName, toolCallId } = event as { toolName: string; toolCallId: string };
            setSteps(prev => prev.map(s =>
              s.toolName === toolName
                ? { ...s, toolCallId, status: "running" }
                : s
            ));
          }

          if (event.type === "tool_done") {
            const { toolName, result } = event as { toolName: string; result: unknown };
            setSteps(prev => prev.map(s =>
              s.toolName === toolName
                ? { ...s, status: "done", result }
                : s
            ));
          }

          if (event.type === "complete") {
            const payload = event as unknown as AgentOutput & { type: string };
            setOutput(payload);
            // Make sure all steps show done
            setSteps(prev => prev.map(s => ({
              ...s,
              status: "done" as ToolStatus,
              args: payload.toolTrace.find(t => t.toolName === s.toolName)?.args ?? s.args,
              result: payload.toolTrace.find(t => t.toolName === s.toolName)?.result ?? s.result,
            })));
            setRunState("done");
            resetTurnstile();
          }

          if (event.type === "error") {
            throw new Error((event.message as string) ?? "Unknown error");
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setRunState("error");
    }
  };

  const current = EXAMPLE_TRIGGERS[selected];
  const isRunning = runState === "running";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]" style={{ fontFamily: "var(--font-geist-sans)" }}>
      <div className="max-w-[620px] mx-auto px-6">
        <Nav />

        {/* Header */}
        <header className="mb-10">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#444] mb-2">
            Activation Agent
          </p>
          <h1 className="text-[20px] font-medium tracking-[-0.01em] text-white">
            Lifecycle message generator
          </h1>
          <p className="mt-1.5 text-[13px] text-[#666] leading-[1.6]">
            The agent checks message history, suppression status, and urgency before deciding how to reach the user.
          </p>
        </header>

        {/* Trigger selector */}
        <section className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#444] font-medium mb-3">Trigger</p>
          <div className="space-y-2">
            {EXAMPLE_TRIGGERS.map((t, i) => (
              <button
                key={i}
                onClick={() => reset(i)}
                disabled={isRunning}
                className={`w-full text-left px-4 py-3 rounded-md border text-[13px] transition-colors disabled:cursor-not-allowed ${
                  selected === i
                    ? "border-[#333] bg-[#111] text-white"
                    : "border-[#1a1a1a] bg-transparent text-[#666] hover:text-[#999] hover:border-[#2a2a2a]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>

        {/* Context preview */}
        <section className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#444] font-medium mb-2">User context</p>
          <pre className="text-[12px] text-[#555] bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 overflow-x-auto font-mono">
            {JSON.stringify(current.userContext, null, 2)}
          </pre>
        </section>

        {/* Turnstile + Run button */}
        <div className="mb-8 space-y-3">
          {(runState === "idle" || runState === "error") && (
            <div ref={turnstileRef} />
          )}
          <button
            onClick={runState === "idle" || runState === "done" || runState === "error" ? run : undefined}
            disabled={isRunning || ((runState === "idle" || runState === "error") && !turnstileToken)}
            className="w-full py-2.5 rounded-md bg-white text-black text-[13px] font-medium hover:bg-[#e0e0e0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isRunning ? "Agent running…" : runState === "done" ? "Run again →" : "Run agent →"}
          </button>
        </div>

        {/* Live steps */}
        {steps.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-[11px] uppercase tracking-[0.08em] text-[#444] font-medium">Agent trace</p>
              {isRunning && <span className="text-[11px] text-[#3dd68c] animate-pulse">live</span>}
            </div>
            <div className="space-y-1.5">
              {steps.map((step, i) => (
                <ToolStepRow key={step.toolName} step={step} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Error */}
        {error && (
          <p className="text-[13px] text-red-400 mb-6">{error}</p>
        )}

        {/* Output — fades in when done */}
        {output && runState === "done" && (
          <div className="space-y-6 animate-in fade-in duration-500">

            {/* Decision */}
            {output.decision && (
              <section>
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#444] font-medium mb-3">Decision</p>
                <div className="border border-[#1a1a1a] rounded-md p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded tracking-wider uppercase ${CHANNEL_COLORS[output.decision.channel] ?? "bg-[#1a1a1a] text-[#555]"}`}>
                      {output.decision.channel}
                    </span>
                    <UrgencyDots score={output.decision.urgency} />
                  </div>
                  <p className="text-[13px] text-[#777] leading-[1.6]">{output.decision.reasoning}</p>
                </div>
              </section>
            )}

            {/* Messages */}
            {output.decision?.channel !== "none" && (
              <section>
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#444] font-medium mb-3">Messages</p>
                <div className="space-y-3">
                  {(output.decision?.channel === "email" || output.decision?.channel === "both") &&
                    output.messages.email.subject !== "none" && (
                    <div className="border border-[#1a1a1a] rounded-md p-4 space-y-2">
                      <span className="text-[11px] font-medium text-[#555] uppercase tracking-[0.08em]">Email</span>
                      <p className="text-[13px] font-medium text-white">{output.messages.email.subject}</p>
                      <p className="text-[13px] text-[#777] leading-[1.6]">{output.messages.email.body}</p>
                    </div>
                  )}
                  {(output.decision?.channel === "in-app" || output.decision?.channel === "both") &&
                    output.messages.inApp.body !== "none" && (
                    <div className="border border-[#1a1a1a] rounded-md p-4 space-y-2">
                      <span className="text-[11px] font-medium text-[#555] uppercase tracking-[0.08em]">In-app nudge</span>
                      <p className="text-[13px] text-[#777] leading-[1.6]">{output.messages.inApp.body}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>
        )}

        <div className="pb-20" />
      </div>
    </div>
  );
}
