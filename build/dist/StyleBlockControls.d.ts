/// <reference types="draft-js" />
/// <reference types="react" />
import * as React from "react";
import { EditorState } from "draft-js";
export interface StyleBlockControlsProps {
    editorState: EditorState;
    onToggle: (style: string) => void;
}
export default class StyleBlockControls extends React.PureComponent<StyleBlockControlsProps, {}> {
    render(): JSX.Element;
}
