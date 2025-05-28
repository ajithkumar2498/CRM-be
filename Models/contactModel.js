import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Contact name is required"],
  },
  email: {
    type: String,
    required: [true, "Contact email is required"],
  },
  phone: {
    type: String,
  },
  company: {
    type: String,
  },
  tags: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, 
  },
}, {
  timestamps: true,
});

export default mongoose.model("Contact", contactSchema);
