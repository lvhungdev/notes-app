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

ipcMain.handle('read-dir-recursive', (_, { dirPath }: { dirPath: string }) => {
  try {
    return {
      items: readDirRecursive(path.join(appDir, dirPath)),
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
});

type DirInfo = { type: 'file'; path: string } | { type: 'dir'; path: string; items: Array<DirInfo> };

const readDirRecursive = (dirPath: string): Array<DirInfo> => {
  const items: Array<DirInfo> = [];
  const paths = fs.readdirSync(dirPath).filter((m) => m !== '.DS_Store');

  for (const p of paths) {
    const innerPath = path.join(dirPath, p);
    const stats = fs.statSync(innerPath);

    if (stats.isDirectory()) {
      items.push({
        type: 'dir',
        path: innerPath.replace(appDir, ''),
        items: readDirRecursive(innerPath),
      });
    } else {
      items.push({
        type: 'file',
        path: innerPath.replace(appDir, ''),
      });
    }
  }

  items.sort((a, b) => a.type.localeCompare(b.type));

  return items;
};
