import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const saveTrack = new Track({
      user: user._id,
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      songNumber: req.body.songNumber,
      youTube: req.body.youTube,
    });
    await saveTrack.save();
    res.send(saveTrack);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      res.status(422).send(e);
    }
    next(e);
  }
});

tracksRouter.get('/', async (req, res) => {
  const album = req.query.album;

  try {
    if (album) {
      const tracks = await Track.find({ album }).sort({ songNumber: 1 });
      return res.send(tracks);
    }
    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    res.send(e);
  }
});

tracksRouter.get('/:id', async (req, res) => {
  const artist = req.params.id;
  try {
    const album = await Album.find({ artist });
    if (album.length === 0) {
      return res.send('not found');
    }
    const track = await Track.find({ album });
    return res.send(track);
  } catch (e) {
    res.send(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res) => {
  const user = (req as RequestWithUser).user;

  const userId = user._id.toString();
  const _id = req.params.id;

  try {
    if (user.role === 'admin') {
      const track = await Track.findByIdAndDelete(_id);
      if (!track) {
        return res.status(404).send({ message: 'Track not found' });
      }
      return res.send({ message: 'Track deleted' });
    }

    const trackId = await Track.findOne({ _id });
    const trackUser = trackId?.user.toString();
    const isPublished = trackId?.isPublished;

    if (!trackId) {
      return res.status(404).send({ message: 'Track not found' });
    }

    if (userId === trackUser && isPublished === false) {
      await Track.deleteOne({ _id: trackId._id });
      return res.send({ message: 'Track deleted' });
    } else if (userId !== trackUser || isPublished === true) {
      return res.send({ message: 'Cannot be deleted' });
    }
  } catch (e) {
    return res.send(e);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  const _id = req.params.id;

  try {
    const trackId = await Track.findOne({ _id });

    if (!trackId) {
      return res.status(404).send({ message: 'Track not found' });
    }
    if (trackId.isPublished === false) {
      await Track.findOneAndUpdate({ _id }, { isPublished: true });
      return res.send({ message: 'Track updated' });
    } else {
      await Track.findOneAndUpdate({ _id }, { isPublished: false });
      return res.send({ message: 'Track updated' });
    }
  } catch (e) {
    return res.send(e);
  }
});

export default tracksRouter;
