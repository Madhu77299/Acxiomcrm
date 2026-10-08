import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ title, isOpen, onClose, children, size = "md" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "modal-sm",
    md: "",
    lg: "modal-lg",
    xl: "modal-xl"
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(2px)" }}
    >
      <div className={`modal-dialog modal-dialog-centered ${sizeClasses[size]}`}>
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header d-flex align-items-center justify-content-between">
            <h5 className="modal-title fw-semibold text-dark">{title}</h5>
            <button
              type="button"
              className="btn-close shadow-none"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
