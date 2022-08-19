import { useState } from "react";
import "./App.css";

import { UploaderContext } from "./context/index";
import LoaderPanel from "./components/LoaderPanel/LoaderPanel.jsx";
import Tabs from "./components/Tabs/Tabs.jsx";

function App() {
  const [filesGlobal, setFilesGlobal] = useState([]);
  const [filesFilter, setFilesFilter] = useState([]);
  const [isLoaded, setIsLoaded] = useState({ length: 0, state: false });

  return (
    <UploaderContext.Provider
      value={{
        filesGlobal,
        setFilesGlobal,
        filesFilter,
        setFilesFilter,
        isLoaded,
        setIsLoaded,
      }}
    >
      <div className="App">
        <div className="App__content">
          <LoaderPanel />
          <Tabs />
        </div>
      </div>
    </UploaderContext.Provider>
  );
}

export default App;
