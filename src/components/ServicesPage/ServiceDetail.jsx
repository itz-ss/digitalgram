import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import services from "../../data/services.json";
import fallbackImg from "../../assets/react.svg";
import "./style/ServiceDetail.css";

function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

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

  const paragraphs = serviceContent.detailedDescription
    ? serviceContent.detailedDescription.split("\n\n").filter(Boolean)
    : [];

  // Resolve image src robustly:
  const resolveImageSrc = (image) => {
    if (!image) return fallbackImg;
    if (/^https?:\/\//i.test(image)) return image;

    let src = image;

    // If it already starts with a slash, use as-is
    if (!src.startsWith("/")) {
      if (src.includes("assets/")) src = `/${src}`;
      else src = `/images/${src}`;
    }

    // Replace duplicate slashes
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
            <p className="service-detail__eyebrow">Service Details</p>

            <h1 className="service-detail__title">{serviceContent.title}</h1>

            <p className="service-detail__desc">{serviceContent.description}</p>

            <div className="service-detail__hero-actions">
              <button className="service-detail__primary" onClick={handleClose}>
                Back to Services
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="service-detail__hero-right">
            <div className="service-detail__image-card">
              {serviceContent.image ? (
                <img
                  src={resolveImageSrc(serviceContent.image)}
                  alt={serviceContent.title}
                  className="service-detail__image"
                  onError={(e) => {
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
          </div>
        </div>

        {/* CONTENT */}
        <div className="service-detail__content" id="service-detail-content">
          {/* Detailed Description */}
          {paragraphs.length > 0 && (
            <div className="service-detail__copy">
              {paragraphs.map((p, index) => (
                <p key={`p-${index}`} className="service-detail__paragraph">
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* Offer List */}
          <div className="service-detail__offer">
            <div>
              <h2 className="service-detail__offer-title">What We Offer</h2>
              <p className="service-detail__offer-subtitle">
                Proven deliverables designed to maximize performance, ROI, and
                brand authority.
              </p>
            </div>

            <ul className="service-detail__offer-grid">
              {serviceContent.items.map((item, index) => (
                <li
                  key={`${serviceId}-${index}`}
                  className="service-detail__offer-item"
                >
                  <span className="service-detail__check">✓</span>
                  <span className="service-detail__offer-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom spacing */}
          <div className="service-detail__bottom" />
        </div>
      </div>
    </motion.section>
  );
}

export default ServiceDetail;
