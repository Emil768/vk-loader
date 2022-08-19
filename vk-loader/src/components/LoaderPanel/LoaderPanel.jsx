import React, { useState } from "react";

import MyModal from "../MyModal/MyModal";

import "./LoaderPanel.scss";
import "../MyButton/MyButton.scss";
import { useContext } from "react";
import { UploaderContext } from "../../context";

import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlertDelete } from "../../utils/confirm.js";
import Loader from "../Loader/Loader";
import LoaderItem from "../LoaderItem/LoaderItem";
import { useEffect } from "react";

function LoaderPanel() {
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { filesGlobal, setFilesGlobal, filesFilter, isLoaded, setIsLoaded } =
    useContext(UploaderContext);

  useEffect(() => {
    setIsLoaded({ state: true });
  }, [filesGlobal]);

  const openModal = () => {
    setModal(true);
  };

  const filterFiles = filesFilter.filter(
    (file) =>
      file.originalname.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
  );

  const onDeleteItem = (id) =>
    confirmAlertDelete(id, filesGlobal, setFilesGlobal);

  return (
    <div className="loader">
      <div className="loader__header">
        <h5 className="loader__title">
          Файлы <span className="loader__count">{filterFiles.length}</span>
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
          {filterFiles.length
            ? filterFiles.map((file, index) => (
                <LoaderItem key={index} file={file} onDelete={onDeleteItem} />
              ))
            : isLoaded.state && (
                <span className="loader__empty">
                  В ваших файлах по запросу «{searchValue}» ничего не найдено
                </span>
              )}
          {!isLoaded.state
            ? Array(isLoaded.length)
                .fill(0)
                .map((_, index) => <Loader key={index} />)
            : null}
        </div>
      </div>

      <MyModal visible={modal} setVisible={setModal} />
    </div>
  );
}

export default LoaderPanel;
