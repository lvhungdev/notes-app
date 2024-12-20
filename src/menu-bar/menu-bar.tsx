import { Bars2Icon } from '@heroicons/react/16/solid';
import { useState } from 'react';

const MenuBar = (props: MenuBarProps) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const handleToggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
    props.onSideBarToggle?.(!isSideBarOpen);
  };

  return (
    <div className="flex w-full justify-end border-b border-b-gray-300 pb-1 pt-2">
      <div
        className={`cursor-pointer rounded p-1 hover:bg-gray-200 ${isSideBarOpen ? 'bg-gray-300' : ''}`}
        onClick={handleToggleSideBar}
      >
        <Bars2Icon className="size-4" />
      </div>
    </div>
  );
};

export default MenuBar;

type MenuBarProps = {
  onSideBarToggle?: (isOpen: boolean) => void;
};
