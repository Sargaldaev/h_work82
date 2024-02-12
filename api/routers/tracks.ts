import express from 'express';
import {ITrackCreate} from '../type';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res, next) => {

  const track: ITrackCreate = {
    name: req.body.name,
    album: req.body.album,
    duration: req.body.duration,
  };

  try {
    const saveTrack = new Track(track);
    await saveTrack.save();
    res.send(saveTrack);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});


tracksRouter.get('/', async (req, res) => {

  const album = req.query.album;

  try {
    if (album) {
      const tracks = await Track.find({album});
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
    const album = await Album.find({artist});
    if (album.length === 0) {
      return res.send('not found')
    }
    const track = await Track.find({album});
    return res.send(track);

  } catch (e) {
    res.send(e);
  }
});


export default tracksRouter;