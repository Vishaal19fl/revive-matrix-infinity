import TotalReport from "../models/totalreport.model.js"

export const getSpecialReports = async (req, res) => {
    try {
      const reports = await TotalReport.find();
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: "Error fetching special reports", error });
    }
  };