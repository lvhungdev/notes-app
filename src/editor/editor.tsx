import { KeyboardEvent, useCallback, useState } from 'react';
import { createEditor, DecoratedRange, Descendant, NodeEntry, Text } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { renderLeaf } from './leaves';
import { parseMarkdown } from './markdown';

const AppEditor = (props: AppEditorProps) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [content, setContent] = useState<Array<Descendant>>(props.initialValue);

  const renderLeafHook = useCallback(renderLeaf, []);

  const decorateHook = useCallback((entry: NodeEntry): Array<DecoratedRange> => {
    const [node, path] = entry;

    if (!Text.isText(node)) {
      return [] as Array<DecoratedRange>;
    }

    return parseMarkdown(node.text, path);
  }, []);

  const handleEditorChange = (value: Array<Descendant>) => {
    const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type);
    if (isAstChange) {
      setContent(value);
    }
  };

  const handleEditorKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 's') {
      props.onChange?.(content);
    }
  };

  return (
    <div className="flex h-full justify-center">
      <Slate editor={editor} initialValue={props.initialValue} onChange={handleEditorChange}>
        <Editable
          className="h-full w-full max-w-[800px] outline-none"
          renderLeaf={renderLeafHook}
          decorate={decorateHook}
          onKeyDown={handleEditorKeyDown}
        />
      </Slate>
    </div>
  );
};

export default AppEditor;

export type AppEditorProps = {
  initialValue: Array<Descendant>;
  onChange?: (value: Array<Descendant>) => void;
};
