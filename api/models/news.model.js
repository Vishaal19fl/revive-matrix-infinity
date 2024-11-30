import mongoose from "mongoose";
const { Schema } = mongoose;

const NewsSchema = new Schema(
  {
    timestamp: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("News", NewsSchema);