import { useCallback, useState } from 'react';
import { BaseEditor, createEditor, DecoratedRange, NodeEntry, Text } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { AppElement, AppText } from './types';
import { renderLeaf } from './leaves';
import { parseMarkdown } from './markdown';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: AppElement;
    Text: AppText;
  }
}

const AppEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderLeafHook = useCallback(renderLeaf, []);

  const decorateHook = useCallback((entry: NodeEntry): Array<DecoratedRange> => {
    const [node, path] = entry;

    if (!Text.isText(node)) {
      return [] as Array<DecoratedRange>;
    }

    return parseMarkdown(node.text, path);
  }, []);

  return (
    <div className="h-full flex justify-center">
    <Slate editor={editor} initialValue={[{ children: [{ type: 'text', text: '' }] }]}>
      <Editable className="h-full w-full max-w-[800px] outline-none" renderLeaf={renderLeafHook} decorate={decorateHook} />
    </Slate>
    </div>
  );
};

export default AppEditor;
