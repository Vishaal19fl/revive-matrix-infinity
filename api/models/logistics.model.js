import mongoose from "mongoose";
const { Schema } = mongoose;

const LogisticsSchema = new Schema(
  {
    logisticsName: {
      type: String,
      required: true,
    },
    logisticsLocation: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    deliveryLocation: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemQuantity: {
      type: Number,
      required: true,
    },
    pickedUp: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Logistics", LogisticsSchema);
