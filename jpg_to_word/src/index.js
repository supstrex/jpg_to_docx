import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./pages/Layout";
import Upload from "./pages/Upload";
import Download from "./pages/Download";
import NoPage from "./pages/NoPage";
import "./styles/index.css";

export default function App() {
  /*Keep state of downloaded file info*/
  const [download, setDownload] = useState({
    isReady: false,
    fileUrl: "",
  });
  
  /*Keep state of downloaded file*/
  function onConversion(fileUrl) {
    setDownload({ isReady: true, fileUrl });
  }
  /*Clear state of downloaded file*/
  function clearDownload() {
    setDownload({ isReady: false, fileUrl: "" });
  }

  return (
    <div className="app-window">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout download={download} clearDownload={clearDownload} />
              }
            >
              <Route
                index
                element={
                  download.isReady ? (
                    <Download download={download} />
                  ) : (
                    <Upload
                      onConversion={onConversion}
                    />
                  )
                }
              />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
