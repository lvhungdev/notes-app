import { createRoot } from 'react-dom/client';
import { AppEditor } from './editor';

const App = () => {
  return (
    <div className="h-screen p-10">
      <AppEditor />
    </div>
  );
};

const root = createRoot(document.body);
root.render(<App />);
