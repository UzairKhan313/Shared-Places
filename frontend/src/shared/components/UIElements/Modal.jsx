import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Backdrop from '../UIElements/Backdrop'
import './Modal.css'

const ModalOverlay = ({
  className,
  style,
  headerClasses,
  headerText,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footerChildren,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClasses}`}>
        <h2>{headerText}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>
          {footerChildren}
        </footer>
      </form>
    </div>
  )
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}
const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={'modal'}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  )
}

export default Modal
