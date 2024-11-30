import mongoose from "mongoose";
const { Schema } = mongoose;

const LoRaDataSchema = new Schema(
  {
    A: {
      type: String,
      
    },
    N: {
      type: String,
     
    },
    Add: {
      type: String,
      
    },
    Itm: {
        type: String,
        
    },
    Qty: {
        type: Number,
       
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lora", LoRaDataSchema, "lora");
