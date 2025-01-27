import React, { useContext, useEffect } from 'react'
import {ImageUploaderDatas}  from "./context API/DocumentsContext";
import { FaPlus, FaTrash } from "react-icons/fa";
import AddApplicants from "./AddApplicants";
import Footer from "../pages/Footer";
import AddDocuments from "./AddDocuments";
import DocumentTitle from "../view/DocumentTitle";
import ImageUploader from "../pages/ImageUploader";
const Home = () => {
    const {
      Applicants,
      handlePopupsApp_DisableDocx,
      showPopUp,
      docPopup,
      appId,
      DocumentsID,
      applicantSelected,
      handleDocSelected,
      setDisableUploader,
      setAppId,
      setShowPopUp,
      setApplicants,
      showDocuments,
      setDocPopup,
      applicantRef,
      docRef,
      setDocumentsID,
      handlePopup_DisableDocx,
      disableUploader,
      handleDeleteApplicants,
      token,
      navigate,
    } = useContext(ImageUploaderDatas);
  useEffect(() => {
    if (!token) {
        navigate('/login')
      }
    },[token])
  return (
    token && (
      <div className="position-relative h-100" id="header">
        <div className="d-flex justify-content-around w-auto m-auto">
          <h1 className="heading mt-4">Document Upload</h1>
          <button
            className="btn btn-primary mt-4"
            onClick={handlePopupsApp_DisableDocx}
          >
            <FaPlus /> Add Applicant
          </button>
        </div>

        {/* --------------------------------------Applicants Names -----------------------------------------------*/}
        <div className="d-flex gap-2">
          {Applicants?.map((_, i) => (
            <div key={i} className="d-flex align-items-center">
              <p
                style={{ cursor: "pointer", userSelect: "none" }}
                className={`mx-2 text-primary font-weight-bold p-4 rounded overflowX-scroll apps ${
                  _.appId === appId ? "active" : ""
                }`}
                ref={(input) => (applicantRef.current[i] = input)}
                onClick={() => applicantSelected(_.appId, i)}
              >
                {_.applicantName}{" "}
              </p>
              <p
                onClick={() => handleDeleteApplicants(_.appId)}
                className="bg-primary p-2 rounded hoo"
                style={{ cursor: "pointer" }}
              >
                <FaTrash className="trash" style={{ color: "red" }} />
              </p>
            </div>
          ))}
        </div>
        <hr />

        {/* -------------------------------------------Pop-Ups to Add Applicants & Documents --------------------------------------------------*/}
        {showPopUp && (
          <AddApplicants
            setDisableUploader={setDisableUploader}
            setAppId={setAppId}
            showPopUp={showPopUp}
            setShowPopUp={setShowPopUp}
            setApplicants={setApplicants}
          />
        )}

        {/* -------------------------------------------Documents Popups --------------------------------------------------*/}
        {docPopup && (
          <AddDocuments
            setDocumentsID={setDocumentsID}
            setDisableUploader={setDisableUploader}
            id={appId}
            Applicants={Applicants}
            docPopup={docPopup}
            setDocPopup={setDocPopup}
            setApplicants={setApplicants}
          />
        )}
        <div className="documents">
          {Applicants?.length ? (
            <div className={`${showDocuments?.length ? "grid" : ""}`}>
              {/* -------------------------------------------Left side  Documents Names --------------------------------------------------*/}
              <div className="left-side">
                {showDocuments?.length ? (
                  <>
                    {showDocuments.map((_, i) => (
                      <p
                        key={_.docId}
                        onClick={() => handleDocSelected(_.docId, i)}
                        ref={(input) => (docRef.current[i] = input)}
                        className={`my-3 py-3 doc ${
                          _.docId === DocumentsID ? "active" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        id="doc"
                      >
                        {_.documentName}
                      </p>
                    ))}
                    {showDocuments?.length ? (
                      <button
                        className="d-flex btn btn-primary text-end my-5 w-100"
                        onClick={handlePopup_DisableDocx}
                      >
                        <span className="doc-add-btn">
                          <FaPlus />
                        </span>{" "}
                        <span className="doc-add-btn">Add</span>
                      </button>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <DocumentTitle
                    docPopup={docPopup}
                    setDocPopup={setDocPopup}
                  />
                )}
              </div>
              {/* -------------------------------------------Right Side --------------------------------------------------*/}
              {showDocuments?.length && disableUploader ? (
                <ImageUploader
                  handleDocSelected={handleDocSelected}
                  appId={appId}
                  DocumentsID={DocumentsID}
                  Applicants={Applicants}
                  setApplicants={setApplicants}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>

        <Footer
          Applicants={Applicants}
          appId={appId}
          DocumentsID={DocumentsID}
          applicantSelected={applicantSelected}
          handleDocSelected={handleDocSelected}
        />
        <hr />
      </div>
    )
  );
}

export default Home