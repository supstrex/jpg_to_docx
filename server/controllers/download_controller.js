import path from "path";

export async function getDocx(req, res) {
  const docxName = req.params.fileName;

  res.setHeader("Content-disposition", "attachment; filename=" + docxName);
  res.setHeader(
    "Content-type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  const file = path.resolve("./public/docxs/" + docxName);
  res.download(file);
}
