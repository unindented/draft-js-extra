/// <reference types="react" />
import * as React from "react";
export interface ReactPreviewProps {
    reactContentState: React.ReactNode;
}
export default class ReactPreview extends React.PureComponent<ReactPreviewProps, {}> {
    render(): JSX.Element;
}
