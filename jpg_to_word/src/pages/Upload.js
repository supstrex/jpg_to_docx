import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useDrivePicker from "react-google-drive-picker";

function Upload(props) {
  const [file, setFile] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openPicker, authResult] = useDrivePicker();
  const oauthToken = useRef("");
  let fileUrl, doc;

  function handleOpenPicker() {
    openPicker({
      clientId:
        "444119231188-5k4e26916b8b5tvfigo1hmvkskspodju.apps.googleusercontent.com",
      developerKey: "AIzaSyAVDfcfvKsTdOmgRor-7IqxzOaRLG1QOrk",
      viewId: "DOCS_IMAGES",
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: false,
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        if (data.action === "picked") {
          doc = data.docs[0];
          axios
            .get(
              "https://www.googleapis.com/drive/v3/files/" +
                doc.id +
                "?alt=media",
              {
                headers: { Authorization: "Bearer " + oauthToken.current },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              let blob = new Blob([res.data], { type: doc.mimeType });
              setFile({ data: blob, name: doc.name });
            });
        }
      },
    });
  }

  useEffect(() => {
    if (authResult) {
      oauthToken.current = authResult.access_token;
    }
  }, [authResult]);

  function onFileChange(e) {
    setFile({ data: e.target.files[0] });
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("original_file", file.data, file.name);

    axios.post("/convert/jpg-doc", formData, {}).then((res) => {
      if (res.data.status === "Denied") {
        console.log(res.data.message);
        setErrorMsg(res.data.message);
        return;
      }
      setErrorMsg("");
      fileUrl = res.data.url;
      props.onConversion(fileUrl);
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="form-group">
          <input type="file" onChange={onFileChange} />
        </div>
        <div>
          <button className="Drive" onClick={() => handleOpenPicker()}>
            Open Picker
          </button>
        </div>
        <div>
          <button className="DropBox" onClick={""}>
            DropBox
          </button>
        </div>
        <div>
          <p className="error-msg">{errorMsg}</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Convert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
