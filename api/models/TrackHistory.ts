import mongoose from 'mongoose';
import { Track_history } from '../type';
import User from './User';
import Track from './Track';

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema<Track_history>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist',
    },
  },

  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await Track.findById(value),
      message: 'Track does not exist',
    },
  },

  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
