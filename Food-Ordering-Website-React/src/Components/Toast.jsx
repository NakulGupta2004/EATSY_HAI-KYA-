import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`blog-toast-notification`}>
      <div className={`blog-toast ${type}`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
