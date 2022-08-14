import React, { useState } from "react";
import "./Tabs.scss";
function Tabs() {
  const [tabs, setTabs] = useState([
    {
      name: "Все вайлы",
      value: "all",
    },
    {
      name: "Текстовые",
      value: "txt",
    },
    {
      name: "Архивы",
      value: "zip",
    },
    {
      name: "Gif-изображения",
      value: "gif",
    },
    {
      name: "Изображения",
      value: "img",
    },
    {
      name: "Видео",
      value: "mp4",
    },
    {
      name: "Прочие",
      value: "torrent",
    },
  ]);
  return (
    <div className="tabs">
      <ul className="tabs__list">
        {tabs.map((tab, index) => (
          <li className="tabs__item" key={index}>
            <span className="tabs__item-name">{tab.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
