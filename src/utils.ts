import {
  Element,
  ElementTag,
  DraftInlineStyleType,
  DraftBlockType,
  RawDraftInlineStyleRange,
  FlattenedInlineStyleRange,
} from "./types";

type InlineStyleOperation = (styles: DraftInlineStyleType[]) => DraftInlineStyleType[];

interface InlineStyleOperations {
  [key: string]: InlineStyleOperation[];
}

export function flattenInlineStyles(
  inlineStyles: RawDraftInlineStyleRange[],
): FlattenedInlineStyleRange[] {
  const operationsMap = getStyleOperations(inlineStyles);
  const flattenedInlineStyles = applyStyleOperations(operationsMap);
  return flattenedInlineStyles.filter<FlattenedInlineStyleRange>(
    (inlineStyle): inlineStyle is FlattenedInlineStyleRange => inlineStyle != null,
  );
}

/**
 * Go from:
 *
 * ```
 * [
 *   { offset: 37,
 * length: 8, style: InlineStyle.BOLD },
 *   { offset: 42, length: 10, style: InlineStyle.ITALIC },
 * ]
 * ```
 *
 * to:
 *
 * ```
 * {
 *   37: [add InlineStyle.BOLD],
 *   42: [add InlineStyle.ITALIC],
 *   45: [remove InlineStyle.BOLD],
 *   52: [remove InlineStyle.ITALIC],
 * ]
 * ```
 */
function getStyleOperations(inlineStyles: RawDraftInlineStyleRange[]): InlineStyleOperations {
  const sortedInlineStyles = [...inlineStyles].sort((a, b) => a.offset - b.offset);

  return sortedInlineStyles.reduce<InlineStyleOperations>((result, inlineStyle) => {
    const style = inlineStyle.style;
    const start = inlineStyle.offset;
    const end = inlineStyle.offset + inlineStyle.length;
    result[start] = (result[start] || []).concat(styles => {
      styles.push(style);
      return styles;
    });
    result[end] = (result[end] || []).concat(styles => {
      styles.splice(styles.indexOf(style), 1);
      return styles;
    });
    return result;
  }, {});
}

/**
 * Go from:
 *
 * ```
 * {
 *   37: [add InlineStyle.BOLD],
 *   42: [add InlineStyle.ITALIC],
 *   45: [remove InlineStyle.BOLD],
 *   52: [remove InlineStyle.ITALIC],
 * }
 * ```
 *
 * to:
 *
 * ```
 * [
 *   { offset: 37, length: 5, styles: [InlineStyle.BOLD] },
 *   { offset: 42, length: 3, styles: [InlineStyle.BOLD, InlineStyle.ITALIC] },
 *   { offset: 45, length: 7, styles: [InlineStyle.ITALIC] },
 * ]
 * ```
 */
function applyStyleOperations(operationsMap: InlineStyleOperations) {
  return Object.keys(operationsMap).reduce<
    Array<FlattenedInlineStyleRange | null>
  >((result, offsetStr) => {
    const offset = parseInt(offsetStr, 10);
    const operations = operationsMap[offset];
    const previousResult = result[result.length - 1];
    const previousStyles = previousResult != null ? [...previousResult.styles] : [];
    const newStyles = operations.reduce<DraftInlineStyleType[]>(
      (styles, operation) => operation(styles),
      previousStyles,
    );

    if (previousResult != null) {
      previousResult.length = offset - previousResult.offset;
    }

    result.push(
      newStyles.length === 0
        ? null
        : {
            offset,
            length: 0,
            styles: newStyles,
          },
    );

    return result;
  }, []);
}

export function getElementForFlattenedInlineStyle(
  text: string,
  inlineStyle: FlattenedInlineStyleRange,
): Element {
  return inlineStyle.styles.reduceRight<Element>((result, style) => {
    const tag = getTagForInlineStyle(style);
    const content = text.substr(inlineStyle.offset, inlineStyle.length);

    return {
      tag,
      children: [result != null ? result : content],
    };
  }, null);
}

export function getWrapperTagForBlockType(blockType: DraftBlockType): ElementTag | null {
  switch (blockType) {
    case "unordered-list-item":
      return "ul";
    case "ordered-list-item":
      return "ol";
    default:
      return null;
  }
}

export function getTagForBlockType(blockType: DraftBlockType): ElementTag {
  switch (blockType) {
    case "header-one":
      return "h1";
    case "header-two":
      return "h2";
    case "header-three":
      return "h3";
    case "header-four":
      return "h4";
    case "header-five":
      return "h5";
    case "header-six":
      return "h6";
    case "unordered-list-item":
    case "ordered-list-item":
      return "li";
    case "blockquote":
      return "blockquote";
    case "atomic":
      return "figure";
    case "code-block":
      return "pre";
    default:
      return "p";
  }
}

export function getTagForInlineStyle(inlineStyle: DraftInlineStyleType): ElementTag {
  switch (inlineStyle) {
    case "BOLD":
      return "b";
    case "ITALIC":
      return "i";
    case "STRIKETHROUGH":
      return "s";
    case "UNDERLINE":
      return "u";
    case "CODE":
      return "code";
    default:
      return "span";
  }
}
