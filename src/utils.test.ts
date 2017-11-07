import {
  DraftBlockType,
  DraftInlineStyleType,
  RawDraftInlineStyleRange,
  FlattenedInlineStyleRange,
} from "./types";
import {
  getWrapperTagForBlockType,
  getTagForBlockType,
  getTagForInlineStyle,
  flattenInlineStyles,
  getElementForFlattenedInlineStyle,
} from "./utils";

describe("draft/utils", () => {
  describe(".getWrapperTagForBlockType", () => {
    it("returns the wrapper tag for a block type", () => {
      expect(getWrapperTagForBlockType("unordered-list-item")).toBe("ul");
    });

    it("returns null when no wrapper tag is needed", () => {
      expect(getWrapperTagForBlockType("blockquote")).toBe(null);
    });
  });

  describe(".getTagForBlockType", () => {
    it("returns the tag for a block type", () => {
      expect(getTagForBlockType("unordered-list-item")).toBe("li");
    });

    it("returns `p` by default", () => {
      expect(getTagForBlockType("unstyled")).toBe("p");
    });
  });

  describe(".getTagForInlineType", () => {
    it("returns the tag for an inline type", () => {
      expect(getTagForInlineStyle("BOLD")).toBe("b");
    });
  });

  describe(".flattenInlineStyles", () => {
    it("leaves an array of separate inline styles as-is", () => {
      const inlineStyles = [
        { offset: 37, length: 4, style: "BOLD" },
        { offset: 42, length: 10, style: "ITALIC" },
      ] as RawDraftInlineStyleRange[];
      const expectedStyles = [
        { offset: 37, length: 4, styles: ["BOLD"] },
        { offset: 42, length: 10, styles: ["ITALIC"] },
      ] as FlattenedInlineStyleRange[];
      expect(flattenInlineStyles(inlineStyles)).toEqual(expectedStyles);
    });

    it("leaves an array of contiguous inline styles as-is", () => {
      const inlineStyles = [
        { offset: 37, length: 5, style: "BOLD" },
        { offset: 42, length: 10, style: "ITALIC" },
      ] as RawDraftInlineStyleRange[];
      const expectedStyles = [
        { offset: 37, length: 5, styles: ["BOLD"] },
        { offset: 42, length: 10, styles: ["ITALIC"] },
      ] as FlattenedInlineStyleRange[];
      expect(flattenInlineStyles(inlineStyles)).toEqual(expectedStyles);
    });

    it("flattens an array of overlapping inline styles", () => {
      const inlineStyles = [
        { offset: 37, length: 8, style: "BOLD" },
        { offset: 42, length: 10, style: "ITALIC" },
      ] as RawDraftInlineStyleRange[];
      const expectedStyles = [
        { offset: 37, length: 5, styles: ["BOLD"] },
        { offset: 42, length: 3, styles: ["BOLD", "ITALIC"] },
        { offset: 45, length: 7, styles: ["ITALIC"] },
      ] as FlattenedInlineStyleRange[];
      expect(flattenInlineStyles(inlineStyles)).toEqual(expectedStyles);
    });
  });

  describe(".getElementForFlattenedInlineStyle", () => {
    it("handles styles with one tag", () => {
      const text = "This has bold text";
      const styles: DraftInlineStyleType[] = ["BOLD"];
      const inlineStyle = { offset: 9, length: 4, styles };
      const expectedElement = { tag: "b", children: ["bold"] };
      expect(getElementForFlattenedInlineStyle(text, inlineStyle)).toEqual(expectedElement);
    });
  });

  it("handles styles with multiple tags", () => {
    const text = "This has bold and italic text";
    const styles: DraftInlineStyleType[] = ["BOLD", "ITALIC"];
    const inlineStyle = { offset: 9, length: 15, styles };
    const expectedElement = { tag: "b", children: [{ tag: "i", children: ["bold and italic"] }] };
    expect(getElementForFlattenedInlineStyle(text, inlineStyle)).toEqual(expectedElement);
  });
});
