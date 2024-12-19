import { ipcMain } from 'electron';
import path from 'path';
import os from 'os';
import fs from 'fs';

const appDir = path.join(os.homedir(), '.notes-app');

ipcMain.handle('write-file', (_, { filePath, content }: { filePath: string; content: string }) => {
  try {
    const fullPath = path.join(appDir, filePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, content, { encoding: 'utf8' });
    return { error: undefined };
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('read-file', (_, { filePath }: { filePath: string }) => {
  try {
    const fullPath = path.join(appDir, filePath);

    return {
      content: fs.readFileSync(fullPath, { encoding: 'utf8' }),
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
});
