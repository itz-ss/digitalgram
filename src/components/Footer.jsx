import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {  staggerItem, defaultViewport } from "../animations/motionVariants";
import servicesData from "../data/services.json";
import contactData from "../data/contact.json";
import "./style/Footer.css";

const WHATSAPP_NUMBER = "916388060502"; // Format: country code + number

const Footer = () => {
  const reduce = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'd like to learn more about your services.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <motion.div
            className="footer-section footer-brand-section"
            variants={reduce ? undefined : staggerItem}
            initial="hidden"
            whileInView={reduce ? undefined : "visible"}
            viewport={defaultViewport}
          >
            <h3 className="footer-brand-name">Digitalgram</h3>
            <p className="footer-brand-tagline">
              Premium digital products that scale. We craft elegant, fast, and measurable digital experiences.
            </p>
            <div className="footer-social">
              {contactData.socialLinks.map((social, index) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={`Follow us on ${social.platform}`}
                  variants={reduce ? undefined : staggerItem}
                  initial="hidden"
                  whileInView={reduce ? undefined : "visible"}
                  viewport={defaultViewport}
                  transition={{ delay: index * 0.05 }}
                  whileHover={reduce ? undefined : { scale: 1.1, y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.95 }}
                >
                  <span className="social-icon-text">{social.icon[0].toUpperCase()}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            className="footer-section footer-services-section"
            variants={reduce ? undefined : staggerItem}
            initial="hidden"
            whileInView={reduce ? undefined : "visible"}
            viewport={defaultViewport}
            transition={{ delay: 0.1 }}
          >
            <h4 className="footer-section-title">Services</h4>
            <div className="footer-services-columns">
              {Array.from({ length: 3 }, (_, columnIndex) => {
                const servicesPerColumn = Math.ceil(servicesData.tabs.length / 3);
                const startIndex = columnIndex * servicesPerColumn;
                const endIndex = Math.min(startIndex + servicesPerColumn, servicesData.tabs.length);
                const columnServices = servicesData.tabs.slice(startIndex, endIndex);

                return (
                  <ul key={columnIndex} className="footer-services-list">
                    {columnServices.map((service) => (
                      <li key={service.id}>
                        <a href={`/services/${service.id}`} className="footer-service-link">
                          {service.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="footer-section footer-contact-section"
            variants={reduce ? undefined : staggerItem}
            initial="hidden"
            whileInView={reduce ? undefined : "visible"}
            viewport={defaultViewport}
            transition={{ delay: 0.3 }}
          >
            <h4 className="footer-section-title">Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <a href={contactData.contactInfo.email.href} className="footer-contact-link">
                  <span className="contact-icon">📧</span>
                  {contactData.contactInfo.email.value}
                </a>
              </li>
              <li>
                <a href={contactData.contactInfo.phone.href} className="footer-contact-link">
                  <span className="contact-icon">📱</span>
                  {contactData.contactInfo.phone.value}
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
              {/* <li>
                <span className="footer-contact-link">
                  <span className="contact-icon">📍</span>
                  {contactData.contactInfo.location.value}
                </span>
              </li> */}
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          variants={reduce ? undefined : staggerItem}
          initial="hidden"
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          transition={{ delay: 0.4 }}
        >
          <div className="footer-copyright">
            © {currentYear} Digitalgram. All rights reserved.
          </div>
          
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
