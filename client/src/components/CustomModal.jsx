/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Modal } from "flowbite-react";

// eslint-disable-next-line react/prop-types
const CustomModal = ({ isOpen, onClose, children, heading, size = "md" }) => {
  return (
    <>
      {isOpen && (
        <Modal
          dismissible
          size={size}
          position="top-center"
          show={isOpen}
          onClose={() => [onClose()]}
        >
          <Modal.Header>{heading}</Modal.Header>
          <Modal.Body>{children}</Modal.Body>
        </Modal>
      )}
      {isOpen && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className="fixed inset-0 z-40 bg-black opacity-25"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default CustomModal;
