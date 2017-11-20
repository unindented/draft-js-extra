/// <reference types="draft-js" />
/// <reference types="react" />
import * as React from "react";
import { EditorState } from "draft-js";
import "./RichTextEditor.css";
export interface RichTextEditorProps {
    editorState: EditorState;
    onChange: (editorState: EditorState) => void;
}
export default class RichTextEditor extends React.PureComponent<RichTextEditorProps, {}> {
    private editor;
    constructor(props: RichTextEditorProps);
    render(): JSX.Element;
    private handleChange(editorState);
    private handleClick();
    private handleKeyCommand(command, editorState);
    private handleTab(evt);
    private storeEditorRef(editor);
    private toggleBlockType(blockType);
    private toggleInlineStyle(inlineStyle);
}
