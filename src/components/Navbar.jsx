import { useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDevice } from "../hooks/useDevice";
import TiltParallaxCard from "../parallax/TiltParallaxCard";
import FormModal from "./FormModal";
import "./style/Navbar.css";

const MotionLink = motion(Link);

/* =========================
   CONFIG
========================= */
const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "#how", label: "How we work" },
  { href: "#contact", label: "Contact" },
];

/* =========================
   CUSTOM ANIMATIONS
========================= */
const navEnter = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const linkHover = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: { type: "spring", stiffness: 380, damping: 22 },
  },
};

const menuPanel = {
  hidden: { opacity: 0, scaleY: 0.9, y: -8 },
  visible: {
    opacity: 1,
    scaleY: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scaleY: 0.95,
    y: -6,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/* =========================
   HELPERS
========================= */
function isRouteHref(href) {
  return href.startsWith("/");
}

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const { isDesktop, isMobile, isTablet } = useDevice();
  const showHamburger = isMobile || isTablet;

  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pendingHash, setPendingHash] = useState(null);

  const { scrollY } = useScroll();

  /* =========================
     SCROLL STATE
  ========================= */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  /* =========================
     LOCK BODY SCROLL
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

  /* =========================
     HANDLE HASH SCROLL AFTER NAVIGATING HOME
  ========================= */
  useEffect(() => {
    if (pendingHash && location.pathname === "/") {
      const id = pendingHash.replace("#", "");
      const target = document.getElementById(id);

      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }

      setPendingHash(null);
    }
  }, [location.pathname, pendingHash]);

  const scrollToSection = (href) => {
    const target = document.getElementById(href.replace("#", ""));
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    setIsFormOpen(true);
    setMobileMenuOpen(false);
  };

  // If switching from mobile -> desktop, force close menu
  useEffect(() => {
    if (isDesktop) setMobileMenuOpen(false);
  }, [isDesktop]);

  const renderedLinks = useMemo(() => NAV_LINKS, []);

  return (
    <>
      <motion.nav
        className={`site-nav ${scrolled ? "scrolled" : ""}`}
        aria-label="Main navigation"
        variants={reduceMotion ? undefined : navEnter}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
        transition={reduceMotion ? { duration: 0 } : undefined}
      >
        <div className="nav-inner">
          {/* LOGO */}
          <a
            href="#home"
            className="nav-brand"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <motion.span
              variants={reduceMotion ? undefined : linkHover}
              initial="rest"
              whileHover={reduceMotion ? undefined : "hover"}
            >
              Digitalgram
            </motion.span>
          </a>

          {/* DESKTOP LINKS */}
          {isDesktop && (
            <div className="nav-links nav-links-center">
              {renderedLinks.map((link) => {
                if (isRouteHref(link.href)) {
                  return (
                    <MotionLink
                      key={link.href}
                      to={link.href}
                      className="nav-link"
                      variants={reduceMotion ? undefined : linkHover}
                      initial="rest"
                      whileHover={reduceMotion ? undefined : "hover"}
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
                    className="nav-link"
                    variants={reduceMotion ? undefined : linkHover}
                    initial="rest"
                    whileHover={reduceMotion ? undefined : "hover"}
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
            </div>
          )}

          {/* DESKTOP CTA */}
          {isDesktop && (
            <TiltParallaxCard className="nav-cta-tilt">
              <motion.button
                className="nav-contact-btn"
                onClick={handleContactClick}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -1,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 320, damping: 20 },
                      }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                Get in Touch
              </motion.button>
            </TiltParallaxCard>
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

        {/* MOBILE MENU */}
        <AnimatePresence mode="wait">
          {showHamburger && mobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              variants={reduceMotion ? undefined : menuPanel}
              initial={reduceMotion ? { opacity: 0 } : "hidden"}
              animate={reduceMotion ? { opacity: 1 } : "visible"}
              exit={reduceMotion ? { opacity: 0 } : "exit"}
              style={{ transformOrigin: "top" }}
            >
              <motion.div
                className="mobile-menu-content"
                variants={reduceMotion ? undefined : staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {renderedLinks.map((link) => {
                  if (isRouteHref(link.href)) {
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
}
