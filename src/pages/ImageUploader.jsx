import React, { useEffect, useState } from "react";
import ImagePreview from "../view/ImagePreview";
import { FaX } from "react-icons/fa6";

const ImageUploader = ({handleDocSelected, appId, DocumentsID, Applicants, setApplicants }) => {
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const data = Applicants.find((app) => app.id === appId)?.documents?.find(
    (doc) => doc.id === DocumentsID
  )?.uploaded;
  const isUploaded = false;

  // updating Documents in documents field from (Applicants Array) for Single Data-Set
  const updatingData_Set = (data = []) => {
    const updatedApplicants = Applicants.map((app) => {
      if (app.id === appId) {
        return {
          ...app,
          documents: app.documents?.map((doc) => {
            if (doc.id === DocumentsID) {
              return { ...doc, uploaded: data };
            }
            return doc;
          }),
        };
      }
      return app;
    });

    setApplicants(updatedApplicants);
  };

  const handleOnChangeEve = (e) => {
    const currentUploades = Applicants.find(
      (app) => app.id === appId
    )?.documents;
    if (currentUploades?.length) {
      handleDocSelected(currentUploades[0].id,0)
      setImage(e.target.files[0]);
      handleImages(e.target.files[0], isUploaded);
    } else {
    }
  };

  const handleCancelDocUpload = () => {
    if (image) {
      updatingData_Set(
        data.filter((doc) => doc.image.lastModified !== image.lastModified)
      );
      setImage(false);
    }
  };
  const handleImages = (uploadImg, status) => {
    if (!data?.length && !uploadImg) return;
    status && setIsLoading(true);
    let s = uploadImg.size / 1024;
    if (status && data?.length) {
      updatingData_Set(
        data?.map((imageUpload) => {
          if (imageUpload.status === false) {
            return { ...imageUpload, status: true };
          }
          return imageUpload;
        })
      );
      setTimeout(() => setIsLoading(false), 3000);
    } else {
      if (data?.length) {
        data.push({
          image: uploadImg,
          size: s.toFixed(3),
          id: data?.length,
          status: status,
        });
        updatingData_Set(data);
      } else {
        updatingData_Set([
          {
            image: uploadImg,
            size: s.toFixed(3),
            id: 0,
            status: status,
          },
        ]);
      }
    }
    status && setImage(false);
  };
  //  deleting X symbol
  const deletingRecordsByX = (id) => {
    updatingData_Set(data.filter((_) => _.id !== id));
    setImage(false);
  };
  return (
    <div className="position-relative right-side">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex position-relative top-0 gap-2 bg-secondary"
        id="header-doc"
      >
        <span className={`normal ${isLoading ? "loading" : "w-0"}`}></span>

        <label className="btn btn-primary ml-3 px-5  btns" htmlFor="file">
          Choose
        </label>
        <input onChange={handleOnChangeEve} id="file" type="file" hidden />
        <button
          className="btn btn-primary ml-3 px-5  btns"
          id={`${
            image || data?.find((stat) => stat.status === false)
              ? ""
              : "disable"
          }`}
          type={`${image ? "submit" : ""}`}
          onClick={() => handleImages(image, true)}
        >
          Upload
        </button>
        <button
          className="btn btn-primary ml-3 px-5 btns"
          id={`${image ? "" : "disable"}`}
          onClick={handleCancelDocUpload}
        >
          Cancel
        </button>
      </form>
      {isLoading ? <p className="load">Loading...</p> : <></>}
      {/* -------------------------------------Image Preview ----------------------------------------- */}

      <article className="d-flex flex-col pt-5 article">
        {data?.length ? (
          data.map((_, i) => (
            <span
              className="d-flex flex-col position-relative"
              key={i}
              style={{ userSelect: "none" }}
            >
              <div className="img-div">
                <img
                  style={{ cursor: "not-allowed" }}
                  src={_.image ? window.webkitURL.createObjectURL(_.image) : ""}
                />
              </div>
              <ImagePreview image={_.image} size={_.size} status={_.status} />
              <div
                style={{
                  cursor: "pointer",
                  color: "red",
                }}
                className="position-absolute spacing"
              >
                <FaX onClick={() => deletingRecordsByX(_.id)} />
              </div>
            </span>
          ))
        ) : (
          <></>
        )}
      </article>
    </div>
  );
};

export default ImageUploader;
