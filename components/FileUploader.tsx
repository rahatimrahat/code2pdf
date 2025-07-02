
import React, { useRef } from 'react';
import { FolderIcon } from './IconComponents';

interface FileUploaderProps {
  onFilesSelected: (fileList: FileList) => void;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFilesSelected(event.target.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        // @ts-ignore because 'webkitdirectory' and 'directory' are non-standard but widely supported
        webkitdirectory="true"
        directory="true"
        multiple
        disabled={disabled}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="w-full flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 transition-colors duration-200 ease-in-out cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FolderIcon className="w-12 h-12 text-slate-400 mb-3" />
        <span className="text-lg font-semibold text-slate-700">Select Codebase Folder</span>
        <p className="text-sm text-slate-500 mt-1">Click here or drag and drop a folder</p>
      </button>
       <p className="mt-2 text-xs text-slate-500 text-center">
        Note: Folder upload works best on Chrome, Edge, and Firefox. Some features might be limited on other browsers.
      </p>
    </div>
  );
};

export default FileUploader;
