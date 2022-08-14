import React, { useState } from "react";
import LoaderItem from "../LoaderItem/LoaderItem";
import MyModal from "../MyModal/MyModal";

import "./LoaderPanel.scss";
import "../MyButton/MyButton.scss";

function LoaderPanel() {
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const openModal = () => {
    setModal(true);
  };

  const onSucces = (newfiles) => {
    setFiles(newfiles);
    setModal(false);
  };

  const filterFiles = files.filter(
    (file) =>
      file.originalname.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
  );

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
      <input
        type="text"
        className="loader__input"
        placeholder="Поиск файлов"
        onChange={(e) => setSearchValue(e.target.value)}
        maxLength={50}
      />
      <div className="loader__content">
        <div
          className={
            filterFiles.length
              ? "loader__list "
              : "loader__list loader__list-empty"
          }
        >
          {filterFiles.length ? (
            filterFiles.map((file, index) => (
              <LoaderItem key={index} file={file} />
            ))
          ) : (
            <span className="loader__empty">
              В ваших файлах по запросу «{searchValue}» ничего не найдено
            </span>
          )}
        </div>
      </div>
      <MyModal visible={modal} setVisible={setModal} onSucces={onSucces} />
    </div>
  );
}

export default LoaderPanel;
