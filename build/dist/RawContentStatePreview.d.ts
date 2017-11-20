/// <reference types="draft-js" />
/// <reference types="react" />
import * as React from "react";
import { RawDraftContentState } from "draft-js";
export interface RawContentStatePreviewProps {
    rawContentState: RawDraftContentState;
}
export default class RawContentStatePreview extends React.PureComponent<RawContentStatePreviewProps, {}> {
    render(): JSX.Element;
}
