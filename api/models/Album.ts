import mongoose from 'mongoose';
import Artist from './Artist';
import User from './User';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist',
    },
  },

  artist: {
    type: mongoose.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await Artist.findById(value),
      message: 'Artist does not exist',
    },
  },

  name: {
    type: String,
    required: true,
    unique: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },

  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;
