import React from "react";
import { Navbar } from "reactstrap";

function HorizontalMenu(props) {
  return (
    <Navbar className="">
      <ul
        className={`nav nav-tabs border-bottom border-top mt-1 mb-1 p-1 border-primary d-flex justify-content-center ${props.className}`}
        style={{
          margin: 0,
        }}
      >
        {props.children}
      </ul>
    </Navbar>
  );
}

export default HorizontalMenu;
