import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport
} from "../../animations/motionVariants";
import services from "../../data/services.json";
import fallbackImg from "../../assets/react.svg";
import "./style/ServiceDetail.css";

function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const serviceContent = services.tabs.find((tab) => tab.id === serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const handleClose = () => {
    navigate(-1);
  };

  if (!serviceContent) {
    return (
      <div className="service-detail__not-found">
        <h2>Service not found</h2>
        <button onClick={handleClose}>Go Back</button>
      </div>
    );
  }

  const paragraphs =
    serviceContent.detailedDescription
      ? serviceContent.detailedDescription.split("\n\n").filter(Boolean)
      : [];

  // Resolve image src robustly:
  // - Allow absolute URLs (http/https)
  // - Allow leading-slash paths ("/assets/...")
  // - Allow filenames that live under /images
  // - Normalize duplicate slashes
  const resolveImageSrc = (image) => {
    if (!image) return fallbackImg;
    if (/^https?:\/\//i.test(image)) return image;

    let src = image;

    // If it already starts with a slash, use as-is
    if (!src.startsWith("/")) {
      // If it looks like an assets path (contains assets/), prefix with a slash
      if (src.includes("assets/")) src = `/${src}`;
      else src = `/images/${src}`;
    }

    // Replace multiple slashes with a single slash (avoid "/images//assets/..." paths)
    src = src.replace(/\/\/{2,}/g, "/");
    return src;
  };

  return (
    <motion.section
      className="service-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Top Floating Back / Close */}
      <button
        className="service-detail__close-btn"
        onClick={handleClose}
        aria-label="Go back"
        title="Go back"
      >
        ✕
      </button>

      <div className="service-detail__wrapper">
        {/* HERO */}
        <div className="service-detail__hero">
          {/* LEFT */}
          <div className="service-detail__hero-left">
            <motion.p
              className="service-detail__eyebrow"
              variants={reduce ? undefined : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              Service Details
            </motion.p>

            <motion.h1
              className="service-detail__title"
              variants={reduce ? undefined : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {serviceContent.title}
            </motion.h1>

            <motion.p
              className="service-detail__desc"
              variants={reduce ? undefined : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {serviceContent.description}
            </motion.p>

            <motion.div
              className="service-detail__hero-actions"
              variants={reduce ? undefined : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <button className="service-detail__primary" onClick={() => {
                const el = document.getElementById("service-detail-content");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}>
                Explore Strategy
              </button>

              <button className="service-detail__secondary" onClick={handleClose}>
                Back to Services
              </button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            className="service-detail__hero-right"
            variants={reduce ? undefined : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="service-detail__image-card">
              {serviceContent.image ? (
                <img
                  src={resolveImageSrc(serviceContent.image)}
                  alt={serviceContent.title}
                  className="service-detail__image"
                  onError={(e) => {
                    // If the image failed to load, show fallback and log the actual URL
                    console.warn(`Failed to load image: ${e.currentTarget.src}`);
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImg;
                  }}
                />
              ) : (
                <div className="service-detail__image-fallback">
                  <span>Illustration</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="service-detail__content" id="service-detail-content">
          {/* Detailed Description */}
          {paragraphs.length > 0 && (
            <motion.div
              className="service-detail__copy"
              variants={reduce ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {paragraphs.map((p, index) => (
                <motion.p
                  key={`p-${index}`}
                  variants={reduce ? undefined : staggerItem}
                  className="service-detail__paragraph"
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>
          )}

          {/* Offer List */}
          <motion.div
            className="service-detail__offer"
            variants={reduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.div variants={reduce ? undefined : fadeUp}>
              <h2 className="service-detail__offer-title">What We Offer</h2>
              <p className="service-detail__offer-subtitle">
                Proven deliverables designed to maximize performance, ROI, and brand authority.
              </p>
            </motion.div>

            <motion.ul className="service-detail__offer-grid">
              {serviceContent.items.map((item, index) => (
                <motion.li
                  key={`${serviceId}-${index}`}
                  variants={reduce ? undefined : staggerItem}
                  className="service-detail__offer-item"
                >
                  <span className="service-detail__check">✓</span>
                  <span className="service-detail__offer-text">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Bottom back */}
          <motion.div
            className="service-detail__bottom"
            variants={reduce ? undefined : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <button className="service-detail__back-btn" onClick={handleClose}>
              ← Back to Services
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default ServiceDetail;
