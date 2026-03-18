import Nav from "../components/Nav";
import AgentCard from "../components/AgentCard";

const agents = [
  {
    id: "activation-agent",
    name: "Activation Agent",
    description: "Detects when a user hits a key activation event and generates a personalized follow-up sequence to drive product adoption.",
    status: "live" as const,
    tags: ["activation", "onboarding"],
    repoUrl: "https://github.com/zayyanc/activation-agent",
    demoUrl: "/agents/activation-agent",
    sampleOutput: {
      trigger: "User created first project but hasn't deployed after 3 days",
      messages: [
        {
          channel: "Email",
          subject: "Your project hasn't deployed yet",
          body: "You set up a project 3 days ago but haven't deployed. Run `vercel` in your project directory and it'll be live in under a minute.",
        },
        {
          channel: "In-app",
          body: "Deploy your project — run `vercel` in your terminal to go live.",
        },
      ],
    },
  },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]" style={{ fontFamily: "var(--font-geist-sans)" }}>
      <div className="max-w-[620px] mx-auto px-6">

        <Nav />

        <header className="pt-8 mb-12">
          <h1 className="text-[22px] font-medium tracking-[-0.01em] text-white">Agent Library</h1>
          <p className="mt-1.5 text-[14px] text-[#666]">
            Lifecycle marketing agents built on Vercel. Browse sample outputs below.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 pb-20">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

      </div>
    </div>
  );
}
