import { RenderLeafProps } from 'slate-react';
import { LeafCodespanType } from '../types';

const LeafCodespan = (props: LeafCodespanProps) => {
  return (
    <span {...props.attributes} className="font-mono">
      {props.children}
    </span>
  );
};

export default LeafCodespan;

export type LeafCodespanProps = RenderLeafProps & { leaf: LeafCodespanType };
