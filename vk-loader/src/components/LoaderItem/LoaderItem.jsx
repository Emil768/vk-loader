import React from "react";

import "./LoaderItem.scss";

function LoaderItem({ file }) {
  return (
    <div className="loader__item">
      <img
        src={`//localhost:8080/${file.filename}`}
        alt={file.fieldname}
        className="loader__item-img"
      />
      <div className="loader__item-content">
        <span className="loader__item-title">{file.originalname}</span>
        <p className="loader__item-info">{file.size}, 15 августа 2021 в 7:27</p>
      </div>
      <div className="loader__item-options">
        <i className="bx bx-pencil"></i>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
}

export default LoaderItem;
