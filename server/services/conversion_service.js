import docx from "docx";
// import mongoose from "mongoose";
import fs from "fs";
import path from "path";
// import Conversion from "../models/Conversion.js";
import sizeOf from "image-size";

async function docxConversion(imageName, url, imageMimeType) {
  /*Generate requested image path*/
  const imagePath = path.resolve("./public/images/" + imageName);
  
  /*Get image dimensions*/
  const dimensions = sizeOf(imagePath);
  
  /*Using docx package to  build new docx file*/
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
  
  /*Convert file to base64String*/
  const base64 = await Packer.toBase64String(doc);
  
  /*Generate docx file path and save file*/
  const docxName =
  imageName.slice(0, imageName.lastIndexOf(".")) + ".docx";

  fs.writeFileSync(
    path.resolve("./public/docxs/" + docxName),
    base64,
    "base64"
  );
  
  /*Generate converted file url for http get request*/
  const convertedFileUrl = url + "/download/docx/" + docxName;
  
  /*Save conversion history in database*/
  // const conversion = new Conversion({
  //   _id: new mongoose.Types.ObjectId(),
  //   originalFile: {
  //     name: imageName,
  //     mimeType: imageMimeType,
  //     url: url + "/download/image/" + imageName,
  //   },
  //   convertedFile: {
  //     name: docxName,
  //     mimeType:
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //     url: convertedFileUrl,
  //   },
  // });

  // await conversion.save();

  return { docxName, convertedFileUrl };
}

export default docxConversion;
