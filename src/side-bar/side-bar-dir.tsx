import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { DirInfoType, SideBarInfoType } from './side-bar';
import SideBarFile from './side-bar-file';

const SideBarDir = (props: SideBarFileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderItem = (item: SideBarInfoType) => {
    if (item.type == 'file') {
      return <SideBarFile {...item} isOpen={props.selectedPath === item.path} onClick={props.onFileClick} />;
    } else {
      return <SideBarDir {...item} selectedPath={props.selectedPath} onFileClick={props.onFileClick} />;
    }
  };

  return (
    <>
      <div
        className="flex cursor-pointer items-center rounded p-1 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDownIcon className="-ml-2 size-5" /> : <ChevronRightIcon className="-ml-2 size-5" />}
        {props.path.split('/').at(-1)}
      </div>
      {isOpen ? (
        <div className="ml-1.5 border-l border-l-gray-300 pl-2">{props.items.map((m) => renderItem(m))}</div>
      ) : null}
    </>
  );
};

export default SideBarDir;

type SideBarFileProps = DirInfoType & { selectedPath?: string; onFileClick: (path: string) => void };
