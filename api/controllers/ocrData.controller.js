import OcrData from "../models/ocrData.model.js";

export const getOcrData = async (req, res) => {
  try {
    const ocrData = await OcrData.find();
    res.json({ ocrData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
