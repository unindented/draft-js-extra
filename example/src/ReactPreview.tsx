import * as React from "react";

export interface ReactPreviewProps {
  reactContentState: React.ReactNode;
}

export default class ReactPreview extends React.PureComponent<ReactPreviewProps, {}> {
  public render() {
    const { reactContentState } = this.props;
    return (
      <div className="ReactPreview">
        <h2>Output of contentStateToReact</h2>
        {reactContentState}
      </div>
    );
  }
}
