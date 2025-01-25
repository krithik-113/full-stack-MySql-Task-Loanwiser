import React, { createContext, useState, useEffect, useRef } from "react";

export const ImageUploaderDatas = createContext({});

const DocumentsContext = ({ children }) => {
  const [Applicants, setApplicants] = useState([]);
  const [showDocuments, setShowDocuments] = useState([]);

  const [home, setHome] = useState(true);

  const [disableUploader, setDisableUploader] = useState(true);

  const [showPopUp, setShowPopUp] = useState(false);
  const [docPopup, setDocPopup] = useState(false);

  const [appId, setAppId] = useState("");
  const [DocumentsID, setDocumentsID] = useState("");

  const applicantRef = useRef([]);
  const docRef = useRef([]);

  const handleDocSelected = (id, i) => {
    setDocumentsID(id);
    if (docRef.current[i]) {
      docRef.current[i]?.classList.add("active");
    }
    for (let index = 0; index < docRef.current.length; index++) {
      if (index !== i) {
        docRef.current[index]?.classList.remove("active");
      }
    }
  };

  const applicantSelected = (id, i, overide = true) => {
    setAppId(id);
    const data = Applicants.find((app) => app.id === id)?.documents;
    if (overide && data?.length) {
      handleDocSelected(data[0].id, 0);
    }
    if (applicantRef.current[i]) {
      applicantRef.current[i]?.classList.add("active");
      for (let index = 0; index < applicantRef.current.length; index++) {
        if (index !== i) {
          applicantRef.current[index]?.classList.remove("active");
        }
      }
    }
  };

  const handlePopup_DisableDocx = () => {
    setDisableUploader(false);
    !showPopUp && !docPopup && setDocPopup(!docPopup);
  };
  const handlePopupsApp_DisableDocx = () => {
    setDisableUploader(false);
    !docPopup && !showPopUp && setShowPopUp(!showPopUp);
  };

  const handleDeleteApplicants = (id) => {
    const DeletedApplicamts = Applicants.filter((_) => _.id !== id);
    DeletedApplicamts.length !== 0
      ? setAppId(DeletedApplicamts[0].id)
      : setAppId("");
    setApplicants(DeletedApplicamts);
  };
  useEffect(() => {
    const fetchDocuments = () => {
      const findedDocs = Applicants.find((app) => app.id === appId);
      findedDocs?.documents?.length
        ? setShowDocuments(findedDocs.documents)
        : setShowDocuments([]);
    };
    fetchDocuments();
  }, [Applicants, appId]);

  const values = {
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
  };
  return (
    <ImageUploaderDatas.Provider value={values}>
      {children}
    </ImageUploaderDatas.Provider>
  );
};

export default DocumentsContext;
