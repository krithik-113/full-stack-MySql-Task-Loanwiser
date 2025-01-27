import React, { useContext } from "react";
import { ImageUploaderDatas } from "../components/context API/DocumentsContext";

const Footer = () => {
  const {
    Applicants,
    appId,
    DocumentsID,
    showDocuments,
    handleDocSelected,
    applicantSelected,
    fetchDocuments,
  } = useContext(ImageUploaderDatas);

  const preSelection = async () => {
    if (appId) {
      const data =
        showDocuments?.findIndex((doc) => doc.docId === DocumentsID) - 1;
      if (data >= 0) {
        handleDocSelected(showDocuments[data].docId, data);
      } else {
        const preApp = Applicants.findIndex((app) => app.appId === appId) - 1;
        const premove = Applicants[preApp]?.appId;
        if (preApp >= 0 && premove) {
          applicantSelected(premove, preApp);
          fetchDocuments(premove).then((res) => {
            console.log(res.length - 1)
            if (res?.length) {
              handleDocSelected(res[res.length - 1].docId, res.length - 1);
            }
          });
        } else {
          // last Applicant & last Documents-----------------------------------------------------
          const lastApplicant = Applicants[Applicants.length - 1]?.appId;
          if (lastApplicant !== appId) {
            applicantSelected(lastApplicant, Applicants.length - 1);
          }
          fetchDocuments(lastApplicant).then((res) => {
            if (res?.length) {
              handleDocSelected(res[res.length - 1].docId, res.length - 1);
            }
          });
          // -----------------------------------------------------------------------------------
        }
      }
    }
  };
  const postSelection = () => {
    if (appId) {
      const data =
        showDocuments?.findIndex((doc) => doc.docId === DocumentsID) + 1;
      if (data < showDocuments?.length) {
        handleDocSelected(showDocuments[data].docId, data);
      } else {
        const nextApplicant =
          Applicants.findIndex((appIndex) => appIndex.appId === appId) + 1;
        const checkingApplicantExists = Applicants[nextApplicant]?.appId;
        if (nextApplicant < Applicants.length && checkingApplicantExists) {
          applicantSelected(checkingApplicantExists, nextApplicant);
          fetchDocuments(checkingApplicantExists).then((res) => {
            if (res?.length) {
              handleDocSelected(res[0].docId, 0);
            }
          });
        } else {
          applicantSelected(Applicants[0].appId, 0);
          fetchDocuments(Applicants[0].appId).then((res) => {
            if (res?.length) {
              handleDocSelected(res[0].docId, 0);
            }
          });
        }
      }
    }
  };
  return (
    <footer className="d-flex justify-content-between mx-auto mt-2">
      <button onClick={preSelection} className="btn btn-primary">
        Back
      </button>
      <button onClick={postSelection} className="btn btn-primary">
        Next
      </button>
    </footer>
  );
};

export default Footer;
