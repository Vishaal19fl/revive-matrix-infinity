import mongoose from "mongoose";
const { Schema } = mongoose;

const SpecialReportSchema = new Schema({
  location: { type: String, required: true },
  startdate: { type: String, required: true },
  enddate: { type: String, required: true },
  
});

export default mongoose.model('specialreportfinal', SpecialReportSchema, "specialreportfinal");
