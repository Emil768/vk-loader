import { createContext, useState } from "react";
import "./App.css";

import { UploaderContext } from "./context/index";
import LoaderPanel from "./components/LoaderPanel/LoaderPanel.jsx";
import Tabs from "./components/Tabs/Tabs.jsx";

function App() {
  const [filesGlobal, setFilesGlobal] = useState([]);
  const [filesFilter, setFilesFilter] = useState([]);
  return (
    <UploaderContext.Provider
      value={{ filesGlobal, setFilesGlobal, filesFilter, setFilesFilter }}
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
