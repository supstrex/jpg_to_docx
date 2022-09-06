import React, { useState } from "react";
import QRCode from "react-qr-code";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

function Download(props) {
  const fileUrl = props.download.fileUrl;
  /*Handle sharable link display*/
  let [value, setValue] = useState({ url: "", buttonText: "Show Link" });

  function onClick(e) {
    e.preventDefault();
    if (value.url === "") {
      setValue({ url: fileUrl, buttonText: "Hide Link" });
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
        <p>Scan QR code</p>
        <div style={{ background: "white", padding: "16px" }}>
          <QRCode value={fileUrl} size={200}/>
        </div>
      </div>
      <div>
        <p>Or simply download</p>
        <a href={fileUrl}>Dowload File</a>
      </div>
      <div>
        <div>
          <EmailShareButton url={fileUrl}>
            <EmailIcon size={40} borderRadius={10} />
          </EmailShareButton>
        </div>
        <div>
          <FacebookShareButton url={fileUrl}>
            <FacebookIcon size={40} borderRadius={10} />
          </FacebookShareButton>
        </div>
        <div>
          <TwitterShareButton url={fileUrl}>
            <TwitterIcon size={40} borderRadius={10} />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
}

export default Download;
