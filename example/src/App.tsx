import * as React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { contentStateToReact } from "draft-js-extra";
import RichTextEditor from "./RichTextEditor";
import ReactPreview from "./ReactPreview";
import RawContentStatePreview from "./RawContentStatePreview";
import ReactStringPreview from "./ReactStringPreview";
import "./App.css";

// tslint:disable-next-line:no-empty-interface
export interface AppProps {}

export interface AppState {
  editorState: EditorState;
}

export default class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const reactContentState = contentStateToReact(rawContentState);

    return (
      <div className="App">
        <RichTextEditor editorState={editorState} onChange={this.handleChange} />
        <ReactPreview reactContentState={reactContentState} />
        <RawContentStatePreview rawContentState={rawContentState} />
        <ReactStringPreview reactContentState={reactContentState} />
      </div>
    );
  }

  private handleChange(editorState: EditorState) {
    this.setState({ editorState });
  }
}
