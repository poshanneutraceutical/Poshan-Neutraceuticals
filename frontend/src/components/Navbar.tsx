import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import CartIcon from '../components/CartIcon';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Our Story', href: '#story' },
  { label: 'Distribute', href: '#distribute' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center group">
          <img
            src="/logo.png.jpeg"
            alt="Ghost Strength"
            style={{ height: "80px", width: "140px" }}
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <CartIcon />

          <button className="btn-primary flex items-center gap-2">
            <ShoppingBag size={16} />
            Shop Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/5 animate-slideDown">
          <ul className="flex flex-col px-6 py-4 gap-4">

            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link block py-2"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}

            <li className="flex justify-center py-2">
              <CartIcon />
            </li>

            <li>
              <button className="btn-primary w-full justify-center flex items-center gap-2">
                <ShoppingBag size={16} />
                Shop Now
              </button>
            </li>

          </ul>
        </div>
      )}
    </header>
  );
}