
import React, { useState, useCallback, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import FileUploader from './components/FileUploader';
import LoadingSpinner from './components/LoadingSpinner';
import AlertMessage from './components/AlertMessage';
import { ProcessedFile, AlertType } from './types';
import { CodeBracketIcon, DocumentArrowDownIcon, FileIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<ProcessedFile[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
  const [showFileInfo, setShowFileInfo] = useState<boolean>(false);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [alert]);

  const handleFilesSelected = useCallback(async (fileList: FileList) => {
    setAlert(null);
    setIsLoading(true);
    setLoadingMessage('Processing files...');
    setSelectedFiles([]);
    setProjectName('');
    setShowFileInfo(false);

    if (fileList.length === 0) {
      setAlert({ type: 'warning', message: 'No folder selected or folder is empty.' });
      setIsLoading(false);
      return;
    }

    const filesArray = Array.from(fileList);
    const processed: ProcessedFile[] = [];
    let commonPathPrefix = filesArray[0].webkitRelativePath.split('/')[0] || 'Codebase';
    setProjectName(commonPathPrefix);

    try {
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        if (file.size > 10 * 1024 * 1024) { // Skip files larger than 10MB
          console.warn(`Skipping large file: ${file.name} (${(file.size / (1024*1024)).toFixed(2)} MB)`);
          continue;
        }
        if (file.type && !file.type.startsWith('text/') && !file.name.match(/\.(tsx|ts|js|jsx|json|md|html|css|py|java|c|cpp|h|cs|rb|php|go|rs|swift|kt|sh|yaml|yml|xml|toml|ini|cfg|conf|log|txt)$/i) && file.type !== '') {
           console.warn(`Skipping binary or non-code file: ${file.name} (type: ${file.type})`);
           continue; // Attempt to skip common binary types or non-code extensions
        }

        setLoadingMessage(`Reading file ${i + 1} of ${filesArray.length}: ${file.name}`);
        const content = await readFileAsText(file);
        const pathParts = file.webkitRelativePath.split('/');
        const fileName = pathParts.pop() || file.name;
        const directoryPath = pathParts.join('/') + (pathParts.length > 0 ? '/' : '');
        
        processed.push({
          id: file.webkitRelativePath || file.name,
          relativePath: file.webkitRelativePath || file.name,
          fileName,
          directoryPath,
          content,
        });
      }

      if (processed.length === 0) {
        setAlert({ type: 'warning', message: 'No processable text files found in the selected folder.' });
        setIsLoading(false);
        return;
      }

      // Sort files by path for structured PDF output
      processed.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
      setSelectedFiles(processed);
      setShowFileInfo(true);
      setAlert({ type: 'success', message: `${processed.length} files processed from project "${commonPathPrefix}". Ready to generate PDF.` });
    } catch (error) {
      console.error('Error processing files:', error);
      setAlert({ type: 'error', message: `Error processing files: ${error instanceof Error ? error.message : String(error)}` });
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  const readFileAsText = <T,>(file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  const generatePdf = useCallback(() => {
    if (selectedFiles.length === 0) {
      setAlert({ type: 'warning', message: 'No files selected to generate PDF.' });
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Generating PDF, this may take a moment...');
    setAlert(null);

    // Using setTimeout to allow UI to update before blocking operation
    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: 'p',
          unit: 'pt', // points
          format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 40; // points
        const maxLineWidth = pageWidth - 2 * margin;
        let currentY = margin;
        
        const codeFontSize = 8;
        const headingFontSize = 14;
        const subHeadingFontSize = 10;
        const lineHeightMultiplier = 1.2;
        const codeLineHeight = codeFontSize * lineHeightMultiplier;
        const headingLineHeight = headingFontSize * lineHeightMultiplier;
        const subHeadingLineHeight = subHeadingFontSize * lineHeightMultiplier;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        const projectTitle = `Codebase: ${projectName}`;
        const projectTitleWidth = doc.getTextWidth(projectTitle);
        doc.text(projectTitle, (pageWidth - projectTitleWidth) / 2, currentY);
        currentY += 18 * lineHeightMultiplier * 2;


        let lastPrintedDirectory = '';

        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          setLoadingMessage(`Adding to PDF: ${file.fileName} (${i+1}/${selectedFiles.length})`);

          // Print directory header if it's new
          if (file.directoryPath !== lastPrintedDirectory) {
            if (currentY + headingLineHeight * 2 > pageHeight - margin) { // Check space for dir header + one line of file
              doc.addPage();
              currentY = margin;
            }
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(headingFontSize);
            doc.text(`Directory: ${file.directoryPath}`, margin, currentY);
            currentY += headingLineHeight;
            lastPrintedDirectory = file.directoryPath;
            currentY += headingLineHeight * 0.5; // Extra space after directory
          }

          // Print file name header
          if (currentY + subHeadingLineHeight * 2 > pageHeight - margin) { // Check space for file header + one line of code
            doc.addPage();
            currentY = margin;
          }
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(subHeadingFontSize);
          doc.setTextColor(80, 80, 80); // Dark Gray
          doc.text(`File: ${file.fileName}`, margin, currentY);
          currentY += subHeadingLineHeight;
          doc.setTextColor(0,0,0); // Reset to black

          // Print file content
          doc.setFont('courier', 'normal');
          doc.setFontSize(codeFontSize);
          
          const lines = file.content.split(/\r\n|\r|\n/); // Split content into lines
          for (const line of lines) {
            // Split long lines by available width
            const splitLine = doc.splitTextToSize(line || ' ', maxLineWidth); // Use ' ' for empty lines to maintain spacing
            for (const textChunk of splitLine) {
                if (currentY + codeLineHeight > pageHeight - margin) {
                    doc.addPage();
                    currentY = margin;
                }
                doc.text(textChunk, margin, currentY);
                currentY += codeLineHeight;
            }
          }
          currentY += codeLineHeight; // Extra space after file content
        }
        
        doc.save(`${projectName}_codebase.pdf`);
        setAlert({ type: 'success', message: `PDF "${projectName}_codebase.pdf" generated successfully!` });
      } catch (e) {
        console.error('Error generating PDF:', e);
        setAlert({ type: 'error', message: `Failed to generate PDF: ${e instanceof Error ? e.message : String(e)}` });
      } finally {
        setIsLoading(false);
        setLoadingMessage('');
      }
    }, 100); // Small delay for UI update

  }, [selectedFiles, projectName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-sky-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center bg-blue-600 p-3 rounded-full shadow-lg mb-4">
            <CodeBracketIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Codebase to PDF</h1>
          <p className="mt-3 text-lg text-slate-600">
            Convert your entire project folder into a single, structured PDF document.
          </p>
        </header>

        {alert && (
          <div className="mb-6">
            <AlertMessage type={alert.type} message={alert.message} onDismiss={() => setAlert(null)} />
          </div>
        )}

        <main className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl space-y-8">
          <section id="file-upload-section">
            <h2 className="text-xl font-semibold text-slate-700 mb-3">1. Select Your Codebase Folder</h2>
            <FileUploader onFilesSelected={handleFilesSelected} disabled={isLoading} />
          </section>

          {isLoading && (
            <div className="py-6 flex flex-col items-center">
              <LoadingSpinner size="h-12 w-12" />
              <p className="mt-3 text-slate-600 font-medium">{loadingMessage || 'Processing...'}</p>
            </div>
          )}

          {showFileInfo && selectedFiles.length > 0 && !isLoading && (
            <section id="file-info-section" className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-700 mb-4">2. Review and Generate</h2>
              <div className="bg-slate-50 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <FileIcon className="h-6 w-6 text-blue-600" />
                  <p className="text-slate-700">
                    <span className="font-semibold">{projectName}</span> - {selectedFiles.length} files ready.
                  </p>
                </div>
                <button
                  onClick={generatePdf}
                  disabled={isLoading || selectedFiles.length === 0}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                  Generate PDF
                </button>
              </div>
            </section>
          )}

          {selectedFiles.length === 0 && !isLoading && (
            <div className="text-center py-6">
                <p className="text-slate-500">Upload a folder to begin.</p>
            </div>
          )}
        </main>

        <footer className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Powered by React & Tailwind CSS. PDF generation via jsPDF.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
