import React from "react";
import "./MyButton.scss";
function MyButton({ children }) {
  return <div className="button">{children}</div>;
}

export default MyButton;
