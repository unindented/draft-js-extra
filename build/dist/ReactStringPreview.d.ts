/// <reference types="react" />
import * as React from "react";
import "./ReactStringPreview.css";
export interface RawContentStatePreviewProps {
    reactContentState: React.ReactNode;
}
export default class RawContentStatePreview extends React.PureComponent<RawContentStatePreviewProps, {}> {
    render(): JSX.Element;
}
