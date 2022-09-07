import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useDrivePicker from "react-google-drive-picker";
import DropboxChooser from "react-dropbox-chooser";
import dropboxIcon from "../media/dropboxIcon.ico";
import googleDriveIcon from "../media/googleDriveIcon.png";
import fileSelectionIcon from "../media/fileSelectionIcon.png";
function Upload(props) {
  /*Some keys*/
  const DROPBOX_APP_KEY = process.env.REACT_APP_DROPBOX_APP_KEY;
  const GOOGLE_DRIVE_CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
  const GOOGLE_DRIVE_DEVELOPER_KEY =
    process.env.REACT_APP_GOOGLE_DRIVE_DEVELOPER_KEY;
  /*Used hooks*/
  const [file, setFile] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openPicker, authResult] = useDrivePicker();
  const oauthToken = useRef("");
  /*Google Drive image picker*/
  function handleOpenPicker() {
    openPicker({
      clientId: GOOGLE_DRIVE_CLIENT_ID,
      developerKey: GOOGLE_DRIVE_DEVELOPER_KEY,
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
          let doc = data.docs[0];
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
  /*Waits for google drive client access token*/
  useEffect(() => {
    if (authResult) {
      oauthToken.current = authResult.access_token;
    }
  }, [authResult]);
  /*DropBox image picker*/
  function onSuccess(dropBoxFile) {
    const dropBoxLink = dropBoxFile[0].link;
    const dropBoxName = dropBoxFile[0].name;
    const dropBoxMimeType =
      "image/" + dropBoxName.slice(dropBoxName.lastIndexOf(".") + 1);
    axios
      .get(dropBoxLink, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
        responseType: "arraybuffer",
      })
      .then((res) => {
        let blob = new Blob([res.data], { type: dropBoxMimeType });
        setFile({ data: blob, name: dropBoxName });
      });
  }
  /*On cancel simply do nothing*/
  function onCancel() {}
  /*For selection from local file system*/
  function onFileChange(e) {
    setFile({ data: e.target.files[0] });
  }
  /*On submition convert file into FormData*/
  function onSubmit(e) {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("original_file", file.data, file.name);
      axios.post("/convert/jpg-doc", formData, {}).then((res) => {
        if (res.data.status === "Denied") {
          console.log(res.data.message);
          setErrorMsg(res.data.message);
          return;
        }
        setErrorMsg("");
        let fileUrl = res.data.url;
        props.onConversion(fileUrl);
      });
    }
  }
  return (
    <div className="row">
      <div className="file-pickers">
        <div>
          <div className="file-selection">
            <label htmlFor="file-input">
              <img src={fileSelectionIcon} alt="Icon for file selection" />
            </label>
            <input
              type="file"
              className="file-selection-input"
              name="file-input"
              id="file-input"
              onChange={onFileChange}
            />
          </div>
        </div>
        <div>
          <button className="picker-button" onClick={() => handleOpenPicker()}>
            <img src={googleDriveIcon} alt="Google Drive Icon" />
          </button>
        </div>
        <div>
          <DropboxChooser
            appKey={DROPBOX_APP_KEY}
            linkType="direct"
            success={(dropBoxFile) => onSuccess(dropBoxFile)}
            cancel={() => onCancel()}
            multiselect={false}
            extensions={[".jpg", ".jpeg"]}
          >
            <button className="picker-button dropBox">
              <img src={dropboxIcon} alt="Dropbox Icon" />
            </button>
          </DropboxChooser>
        </div>
      </div>
      {file.data ? (
        <div className="convert">
          <form onSubmit={onSubmit}>
              <button className="convert-button" type="submit">
                Convert
              </button>
          </form>
        </div>
      ) : (
        <></>
      )}
      <div>
        <p className="error-msg">{errorMsg}</p>
      </div>
    </div>
  );
}
export default Upload;