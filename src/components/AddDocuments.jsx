import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { v4 as uuidv4 } from "uuid";

const AddDocuments = ({
  setDisableUploader,
  setDocumentsID,
  id,
  Applicants,
  setApplicants,
  setDocPopup,
  docPopup,
}) => {
  const [doc, setDoc] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!doc) return;
    const docsAdded = Applicants.map((applicant) => {
      if (applicant.id === id) {
        if (applicant.documents?.length) {
          let docId = uuidv4()
          setDocumentsID(docId);
          applicant.documents.push({ id: docId, name: doc });
        } else {
          let docId = uuidv4();
          setDocumentsID(docId);
          applicant.documents = [{ id: docId, name: doc }];
        }
        return applicant;
      }
      return applicant;
    });
    setApplicants(docsAdded);
    setDocPopup(false);
    setDisableUploader(true)
  };

  const handleDocPopUp = () => {
    setDocPopup(!docPopup)
    setDisableUploader(true)
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="top-50 z-10 mx-auto bg-white"
      id="pop-up"
    >
      <div className="d-flex p-3 justify-content-between">
        <h2 className="">Add</h2>
        <h5
          style={{ cursor: "pointer", marginTop: "5px" }}
          onClick={handleDocPopUp}
        >
          <FaX />
        </h5>
      </div>
      <div className="p-3">
        <label htmlFor="name">Document Name</label> <br />
        <input
          value={doc}
          onChange={(e) => setDoc(e.target.value)}
          type="text"
          id="name"
          className="w-100 p-2"
          required
        />
      </div>
      <div className="d-flex p-3 popping">
        <button className="btn btn-primary m-2" type="submit">
          <FaCheck /> Save
        </button>
        <button className="btn btn-secondary m-2" onClick={handleDocPopUp}>
          <FaX /> Cancel
        </button>
      </div>
    </form>
  );
};

export default AddDocuments