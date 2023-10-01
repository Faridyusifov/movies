import React  from 'react'
import './main.css' 


export default function Modal({children , isOpen}) {
  if (!isOpen) {
    return null
  }
  return (
    <div className='modal'>
      <div className="modal_content">
        {children}
      </div>
    </div>
  )
}