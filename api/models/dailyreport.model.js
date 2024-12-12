import mongoose from "mongoose";
const { Schema } = mongoose;

const dailyreportSchema = new Schema({
  date: { type: String, required: true },
  reports: { type: Array, required: true },
});

export default mongoose.model('dailyreport', dailyreportSchema, "dailyreport");
