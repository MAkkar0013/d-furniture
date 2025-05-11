import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, User, LogOut } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.jpg";
import "./Navigation.css";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setMobileOpen(false);
  };

  const navItems = [
    { id: "home", label: "Главная", path: "#home" },
    { id: "about", label: "О нас", path: "#about" },
    { id: "catalog", label: "Каталог", path: "#catalog" },
    { id: "steps", label: "Этапы", path: "#steps" },
    { id: "advantages", label: "Преимущества", path: "#advantages" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="navigation">
      <div className="container">
        <Link to="/" className="logo" onClick={handleNavClick}>
          <img src={logo} alt="logo" className="logo" />
        </Link>

        <nav className="desktop-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="actions">
          <a href="tel:+79665577999" className="phone-link">
            <Phone size={16} />
            <span>+7 (966) 557-79-99</span>
          </a>
          <button
            className="menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isLoggedIn ? (
            <div className="user-actions">
              <Link
                to="/account"
                className="account-link"
                title="Личный кабинет"
                onClick={handleNavClick}
              >
                <User size={18} />
                <span className="user-name">{user?.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="logout-button"
                title="Выйти"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-actions">
              <Link
                to="/login"
                className="auth-button login-button"
                onClick={handleNavClick}
              >
                Вход
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              <ul>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.path}
                      className={
                        location.pathname === item.path ? "active" : ""
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {isLoggedIn ? (
                  <div className="mobile-auth-actions">
                    <Link
                      to="/account"
                      className="mobile-account-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Личный кабинет
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mobile-logout-button"
                    >
                      <LogOut size={16} className="mr-2" />
                      Выйти
                    </button>
                  </div>
                ) : (
                  <div className="mobile-auth-actions">
                    <Link
                      to="/login"
                      className="mobile-login-button"
                      onClick={() => setMobileOpen(false)}
                    >
                      Войти
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
