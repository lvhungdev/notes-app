import { useEffect, useState } from 'react';
import SideBarFile from './side-bar-file';
import SideBarDir from './side-bar-dir';
import SideBarTool from './side-bar-tool';

const SideBar = (props: SideBarProps) => {
  const [dirInfos, setDirInfos] = useState<Array<SideBarInfoType>>([]);
  const [selectedPath, setSelectedPath] = useState<string | undefined>();

  useEffect(() => {
    window.file.readDirRecursive('.').then((result) => {
      if ('error' in result) {
        console.error(result.error);
        return;
      }

      setDirInfos(result.items);
    });
  }, []);

  const handleFileClick = (path: string) => {
    setSelectedPath(path);
    props.onFileSelect?.(path);
  };

  const renderItem = (item: SideBarInfoType) => {
    if (item.type == 'file') {
      return <SideBarFile {...item} isOpen={selectedPath === item.path} onClick={handleFileClick} />;
    } else {
      return <SideBarDir {...item} selectedPath={selectedPath} onFileClick={handleFileClick} />;
    }
  };

  return (
    <div className="h-screen w-96 overflow-auto border-l border-l-gray-300 p-2 pt-0">
      <div className="sticky top-0 bg-secondary">
        <SideBarTool />
      </div>
      {dirInfos.map((m, i) => (
        <div key={i}>{renderItem(m)}</div>
      ))}
    </div>
  );
};

export default SideBar;

type SideBarProps = {
  onFileSelect?: (path: string) => void;
};

export type SideBarInfoType = DirInfoType | FileInfoType;
export type DirInfoType = { type: 'dir'; path: string; items: Array<SideBarInfoType> };
export type FileInfoType = { type: 'file'; path: string };
