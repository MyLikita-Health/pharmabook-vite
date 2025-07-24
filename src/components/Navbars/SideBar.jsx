
import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import './nav.css'
export default function SideBar({ title, menu = [] }) {
  return (
    <div className='side-bar'>
      <ListGroup>
        <ListGroupItem color="success" className="text-center">
          {title}
        </ListGroupItem>
        {menu.map((item) => (
          <ListGroupItem action href="#" tag="a">
            {/* <Link to={item.path}>{item.name}</Link> */}
            {item.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
