/// <reference types="draft-js" />
/// <reference types="react" />
import * as React from "react";
import { EditorState } from "draft-js";
export interface StyleInlineControlsProps {
    editorState: EditorState;
    onToggle: (style: string) => void;
}
export default class StyleInlineControls extends React.PureComponent<StyleInlineControlsProps, {}> {
    render(): JSX.Element;
}
