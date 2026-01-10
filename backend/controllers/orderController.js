// import razorpayInstance from "../config/razorpay.js";
import { Order } from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";

// export const createOrder = async (req, res) => {
//   try {
//     const { products, amount, tax, shipping, currency } = req.body;
//     const options = {
//       amount: Math.round(Number(amount) * 100),
//       currency: currency || "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     // const razorpayOrder = await razorpayInstance.orders.create(options);
//     const newOrder = new Order({
//       user: req.user._id,
//       products,
//       amount,
//       tax,
//       shipping,
//       currency,
//       status: "Pending",
//       //   razorpayOrderId: razorpayOrder.id
//     });

//     await newOrder.save();

//     return res.status(201).json({
//       success: true,
//       // order: razorpayOrder,
//       // dbOrder: newOrder,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


export const createOrder = async (req, res) => {
  try {
    const { products, amount, tax, shipping, currency } = req.body;

    const newOrder = await Order.create({
      user: req.user._id,
      products,
      amount,
      tax,
      shipping,
      currency: currency || "INR",
      status: "Paid",
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpayOrderId,
//       razorpayPaymentId,
//       razorpaySignature,
//       paymentFailed,
//     } = req.body;
//     const userId = req.user._id;
//     if (paymentFailed) {
//       const order = await Order.findOneAndUpdate(
//         {
//           razorpayOrderId,
//         },
//         { status: "Failed" },
//         { new: true }
//       );
//       return res.status(400).json({
//         success: false,
//         message: "Payment Failed",
//         order,
//       });
//     }

//     const sign = razorpayOrderId + "|" + razorpayPaymentId;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (expectedSignature === razorpaySignature) {
//       const order = await Order.findOneAndUpdate(
//         {
//           razorpayOrderId,
//         },
//         { status: "Paid", razorpayPaymentId, razorpaySignature },
//         { new: true }
//       );
//       await Cart.findOneAndUpdate(
//         { userId },
//         { $set: { items: [], totalPrice: 0 } }
//       );
//       return res.status(200).json({
//         success: true,
//         message: "Payment Successful",
//         order,
//       });
//     } else {
//       await Order.findOneAndUpdate(
//         {
//           razorpayOrderId,
//         },
//         { status: "Failed" },
//         { new: true }
//       );
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Signature",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



export const getMyOrder = async (req, res) => {
  try {
    const userId = req.id;
    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      })
      .populate("user", "firstName lastName email");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      })
      .populate("user", "firstName lastName email");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "firstName email")
      .populate("products.productId", "productName productPrice");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSalesData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments([]);
    const totalOrders = await Order.countDocuments({ status: "Paid" });

    const totalSalesAgg = await Order.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalSales = totalSalesAgg[0]?.total || 0;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const salesbyDate = await Order.aggregate([
      { $match: { status: "Paid", createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formattedSales = salesbyDate.map((item) => ({
      date: item._id,
      amount: item.amount,
    }));

    return res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales,
      sales: formattedSales,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
