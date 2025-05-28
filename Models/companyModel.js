import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
  },
  industry: String,
  address: String,
  phone: String,
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: "companies",
  versionKey: false,
});

export default mongoose.model("company", companySchema);
