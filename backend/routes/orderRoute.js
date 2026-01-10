import express from "express";
// import { getSalesData } from "../controllers/orderController";
// import { getAllOrders, getUserOrders } from "../controllers/orderController";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createOrder, getMyOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/verify-payment", isAuthenticated);
router.get("/myorder", isAuthenticated, getMyOrder)
// router.get("/all", isAuthenticated, isAdmin, getAllOrders);
// router.get("/user-order/:userId", isAuthenticated,isAdmin, getUserOrders);
// router.get("/sales", isAuthenticated,isAdmin, getSalesData);

export default router;
