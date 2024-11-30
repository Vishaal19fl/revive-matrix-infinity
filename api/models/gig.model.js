import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: { 
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      required: false,
    },
    price: { 
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    delLocation: { 
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);
