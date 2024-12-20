import { RenderLeafProps } from 'slate-react';
import { LeafCodespanType } from '../types';

const LeafCodespan = (props: LeafCodespanProps) => {
  return (
    <span {...props.attributes} className="rounded bg-gray-200 font-mono text-sm p-0.5">
      {props.children}
    </span>
  );
};

export default LeafCodespan;

export type LeafCodespanProps = RenderLeafProps & { leaf: LeafCodespanType };
