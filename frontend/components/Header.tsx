import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white py-6 sticky top-0 z-50 border-b border-gray-100/50 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link
          href="/"
          className="font-extrabold text-xl md:text-2xl tracking-tight uppercase font-secondary"
        >
          THE<span className="font-light">INKWELL</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-800 uppercase tracking-wider">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <Link href="/blog" className="hover:text-red-600 transition-colors">
            Journal
          </Link>
          <Link href="/about" className="hover:text-red-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-red-600 transition-colors">
            Contact
          </Link>
          <Link
            href="/blog"
            className="px-5 py-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold"
          >
            Newsletter
          </Link>
        </div>

        <button className="md:hidden text-gray-800" aria-label="Open menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </button>
      </nav>
    </header>
  );
}
