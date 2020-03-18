import React from "react";
import { NavLink } from "reactstrap";
export default class ApplicationMenu extends React.Component {
  constructor(...params) {
    super(...params);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: window.innerWidth > 1440
    };
  }

  toggle(e) {
    e.preventDefault();
    const isOpen = this.state.isOpen;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    return (
      <div className={`app-menu ${this.state.isOpen ? "shown" : ""}`}>
        {this.props.children}

        <NavLink
          className="app-menu-button d-inline-block"
          onClick={this.toggle}
        >
          <i className="simple-icon-options" />
        </NavLink>
      </div>
    );
  }
}
