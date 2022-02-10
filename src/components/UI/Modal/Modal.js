import React from 'react';
import classes from './Modal.module.css'

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClick}>
    </div>
};
const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.contet}>{props.children}</div>
    </div>
};

const Modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop onClick={props.onBDClick} />
            <ModalOverlay>{props.children}</ModalOverlay>
        </React.Fragment>
    )
}
export default Modal;