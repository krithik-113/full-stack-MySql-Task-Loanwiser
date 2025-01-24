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
      const data = docData?.findIndex((doc) => doc.id === DocumentsID);
      if (data && data - 1 >= 0) {
        handleDocSelected(docData[data - 1].id, data - 1);
      } else {
        const preApplicantIndex =
          Applicants.findIndex((appindex) => appindex.id === appId) - 1;
        if (preApplicantIndex >= 0) {
          const prevmove = Applicants[preApplicantIndex]?.id;

          const lastDoc = Applicants.find(
            (app) => app.id === prevmove
          )?.documents;
          if (lastDoc?.length && lastDoc.length - 1 >= 0) {
            applicantSelected(prevmove, preApplicantIndex);
            handleDocSelected(
              lastDoc[lastDoc.length - 1].id,
              lastDoc.length - 1
            );
          }
        } else {
          applicantSelected(
            Applicants[Applicants.length - 1].id,
            Applicants.length - 1
          );
        }
      }
    }
  };
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
        } else {
          applicantSelected(Applicants[0].id, 0);
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
