import React, { useEffect } from "react";

const Footer = ({
  Applicants,
  appId,
  DocumentsID,
  handleDocSelected,
  applicantSelected,
}) => {
  const docData = Applicants.find((app) => app.id === appId)?.documents;

  const preSelection = () => {
    if (appId) {
      const data = docData?.findIndex(docIndex => docIndex.id === DocumentsID)
      if (data - 1 >= 0) {
        handleDocSelected(docData[data-1].id,data-1)
      } else {
        const preApp = Applicants.findIndex(appIndex => appIndex.id === appId) - 1
        if (preApp >= 0) {
          const premove = Applicants[preApp]?.id 
          
          if (premove) {
            applicantSelected(premove, preApp,false);
            const prevMoveDocxs = Applicants.find((app) => app.id === premove)?.documents;
            if (prevMoveDocxs?.length) {
              const findingDocIndex = prevMoveDocxs.length-1
              handleDocSelected(prevMoveDocxs[findingDocIndex].id,findingDocIndex);
            }
              
            
          }
        } else {
          // last Applicant & last Documents-----------------------------------------------------
          const lastApplicant = Applicants[Applicants.length - 1]?.id
          if (lastApplicant !== appId) {
            applicantSelected(lastApplicant, Applicants.length - 1);
          }
          
          const lastDocxs = Applicants[Applicants.length - 1]?.documents
          if (lastDocxs?.length) {
            handleDocSelected(lastDocxs[lastDocxs.length-1].id,lastDocxs.length-1)
          }
          // -----------------------------------------------------------------------------------
        }
      }
    }
  }
  const postSelection = () => {
    if (appId) {
      const data = docData?.findIndex((doc) => doc.id === DocumentsID);
      if (docData?.length && data + 1 < docData.length) {
        handleDocSelected(docData[data + 1].id, data + 1);
      } else {
        const nextApplicant =
          Applicants.findIndex((appIndex) => appIndex.id === appId) + 1;
        const checkingApplicantExists = Applicants[nextApplicant]?.id;
        if (checkingApplicantExists) {
          applicantSelected(checkingApplicantExists, nextApplicant);
          const nextDoc = Applicants[nextApplicant]?.documents
          if (nextDoc?.length) {
            handleDocSelected(nextDoc[0].id,0)
          }
        } else {
          applicantSelected(Applicants[0].id, 0);
          const startingDoc = Applicants[0]?.documents;
          if (startingDoc?.length) {
            handleDocSelected(startingDoc[0].id, 0);
          }

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
