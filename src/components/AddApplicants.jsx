import React, { useState } from "react";
import { FaCheck, FaX } from "react-icons/fa6";
import {v4 as uuidv4} from 'uuid'

const AddApplicants = ({
  setDisableUploader,
  showPopUp,
  setShowPopUp,
  setApplicants,
  setAppId,
}) => {
  const [name, setName] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    let id = uuidv4()
    setAppId(id)
    setApplicants((prev) => [...prev, { id, name }]);
    setShowPopUp(false);
    setDisableUploader(true)
  };
  const handleCloseAndOpenUploader = () => {
    setShowPopUp(!showPopUp)
    setDisableUploader(true)
  }
  return (
    <form
      onSubmit={handleOnSubmit}
      className="position-absolute top-50 z-10 w-25 mx-auto bg-white"
      id="pop-up"
    >
      <div className="d-flex justify-content-between p-3">
        <h2 className="">Add Applicant</h2>
        <h5
          style={{ cursor: "pointer", marginTop: "5px" }}
          onClick={handleCloseAndOpenUploader}
        >
          <FaX />
        </h5>
      </div>
      <div className="p-3">
        <label htmlFor="name">Name</label> <br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          className="w-100 p-2"
          required
        />
      </div>
      <div className="d-flex p-3 justify-content-end">
        <button className="btn btn-primary m-2" type="submit">
          <FaCheck /> Save
        </button>
        <button
          className="btn btn-secondary m-2"
          onClick={handleCloseAndOpenUploader}
        >
          <FaX /> Cancel
        </button>
      </div>
    </form>
  );
};

export default AddApplicants;
