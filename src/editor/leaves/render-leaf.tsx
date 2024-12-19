import { RenderLeafProps } from 'slate-react';
import LeafText, { LeafTextProps } from './leaf-text';
import LeafCodespan, { LeafCodespanProps } from './leaf-codespan';
import LeafHeading, { LeafHeadingProps } from './leaf-heading';

const renderLeaf = (props: RenderLeafProps) => {
  switch (props.leaf.type) {
    case 'text':
      return <LeafText {...(props as LeafTextProps)}>{props.children}</LeafText>;
    case 'codespan':
      return <LeafCodespan {...(props as LeafCodespanProps)}>{props.children}</LeafCodespan>;
    case 'heading':
      return <LeafHeading {...(props as LeafHeadingProps)}>{props.children}</LeafHeading>;
  }
};

export default renderLeaf;
