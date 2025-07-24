import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function CustomModal(props) {
  const {
    header,
    isOpen = false,
    toggle = (f) => f,
    footer,
    autoFocus = true,
    size = "",
  } = props;
  return (
    <Modal
      size={size}
      autoFocus={autoFocus}
      isOpen={isOpen}
      toggle={toggle}
      style={{
        borderWidth: 2,
      }}
    >
      {header && <ModalHeader className="h6 py-1">{header}</ModalHeader>}
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
}

export default CustomModal;
