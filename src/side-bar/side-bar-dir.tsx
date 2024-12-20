import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
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
    <div>
      <div className="flex cursor-pointer rounded-sm p-1 hover:bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronDownIcon className="size-6" /> : <ChevronRightIcon className="size-6" />}
        {props.path.split('/').at(-1)}
      </div>
      {isOpen ? <div className="mr-2">{props.items.map((m) => renderItem(m))}</div> : null}
    </div>
  );
};

export default SideBarDir;

type SideBarFileProps = DirInfoType & { selectedPath?: string; onFileClick: (path: string) => void };
