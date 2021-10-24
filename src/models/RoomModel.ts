import mongoose, { Schema } from 'mongoose';

const Room = new Schema(
  {
    code: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Room', Room);
