export default function Footer() {
  return (
    <footer className="relative bg-surface-white">
      {/* ── Gradient Top Border ── */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #4F46E5 30%, #06B6D4 70%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 md:px-24 gap-4">
        {/* Left — Copyright */}
        <p className="text-sm text-text-tertiary">
          © 2026 Vinyas D T. Crafted with curiosity.
        </p>

        {/* Right — Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Vinyasbms2006"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-text-tertiary hover:text-accent-indigo transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vinyas-d-t-30404533a"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-text-tertiary hover:text-accent-indigo transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:vinyasdt.cs24@bmsce.ac.in"
            className="text-sm text-text-tertiary hover:text-accent-indigo transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
