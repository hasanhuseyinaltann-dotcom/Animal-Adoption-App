import Navbar from "./Navbar";
import Footer from "./Footer";

function PageShell({ children, className = "" }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className={`flex-1 animate-fade-in ${className}`}>{children}</main>
      <Footer />
    </div>
  );
}

export default PageShell;
