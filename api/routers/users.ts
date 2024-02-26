import express from 'express';
import User from '../models/User';
import mongoose, {Error} from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.generateToken();

    await user.save();
    return res.send(user);
  } catch (error) {

    if (error instanceof Error.ValidationError) {
      return res.status(422).send(error);
    }
    return next(error);
  }
});


usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send({ error: 'Wrong username or password ' });
    }
    if (!req.body.password) {
      return res.status(400).send({ error: 'Wrong username or password' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Wrong username or password ' });
    }

    user.generateToken();
    await user.save();

    res.send(user);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});
export default usersRouter;