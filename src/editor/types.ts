import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export type LeafHeadingType = { type: 'heading'; depth: 1 | 2 | 3; text: string };
export type LeafTextType = { type: 'text'; strong?: boolean; em?: boolean; text: string };
export type LeafCodespanType = { type: 'codespan'; text: string };

export type AppText = LeafHeadingType | LeafTextType | LeafCodespanType;

export type AppElement = { children: AppText[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: AppElement;
    Text: AppText;
  }
}
