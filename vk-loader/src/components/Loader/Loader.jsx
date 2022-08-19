import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={610}
    height={61}
    viewBox="0 0 610 61"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="60" y="20" rx="0" ry="0" width="510" height="9" />
    <rect x="60" y="40" rx="0" ry="0" width="510" height="9" />
    <rect x="0" y="7" rx="0" ry="0" width="50" height="50" />
  </ContentLoader>
);

export default Loader;
