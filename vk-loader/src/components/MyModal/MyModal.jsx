import React from "react";
import FileUploader from "../FileUploader/FileUploader";

import "./MyModal.scss";

function MyModal({ visible, setVisible }) {
  const closeModal = () => setVisible(false);

  return (
    <div className={visible ? "modal active" : "modal"} onClick={closeModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <span>Загрузка файла</span>
          <i className="bx bx-x" onClick={closeModal}></i>
        </div>
        <div className="modal__info">
          <span className="modal__info-title">Ограничения</span>
          <ul className="modal__list">
            <li className="modal__list-item">Файл не должен превышать 2 ГБ.</li>
            <li className="modal__list-item">
              Поддерживаемые типы файлов: doc, docx, xls, xlsx, ppt, pptx, rtf,
              pdf, png, jpg, gif, psd, djvu, fb2, ps и другие.
            </li>
            <li className="modal__list-item">
              Файл не должен нарушать авторские права.
            </li>
          </ul>
          <FileUploader closeModal={closeModal} />
        </div>
        <div className="modal__footer">
          <div className="button" onClick={closeModal}>
            Закрыть
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyModal;
