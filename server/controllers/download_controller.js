import path from "path";

export async function getDocx(req, res) {
  /*Get filename from req*/
  const docxName = req.params.fileName;
  const file = path.resolve("./public/docxs/" + docxName);
  /*If there is no file return Denied response*/
  if (!file) {
    return res.status(200).send({
      status: "Denied",
      message: "Invalid file name",
    });
  }
  /*Set headers and download file*/
  res.setHeader("Content-disposition", "attachment; filename=" + docxName);
  res.setHeader(
    "Content-type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.download(file);
}
