import React from "react";
import { motion } from "framer-motion";
import ScrollParallax from "../parallax/ScrollParallax";
import servicesData from "../data/services.json";
import contactData from "../data/contact.json";
import "./style/Footer.css";

const WHATSAPP_NUMBER = "916388060502"; // Format: country code + number

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello! I'd like to learn more about your services."
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const servicesPerColumn = Math.ceil(servicesData.tabs.length / 3);

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <ScrollParallax speed={20}>
            <div className="footer-section footer-brand-section">
              <h3 className="footer-brand-name">Digitalgram</h3>
              <p className="footer-brand-tagline">
                Premium digital products that scale. We craft elegant, fast, and
                measurable digital experiences.
              </p>

              <div className="footer-social">
                {contactData.socialLinks?.map((social) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={`Follow us on ${social.platform}`}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="social-icon-text">
                      {social.icon?.[0]?.toUpperCase() ||
                        social.platform?.[0]?.toUpperCase() ||
                        "S"}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollParallax>

          {/* Services Section */}
          <ScrollParallax speed={22}>
            <div className="footer-section footer-services-section">
              <h4 className="footer-section-title">Services</h4>

              <div className="footer-services-columns">
                {Array.from({ length: 3 }, (_, columnIndex) => {
                  const startIndex = columnIndex * servicesPerColumn;
                  const endIndex = Math.min(
                    startIndex + servicesPerColumn,
                    servicesData.tabs.length
                  );
                  const columnServices = servicesData.tabs.slice(
                    startIndex,
                    endIndex
                  );

                  return (
                    <ul key={columnIndex} className="footer-services-list">
                      {columnServices.map((service) => (
                        <li key={service.id}>
                          <a
                            href={`/services/${service.id}`}
                            className="footer-service-link"
                          >
                            {service.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </div>
          </ScrollParallax>

          {/* Contact Section */}
          <ScrollParallax speed={25}>
            <div className="footer-section footer-contact-section">
              <h4 className="footer-section-title">Contact</h4>

              <ul className="footer-contact-list">
                <li>
                  <a
                    href={contactData.contactInfo?.email?.href}
                    className="footer-contact-link"
                  >
                    <span className="contact-icon">📧</span>
                    {contactData.contactInfo?.email?.value}
                  </a>
                </li>
                <li>
                  <a
                    href={contactData.contactInfo?.phone?.href}
                    className="footer-contact-link"
                  >
                    <span className="contact-icon">📱</span>
                    {contactData.contactInfo?.phone?.value}
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleWhatsAppClick}
                    className="footer-contact-link footer-whatsapp"
                    type="button"
                  >
                    <span className="contact-icon">💬</span>
                    WhatsApp
                  </button>
                </li>
              </ul>
            </div>
          </ScrollParallax>
        </div>

        {/* Footer Bottom */}
        <ScrollParallax speed={30}>
          <div className="footer-bottom">
            <div className="footer-copyright">
              © {currentYear} Digitalgram. All rights reserved.
            </div>
          </div>
        </ScrollParallax>
      </div>
    </footer>
  );
};

export default Footer;
