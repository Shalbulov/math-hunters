export function Footer() {
  return (
    <footer className="border-t border-border-default mt-20">
      <div className="max-w-[720px] mx-auto px-4 md:px-0 py-6 text-xs text-text-muted flex items-center justify-between">
        <div className="font-display tracking-wider">
          MATH<span className="text-accent">/</span>HUNTERS · {new Date().getFullYear()}
        </div>
        <a
          href="https://github.com/Shalbulov/math-hunters"
          className="hover:text-accent transition-colors"
        >
          github
        </a>
      </div>
    </footer>
  );
}
