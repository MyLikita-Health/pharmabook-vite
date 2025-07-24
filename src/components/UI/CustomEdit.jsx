import React from 'react'
import { Button } from 'reactstrap'
import { Edit } from 'react-feather'

export default function CustomEdit({ onClick = '', className = '' }) {
  return (
    <Button size="sm" className={className} onClick={onClick} color="primary">
      <Edit size={16} />
      Edit
    </Button>
  )
}
