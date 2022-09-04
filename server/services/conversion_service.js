import docx from "docx";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Conversion from "../models/Conversion.js";
import sizeOf from "image-size";

async function docxConversion(imageName, url, imageMimeType) {
  const imagePath = path.resolve("./public/images/" + imageName);
  const dimensions = sizeOf(imagePath);
  const { Document, ImageRun, Packer, Paragraph } = docx;
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new ImageRun({
                data: fs.readFileSync(imagePath),
                transformation: {
                  width: dimensions.width,
                  height: dimensions.height,
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
  imageName.slice(0, imageName.lastIndexOf(".")) + ".docx";

  fs.writeFileSync(
    path.resolve("./public/docxs/" + docxName),
    base64,
    "base64"
  );

  const convertedFileUrl = url + "/download/docx/" + docxName;
  const conversion = new Conversion({
    _id: new mongoose.Types.ObjectId(),
    originalFile: {
      name: imageName,
      mimeType: imageMimeType,
      url: url + "/download/image/" + imageName,
    },
    convertedFile: {
      name: docxName,
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      url: convertedFileUrl,
    },
  });

  await conversion.save();

  return { docxName, convertedFileUrl };
}

export default docxConversion;
