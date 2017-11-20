/// <reference types="react" />
import * as React from "react";
import "./StyleButton.css";
export interface StyleButtonProps {
    style: string;
    label: string;
    active?: boolean;
    onToggle: (style: string) => void;
}
export default class StyleButton extends React.PureComponent<StyleButtonProps, {}> {
    constructor(props: StyleButtonProps);
    render(): JSX.Element;
    private handleToggle(evt);
}
