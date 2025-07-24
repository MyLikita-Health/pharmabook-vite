import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'

function VerticalMenu(props) {
  // const appTheme = useSelector((state) => state.app.theme)
  return (
    <ListGroup>
      {props.title ? (
        <ListGroupItem color='primary'
          className="text-center fw-bold"
        >
          {props.title}
        </ListGroupItem>
      ) : null}
      {props.children}
    </ListGroup>
  )
}

export default VerticalMenu
