import React, { useState } from "react";

function Download(props) {
  let [value, setValue] = useState({ url: "", buttonText: "Show Link" });
  function onClick(e) {
    e.preventDefault();
    if (value.url ==='') {
      setValue({ url: props.download.fileUrl, buttonText: "Hide Link" });
    } else {
      setValue({ url: "", buttonText: "Show Link" });
    }
  }
  return (
    <div>
      <div>
        <p>Use sharable link</p>
        <form onSubmit={onClick}>
          <p>{value.url}</p>
          <button type="submit">{value.buttonText}</button>
        </form>
      </div>
      <div>
        <p>Or simply download</p>
        <a href={props.download.fileUrl}>Dowload File</a>
      </div>
    </div>
  );
}

export default Download;
