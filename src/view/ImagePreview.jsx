import React from 'react'

const ImagePreview = ({image,size,status}) => {
  return (
    <div className="p-2 border-top border-bottom" id='doc-cont'>
      <h5 className="img-name ">{image?.name} </h5>
      {image ? (
        <h5 className="img-name ">
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