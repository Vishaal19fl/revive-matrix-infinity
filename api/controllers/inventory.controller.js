import InventoryItem from "../models/inventory.model.js";

// Controller function to update inventory
export const updateInventory = async (req, res) => {
  const { itemName, quantity } = req.body;

  try {
    let inventoryItem = await InventoryItem.findOne({ itemName });

    if (inventoryItem) {
      // Item exists, update count
      inventoryItem.count += quantity;
    } else {
      // Item doesn't exist, create new entry
      inventoryItem = new InventoryItem({ itemName, count: quantity });
    }

    await inventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to decrease item count
export const decreaseItemCount = async (req, res) => {
  const { itemName, quantity } = req.body;

  try {
    let inventoryItem = await InventoryItem.findOne({ itemName });

    if (inventoryItem) {
      // Ensure quantity does not go below zero
      inventoryItem.count = Math.max(0, inventoryItem.count - 1);
      await inventoryItem.save();
      res.status(201).json(inventoryItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const increaseItemCount = async (req, res) => {
  const { itemName, quantity } = req.body;

  try {
    let inventoryItem = await InventoryItem.findOne({ itemName });

    if (inventoryItem) {
      // Ensure quantity does not go below zero
      inventoryItem.count = Math.max(0, inventoryItem.count + 1);
      await inventoryItem.save();
      res.status(201).json(inventoryItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to fetch inventory
export const getInventory = async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json({ inventoryItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
