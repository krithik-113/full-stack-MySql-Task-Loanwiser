import React, { useEffect, useRef, useState } from 'react'
import { FaPlus,FaTrash } from "react-icons/fa";
import AddApplicants from "./components/AddApplicants";
import Footer from './pages/Footer';
import AddDocuments from './components/AddDocuments';
import DocumentTitle from './view/DocumentTitle';
import ImageUploader from './pages/ImageUploader';
const App = () => {
  const [Applicants, setApplicants] = useState([])
  const [showDocuments, setShowDocuments] = useState([]);
  
  const [disableUploader,setDisableUploader] = useState(true)

  const [showPopUp, setShowPopUp] = useState(false)
  const [docPopup, setDocPopup] = useState(false)

  const [appId, setAppId] = useState("")
  const [DocumentsID, setDocumentsID] = useState("")
  
  const applicantRef = useRef([]);
   const docRef = useRef([]);

  const handleDocSelected = (id,i) => {
     setDocumentsID(id)
     if (docRef.current[i]) {
       docRef.current[i].classList.add("active");
     }
     for (let index = 0; index < docRef.current.length; index++) {
       if (index !== i) {
         docRef.current[index]?.classList.remove("active");
       }
     }
   };

  const applicantSelected = (id,i) => {
    setAppId(id)
    if (applicantRef.current[i]) {
      applicantRef.current[i].classList.add('active')
    }
    for (let index = 0; index < applicantRef.current.length; index++){
      if (index !== i) {
        applicantRef.current[index].classList.remove('active')
      }
    }
  }

  const handlePopup_DisableDocx = () => {
    setDisableUploader(false);
    !showPopUp && !docPopup && setDocPopup(!docPopup)
    
  }
  const handlePopupsApp_DisableDocx = () => {
    setDisableUploader(false)
    !docPopup && !showPopUp && setShowPopUp(!showPopUp)
  }
  
  const handleDeleteApplicants = (id) => {
    const DeletedApplicamts = Applicants.filter(_ => _.id !== id)
    DeletedApplicamts.length !== 0 ?setAppId(DeletedApplicamts[0].id) : setAppId("");
    setApplicants(DeletedApplicamts)
  }
  useEffect(() => {
   const fetchDocuments = () => {
     const findedDocs = Applicants.find((doc) => doc.id === appId);
     findedDocs ? setShowDocuments(findedDocs.documents) : setShowDocuments([])
   };
   fetchDocuments();
  }, [Applicants, appId])
  
  
  return (
    <div className="position-relative mt-4" id="header">
      <div className="d-flex justify-content-between w-auto m-auto p-5">
        <h1>Document Upload</h1>
        <button
          className="btn btn-primary"
          onClick={handlePopupsApp_DisableDocx}
        >
          <FaPlus /> Add Applicant
        </button>
      </div>

      {/* --------------------------------------Applicants Names -----------------------------------------------*/}
      <div className="d-flex gap-2">
        {Applicants.map((_, i) => (
          <div key={i} className="d-flex align-items-center">
            <p
              style={{ cursor: "pointer", userSelect: "none" }}
              className={`mx-2 text-primary font-weight-bold p-4 rounded overflowX-scroll apps ${
                i === 0 ? "active" : ""
              }`}
              key={_.id}
              ref={(input) => (applicantRef.current[i] = input)}
              onClick={() => applicantSelected(_.id, i)}
            >
              {_.name}{" "}
            </p>
            <p
              onClick={() => handleDeleteApplicants(_.id)}
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

      {/* -------------------------------------------Documents --------------------------------------------------*/}
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
            {/* -------------------------------------------Left side --------------------------------------------------*/}
            <div className="left-side">
              {Applicants?.length === 0 || showDocuments?.length ? (
                <>
                  {showDocuments?.map((_, i) => (
                    <p
                      key={_.id}
                      onClick={() => handleDocSelected(_.id,i)}
                      ref={(input) => (docRef.current[i] = input)}
                      className={` text-start my-3 py-3 text-center doc ${ i === 0 ? "active" : "" }`}
                      style={{ cursor: "pointer" }}
                      id="doc"
                    >
                      {_.name}
                    </p>
                  ))}
                  {showDocuments?.length ? (
                    <button
                      className="d-flex btn btn-primary text-end my-5 w-100"
                      onClick={handlePopup_DisableDocx}
                    >
                      <span className="mx-3">
                        <FaPlus />
                      </span>{" "}
                      <span className="mr-4">Add</span>
                    </button>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <DocumentTitle docPopup={docPopup} setDocPopup={setDocPopup} />
              )}
            </div>
            {/* -------------------------------------------Right Side --------------------------------------------------*/}
            {showDocuments?.length && disableUploader ? (
              <ImageUploader
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

      <Footer />
      <hr />
    </div>
  );
}

export default App