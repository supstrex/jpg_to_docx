import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./pages/Layout";
import Upload from "./pages/Upload";
import Download from "./pages/Download";
import NoPage from "./pages/NoPage";

export default function App() {
  /*Keep state of downloaded file info*/
  let [download, setDownload] = useState({
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout download={download} clearDownload={clearDownload} />}
        >
          <Route
            index
            element={
              download.isReady ? (
                <Download download={download} />
              ) : (
                <Upload onConversion={onConversion} />
              )
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
