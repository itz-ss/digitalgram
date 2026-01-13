import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";

import { useDevice } from "../hooks/useDevice";
import {
  fadeIn,
  linkHover,
  staggerContainer,
  staggerItem,
} from "../animations/motionVariants";

import { Link, useLocation, useNavigate } from "react-router-dom";
import FormModal from "./FormModal";
import "./style/Navbar.css";

const MotionLink = motion(Link);

/* =========================
   CONFIG
========================= */
const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "#how", label: "How we work" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { isDesktop, isMobile, isTablet } = useDevice();
  const showHamburger = isMobile || isTablet;

  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  /* =========================
     SCROLL STATE
  ========================= */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  /* =========================
     BODY SCROLL LOCK
  ========================= */
  useEffect(() => {
    if (mobileMenuOpen && showHamburger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, showHamburger]);

  /* =========================
     CLOSE MENU WHEN FORM OPENS
  ========================= */
  useEffect(() => {
    if (isFormOpen) setMobileMenuOpen(false);
  }, [isFormOpen]);

  // Router helpers for navigating to routes vs scrolling to anchors
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingHash, setPendingHash] = useState(null);

  useEffect(() => {
    if (pendingHash && location.pathname === "/") {
      const id = pendingHash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        // small timeout to ensure DOM is stable after navigation
        setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 50);
      }
      setPendingHash(null);
    }
  }, [location, pendingHash]);

  const scrollToSection = (href) => {
    const target = document.getElementById(href.replace("#", ""));
    target?.scrollIntoView({ behavior: "smooth" });
  }; 

  const handleContactClick = () => {
    setIsFormOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`site-nav ${scrolled ? "scrolled" : ""}`}
        aria-label="Main navigation"
        initial="hidden"
        animate="visible"
        variants={reduceMotion ? undefined : fadeIn}
        transition={{ duration: 0.4 }}
      >
        <div className="nav-inner">
          {/* LOGO */}
          <a
            href="#"
            className="nav-brand"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <motion.span
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Digitalgram
            </motion.span>
          </a>

          {/* DESKTOP NAV */}
          {isDesktop && (
            <div className="nav-links nav-links-center">
              {NAV_LINKS.map((link) => {
                const isRoute = link.href.startsWith("/");
                if (isRoute) {
                  return (
                    <MotionLink
                      key={link.href}
                      to={link.href}
                      className="nav-link"
                      variants={reduceMotion ? undefined : linkHover}
                      whileHover={reduceMotion ? undefined : "hover"}
                      transition={{ duration: 0.2 }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                    >
                      {link.label}
                    </MotionLink>
                  );
                }

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="nav-link"
                    variants={reduceMotion ? undefined : linkHover}
                    whileHover={reduceMotion ? undefined : "hover"}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (location.pathname === "/") {
                        scrollToSection(link.href);
                      } else {
                        setPendingHash(link.href);
                        navigate("/", { replace: false });
                      }
                    }}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
          )} 

          {/* DESKTOP CTA */}
          {isDesktop && (
            <motion.button
              className="nav-contact-btn"
              onClick={handleContactClick}
              whileHover={reduceMotion ? undefined : { scale: 1.02, y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              Get in Touch
            </motion.button>
          )}

          {/* HAMBURGER */}
          {showHamburger && (
            <button
              className="nav-hamburger"
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((p) => !p)}
            >
              <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
              <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
              <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
            </button>
          )}
        </div>

        {/* MOBILE / TABLET MENU */}
        <AnimatePresence mode="wait">
          {showHamburger && mobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.25 }}
              style={{ transformOrigin: "top" }}
            >
              <motion.div
                className="mobile-menu-content"
                variants={reduceMotion ? undefined : staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {NAV_LINKS.map((link) => {
                  const isRoute = link.href.startsWith("/");
                  if (isRoute) {
                    return (
                      <MotionLink
                        key={link.href}
                        to={link.href}
                        className="mobile-menu-link"
                        variants={reduceMotion ? undefined : staggerItem}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </MotionLink>
                    );
                  }

                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="mobile-menu-link"
                      variants={reduceMotion ? undefined : staggerItem}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (location.pathname === "/") {
                          scrollToSection(link.href);
                        } else {
                          setPendingHash(link.href);
                          navigate("/", { replace: false });
                        }
                      }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}

                <motion.button
                  className="mobile-menu-contact"
                  variants={reduceMotion ? undefined : staggerItem}
                  onClick={handleContactClick}
                >
                  Get in Touch
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* CONTACT MODAL */}
      <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default Navbar;
