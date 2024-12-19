import { RenderLeafProps } from 'slate-react';
import { LeafTextType } from '../types';

const LeafText = (props: LeafTextProps) => {
  return (
    <span {...props.attributes} className={(props.leaf.strong ? 'font-bold' : '') + (props.leaf.em ? ' italic' : '')}>
      {props.children}
    </span>
  );
};

export default LeafText;

export type LeafTextProps = RenderLeafProps & { leaf: LeafTextType };
