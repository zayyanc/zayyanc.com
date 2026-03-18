import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6 mb-8 border-b border-[#1a1a1a]">
      <Link href="/" className="text-[13px] font-medium text-white hover:text-[#999] transition-colors">
        Zayyan Chowdhury
      </Link>
      <div className="flex gap-6">
        <Link href="/" className="text-[13px] text-[#666] hover:text-white transition-colors">
          About
        </Link>
        <Link href="/agents" className="text-[13px] text-[#666] hover:text-white transition-colors">
          Agents
        </Link>
      </div>
    </nav>
  );
}
