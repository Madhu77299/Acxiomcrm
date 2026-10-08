import React, { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toastIcons = {
    success: <CheckCircle2 size={18} className="text-success me-2" />,
    warning: <AlertTriangle size={18} className="text-warning me-2" />,
    danger: <AlertCircle size={18} className="text-danger me-2" />,
    info: <Info size={18} className="text-primary me-2" />
  };

  return (
    <NotificationContext.Provider value={{ showToast: addToast }}>
      {children}
      {/* Toast Render Container */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="toast show shadow-sm border bg-white align-items-center mb-2"
            role="alert"
            style={{ borderRadius: "8px", minWidth: "300px" }}
          >
            <div className="d-flex p-3 align-items-center">
              {toastIcons[toast.type] || toastIcons.info}
              <div className="toast-body p-0 flex-grow-1 text-dark font-medium" style={{ fontSize: "0.875rem" }}>
                {toast.message}
              </div>
              <button
                type="button"
                className="btn-close ms-2"
                onClick={() => removeToast(toast.id)}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
