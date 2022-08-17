import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UploaderContext } from "../../context";
import "./Tabs.scss";

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const { filesGlobal, setFilesFilter } = useContext(UploaderContext);

  const [filterTab, setFilterTab] = useState([]);

  useEffect(() => {
    (() => setFilterTab(filesGlobal))();
  }, [filesGlobal]);

  useEffect(() => {
    setFilesFilter(filterTab);
  }, [filterTab]);

  const tabs = [
    { name: "Все вайлы", value: "*" },
    {
      name: "Текстовые",
      value: [".txt", ".docx", ".pdf", ".accdb", ".doc", ".ppt"],
    },
    { name: "Архивы", value: [".rar", ".zip"] },
    { name: "Gif-изображения", value: [".gif"] },
    { name: "Изображения", value: [".png", ".webp"] },
    { name: "Видео", value: ["mp4"] },
  ];

  const onClickTab = (index, value) => {
    const filterFiles =
      value === "*"
        ? filesGlobal
        : filesGlobal.filter((item) => value.indexOf(item.ext) !== -1);

    setFilterTab(filterFiles);
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      <ul className="tabs__list">
        {tabs.map((tab, index) => (
          <li
            className={
              activeTab === index
                ? "tabs__item tabs__item-active"
                : "tabs__item"
            }
            key={index}
            onClick={() => onClickTab(index, tab.value)}
          >
            <span className="tabs__item-name">{tab.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
