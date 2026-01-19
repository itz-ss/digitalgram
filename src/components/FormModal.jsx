import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ZoomParallax from "../parallax/ZoomParallax";
import Form from "./Form";
import "./style/FormModal.css";

const FormModal = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="modal-container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* ZoomParallax used here as a simple scale-in wrapper */}
            <ZoomParallax from={0.9} to={1} className="modal-content">
              <div className="modal-header">
                <h2 id="modal-title" className="modal-title">
                  Get in Touch
                </h2>

                <button
                  className="modal-close"
                  onClick={onClose}
                  aria-label="Close modal"
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="modal-body">
                <Form onClose={onClose} />
              </div>
            </ZoomParallax>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FormModal;
