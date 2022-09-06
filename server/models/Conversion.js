import mongoose from "mongoose";
const Schema = mongoose.Schema;
const conversionSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    originalFile: {
      name: { type: String },
      url: { type: String },
      mimeType: {
        type: String,
      },
    },
    convertedFile: {
      name: { type: String },
      url: { type: String },
      mimeType: {
        type: String,
      },
    },
  },
  {
    collection: "conversions",
  }
);
export default mongoose.model("Conversion", conversionSchema);
