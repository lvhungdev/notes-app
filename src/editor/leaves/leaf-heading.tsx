import { RenderLeafProps } from 'slate-react';
import { LeafHeadingType } from '../types';

const LeafHeading = (props: LeafHeadingProps) => {
  const getFontSize = () => {
    switch (props.leaf.depth) {
      case 1:
        return 'text-3xl';
      case 2:
        return 'text-2xl';
      case 3:
        return 'text-xl';
    }
  };

  return (
    <span {...props.attributes} className={`font-heading ${getFontSize()}`}>
      {props.children}
    </span>
  );
};

export default LeafHeading;

export type LeafHeadingProps = RenderLeafProps & { leaf: LeafHeadingType };
