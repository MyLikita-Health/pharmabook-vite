import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '../../../hooks';

function HorizontalMenuItem(props) {
  const query = useQuery();
  const type = query.get("type")
  return (
    <li className={`nav-item text-white`}>
      <Link
        to={props.route}
        className={`${props.active && ''
          } nav-link p-1 text-white`}
        style={{ fontSize: props.active ? 16 : 14, fontWeight: 'bold', border: props.label.includes(type) ? '1px solid #FFF' : '' }}
      >
        {props.children}
      </Link>
    </li>
  )
}

export default HorizontalMenuItem
