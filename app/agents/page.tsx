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
    sampleOutput: {
      trigger: "User created first project after 3-day gap",
      messages: [
        {
          channel: "Email",
          subject: "You're one step away from your first deployment",
          body: "Hey — noticed you set up your project but haven't deployed yet. Here's a 2-minute guide to get your first deployment live. Most users who deploy in the first week see 3x higher retention.",
        },
        {
          channel: "In-app",
          body: "Your project is ready. Deploy now and see it live in seconds →",
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
