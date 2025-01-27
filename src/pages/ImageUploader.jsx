import React, { useContext, useEffect, useState } from "react";
import ImagePreview from "../view/ImagePreview";
import { FaX } from "react-icons/fa6";
import axios from "axios";
import { ImageUploaderDatas } from "../components/context API/DocumentsContext";
import Loading from "../view/Loading";

const ImageUploader = () => {
  const { imageUploaded, DocumentsID, appId, getAllImagesUploaded } =
    useContext(ImageUploaderDatas);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageId, setImageId] = useState(0);

  const [uploadbtn, setUploadBtn] = useState(false);

  const [stat, setStat] = useState(false);
  const sta = imageUploaded?.filter((img) => img.status === "Pending");

  const handleOnChangeEve = async (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) return;

    const status = "Pending";

    if (DocumentsID) {
      setIsLoading(true);
      setStat("Selecting Image To Upload...");
      setImage(e.target.files[0]);
      setUploadBtn(true);
      const formData = new FormData();
      formData.append("appId", appId);
      formData.append("docId", DocumentsID);
      formData.append("status", status);
      formData.append("image", e.target.files[0]);
      try {
        const { data } = await axios.post("/image-uploader/addImage", formData);
        if (data.success) {
          setImageId(data.imageId);
          getAllImagesUploaded();
          setStat("");
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Select a Document to select image");
    }
  };

  const handleImages = async (e) => {
    if (sta?.length) {
      setIsLoading(true);
      setStat("Uploading Image...");
      try {
        const { data } = await axios.post("/image-uploader/change-status", {
          docId: DocumentsID,
        });
        if (data.success) {
          getAllImagesUploaded();
          setStat("");
          setIsLoading(false);
          setUploadBtn(true);
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setUploadBtn(false);
    }
  };

  const handleCancelDocUpload = async (id, method) => {
    if (!DocumentsID) return;
    if (method === "cancel" && sta?.length) {
      try {
        const { data } = await axios.delete(
          `/image-uploader/deleteImage/${id}`
        );
        if (data.success) {
          getAllImagesUploaded();
          setImage(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setImage(false)
    }
    if (method === "delete") {
      try {
        const { data } = await axios.delete(
          `/image-uploader/deleteImage/${id}`
        );
        if (data.success) {
          getAllImagesUploaded();
          setImage(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    if (imageUploaded?.length) {
      let upload = imageUploaded.filter((img) => img.status === "Pending");
      if (upload?.length) {
        setUploadBtn(true);
      } else {
        setUploadBtn(false);
      }
    }
  }, [getAllImagesUploaded]);

  return (
    <div className="position-relative right-side">
      <div
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
          id={`${uploadbtn ? "" : "disable"}`}
          onClick={handleImages}
        >
          Upload
        </button>
        <button
          className="btn btn-primary ml-3 px-5 btns"
          id={`${image ? "" : "disable"}`}
          onClick={() => handleCancelDocUpload(imageId, "cancel")}
        >
          Cancel
        </button>
      </div>
      {isLoading ? <Loading text={stat} /> : <></>}
      {/* -------------------------------------Image Preview ----------------------------------------- */}

      <article className="d-flex flex-col pt-5 article">
        {imageUploaded?.length ? (
          imageUploaded.map((_, i) => (
            <span
              className="d-flex flex-col position-relative"
              key={i}
              style={{ userSelect: "none" }}
            >
              <div className="img-div">
                <img
                  style={{ cursor: "not-allowed" }}
                  src={_.imageURL ? _.imageURL : ""}
                />
              </div>
              <ImagePreview
                image={_.imageName}
                size={_.size}
                status={_.status}
              />
              <div
                style={{
                  cursor: "pointer",
                  color: "red",
                }}
                className="position-absolute spacing"
              >
                <FaX
                  onClick={() => handleCancelDocUpload(_.imageId, "delete")}
                />
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
