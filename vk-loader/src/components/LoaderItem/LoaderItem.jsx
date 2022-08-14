import React from "react";

import "./LoaderItem.scss";

function LoaderItem({ file }) {
  const formatFileSize = function (bytes) {
    const sufixes = ["B", "kB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
  };

  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    day: "numeric",
  };

  return (
    <div className="loader__item">
      <img
        src={`//localhost:8080/${file.src ? file.src : "../../img/file.png"}`}
        alt={file.fieldname}
        className="loader__item-img"
      />
      <div className="loader__item-content">
        <span className="loader__item-title">{file.originalname}</span>
        <p className="loader__item-info">
          {formatFileSize(file.size)}{" "}
          {date.toLocaleDateString("ru-RU", options)}
        </p>
      </div>
      <div className="loader__item-options">
        <i className="bx bx-pencil"></i>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
}

export default LoaderItem;
