import mongoose from 'mongoose';
const { Schema } = mongoose;

const inventoryItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('InventoryItem', inventoryItemSchema)
