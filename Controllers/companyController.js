import companyModel from "../Models/companyModel.js"

export const getCompanies = async (req, res) => {
  try {
    const companies = await companyModel.find({ user: req.user.userId });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCompany = async (req, res) => {
  try {
    const company = new companyModel({
      ...req.body,
      user: req.user.userId,
    });
    const saved = await company.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const updated = await companyModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({
        message:`company name: ${updated.name} is updated`,
        updated});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const deleted = await companyModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
