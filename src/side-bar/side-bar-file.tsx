import { FileInfoType } from './side-bar';

const SideBarFile = (props: SideBarFileProps) => {
  return (
    <div
      className={`cursor-pointer rounded p-1 hover:bg-gray-200 ${props.isOpen ? 'bg-gray-300' : ''}`}
      onClick={() => props.onClick(props.path)}
    >
      {props.path.split('/').at(-1)}
    </div>
  );
};

export default SideBarFile;

type SideBarFileProps = FileInfoType & { isOpen: boolean; onClick: (path: string) => void };
