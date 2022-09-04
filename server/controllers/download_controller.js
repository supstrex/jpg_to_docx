import path from "path";

export async function getDocx(req, res) {
  const docxName = req.params.fileName;
  const file = path.resolve("./public/docxs/" + docxName);

  if (!file) {
    return res.status(200).send({
      status: "Denied",
      message: "Invalid file name",
    });
  }
  
  res.setHeader("Content-disposition", "attachment; filename=" + docxName);
  res.setHeader(
    "Content-type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.download(file);
}
