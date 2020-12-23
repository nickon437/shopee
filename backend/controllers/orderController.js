import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

/**
 * @description Create order itemss
 * @route       POST /api/orders
 * @access      Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
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
    itemsPrice,
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

/**
 * @description Fetch order by id
 * @route       GET /api/orders/:id
 * @access      Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { addOrderItems, getOrderById };
