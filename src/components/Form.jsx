import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { buttonHover, staggerItem } from "../animations/motionVariants";
import contactData from "../data/contact.json";
import "./style/Form.css";

const WHATSAPP_NUMBER = "916388060502"; // Format: country code + number (no + or spaces)
// Note: User provided 6388060502, formatted as 916388060502 (India country code 91)

/**
 * Formats form data into a readable WhatsApp message
 */
const formatWhatsAppMessage = (formData) => {
  const lines = [
    "🎯 *New Contact Form Submission*",
    "",
    `👤 *Name:* ${formData.name}`,
    `📧 *Email:* ${formData.email}`,
  ];

  if (formData.phone) {
    lines.push(`📱 *Phone:* ${formData.phone}`);
  }

  if (formData.service) {
    lines.push(`🎯 *Service Interest:* ${formData.service}`);
  }

  lines.push("");
  lines.push(`💬 *Message:*`);
  lines.push(formData.message);

  return lines.join("\n");
};

/**
 * Opens WhatsApp with pre-filled message
 */
const sendToWhatsApp = (formData) => {
  const message = formatWhatsAppMessage(formData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

const Form = ({ onClose, className = "" }) => {
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send to WhatsApp
      sendToWhatsApp(formData);
      
      // Show success message
      setSubmitStatus("success");
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
        setIsSubmitting(false);
        
        // Close modal if onClose is provided
        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      }, 1000);
    } catch (error) {
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`form-container ${className}`}>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {contactData.form.fields.map((field, index) => (
          <motion.div
            key={field.name}
            className="form-group"
            variants={reduce ? undefined : staggerItem}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
          >
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                rows={6}
                className={`form-input form-textarea ${errors[field.name] ? "error" : ""}`}
                aria-invalid={errors[field.name] ? "true" : "false"}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                className={`form-input form-select ${errors[field.name] ? "error" : ""}`}
                aria-invalid={errors[field.name] ? "true" : "false"}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              >
                <option value="">Select a service</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                className={`form-input ${errors[field.name] ? "error" : ""}`}
                aria-invalid={errors[field.name] ? "true" : "false"}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              />
            )}
            {errors[field.name] && (
              <motion.span
                id={`${field.name}-error`}
                className="form-error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors[field.name]}
              </motion.span>
            )}
          </motion.div>
        ))}

        <AnimatePresence>
          {submitStatus === "success" && (
            <motion.div
              className="form-message form-success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ✅ {contactData.form.successMessage}
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              className="form-message form-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ❌ {contactData.form.errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          className="form-submit"
          disabled={isSubmitting}
          whileHover={reduce ? undefined : buttonHover.hover}
          whileTap={reduce ? undefined : buttonHover.tap}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              {contactData.form.submittingText}
            </>
          ) : (
            <>
              <span className="whatsapp-icon">💬</span>
              {contactData.form.submitText}
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default Form;
