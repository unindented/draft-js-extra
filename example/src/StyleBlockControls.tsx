import * as React from "react";
import { EditorState } from "draft-js";
import StyleButton from "./StyleButton";

const blockTypes = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
  { label: "Blockquote", style: "blockquote" },
];

export interface StyleBlockControlsProps {
  editorState: EditorState;
  onToggle: (style: string) => void;
}

export default class StyleBlockControls extends React.PureComponent<StyleBlockControlsProps, {}> {
  public render() {
    const { editorState, onToggle } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
        {blockTypes.map(type => (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  }
}
