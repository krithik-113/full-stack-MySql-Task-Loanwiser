import React from 'react'

const ImagePreview = ({image,size,status}) => {
  return (
    <div className="p-2 border-top border-bottom" id="doc-cont">
      <h5 className="img-name ">{image} </h5>
      {image ? (
        <h5 className="img-name ">
          {size ? size + " KB" : ""}

          {size ? (
            <span
              className={`status ${
                status === "Pending" ? "pending" : "success"
              }`}
            >
              {status === "Pending" ? "Pending" : "Completed"}
            </span>
          ) : (
            <></>
          )}
        </h5>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ImagePreview