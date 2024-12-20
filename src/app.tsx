import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppEditor, AppElement } from './editor';
import { MenuBar } from './menu-bar';
import { SideBar } from './side-bar';

const App = () => {
  const [value, setValue] = useState<Array<AppElement>>([{ children: [{ type: 'text', text: '' }] }]);
  const [isLoading, setIsLoading] = useState(true);
  const [filePath, setFilePath] = useState<string | undefined>();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

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
    <div className="flex">
      <div className="h-screen w-full overflow-auto p-8 pt-0">
        <div className="sticky top-0 z-10 mb-1 bg-secondary">
          <MenuBar onSideBarToggle={(isOpen) => setIsSideBarOpen(isOpen)} />
        </div>
        <div className="h-4" />
        {isLoading ? null : (
          <AppEditor initialValue={value} onSave={(content) => window.file.write(filePath, JSON.stringify(content))} />
        )}
      </div>
      {isSideBarOpen && <SideBar onFileSelect={(path) => setFilePath(path)} />}
    </div>
  );
};

const root = createRoot(document.body);
root.render(<App />);
