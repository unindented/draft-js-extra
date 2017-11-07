import { ReactNode, createElement } from "react";
import { ComplexElement, Element, RawDraftContentBlock, RawDraftContentState } from "./types";
import {
  getWrapperTagForBlockType,
  getTagForBlockType,
  flattenInlineStyles,
  getElementForFlattenedInlineStyle,
} from "./utils";

export * from "./types";

const brElement: ComplexElement = { tag: "br", children: [] };

/**
 * Converts raw content state to React nodes.
 *
 * @param contentState Raw content state coming from Draft.js.
 */
export function contentStateToReact(contentState: RawDraftContentState): ReactNode {
  return elementsToReact(contentStateToElements(contentState));
}

/**
 * Converts a tree of elements from plain objects to React nodes.
 *
 * @param elements Tree of elements as plain objects.
 */
export function elementsToReact(elements: Element[]): ReactNode {
  return elements.map(element => {
    if (element == null || typeof element === "string") {
      return element;
    }

    const { tag, children } = element;
    return createElement(
      tag,
      undefined,
      children && children.length > 0 ? elementsToReact(children) : undefined,
    );
  });
}

/**
 * Converts raw content state to a tree of elements.
 *
 * @param contentState Raw content state coming from Draft.js.
 */
export function contentStateToElements(contentState: RawDraftContentState): Element[] {
  return processBlocks(contentState.blocks);
}

function processBlocks(blocks: RawDraftContentBlock[]): Element[] {
  return blocks.reduce<Element[]>(processBlock, []);
}

function processBlock(elements: Element[], block: RawDraftContentBlock): Element[] {
  const previousElement = elements[elements.length - 1];
  const parentElement = getParent(previousElement, block);
  const currentElement = {
    tag: getTagForBlockType(block.type),
    children: getChildren(block),
  };

  if (parentElement == null) {
    // This element doesn"t need a parent, so just add it to the list.
    elements.push(currentElement);
  } else if (parentElement === previousElement) {
    // This element needs a parent, and we were able to reuse the previous
    // element, so we can just add the element as a child.
    parentElement.children.push(currentElement);
  } else {
    // This element needs a parent, and we were not able to reuse the previous
    // element, so we need to add the element as a child, and add the parent
    // to the list.
    parentElement.children.push(currentElement);
    elements.push(parentElement);
  }

  return elements;
}

function getParent(
  prevElement: Element | undefined,
  block: RawDraftContentBlock,
): ComplexElement | null {
  const parentTag = getWrapperTagForBlockType(block.type);

  if (parentTag == null) {
    return parentTag;
  }

  // If the previous element can act as parent of this block, reuse it.
  if (prevElement != null && typeof prevElement !== "string" && prevElement.tag === parentTag) {
    return prevElement;
  }

  // Otherwise, create a new parent.
  return {
    tag: parentTag,
    children: [],
  };
}

function getChildren(block: RawDraftContentBlock): Element[] {
  const { text, inlineStyleRanges: inlineStyles } = block;

  if (inlineStyles == null || inlineStyles.length === 0) {
    // If the block has no text, return a line break element as only child.
    return text ? [text] : [brElement];
  }

  let lastIndex = 0;

  const children = flattenInlineStyles(inlineStyles).reduce<Element[]>((result, range) => {
    // Push preceding text if any.
    if (range.offset > lastIndex) {
      result.push(text.substring(lastIndex, range.offset));
    }

    // Append element to result.
    result.push(getElementForFlattenedInlineStyle(text, range));

    // Update last index.
    lastIndex = range.offset + range.length;

    return result;
  }, []);

  // Push remaining text if any.
  if (lastIndex < text.length) {
    children.push(text.substring(lastIndex, text.length));
  }

  return children;
}
