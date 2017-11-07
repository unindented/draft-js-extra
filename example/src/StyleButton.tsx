import * as React from "react";
import "./StyleButton.css";

export interface StyleButtonProps {
  style: string;
  label: string;
  active?: boolean;
  onToggle: (style: string) => void;
}

export default class StyleButton extends React.PureComponent<StyleButtonProps, {}> {
  constructor(props: StyleButtonProps) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  public render() {
    const { label, active } = this.props;
    const className = `StyleButton${active ? " StyleButton--active" : ""}`;

    return (
      <span className={className} onMouseDown={this.handleToggle}>
        {label}
      </span>
    );
  }

  private handleToggle(evt: React.MouseEvent<HTMLSpanElement>) {
    evt.preventDefault();
    this.props.onToggle(this.props.style);
  }
}
