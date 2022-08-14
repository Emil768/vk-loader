import React, { useState } from "react";
import LoaderItem from "../LoaderItem/LoaderItem";
import MyModal from "../MyModal/MyModal";

import "./LoaderPanel.scss";
import "../MyButton/MyButton.scss";

function LoaderPanel() {
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);

  const openModal = () => {
    setModal(true);
  };

  const onSucces = (newfiles) => {
    setFiles(newfiles);
    setModal(false);
  };

  return (
    <div className="loader">
      <div className="loader__header">
        <h5 className="loader__title">
          Файлы <span className="loader__count">{files.length}</span>
        </h5>
        <div className="button" onClick={openModal}>
          Загрузить файл
        </div>
      </div>
      <input type="text" className="loader__input" placeholder="Поиск файлов" />
      <div className="loader__content">
        <div className="loader__list">
          {files.map((file, index) => (
            <LoaderItem key={index} file={file} />
          ))}
        </div>
      </div>
      <MyModal visible={modal} setVisible={setModal} onSucces={onSucces} />
    </div>
  );
}

export default LoaderPanel;
