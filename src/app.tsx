import { createRoot } from 'react-dom/client';
import { AppEditor, AppElement } from './editor';
import { useEffect, useState } from 'react';

const App = () => {
  const [value, setValue] = useState<Array<AppElement>>([{ children: [{ type: 'text', text: '' }] }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.file.read('note.json').then((result) => {
      setIsLoading(false);
      if ('content' in result) {
        setValue(JSON.parse(result.content));
      }
    });
  }, []);

  return (
    <div className="h-screen p-10">
      {isLoading ? null : (
        <AppEditor
          initialValue={value}
          onChange={(content) => window.file.write('note.json', JSON.stringify(content))}
        />
      )}
    </div>
  );
};

const root = createRoot(document.body);
root.render(<App />);

declare global {
  interface Window {
    file: {
      write: (filePath: string, content: string) => Promise<{ error?: string }>;
      read: (filePath: string) => Promise<{ content: string } | { error: string }>;
    };
  }
}
