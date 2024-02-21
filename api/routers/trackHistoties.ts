import express from 'express';
import {Error} from 'mongoose';
import {Track_history} from '../type';
import TrackHistory from '../models/TrackHistory';
import auth, {RequestWithUser} from '../middleware/auth';

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const trackHistory: Track_history = {
      user: user._id,
      track: req.body.track,
      datetime: new Date()
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

export default trackHistoriesRouter;