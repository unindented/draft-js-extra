/// <reference types="draft-js" />
/// <reference types="react" />
import * as React from "react";
import { EditorState } from "draft-js";
import "./App.css";
export interface AppProps {
}
export interface AppState {
    editorState: EditorState;
}
export default class App extends React.PureComponent<AppProps, AppState> {
    constructor(props: AppProps);
    render(): JSX.Element;
    private handleChange(editorState);
}
