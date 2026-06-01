export function Footer() {
  return (
    <footer className="border-t border-border-default mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-text-secondary flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} Math Hunters · Made for grades 7–11 ·{" "}
          <span className="text-accent-blue">Kazakhstan curriculum</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Shalbulov/math-hunters"
            className="hover:text-accent-blue transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <span>Powered by Gemini AI</span>
        </div>
      </div>
    </footer>
  );
}
