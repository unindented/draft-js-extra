import * as React from "react";
import { RawDraftContentState } from "draft-js";

export interface RawContentStatePreviewProps {
  rawContentState: RawDraftContentState;
}

export default class RawContentStatePreview extends React.PureComponent<
  RawContentStatePreviewProps,
  {}
> {
  public render() {
    const { rawContentState } = this.props;
    const preview = rawContentState ? JSON.stringify(rawContentState, null, 2) : null;

    return (
      <div className="RawContentStatePreview">
        <h2>Output of convertToRaw</h2>
        <pre>
          <code>{preview}</code>
        </pre>
      </div>
    );
  }
}
