import axios from "axios";
import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { ImageUploaderDatas } from "./context API/DocumentsContext";

const AddDocuments = () => {
  const {
    setDocumentsID,
    setDisableUploader,
    docPopup,
    appId,
    setDocPopup,
    fetchDocuments,
  } = useContext(ImageUploaderDatas);
  const [doc, setDoc] = useState("");
  const handleOnSubmit =async (e) => {
    e.preventDefault();
    if (!doc) return;
    try {
      if(appId){
      const { data } = await axios.post("/document/addDocument", {appId,documentName:doc});
      if (data.success) {
        setDocumentsID(data.docId)
        fetchDocuments(appId)
        }
      } else {
        
        alert('Select Appliacnt to add documents')
      }
    } catch (err) {
      console.log(err.message)
    }
    
    setDocPopup(false);
    setDisableUploader(true);
  };

  const handleDocPopUp = () => {
    setDocPopup(!docPopup);
    setDisableUploader(true);
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="top-50 z-10 mx-auto"
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

export default AddDocuments;
