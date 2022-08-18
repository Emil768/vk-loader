import React, { useState } from "react";

import "./LoaderItem.scss";

import { formatFileSize } from "../../utils/formatSize";
import { useRef } from "react";

function LoaderItem({ file, onDelete }) {
  const [title, setTitle] = useState({ value: "", state: false });
  const titleRef = useRef();

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

  const onBlurTitle = (title) => {
    setTitle({
      value: title,
    });
    while (titleRef.current.firstElementChild) {
      titleRef.current.firstElementChild.remove();
    }
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
          ref={titleRef}
          contentEditable={title.state}
          suppressContentEditableWarning={true}
          onBlur={(e) => onBlurTitle(e.target.textContent)}
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
