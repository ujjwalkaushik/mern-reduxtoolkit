import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";

import { Parser } from "json2csv";

export const downloadUserStats = async (req, res, next) => {
  try {
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    const overallStat = await OverallStat.find({
      year: currentYear,
      "monthlyData.month": currentMonth,
      "dailyData.date": currentDay,
    }).lean();

    const fields = ["totalCustomers", "yearlySalesTotal", "year"];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(overallStat);
    // Set headers to download as CSV file
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="report.csv"');

    // Send the CSV data
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ ceatedOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todaysStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todaysStats,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};
