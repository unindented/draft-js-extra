import * as React from "react";
import * as renderer from "react-test-renderer";
import { contentStateToReact, elementsToReact, contentStateToElements, Element } from ".";

describe("draft", () => {
  describe(".contentStateToReact", () => {
    it("converts content state to React nodes", () => {
      const fixture = require("./__fixtures__/empty.json");
      const tree = renderer.create(
        React.createElement("div", undefined, contentStateToReact(fixture)),
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe(".elementsToReact", () => {
    it("handles strings", () => {
      const elements = ["foo"];
      const tree = renderer.create(
        React.createElement("div", undefined, elementsToReact(elements)),
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it("handles elements", () => {
      const elements = [{ tag: "br" }] as Element[];
      const tree = renderer.create(
        React.createElement("div", undefined, elementsToReact(elements)),
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it("handles trees of elements", () => {
      const elements = [
        {
          tag: "p",
          children: [
            "This is a paragraph with ",
            { tag: "b", children: ["bold"] },
            " and ",
            { tag: "i", children: ["italic"] },
            ".",
          ],
        },
      ] as Element[];
      const tree = renderer.create(
        React.createElement("div", undefined, elementsToReact(elements)),
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe(".contentStateToElements", () => {
    it("handles an empty block", () => {
      const fixture = require("./__fixtures__/empty.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles headers", () => {
      const fixture = require("./__fixtures__/headers.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles unordered lists", () => {
      const fixture = require("./__fixtures__/unordered_list.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles nested unordered lists", () => {
      const fixture = require("./__fixtures__/unordered_list_nested.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles ordered lists", () => {
      const fixture = require("./__fixtures__/ordered_list.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles nested ordered lists", () => {
      const fixture = require("./__fixtures__/ordered_list_nested.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles blockquotes", () => {
      const fixture = require("./__fixtures__/blockquote.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles code blocks", () => {
      const fixture = require("./__fixtures__/code_block.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles paragraphs", () => {
      const fixture = require("./__fixtures__/paragraph.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles paragraphs with inline styles", () => {
      const fixture = require("./__fixtures__/paragraph_styles.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });

    it("handles paragraphs with overlapping inline styles", () => {
      const fixture = require("./__fixtures__/paragraph_styles_overlapping.json");
      expect(contentStateToElements(fixture)).toMatchSnapshot();
    });
  });
});
