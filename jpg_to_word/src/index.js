import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./pages/Layout";
import Upload from "./pages/Upload";
import Download from "./pages/Download";
import NoPage from "./pages/NoPage";

export default function App() {
  let [download, setDownload] = useState({
    isReady: false,
    fileUrl: "",
  });
  
  function onConversion(fileUrl) {
    setDownload({ isReady: true, fileUrl });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
