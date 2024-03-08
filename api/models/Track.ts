import mongoose from 'mongoose';
import Album from './Album';
import User from './User';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist',
    },
  },

  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await Album.findById(value),
      message: 'Album does not exist',
    },
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },

  songNumber: {
    type: Number,
    required: true,
  },

  youTube: {
    type: String,
    required: true,
  },

  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;
