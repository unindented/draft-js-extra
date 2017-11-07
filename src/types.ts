import { ReactHTML } from "react";
import {
  DraftBlockType,
  DraftInlineStyleType,
  DraftEntityType,
  DraftEntityMutability,
  RawDraftInlineStyleRange,
  RawDraftEntityRange,
  RawDraftEntity,
  RawDraftContentBlock,
  RawDraftContentState,
} from "draft-js";

export {
  DraftBlockType,
  DraftInlineStyleType,
  DraftEntityType,
  DraftEntityMutability,
  RawDraftInlineStyleRange,
  RawDraftEntityRange,
  RawDraftEntity,
  RawDraftContentBlock,
  RawDraftContentState,
};

/**
 * A plain object representation of a flattened inline style range.
 */
export interface FlattenedInlineStyleRange {
  styles: DraftInlineStyleType[];
  offset: number;
  length: number;
}

/**
 * Possible element tags.
 */
export type ElementTag = keyof ReactHTML;

/**
 * An element with children to be converted into a React node.
 */
export interface ComplexElement {
  tag: ElementTag;
  children: Element[];
}

/**
 * An element to be converted into a React node.
 */
export type Element = ComplexElement | string | null | undefined;
