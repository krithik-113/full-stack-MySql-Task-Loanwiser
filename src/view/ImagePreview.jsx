import React from 'react'

const ImagePreview = ({image,size,status}) => {
  return (
    <div className="w-100 p-2 border-top border-bottom">
      <h5 className="ml-3 ">{image?.name} </h5>
      {image ? (
        <h5 className="ml-3 ">
          {size ? size + " KB" : ""}

          {size ? (
            <span className={`status ${status ? "success" : "pending"}`}>
              {status ? "Completed" : "Pending"}
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