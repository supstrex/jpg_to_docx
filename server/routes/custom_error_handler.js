/* function that handles expected application errors */
async function customErrorHandler(err, req, res, next) {
  /* handling file format*/ 
  if (err.message == "Only .jpg/.jpeg format is allowed!") {
    return res.status(200).send({
      status: "Denied",
      message: err.message,
    });
  }
  /* handling file size*/ 
  if (err.message == "File too large") {
    return res.status(200).send({
      status: "Denied",
      message: err.message,
    });
  }
  /* all other server errors*/ 
  console.error(err);

  return res.status(500).send("Something Went Wrong");
}

export default customErrorHandler;
