import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '../../data/auth';
import { hasRegistration } from '../../data/registration';

const publicLinks = [
  { label: 'Home', path: '/' },
  { label: 'Our Story', path: '/our-story' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    if (!session?.user.id) {
      setHasProfile(false);
      return () => {
        active = false;
      };
    }

    void hasRegistration(session.user.id)
      .then((exists) => {
        if (active) setHasProfile(exists);
      })
      .catch(() => {
        if (active) setHasProfile(false);
      });

    return () => {
      active = false;
    };
  }, [session?.user.id]);

  const navLinks = session
    ? [
        ...publicLinks,
        ...(hasProfile
          ? [{ label: 'Profile', path: '/profile' }]
          : [{ label: 'Registration', path: '/registration' }]),
      ]
    : publicLinks;

  const linkClass =
    'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold leading-5 text-witcon-deep-forest transition-colors hover:bg-witcon-sage/30 hover:text-witcon-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-witcon-forest';

  const mobileLinkClass =
    'flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-semibold leading-5 text-witcon-deep-forest transition-colors hover:bg-witcon-sage/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-witcon-forest';

  function closeMenu() {
    setIsOpen(false);
    setLogoutError('');
  }

  async function handleLogout() {
    setLogoutError('');

    try {
      await signOut();
      closeMenu();
      setHasProfile(false);
      navigate('/', { replace: true });
    } catch {
      setLogoutError('Could not log out. Please try again.');
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-witcon-deep-forest/10 bg-witcon-cream/95 backdrop-blur-md">
      <nav
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          onClick={closeMenu}
          className="rounded-md font-display text-xl font-bold text-witcon-deep-forest transition-colors hover:text-witcon-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-witcon-forest sm:text-2xl"
        >
          WiTCON
          <span className="sr-only"> Home</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </Link>
          ))}

          {!loading &&
            (session ? (
              <button
                type="button"
                onClick={handleLogout}
                className={linkClass}
              >
                Log out
              </button>
            ) : (
              <Link to="/login" className={linkClass}>
                Log in
              </Link>
            ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-witcon-deep-forest transition-colors hover:bg-witcon-sage/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-witcon-forest md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="text-2xl leading-none" aria-hidden="true">
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
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={mobileLinkClass}
                onClick={closeMenu}
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
                  onClick={closeMenu}
                >
                  Log in
                </Link>
              ))}

            {logoutError && (
              <p role="alert" className="px-4 py-2 text-sm text-witcon-terracotta">
                {logoutError}
              </p>
            )}
          </div>
        </div>
      )}

      {logoutError && !isOpen && (
        <p
          role="alert"
          className="border-t border-witcon-deep-forest/10 px-4 py-2 text-center text-sm text-witcon-terracotta"
        >
          {logoutError}
        </p>
      )}
    </header>
  );
}
