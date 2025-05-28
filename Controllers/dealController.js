import dealModel from "../Models/dealModel.js";

export const getDeals = async (req, res) => {
  try {
    const { status, contact } = req.query;
    const filter = { user: req.user.userId };

    if (status) filter.status = status;
    if (contact) filter.contact = contact;

    const deals = await dealModel.find(filter).populate("contact");
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDeal = async (req, res) => {
  try {
    const deal = await dealModel.create({ ...req.body, user: req.user.userId });
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDeal = async (req, res) => {
  try {
    const updatedDeal = await dealModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res
      .status(200)
      .json({ message: "deals updated successfully", updatedDeal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDeal = async (req, res) => {
  try {
    const deleted = await dealModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.json({ message: "Deal deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
