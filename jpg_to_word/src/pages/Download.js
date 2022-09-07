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
import CopyImg from "../media/link.png";
import DownloadImg from "../media/downloading.png";

function Download(props) {
  const fileUrl = props.download.fileUrl;
  
  function copyText() {
    navigator.clipboard.writeText(fileUrl);
  }
  
  return (
    <div className="row">
      <div className="firstGeneralDiv">
      <div className="firstDiv">
          <p className="textOfDownload">Scan QR code</p>
          <div style={{ background: "white", padding: "10px", width: "100px", height: "100px", margin: "auto" }}>
            <QRCode value={fileUrl} size={100} />
          </div>
        </div>

        <div className="firstDiv">
          <p className="textOfDownload">Use sharable link</p>
          <button className="copy-button" onClick={copyText}>
          <img className="copyImg" src={CopyImg} />
          </button>
        </div>

        <div className="firstDiv">
          <p className="textOfDownload">Or simply download</p>
          <a href={fileUrl}>
            <img className="downloadImg" src={DownloadImg}/>
          </a>
        </div>

      </div>
      <div className="secondGeneralDiv">
        <div>
          <EmailShareButton url={fileUrl}>
            <EmailIcon size={60} borderRadius={10} />
          </EmailShareButton>
        </div>
        <div>
          <FacebookShareButton url={fileUrl}>
            <FacebookIcon size={60} borderRadius={10} />
          </FacebookShareButton>
        </div>
        <div>
          <TwitterShareButton url={fileUrl}>
            <TwitterIcon size={60} borderRadius={10} />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
}
export default Download;