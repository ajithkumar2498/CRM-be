import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  value: Number,
  status: { type: String, enum: ['open', 'won', 'lost'], default: 'open' },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
}, { timestamps: true });

export default mongoose.model('Deal', dealSchema);