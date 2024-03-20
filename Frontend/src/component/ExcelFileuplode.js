import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploadModal = ({ isOpen, closeModal, onUpload }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Reset file state when the modal is opened
    if (isOpen) {
      setFile(null);
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        onUpload(jsonData);
        setFile(null); // Reset file state after successful upload
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div
      className={`modal z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="modal-background" onClick={closeModal}></div>

      <div className="modal-card z-50 w-auto bg-white py-5 rounded-md">
        <header className="modal-card-head">
          <p className="modal-card-title text-center text-xl">Upload Excel File</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body px-5 pb-5">
          <div className="file has-name is-fullwidth">
            <label className="file-label">
              <input
                className="file-input "
                type="file"
                name="excelFile"
                accept=".xls, .xlsx"
                onChange={handleFileChange}
              />
              <span className="file-cta ps-2 bg-gray-200 p-3 rounded-md">
                <span className="file-label">
                  {file ? file.name : "click to upload"}
                </span>
              </span>
            </label>
          </div>
        </section>
        <footer className="modal-card-foot ">
          <button
            className="btn hover:bg-[#492E87] hover:text-white border ms-5 me-2  rounded-md transition-transform"
            onClick={handleUpload}
          >
            Upload
          </button>
          <button
            className="btn bg-[#492E87] text-white border rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ExcelUploadModal;
