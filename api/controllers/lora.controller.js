import Lora from "../models/lora.model.js";

export const getLora = async (req, res) => {
    try {
      const loradata = await Lora.find();
      res.json({ loradata });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };
  