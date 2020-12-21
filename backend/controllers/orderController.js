import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shipppingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems?.length === 0) {
    throw new Error('Items not found');
  }

  // TODO: More validation should be added over here

  const order = Order.create({
    user: req.user._id,
    orderItems,
    shipppingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json(order);
});

export { addOrderItems };