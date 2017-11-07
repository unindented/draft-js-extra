import * as React from "react";
import { renderToString } from "react-dom/server";
import "./ReactStringPreview.css";

export interface RawContentStatePreviewProps {
  reactContentState: React.ReactNode;
}

export default class RawContentStatePreview extends React.PureComponent<
  RawContentStatePreviewProps,
  {}
> {
  public render() {
    const { reactContentState } = this.props;
    const preview = renderToString(reactContentState as any);

    return (
      <div className="ReactStringPreview">
        <h2>Output of contentStateToReact as string</h2>
        <pre>
          <code>{preview}</code>
        </pre>
      </div>
    );
  }
}
