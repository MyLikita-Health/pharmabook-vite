import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { CustomButton } from '.'

function BackButton(props) {
  const {
    text = 'Click to go back',
    size = 'sm',
    className = ''
  } = props
  const navigate = useNavigate()

  return (
    <CustomButton
      size={size}
      className={`${className}`}
      onClick={() => navigate(-1)}
      {...props}
    >
      <span className="d-flex flex-direction-row align-items-center">
        <ArrowLeft className="mr-1" size={20} />
        {text}
      </span>
    </CustomButton>
  )
}

export default BackButton
