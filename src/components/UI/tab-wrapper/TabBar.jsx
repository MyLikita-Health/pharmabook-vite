import classNames from "classnames";
import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const TabBar = ({ items = [], current = "", onItemClick = (f) => f }) => {
  return (
    <Nav
      className="nav-fill flex-column flex-sm-row"
      id="tabs-text"
      pills
      role="tablist"
    >
      {items.map((_item, index) => (
        <NavItem>
          <NavLink
            aria-selected={index === current}
            className={classNames("mb-sm-3 mb-md-0", {
              active: index === current,
            })}
            onClick={() => onItemClick(index)}
            // onClick={e => this.toggleNavs(e, "navPills", 1)}
            href="#"
            role="tab"
            key={index}
          >
            {_item}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default TabBar;
