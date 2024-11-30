import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    donorName: {
      type: String,
      required: true,
    },
    donorEmail: {
      type: String,
      required: true,
    },
    donationItem: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);