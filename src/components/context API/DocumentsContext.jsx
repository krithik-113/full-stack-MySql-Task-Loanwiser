import axios from "axios";
import React, { createContext, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const ImageUploaderDatas = createContext({});

const DocumentsContext = ({ children }) => {
  const navigate = useNavigate();
  const [Applicants, setApplicants] = useState([]);
  const [showDocuments, setShowDocuments] = useState([]);
  const [imageUploaded, setImageUploaded] = useState([]);

  const [token, setToken] = useState("");

  const [errorMsg, setErrMsg] = useState("");

  const [disableUploader, setDisableUploader] = useState(true);

  const [showPopUp, setShowPopUp] = useState(false);
  const [docPopup, setDocPopup] = useState(false);

  const [appId, setAppId] = useState("");
  const [DocumentsID, setDocumentsID] = useState("");

  const applicantRef = useRef([]);
  const docRef = useRef([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
    setApplicants([]);
    setShowDocuments([]);
    setImageUploaded([]);
  };
  const handleDeleteApplicants = async (id) => {
    try {
      const { data } = await axios.delete(`/applicant/deleteApplicant/${id}`, {
        headers: { token },
      });
      if (data.success) {
        getApplicants();
        setShowDocuments([]);
        setImageUploaded([]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getApplicants = async () => {
    try {
      if (token) {
        const { data } = await axios.get("/applicant", {
          headers: { token },
        });
        if (data.success) {
          setApplicants(data.applicants);
          applicantSelected(data.applicants[0].appId,0);
        } else {
          setApplicants([]);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDocuments = async (id) => {
    if (Applicants.length) {
      try {
        const { data } = await axios.post("/document", { appId :id ? id : appId});
        if (data.success) {
          setShowDocuments(data.documents)
          return data.documents;
        } else {
          setShowDocuments([]);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  const getAllImagesUploaded = async () => {
    try {
      const { data } = await axios.post("/image-uploader/getImages", {
        docId: DocumentsID,
      });
      if (data.success) {
        setImageUploaded(data.imagesUploaded);
      } else {
        setImageUploaded([]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchDocuments(appId)
  },[appId])
 
  useEffect(() => {
    if (showDocuments?.length) {
      getAllImagesUploaded();
    }
  }, [DocumentsID]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setToken(localStorage.getItem("token"));
      getApplicants();
      navigate("/");
    }
  }, [token]);
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
    imageUploaded,
    docRef,
    setDocumentsID,
    handlePopup_DisableDocx,
    disableUploader,
    handleDeleteApplicants,
    errorMsg,
    setErrMsg,
    form,
    setForm,
    handleInputChange,
    navigate,
    token,
    setToken,
    logout,
    getApplicants,
    fetchDocuments,
    setShowDocuments,
    getAllImagesUploaded,
  };

  return (
    <ImageUploaderDatas.Provider value={values}>
      {children}
    </ImageUploaderDatas.Provider>
  );
};

export default DocumentsContext;
