import contactModel from "../Models/contactModel.js"
import companyModel from "../Models/contactModel.js"
import dealModel from "../Models/dealModel.js"


export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [contactCount, companyCount, dealCount] = await Promise.all([
      contactModel.countDocuments({ user: userId }),
      companyModel.countDocuments({ user: userId }),
      dealModel.countDocuments({ user: userId }),
    ]);

    res.json({
      contacts: contactCount,
      companies: companyCount,
      deals: dealCount,
      user: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};