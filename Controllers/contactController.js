// controllers/contactController.js
import contactModel from "../Models/contactModel.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({ user: req.user.userId });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  const { name, email, phone, company, tags } = req.body;
  try {
    const newContact = new contactModel({
      name,
      email,
      phone,
      company,
      tags,
      user: req.user.userId,
    });
    console.log(req.user.userId);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
   if (!id) return res.status(400).json({ message: "Contact ID is required" });
  try {
    const updatedContact = await contactModel.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });

    res.json({
        message:"contact updated Successfully",
        updatedContact
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteContact = async (req, res) => {
  try {
    const deleted = await contactModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
