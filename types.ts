
export interface ProcessedFile {
  id: string;
  relativePath: string; // Full path relative to the root of the upload, e.g., "my-project/src/utils/helpers.ts"
  fileName: string; // Just the file name, e.g., "helpers.ts"
  directoryPath: string; // Directory path relative to root, e.g., "my-project/src/utils/"
  content: string;
}

export type AlertType = 'success' | 'error' | 'info' | 'warning';
