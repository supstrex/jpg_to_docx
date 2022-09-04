import React, { useState } from "react";
import axios from "axios";

function Upload(props) {
  const [file, setFile] = useState("");
  let fileUrl;
  function onFileChange(e) {
    setFile(e.target.files[0]);
  }
  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("original_file", file);

    axios.post("/convert/jpg-doc", formData, {}).then((res) => {
      if (res.data.status === "Denied") {
        console.log(res.data.message);
        return;
      }
      fileUrl = res.data.url;
      props.onConversion(fileUrl);
    });
  }

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="file" onChange={onFileChange} />
          </div>
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
