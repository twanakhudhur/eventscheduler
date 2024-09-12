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
        <div className={`toast toast-top toast-center`}>
          <div className={`alert py-2.5 min-w-52 rounded-md ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <span className='text-white text-sm'>{toast.message}</span>
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
