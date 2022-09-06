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
  /*Handle sharable link display*/

  function copyText() {
    navigator.clipboard.writeText(fileUrl);
  }

  return (
    <div className="row">
      <div>
        <div className="converted-file">
          <p className="text-of-download">Scan QR code</p>
          <div style={{ background: "white", padding: "10px", width: "100px", height: "100px", margin: "auto" }}>
            <QRCode value={fileUrl} size={100} />
          </div>
        </div>

        <div className="converted-file">
          <p className="text-of-download">Use sharable link</p>
          <button className="copy-button" onClick={copyText}>
            <img className="copy-img" src={CopyImg} />
          </button>
        </div>

        <div className="converted-file">
          <p className="text-of-download">Or simply download</p>
          <a href={fileUrl}>
            <img className="download-img" src={DownloadImg} />
          </a>
        </div>

      </div>
      <div className="social-medias">
        <div className="social">
          <EmailShareButton url={fileUrl}>
            <EmailIcon size={60} borderRadius={10} />
          </EmailShareButton>
        </div>
        <div className="social">
          <FacebookShareButton url={fileUrl}>
            <FacebookIcon size={60} borderRadius={10} />
          </FacebookShareButton>
        </div>
        <div className="social">
          <TwitterShareButton url={fileUrl}>
            <TwitterIcon size={60} borderRadius={10} />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
}
export default Download;