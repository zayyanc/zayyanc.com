export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]" style={{ fontFamily: "var(--font-geist-sans)" }}>
      <div className="max-w-[620px] mx-auto px-6 py-20">

        {/* Header */}
        <header className="mb-16">
          <h1 className="text-[22px] font-medium tracking-[-0.01em] text-white">
            Zayyan Chowdhury
          </h1>
          <p className="mt-1.5 text-[14px] text-[#666]">Growth &amp; Lifecycle Marketing · New York, NY</p>
          <div className="mt-4">
            <a
              href="https://www.linkedin.com/in/zayyan-chowdhury-82800251/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#888] hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </header>

        {/* About */}
        <section className="mb-12">
          <p className="text-[14px] text-[#999] leading-[1.7]">
            Focused on user activation, expansion, adoption, and retention. I build lifecycle and
            growth programs that help developer-focused products grow.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-[#1a1a1a] mb-12" />

        {/* Experience */}
        <section>
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#555] mb-8">Experience</p>
          <div className="space-y-8">

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[14px] font-medium text-white">Growth</span>
                <span className="text-[12px] text-[#555] shrink-0 tabular-nums">Feb 2026 – Now</span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#666]">Vercel · New York, NY</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[14px] font-medium text-white">Council Member</span>
                <span className="text-[12px] text-[#555] shrink-0 tabular-nums">Nov 2019 – Now</span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#666]">GLG · Part-time</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[14px] font-medium text-white">Senior Growth Marketing Manager, Lifecycle</span>
                <span className="text-[12px] text-[#555] shrink-0 tabular-nums">Apr 2025 – Feb 2026</span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#666]">Cloudflare</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[14px] font-medium text-white">Growth Marketing Manager, Lifecycle</span>
                <span className="text-[12px] text-[#555] shrink-0 tabular-nums">May 2023 – Apr 2025</span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#666]">Cloudflare</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[14px] font-medium text-white">Digital Marketing Manager, Retention &amp; Lifecycle</span>
                <span className="text-[12px] text-[#555] shrink-0 tabular-nums">Sep 2020 – May 2023</span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#666]">Elsevier · New York, NY</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[14px] font-medium text-white">Solutions Marketing Manager, Product Marketing</span>
                <span className="text-[12px] text-[#555] shrink-0 tabular-nums">Aug 2019 – Sep 2020</span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#666]">Elsevier · New York, NY</p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
