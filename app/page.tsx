export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans antialiased">
      <div className="max-w-[680px] mx-auto px-6">

        {/* Header */}
        <header className="pt-20 pb-14 border-b border-[#1f1f1f]">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Zayyan Chowdhury
          </h1>
          <p className="mt-2 text-[#888]">Growth &amp; Lifecycle Marketing</p>
          <p className="mt-1 text-sm text-[#888]">New York, NY</p>
          <nav className="mt-5 flex gap-4">
            <a
              href="https://www.linkedin.com/in/zayyan-chowdhury-82800251/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#ededed] border-b border-[#1f1f1f] pb-px hover:text-white hover:border-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:zayyanc@gmail.com"
              className="text-sm text-[#ededed] border-b border-[#1f1f1f] pb-px hover:text-white hover:border-white transition-colors"
            >
              Email
            </a>
          </nav>
        </header>

        <main className="py-12 space-y-12">

          {/* About */}
          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-[#888] mb-6">About</h2>
            <p className="text-[#ededed] leading-relaxed">
              Focused on user activation, expansion, adoption, and retention. I build lifecycle and
              growth programs that help developer-focused products grow.
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-[#888] mb-6">Experience</h2>
            <div className="divide-y divide-[#1f1f1f]">

              <div className="py-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-[15px] font-medium text-white">Growth</h3>
                    <span className="text-sm text-[#888]">Vercel</span>
                  </div>
                  <span className="text-[13px] text-[#888] shrink-0">Feb 2026 – Present</span>
                </div>
                <p className="mt-1 text-[13px] text-[#888]">New York, NY · Full-time</p>
              </div>

              <div className="py-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-[15px] font-medium text-white">Council Member</h3>
                    <span className="text-sm text-[#888]">GLG</span>
                  </div>
                  <span className="text-[13px] text-[#888] shrink-0">Nov 2019 – Present</span>
                </div>
                <p className="mt-1 text-[13px] text-[#888]">Part-time</p>
              </div>

              <div className="py-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-[15px] font-medium text-white">Senior Growth Marketing Manager – Lifecycle</h3>
                    <span className="text-sm text-[#888]">Cloudflare</span>
                  </div>
                  <span className="text-[13px] text-[#888] shrink-0">Apr 2025 – Feb 2026</span>
                </div>
                <p className="mt-1 text-[13px] text-[#888]">Full-time</p>
                <p className="mt-2 text-sm text-[#ededed]">
                  Drove activation, expansion and retention for 11M+ developers globally.
                </p>
              </div>

              <div className="py-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-[15px] font-medium text-white">Growth Marketing Manager – Lifecycle</h3>
                    <span className="text-sm text-[#888]">Cloudflare</span>
                  </div>
                  <span className="text-[13px] text-[#888] shrink-0">May 2023 – Apr 2025</span>
                </div>
                <p className="mt-1 text-[13px] text-[#888]">Full-time</p>
              </div>

              <div className="py-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-[15px] font-medium text-white">Digital Marketing Manager – Retention &amp; Lifecycle</h3>
                    <span className="text-sm text-[#888]">Elsevier</span>
                  </div>
                  <span className="text-[13px] text-[#888] shrink-0">Sep 2020 – May 2023</span>
                </div>
                <p className="mt-1 text-[13px] text-[#888]">New York, NY · Full-time</p>
              </div>

              <div className="py-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-[15px] font-medium text-white">Solutions Marketing Manager – Product Marketing</h3>
                    <span className="text-sm text-[#888]">Elsevier</span>
                  </div>
                  <span className="text-[13px] text-[#888] shrink-0">Aug 2019 – Sep 2020</span>
                </div>
                <p className="mt-1 text-[13px] text-[#888]">New York, NY · Full-time</p>
              </div>

            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-[#888] mb-6">Education</h2>
            <div className="py-5 border-y border-[#1f1f1f]">
              <h3 className="text-[15px] font-medium text-white">Western Connecticut State University</h3>
              <span className="text-sm text-[#888]">Bachelor of Arts – Communication</span>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-[#888] mb-6">Skills &amp; Certifications</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "B2B Marketing",
                "Multi-channel Marketing",
                "Lifecycle Marketing",
                "Growth Strategy",
                "User Activation",
                "Retention",
                "Pendo Pro",
                "Reforge Alumni",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-[#1a1a1a] border border-[#1f1f1f] text-[#ededed] text-[13px] px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

        </main>

        <footer className="py-8 border-t border-[#1f1f1f]">
          <p className="text-[13px] text-[#888]">© 2026 Zayyan Chowdhury</p>
        </footer>

      </div>
    </div>
  );
}
