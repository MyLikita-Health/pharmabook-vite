import {  Link } from 'react-router-dom'
import { ListGroupItem } from 'reactstrap'

function ListMenuItem(props) {
  return (
    <ListGroupItem tag={Link}
      to={props.route}
      className=""
    >
      {props.children}
    </ListGroupItem>
  )
}

export default ListMenuItem

