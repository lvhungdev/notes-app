import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppEditor, AppElement } from './editor';
import { SideBar } from './side-bar';

const App = () => {
  const [value, setValue] = useState<Array<AppElement>>([{ children: [{ type: 'text', text: '' }] }]);
  const [isLoading, setIsLoading] = useState(false);
  const [filePath, setFilePath] = useState<string | undefined>();

  useEffect(() => {
    if (!filePath) return;

    setIsLoading(true);
    window.file.read(filePath).then((result) => {
      setIsLoading(false);
      if ('error' in result) {
        console.error(result.error);
        return;
      }

      setValue(JSON.parse(result.content));
    });
  }, [filePath]);

  return (
    <div className="flex h-screen">
      {isLoading ? null : (
        <div className="w-full p-8">
          <AppEditor
            initialValue={value}
            onSave={(content) => window.file.write(filePath, JSON.stringify(content))}
          />
        </div>
      )}
      <SideBar onFileSelect={(path) => setFilePath(path)} />
    </div>
  );
};

const root = createRoot(document.body);
root.render(<App />);
