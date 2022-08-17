import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import "./FileUploader.scss";
import { UploaderContext } from "../../context";
import { formatFileSize } from "../../utils/formatSize";

import { ProgressBar } from "react-bootstrap";
import { useEffect } from "react";
import { useMemo } from "react";

function FileUploader({ closeModal }) {
  const [files, setFiles] = useState([]);
  const [nameLoaded, setNameLoaded] = useState([]);
  const [sizeLoaded, setSizeLoaded] = useState([]);
  const [uploaded, setUploaded] = useState(0);

  const { setFilesGlobal } = useContext(UploaderContext);

  useEffect(() => {
    if (uploaded === 100) {
      clearModal();
    }
  }, [uploaded]);

  const clearModal = () => {
    setNameLoaded([]);
    closeModal();
    setUploaded(0);
  };

  const onInputChange = (e) => {
    const inputFiles = e.target.files;

    const newFiles = { files: [], nameLoaded: [], size: [] };

    for (let i = 0; i < inputFiles.length; i++) {
      newFiles.nameLoaded.push(inputFiles[i].name);
      newFiles.files.push(inputFiles[i]);
      newFiles.size.push(inputFiles[i].size);
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles.files]);
    setNameLoaded((prevFiles) => [...prevFiles, ...newFiles.nameLoaded]);
    setSizeLoaded((prevFiles) => [...prevFiles, ...newFiles.size]);
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

      .then((res) => setFilesGlobal(res.data))
      .catch((e) => console.log("eror", e));
  };

  const totalSize =
    sizeLoaded.length && sizeLoaded.reduce((acc, size) => (acc += size));

  console.log(formatFileSize(totalSize));

  return (
    <form method="post" action="#" onSubmit={(e) => e.preventDefault()}>
      <div className="file-input">
        <input
          type="file"
          id="file"
          className="button button-file"
          onChange={onInputChange}
          multiple
        />
        <label htmlFor="file" className="button button-label">
          Выбрать файл
        </label>
      </div>
      {nameLoaded.length ? (
        <Fragment>
          <div className="file__content">
            <span className="file__titles">Вы выбрали файлы:</span>
            <ul className="file__list">
              {nameLoaded.map((name, index) => (
                <li className="file__list-item" key={index}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <span className="file-size">{formatFileSize(totalSize)}</span>
          <ProgressBar
            now={uploaded}
            label={`${uploaded}% `}
            animated
            striped
          />

          <div className="file-buttons">
            <button className="button button-mg-rt" onClick={onSubmit}>
              Загрузить
            </button>
            <button className="button" onClick={() => clearModal()}>
              Очистить
            </button>
          </div>
        </Fragment>
      ) : null}
    </form>
  );
}

export default FileUploader;
