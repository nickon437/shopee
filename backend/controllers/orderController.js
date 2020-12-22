import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (cartItems?.length === 0) {
    throw new Error('Items not found');
  }

  // TODO: More validation should be added over here

  const order = await Order.create({
    user: req.user._id,
    orderItems: cartItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  if (!order) {
    res.status(404);
    throw new Error('Fail to create order');
  }

  res.status(201).json(order);
});

export { addOrderItems };
