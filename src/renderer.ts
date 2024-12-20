import './app';
import './index.css';

type DirInfo = { type: 'file'; path: string } | { type: 'dir'; path: string; items: Array<DirInfo> };

declare global {
  interface Window {
    file: {
      write: (filePath: string, content: string) => Promise<{ error?: string }>;
      read: (filePath: string) => Promise<{ content: string } | { error: string }>;
      readDirRecursive: (dirPath: string) => Promise<{ items: Array<DirInfo> } | { error: string }>;
    };
  }
}
