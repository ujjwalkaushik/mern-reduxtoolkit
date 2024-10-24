import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnit: Number,
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnits: Number
        }
    ],
    dailyData: [
        {
            date: String,
            totalSales: Number,
            totalunits: Number
        }
    ],
    salesByCategory: {
        type: Map,
        of: Number
    }
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);

export default OverallStat;