import docxConversion from "../services/conversion_service.js";

export async function jpgToDoc(req, res) {
  /*If no file reseaved, respond with Denied status*/
  if (typeof req.file == "undefined") {
    return res.status(200).send({
      status: "Denied",
      message: "No file found, please attach a file",
    });
  }
  /*Set protocol and hostname of url */
  const url = req.protocol + "://" + req.get("host");
  /*Call service function responsible for file conversion*/
  const { docxName, convertedFileUrl } = await docxConversion(
    req.file.filename,
    url,
    req.file.mimetype
  );
  /*If successful return file metadata*/
  return res.status(200).send({
    status: "Success",
    message: "File is successfully converted",
    name: docxName,
    url: convertedFileUrl,
  });
}
