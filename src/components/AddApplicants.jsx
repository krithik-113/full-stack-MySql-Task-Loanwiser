import axios from "axios";
import React, { useContext, useState } from "react";
import { FaCheck, FaX } from "react-icons/fa6";
import {v4 as uuidv4} from 'uuid'
import { ImageUploaderDatas } from "./context API/DocumentsContext";

const AddApplicants = () => {
  const [name, setName] = useState("");

  const {
    getApplicants,
    setDisableUploader,
    showPopUp,
    setShowPopUp,
    setAppId,
  } = useContext(ImageUploaderDatas);

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    if (!name) return;
    try {
       const { data } = await axios.post("/applicant/addApplicant",{applicant:name},{headers:{token:localStorage.getItem('token')}});
      if (data.success) {
      setAppId(data.id);
      getApplicants()
    }
    } catch (err) {
      console.log(err.message) 
    }
    
    
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
      className=" top-50 z-10 mx-auto"
      id="pop-up"
    >
      <div className="d-flex p-3 justify-content-between">
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
      <div className="d-flex p-3 popping">
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
