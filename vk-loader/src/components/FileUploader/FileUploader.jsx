import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import "./FileUploader.scss";
import { UploaderContext } from "../../context";
import { formatFileSize } from "../../utils/formatSize";

import { ProgressBar } from "react-bootstrap";
import { useEffect } from "react";
import { onUploadFiles } from "../../utils/passFiles";

function FileUploader({ closeModal }) {
  const [files, setFiles] = useState([]);
  const [infoFiles, setInfoFiles] = useState({
    nameLoaded: [],
    size: [],
    maxSize: 2000000000,
  });

  const [uploaded, setUploaded] = useState(0);
  const { setFilesGlobal } = useContext(UploaderContext);

  useEffect(() => {
    if (uploaded === 100) {
      clearModal();
    }
  }, [uploaded]);

  const clearModal = () => {
    setFiles([]);
    setInfoFiles({ ...infoFiles, nameLoaded: [], size: [] });
    closeModal();
    setUploaded(0);
  };

  const onSubmit = (e) => {
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    axios
      .post("http://localhost:8080/upload", data, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100));
        },
      })

      .then((res) => setFilesGlobal((prev) => [...prev, ...res.data]))
      .catch((e) => console.log("eror", e));
  };

  const totalSize =
    infoFiles.size.length &&
    infoFiles.size.reduce((acc, size) => (acc += size));

  return (
    <form method="post" action="#" onSubmit={(e) => e.preventDefault()}>
      <div className="file-input">
        <input
          type="file"
          id="file"
          className="button button-file"
          onChange={(e) =>
            onUploadFiles(e.target.files, setFiles, infoFiles, setInfoFiles)
          }
          multiple
        />
        <label htmlFor="file" className="button button-label">
          Выбрать файл
        </label>
      </div>
      {infoFiles.nameLoaded.length ? (
        <Fragment>
          <div className="file__content">
            <span className="file__titles">Вы выбрали файлы:</span>
            <ul className="file__list">
              {infoFiles.nameLoaded.map((name, index) => (
                <li className="file__list-item" key={index}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <span className="file-size">
            {formatFileSize(totalSize)}
            {totalSize >= infoFiles.maxSize ? (
              <b> размер превышает максимальное значение!</b>
            ) : null}
          </span>
          <ProgressBar
            now={uploaded}
            label={`${uploaded}% `}
            animated
            striped
          />

          <div className="file-buttons">
            <button
              className="button button-mg-rt"
              onClick={onSubmit}
              disabled={totalSize >= infoFiles.maxSize ? true : false}
            >
              Загрузить
            </button>
            <button className="button" onClick={clearModal}>
              Очистить
            </button>
          </div>
        </Fragment>
      ) : null}
    </form>
  );
}

export default FileUploader;
