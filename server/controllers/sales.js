import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res, next) => {
  try {
    const OverallStats = await OverallStat.find();
    res.status(200).json(OverallStats[0]);
  } catch (error) {
    next(error);
  }
};
