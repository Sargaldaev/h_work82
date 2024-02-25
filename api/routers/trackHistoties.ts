import express from 'express';
import { Error } from 'mongoose';
import {
  AlbumsPostMutation,
  Track_history,
  TrackHistoryMutation,
  TrackHistoryMutationOne,
} from '../type';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';
import Album from '../models/Album';

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const trackHistory: Track_history = {
      user: user._id,
      track: req.body.track,
      datetime: new Date(),
    };

    const saveTrackHistory = new TrackHistory(trackHistory);

    await saveTrackHistory.save();
    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).send(e);
    }
    return next(e);
  }
});

trackHistoriesRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const trackHistory = (await TrackHistory.find({ user: user._id })
      .sort({ datetime: -1 })
      .populate('track')) as TrackHistoryMutationOne[];

    const newTrackHistory: TrackHistoryMutation[] = [];

    await Promise.all(
      trackHistory.map(async (item) => {
        const album = (await Album.findOne({ _id: item.track.album }).populate(
          'artist',
        )) as AlbumsPostMutation;
        newTrackHistory.push({
          _id: item._id,
          datetime: item.datetime,
          track: {
            name: item.track.name,
            album: {
              artist: album.artist,
            },
          },
        });
      }),
    );
    res.send(newTrackHistory);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});

export default trackHistoriesRouter;
