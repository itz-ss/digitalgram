import { motion, useReducedMotion } from "framer-motion";
import contactData from "../data/contact.json";
import "./style/Contact.css";

const fadeSection = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Contact = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-container"
        variants={reduceMotion ? undefined : fadeSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <header className="contact-header">
          <h2 className="contact-title">{contactData.title}</h2>
          <p className="contact-subtitle">{contactData.subtitle}</p>
        </header>

        {/* Content */}
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Get in Touch</h3>

            <div className="contact-info-list">
              {Object.entries(contactData.contactInfo).map(([key, info]) => (
                <motion.div
                  key={key}
                  className="contact-info-item"
                  whileHover={
                    reduceMotion ? undefined : { x: 4 }
                  }
                >
                  <span className="contact-info-label">
                    {info.label}
                  </span>

                  {info.href ? (
                    <a
                      href={info.href}
                      className="contact-info-value"
                      target={
                        info.href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel="noopener noreferrer"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="contact-info-value">
                      {info.value}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div className="contact-social">
              <h4 className="social-title">Follow Us</h4>

              <div className="social-links">
                {contactData.socialLinks.map((social) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -2, scale: 1.03 }
                    }
                    whileTap={
                      reduceMotion
                        ? undefined
                        : { scale: 0.97 }
                    }
                  >
                    {/* <span className="social-icon">
                      {social.platform[0]}
                    </span> */}
                    <span className="social-platform">
                      {social.platform}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
