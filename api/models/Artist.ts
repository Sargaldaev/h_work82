import mongoose from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist'
    }
  },
  name: {
    type: String,
    required: true,
    unique:true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  isPublished : {
    type:Boolean,
    default:false
  }
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;

