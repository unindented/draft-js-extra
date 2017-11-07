import * as React from "react";
import { EditorState } from "draft-js";
import StyleButton from "./StyleButton";

const inlineStyles = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Strikethrough", style: "STRIKETHROUGH" },
  { label: "Monospace", style: "CODE" },
];

export interface StyleInlineControlsProps {
  editorState: EditorState;
  onToggle: (style: string) => void;
}

export default class StyleInlineControls extends React.PureComponent<StyleInlineControlsProps, {}> {
  public render() {
    const { editorState, onToggle } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
      <div className="RichEditor-controls">
        {inlineStyles.map(type => (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  }
}
