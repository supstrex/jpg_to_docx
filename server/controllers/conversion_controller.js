import docx from "docx";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Conversion from "../models/Conversion.js";

const { Document, ImageRun, Packer, Paragraph } = docx;

export async function jpgToDoc(req, res) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new ImageRun({
                data: fs.readFileSync(
                  path.resolve("./public/images/" + req.file.filename)
                ),
                transformation: {
                  width: 800,
                  height: 600,
                },
              }),
            ],
          }),
        ],
      },
    ],
  });

  const base64 = await Packer.toBase64String(doc);
  const docxName =
    req.file.filename.slice(0, req.file.filename.lastIndexOf(".")) + ".docx";

  fs.writeFileSync(
    path.resolve("./public/docxs/" + docxName),
    base64,
    "base64"
  );

  const url = req.protocol + "://" + req.get("host");
  const convertedFileUrl = url + "/download/docx/" + docxName;
  const conversion = new Conversion({
    _id: new mongoose.Types.ObjectId(),
    originalFile: {
      name: req.file.filename,
      mimeType: req.file.mimetype,
      url: url + "/download/image/" + req.file.filename,
    },
    convertedFile: {
      name: docxName,
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      url: convertedFileUrl,
    },
  });

  await conversion.save();

  return res.status(200).send({
    message: "File is successfully converted",
    name: docxName,
    url: convertedFileUrl,
  });
}
