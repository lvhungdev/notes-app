import { FolderPlusIcon, MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/16/solid';

const SideBarTool = () => {
  return (
    <div className="flex items-center justify-between pb-1 pt-2">
      <div className="font-semibold">Explorer</div>
      <div className="flex">
        <div className="cursor-pointer rounded p-1 hover:bg-gray-200">
          <FolderPlusIcon className="size-5" />
        </div>
        <div className="w-1" />
        <div className="cursor-pointer rounded p-1 hover:bg-gray-200">
          <PencilSquareIcon className="size-5" />
        </div>
        <div className="w-1" />
        <div className="cursor-pointer rounded p-1 hover:bg-gray-200">
          <MagnifyingGlassIcon className="size-5" />
        </div>
      </div>
    </div>
  );
};

export default SideBarTool;
