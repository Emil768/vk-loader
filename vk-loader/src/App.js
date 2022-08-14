import "./App.css";

import LoaderPanel from "./components/LoaderPanel/LoaderPanel.jsx";
import Tabs from "./components/Tabs/Tabs.jsx";

function App() {
  return (
    <div className="App">
      <div className="App__content">
        <LoaderPanel />

        <Tabs />
      </div>
    </div>
  );
}

export default App;
