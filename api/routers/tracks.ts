import express from 'express';
import {ITrackCreate} from '../type';
import mongoose from 'mongoose';
import Track from '../models/Track';

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

  const albumId = req.query.album;

  try {
    if (albumId) {
      const tracks = await Track.find({album: albumId});
      return res.send(tracks);
    }
    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    res.send(e);
  }
});


export default tracksRouter;