import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
import Offer from "../models/offerModel.js";

export const getAdminDashboardData = async (req, res) => {
    try {
        // Calculate total revenue from orders
        const totalRevenueData = await orderModel.aggregate([
            {  $match: { status: "Delivered" } }, 
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
        ]);
        const totalRevenue = totalRevenueData.length > 0 ? totalRevenueData[0].totalRevenue : 0;

        // Count total foods
        const totalFoods = await foodModel.countDocuments();

        // Count total offers
        const totalOffers = await Offer.countDocuments();

        res.json({
            success: true,
            totalRevenue,
            totalFoods,
            totalOffers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching dashboard data" });
    }
};
