import React from "react";
import { FaPlus } from "react-icons/fa";

const DocumentTitle = ({docPopup,setDocPopup}) => {
  return (
    <>
      <h5>No documents available</h5>
      <button
        className="d-flex btn btn-primary text-end my-5 w-100"
        onClick={() => !docPopup && setDocPopup(!docPopup)}
      >
        <span className="mx-3">
          <FaPlus />
        </span>{" "}
        <span className="mr-4">Add</span>
      </button>
    </>
  );
};

export default DocumentTitle;
