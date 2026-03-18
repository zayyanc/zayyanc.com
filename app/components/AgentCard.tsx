"use client";

import { useState } from "react";

type Message = {
  channel: string;
  subject?: string;
  body: string;
};

type SampleOutput = {
  trigger: string;
  messages: Message[];
};

type Agent = {
  id: string;
  name: string;
  description: string;
  status: "live" | "draft";
  tags: string[];
  repoUrl: string;
  sampleOutput: SampleOutput;
};

export default function AgentCard({ agent }: { agent: Agent }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#1a1a1a] rounded-lg overflow-hidden">

      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-[14px] font-medium text-white">{agent.name}</span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full tracking-wide uppercase ${
                agent.status === "live"
                  ? "bg-[#0d2e1a] text-[#3dd68c]"
                  : "bg-[#1a1a1a] text-[#555]"
              }`}>
                {agent.status}
              </span>
            </div>
            <p className="text-[13px] text-[#666] leading-[1.6]">{agent.description}</p>
            <div className="flex gap-1.5 mt-3">
              {agent.tags.map((tag) => (
                <span key={tag} className="text-[11px] text-[#555] bg-[#111] border border-[#1f1f1f] px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[12px] text-[#888] hover:text-white transition-colors"
          >
            {expanded ? "Hide sample ↑" : "View sample output ↓"}
          </button>
          <a
            href={agent.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-[#888] hover:text-white transition-colors"
          >
            Repo ↗
          </a>
        </div>
      </div>

      {/* Sample output */}
      {expanded && (
        <div className="border-t border-[#1a1a1a] bg-[#0d0d0d] p-5 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] uppercase tracking-[0.08em] text-[#444] font-medium">Trigger</span>
            <span className="text-[11px] text-[#666] bg-[#111] border border-[#1f1f1f] px-2 py-0.5 rounded">
              {agent.sampleOutput.trigger}
            </span>
          </div>
          {agent.sampleOutput.messages.map((msg, i) => (
            <div key={i} className="border border-[#1a1a1a] rounded-md p-4 space-y-2">
              <span className="text-[11px] font-medium text-[#555] uppercase tracking-[0.08em]">{msg.channel}</span>
              {msg.subject && (
                <p className="text-[13px] font-medium text-white">{msg.subject}</p>
              )}
              <p className="text-[13px] text-[#777] leading-[1.6]">{msg.body}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
