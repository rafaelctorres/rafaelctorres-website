export default function Footer() {
  return (
    <footer className="border-t border-line mt-32 py-8 px-4 md:px-14">
      <div className="flex items-center justify-between" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <span className="font-mono text-phi-xs text-muted">
          © {new Date().getFullYear()} Rafael Torres
        </span>
        <span className="font-mono text-phi-xs text-muted">
          Code: MIT · Content: CC BY 4.0
        </span>
      </div>
    </footer>
  );
}
