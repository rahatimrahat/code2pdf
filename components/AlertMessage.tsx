
import React from 'react';
import { AlertType } from '../types';
import { CheckCircleIcon, ExclamationCircleIcon } from './IconComponents';

interface AlertMessageProps {
  type: AlertType;
  message: string;
  onDismiss?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message, onDismiss }) => {
  const baseClasses = 'p-4 rounded-md flex items-start space-x-3 shadow-md';
  let specificClasses = '';
  let IconComponent: React.FC<{ className?: string }> | null = null;

  switch (type) {
    case 'success':
      specificClasses = 'bg-green-50 text-green-700';
      IconComponent = CheckCircleIcon;
      break;
    case 'error':
      specificClasses = 'bg-red-50 text-red-700';
      IconComponent = ExclamationCircleIcon;
      break;
    case 'info':
      specificClasses = 'bg-blue-50 text-blue-700';
      IconComponent = ExclamationCircleIcon; // Or a specific InfoIcon
      break;
    case 'warning':
      specificClasses = 'bg-yellow-50 text-yellow-700';
      IconComponent = ExclamationCircleIcon; // Or a specific WarningIcon
      break;
  }

  if (!message) return null;

  return (
    <div className={`${baseClasses} ${specificClasses}`} role="alert">
      {IconComponent && <IconComponent className={`w-5 h-5 flex-shrink-0 ${
        type === 'success' ? 'text-green-500' : 
        type === 'error' ? 'text-red-500' :
        type === 'info' ? 'text-blue-500' : 'text-yellow-500'
      }`} />}
      <p className="text-sm font-medium flex-grow">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 focus:ring-2 ${
            type === 'success' ? 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600' :
            type === 'error' ? 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600' :
            type === 'info' ? 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600' :
            'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600'
          }`}
          aria-label="Dismiss"
        >
          <span className="sr-only">Dismiss</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
      )}
    </div>
  );
};

export default AlertMessage;
