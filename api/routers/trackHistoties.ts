import express from 'express';
import User from '../models/User';
import {Error} from 'mongoose';
import {Track_history} from '../type';
import TrackHistory from '../models/TrackHistory';

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', async (req, res, next) => {
  try {

    const token = req.get('Authorization');

    if (!token) {
      return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Unauthorized'});
    }


    const trackHistory: Track_history = {
      user: user._id,
      track: req.body.track,
      datetime: new Date(),
    };

    const saveTrackHistory = await new TrackHistory(trackHistory);

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