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

export const OcrDatabyID = async(req,res) => {
  try {
    const data = await ocrData.findById(req.params.id);
    if (!data) {
      return res.status(404).send('Data not found');
    }
    res.json(data);
  } catch (error) {
    res.status(500).send('Server error');
  }
}
