import React, { useContext } from 'react';

const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = React.useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); 
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast toast-top toast-end`}>
          <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
