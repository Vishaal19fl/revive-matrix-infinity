import mongoose from "mongoose";
const { Schema } = mongoose;

const OcrDataSchema = new Schema({
  location: { type: String, required: true },
  disaster_type: { type: String, required: true },
  news_source: { type: String, required: true },
  data: { type: String, required: true },
  severity: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('OcrData', OcrDataSchema, "OcrData");
