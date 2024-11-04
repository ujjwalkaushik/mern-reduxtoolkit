import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";
import Image from "../models/Image.js";

import { Parser } from "json2csv";
import mongoose from "mongoose";

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

export const postImageUpload = async (req, res, next) => {
  try {
    const { userId, name, image } = req.body;

    const matches = image.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: "Invalid image format" });
    }

    const contentType = matches[1];
    const data = Buffer.from(matches[2], "base64");

    // Using findOneAndUpdate to check if a document with the userId exists and update it
    const updatedImage = await Image.findOneAndUpdate(
      { userId }, // Search condition
      {
        userId,
        name,
        img: { data, contentType },
      },
      {
        new: true, // Return the updated document
        upsert: true, // If no document found, create a new one
      }
    );

    res.status(200).json({
      message: "Image uploaded successfully",
      imageId: updatedImage._id,
    });
  } catch (error) {
    next(error);
  }
};

export const getImage = async (req, res, next) => {
  try {
    const image = await Image.findOne({
      userId: new mongoose.Types.ObjectId(req.params.userId),
    });
    if (!image) return res.status(404).json({ error: "Image not found" });

    res.contentType(image.img.contentType);
    res.send(image.img.data);
  } catch (error) {
    next(error);
  }
};
