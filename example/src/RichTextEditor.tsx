import * as React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import StyleBlockControls from "./StyleBlockControls";
import StyleInlineControls from "./StyleInlineControls";
import "./RichTextEditor.css";

export interface RichTextEditorProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export default class RichTextEditor extends React.PureComponent<RichTextEditorProps, {}> {
  private editor: Editor;

  constructor(props: RichTextEditorProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.storeEditorRef = this.storeEditorRef.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  public render() {
    const { editorState } = this.props;

    return (
      <div className="RichTextEditor">
        <StyleBlockControls editorState={editorState} onToggle={this.toggleBlockType} />
        <StyleInlineControls editorState={editorState} onToggle={this.toggleInlineStyle} />
        <div className="RichTextEditor__editor" onClick={this.handleClick}>
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.handleChange}
            onTab={this.handleTab}
            placeholder="What are you working on?"
            ref={this.storeEditorRef}
            spellCheck={true}
          />
        </div>
      </div>
    );
  }

  private handleChange(editorState: EditorState) {
    this.props.onChange(editorState);
  }

  private handleClick() {
    this.editor.focus();
  }

  private handleKeyCommand(command: string, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.handleChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  private handleTab(evt: React.KeyboardEvent<{}>) {
    const maxDepth = 4;
    this.handleChange(RichUtils.onTab(evt, this.props.editorState, maxDepth));
  }

  private storeEditorRef(editor: Editor) {
    this.editor = editor;
  }

  private toggleBlockType(blockType: string) {
    this.handleChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  }

  private toggleInlineStyle(inlineStyle: string) {
    this.handleChange(RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle));
  }
}
