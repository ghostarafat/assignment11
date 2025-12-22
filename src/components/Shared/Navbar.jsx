import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthContext";
import Container from "./Container";
import MyLink from "./MyLink";
import ThemeToggle from "./ThemeToggle";
import { FaGraduationCap } from "react-icons/fa";

function Navbar() {
  const auth = useContext(AuthContext) || {};
  const { user, loading, logOutFunc } = auth;

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logOut = () => {
    logOutFunc();
    toast.success("Logout successfully");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = (
    <>
      <li onClick={closeMenu}>
        <MyLink path="/">Home</MyLink>
      </li>
      <li onClick={closeMenu}>
        <MyLink path="/all-tutions">tutions</MyLink>
      </li>
      <li onClick={closeMenu}>
        <MyLink path="/tutor">Tutor</MyLink>
      </li>
      <li onClick={closeMenu}>
        <MyLink path="/about">About</MyLink>
      </li>
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-xl" : "shadow-lg"
      }`}
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <Container className="relative">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg
                className="w-6 h-6 text-white transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-lg flex items-center gap-2 sm:text-xl lg:text-2xl font-bold tracking-wide text-white hover:scale-105 transition-transform duration-200"
            >
              <FaGraduationCap />
              eTutiion Bd
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <ul className="menu menu-horizontal px-1 gap-1">{menuItems}</ul>
          </div>

          {/* Right - Theme Toggle & Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm text-white"></span>
                <span className="text-white text-sm hidden sm:inline">
                  Loading...
                </span>
              </div>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-white hover:border-white/80 transition-all hover:scale-105"
                >
                  <div className="w-8 sm:w-10 rounded-full overflow-hidden">
                    <img
                      alt={user?.displayName || "User"}
                      src={user?.photoURL}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-gray-200"
                  style={{ backgroundColor: "var(--color-card-bg)" }}
                >
                  <li className="menu-title px-4 py-2">
                    <span className="text-sm font-semibold truncate">
                      {user?.displayName}
                    </span>
                  </li>
                  <li className="px-2 py-1">
                    <span className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </span>
                  </li>
                  <li onClick={closeMenu}>
                    <MyLink
                      path="/dashboard"
                      className="btn btn-sm w-full !text-gray-900 dark:!text-white hover:!text-white"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      Dashboard
                    </MyLink>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button
                      className="btn btn-sm w-full text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                      onClick={logOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn hidden md:flex bg-orange-500 border-0 gap-2 hover:bg-white text-primary hover:scale-105 transition-transform"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn hidden md:flex bg-orange-500 border-0 gap-2 hover:bg-white text-primary hover:scale-105 transition-transform"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <Link
              to="/"
              className="text-xl font-bold text-white"
              onClick={closeMenu}
            >
              eTution Bd
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="menu flex flex-col gap-1 px-2">{menuItems}</ul>

            {/* Theme Toggle */}
            <div className="px-4 py-2 mt-4 border-t border-white/20 flex items-center justify-between">
              <span className="text-white text-sm">Theme</span>
              <ThemeToggle />
            </div>
          </div>

          {/* Auth Buttons */}
          {loading ? (
            <div className="p-4 border-t border-white/20 flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-sm text-white"></span>
              <span className="text-white text-sm">Loading...</span>
            </div>
          ) : (
            !user && (
              <div className="flex flex-col gap-2 p-4 border-t border-white/20">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="btn w-full bg-orange-500 border-0 gap-2 hover:bg-white text-primary hover:scale-105 transition-transform"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="btn w-full bg-orange-500 border-0 gap-2 hover:bg-white text-primary hover:scale-105 transition-transform"
                >
                  Register
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
