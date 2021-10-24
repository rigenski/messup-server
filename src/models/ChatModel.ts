import mongoose, { Schema } from 'mongoose';

const Chat = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Chat', Chat);
