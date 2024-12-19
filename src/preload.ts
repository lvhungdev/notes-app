import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('file', {
  write: async (filePath: string, content: string) => await ipcRenderer.invoke('write-file', { filePath, content }),
  read: async (filePath: string) => await ipcRenderer.invoke('read-file', { filePath }),
});
