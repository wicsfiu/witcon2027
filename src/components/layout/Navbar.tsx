import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '../../data/auth';

const publicLinks = [
  { label: 'Home', path: '/' },
  { label: 'Our Story', path: '/our-story' },
  { label: 'Registration', path: '/registration' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  const navLinks = session
    ? [...publicLinks, { label: 'Profile', path: '/profile' }]
    : publicLinks;

  async function handleLogout() {
    setIsOpen(false);
    await signOut();
    navigate('/');
  }

  const linkClass =
    'text-sm font-semibold text-witcon-deep-forest transition-colors hover:text-witcon-pink';
  const mobileLinkClass =
    'rounded-xl px-4 py-3 text-left font-semibold text-witcon-deep-forest transition-colors hover:bg-witcon-sage/30';

  return (
    <header className="sticky top-0 z-50 border-b border-witcon-deep-forest/10 bg-witcon-cream/95 backdrop-blur-md">
      <nav
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl font-bold text-witcon-deep-forest sm:text-2xl"
          onClick={() => setIsOpen(false)}
        >
          WiTCON
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </Link>
          ))}

          {!loading &&
            (session ? (
              <button type="button" onClick={handleLogout} className={linkClass}>
                Log out
              </button>
            ) : (
              <Link to="/login" className={linkClass}>
                Log in
              </Link>
            ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-lg p-2 text-witcon-deep-forest transition-colors hover:bg-witcon-sage/30 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="text-2xl" aria-hidden="true">
            {isOpen ? '×' : '☰'}
          </span>
        </button>
      </nav>

      {/* Mobile navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-witcon-deep-forest/10 bg-witcon-cream px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={mobileLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!loading &&
              (session ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className={mobileLinkClass}
                >
                  Log out
                </button>
              ) : (
                <Link
                  to="/login"
                  className={mobileLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}