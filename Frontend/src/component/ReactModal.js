import React from "react";
import ReactModal from "react-modal";
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

const React_Modal = ({ isOpen, closeModal, children, height,width }) => {
  const Defaultheight = "80%";
  const Defaultwidth ="80%";
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: width || Defaultwidth,
            maxWidth: "1000px",
            height: height || Defaultheight,
            overflow: "auto",
            border: "1px solid #ccc",
            background: "#fff",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        {/* <ModalHeader toggle={closeModal}>
          <button className="btn btn-danger flex" onClick={closeModal}>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </ModalHeader> */}
        <ModalBody toggle={closeModal}>
          <button className="btn btn-danger flex" onClick={closeModal}>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ReactModal>
    </div>
  );
};

export default React_Modal;
