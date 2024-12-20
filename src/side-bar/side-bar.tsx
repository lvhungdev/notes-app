import { useEffect, useState } from 'react';
import SideBarFile from './side-bar-file';
import SideBarDir from './side-bar-dir';

const SideBar = (props: SideBarProps) => {
  const [dirInfos, setDirInfos] = useState<Array<SideBarInfoType>>([]);
  const [selectedPath, setSelectedPath] = useState<string | undefined>();

  useEffect(() => {
    window.file.readDirRecursive('.').then((result) => {
      if ('error' in result) {
        console.error(result.error);
        return;
      }

      result.items.sort((a, b) => a.type.localeCompare(b.type));
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

  return <div className="h-screen w-[512px] border-l border-l-gray-300">{dirInfos.map((m) => renderItem(m))}</div>;
};

export default SideBar;

type SideBarProps = {
  onFileSelect?: (path: string) => void;
};

export type SideBarInfoType = DirInfoType | FileInfoType;
export type DirInfoType = { type: 'dir'; path: string; items: Array<SideBarInfoType> };
export type FileInfoType = { type: 'file'; path: string };