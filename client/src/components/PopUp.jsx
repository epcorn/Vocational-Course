import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function PopUp({ setCode, code, ogCode, to, parentModel }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (text) => {
    text = text.trim();
    if (text === ogCode) {
      navigate(to);
      setOpenModal(false);
      parentModel();
      setCode("");
    } else {
      toast.error("Please enter a valid Code!");
      setCode("");
    }
  };

  return (
    <>
      <Button
        outline
        gradientDuoTone="cyanToBlue"
        onClick={() => setOpenModal(true)}
      >
        Verify and Proceed
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ToastContainer position="top-center" autoClose={3000} />
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <Label htmlFor="code">
              Enter the Passcode from the{" "}
              <strong className="text-red-600">LATEST</strong> email, dated
              28/05/2024
            </Label>
            <TextInput
              id="code"
              onChange={(e) => setCode(e.target.value)}
              value={code}
              autoComplete="off"
            />
            <div className="flex justify-center gap-4 mt-2">
              <Button color="failure" onClick={() => [handleSubmit(code)]}>
                Submit
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PopUp;
