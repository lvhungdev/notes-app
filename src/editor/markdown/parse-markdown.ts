import { DecoratedRange, Path } from 'slate';
import { marked, Token } from 'marked';

const parseMarkdown = (text: string, path: Path) => {
  const tokens = marked.lexer(text);
  const ranges: Array<unknown> = [];

  for (const token of tokens) {
    switch (token?.type) {
      case 'heading': {
        ranges.push({
          type: 'heading',
          depth: token.depth,
          anchor: { path, offset: 0 },
          focus: { path, offset: token.raw.length },
        });
        ranges.push(...parseInlineTokens(token.tokens, path, token.depth + 1));

        break;
      }

      case 'paragraph': {
        ranges.push(...parseInlineTokens(token.tokens, path, 0));

        break;
      }

      default:
        break;
    }
  }

  return ranges as Array<DecoratedRange>;
};

const parseInlineTokens = (tokens: Array<Token>, path: Path, offset: number) => {
  const ranges: Array<unknown> = [];

  for (const token of tokens) {
    if (token?.type === 'codespan') {
      ranges.push({
        type: 'codespan',
        anchor: { path, offset: offset },
        focus: { path, offset: offset + token.raw.length },
      });
    } else if (token.type !== 'text') {
      ranges.push({
        [token.type]: true,
        anchor: { path, offset: offset },
        focus: { path, offset: offset + token.raw.length },
      });
    }
    offset += token.raw.length;
  }

  return ranges as Array<DecoratedRange>;
};

export default parseMarkdown;
