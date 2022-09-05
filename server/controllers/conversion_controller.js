import docxConversion from "../services/conversion_service.js";

export async function jpgToDoc(req, res) {

  if (typeof req.file == "undefined") {
    return res.status(200).send({
      status: "Denied",
      message: "No file found, please attach a file",
    });
  }
  const url = req.protocol + "://" + req.get("host");

  const { docxName, convertedFileUrl } = await docxConversion(
    req.file.filename,
    url,
    req.file.mimetype
  );

  return res.status(200).send({
    status: "Success",
    message: "File is successfully converted",
    name: docxName,
    url: convertedFileUrl,
  });
}
