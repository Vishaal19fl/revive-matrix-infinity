import Order from '../models/order.model.js';


export const createDonation = async (req, res, next) => {
  try {
    const newOrder = new Order({
      donorName: req.body.donorName,
      donorEmail: req.body.donorEmail,
      donationItem: req.body.donationItem,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

export const getDonations = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

export const getUserDonations = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email) {
      console.log('User information not found in request');
      return res.status(400).json({ error: 'User information not found' });
    }
    
    const orders = await Order.find({ donorEmail: req.user.email });
    if (!orders) {
      console.log('No orders found for user:', req.user.email);
      return res.status(404).json({ error: 'No orders found for user' });
    }
    
    res.status(200).json({ orders });
  } catch (err) {
    console.error('Error fetching user donations:', err);
    next(err);
  }
};
