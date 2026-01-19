import React, { useState } from "react";
import TiltParallaxCard from "../parallax/TiltParallaxCard";
import contactData from "../data/contact.json";
import "./style/Form.css";

const WHATSAPP_NUMBER = "916388060502"; // Format: country code + number (no + or spaces)

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

  if (formData.phone) lines.push(`📱 *Phone:* ${formData.phone}`);
  if (formData.service) lines.push(`🎯 *Service Interest:* ${formData.service}`);

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error" | null
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error while typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      sendToWhatsApp(formData);
      setSubmitStatus("success");

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });

        setIsSubmitting(false);

        if (onClose) {
          setTimeout(() => onClose(), 1200);
        }
      }, 600);
    } catch (error) {
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`form-container ${className}`}>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {contactData.form.fields.map((field) => (
          <div key={field.name} className="form-group">
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
                className={`form-input form-textarea ${
                  errors[field.name] ? "error" : ""
                }`}
                aria-invalid={errors[field.name] ? "true" : "false"}
                aria-describedby={
                  errors[field.name] ? `${field.name}-error` : undefined
                }
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                className={`form-input form-select ${
                  errors[field.name] ? "error" : ""
                }`}
                aria-invalid={errors[field.name] ? "true" : "false"}
                aria-describedby={
                  errors[field.name] ? `${field.name}-error` : undefined
                }
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
                aria-describedby={
                  errors[field.name] ? `${field.name}-error` : undefined
                }
              />
            )}

            {/* Error text (no framer-motion needed) */}
            {errors[field.name] && (
              <span id={`${field.name}-error`} className="form-error">
                {errors[field.name]}
              </span>
            )}
          </div>
        ))}

        {/* Status message (no AnimatePresence needed) */}
        {submitStatus === "success" && (
          <div className="form-message form-success">
            ✅ {contactData.form.successMessage}
          </div>
        )}

        {submitStatus === "error" && (
          <div className="form-message form-error">
            ❌ {contactData.form.errorMessage}
          </div>
        )}

        <TiltParallaxCard>
          <button type="submit" className="form-submit" disabled={isSubmitting}>
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
          </button>
        </TiltParallaxCard>
      </form>
    </div>
  );
};

export default Form;
