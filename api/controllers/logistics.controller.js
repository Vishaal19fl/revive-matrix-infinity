import Logistics from "../models/logistics.model.js";

export const getLogistics = async (req, res) => {
  try {
    const logistics = await Logistics.find();
    res.status(200).json(logistics);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createLogistics = async (req, res) => {
  try {
    const newLogistics = new Logistics(req.body); // Create a new instance of Logistics with request body
    const savedLogistics = await newLogistics.save(); // Save the new logistics entry to the database
    res.status(201).json(savedLogistics); // Respond with the saved logistics entry
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updatePickedUp = async (req, res) => {
  try {
    const updatedLogistics = await Logistics.findByIdAndUpdate(
      req.params.id,
      { pickedUp: true, delivered: false },
      { new: true }
    );
    res.status(200).json(updatedLogistics);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateDelivered = async (req, res) => {
  try {
    const updatedLogistics = await Logistics.findByIdAndUpdate(
      req.params.id,
      { delivered: true },
      { new: true }
    );
    res.status(200).json(updatedLogistics);
  } catch (err) {
    res.status(500).json(err);
  }
};
