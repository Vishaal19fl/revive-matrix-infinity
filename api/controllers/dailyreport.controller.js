import dailyreport from "../models/dailyreport.model.js";

export const getdailyreport = async (req, res) => {
    try {
      const DailyReport = await dailyreport.find();
      res.json({ DailyReport });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };