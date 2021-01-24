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

/**
 * @description Update order to paid
 * @route       GET /api/orders/:id/pay
 * @access      Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @description Fetch my orders
 * @route       GET /api/orders/myorders
 * @access      Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

/**
 * @description Fetch all orders
 * @route       GET /api/orders/
 * @access      Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});


export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders };
