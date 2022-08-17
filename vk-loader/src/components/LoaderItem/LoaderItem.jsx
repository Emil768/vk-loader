import React, { useState } from "react";

import "./LoaderItem.scss";

import { formatFileSize } from "../../utils/formatSize";

function LoaderItem({ file, onDelete }) {
  const [title, setTitle] = useState({ value: "", state: false });

  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    day: "numeric",
  };

  const onChangeFile = () => {
    setTitle({ state: true });
  };

  const onBlurContent = (target) => {
    return target
      ? setTitle({ value: target })
      : setTitle({ value: file.originalname });
  };

  return (
    <div className="loader__item">
      <img
        src={`//localhost:8080/${file.src ? file.src : "../../img/file.png"}`}
        alt={file.fieldname}
        className="loader__item-img"
      />
      <div className="loader__item-content">
        <span
          className={
            title.state ? " loader__item-title change" : "loader__item-title"
          }
          contentEditable={title.state}
          suppressContentEditableWarning={true}
          onBlur={(e) => onBlurContent(e.target.textContent)}
        >
          {file.originalname}
        </span>
        <p className="loader__item-info">
          {formatFileSize(file.size)}{" "}
          {date.toLocaleDateString("ru-RU", options)}
        </p>
      </div>
      <div className="loader__item-options">
        <i className="bx bx-pencil" onClick={onChangeFile}></i>
        <i className="bx bx-x" onClick={() => onDelete(file.originalname)}></i>
      </div>
    </div>
  );
}

export default LoaderItem;
