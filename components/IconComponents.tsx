
import React from 'react';

export const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path d="M19.5 21a1.5 1.5 0 0 0 1.5-1.5v-6.75a.75.75 0 0 0-.75-.75h-16.5a.75.75 0 0 0-.75.75v6.75A1.5 1.5 0 0 0 4.5 21h15Zm0-11.25a1.5 1.5 0 0 0-1.5-1.5h-15a1.5 1.5 0 0 0-1.5 1.5V6a1.5 1.5 0 0 0 1.5 1.5h4.161c.482 0 .944.195 1.287.538l.105.105A1.5 1.5 0 0 0 10.839 9h6.662a1.5 1.5 0 0 0 1.5-1.5V8.625A1.5 1.5 0 0 0 19.5 7.125Z" />
    <path fillRule="evenodd" d="M3 8.625A2.25 2.25 0 0 1 5.25 6.375h2.559c.56 0 1.096.233 1.488.639l.105.105A2.25 2.25 0 0 0 10.839 9H18a2.25 2.25 0 0 1 2.25 2.25v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 0-.75-.75H10.84a.75.75 0 0 1-.53-.22L10.205 7.72a.75.75 0 0 0-.53-.22H5.25a.75.75 0 0 0-.75.75v11.25c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V12a.75.75 0 0 1 1.5 0v7.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 19.5V8.625Z" clipRule="evenodd" />
  </svg>
);

export const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
    <path d="M12.971 1.816A5.23 5.23 0 0 1 15.75 1.5h.75a.75.75 0 0 1 .75.75v3.375c0 .621.504 1.125 1.125 1.125h3.375a.75.75 0 0 1 .75.75v1.684a5.25 5.25 0 0 1-1.071 3.247A5.25 5.25 0 0 1 18.375 12H16.5a3.75 3.75 0 0 1-3.75-3.75V5.25a3.75 3.75 0 0 1-.229-1.316l.01-.064Z" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06l-3.25 3.25-1.5-1.5a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.75-3.75Z" clipRule="evenodd" />
  </svg>
);

export const ExclamationCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 0 1 1.071 1.05l-1.07 1.071a.75.75 0 0 1-1.071-1.05l1.07-1.071Zm-1.07 3.75a.75.75 0 1 0 1.05 1.071l1.071-1.07.75.75a.75.75 0 1 0 1.071-1.05l-.75-.75a.75.75 0 0 0-1.05-1.071l-1.071 1.07Z" clipRule="evenodd" />
  </svg>
);

export const ArrowDownTrayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const CodeBracketIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
  </svg>
);

export const DocumentArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);
