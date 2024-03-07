import express from 'express';
import { imagesUpload } from '../multer';
import mongoose, { HydratedDocument } from 'mongoose';
import Artist from '../models/Artist';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { UserMethods } from '../models/User';

const artistsRouter = express.Router();

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const saveArtist = new Artist({
      name: req.body.name,
      description: req.body.description,
      image: req.file ? 'images/' + req.file.filename : null,
    });
    await saveArtist.save();
    return res.send(saveArtist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      res.status(422).send(e);
    }
    next(e);
  }
});

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    res.send(e);
  }
});

artistsRouter.delete('/:id', auth, permit('admin user'), async (req, res) => {
  const user = (req as RequestWithUser).user;

  const _id = req.params.id;

  try {
    const artistDelete = await Artist.findOneAndDelete({ _id });
    if (user._id === artistDelete?._id) {
      console.log('yes');
    }
    if (!artistDelete) {
      return res.status(404).send({ message: 'Artist not found' });
    }
    return res.send({ message: 'Artist deleted' });
  } catch (e) {
    return res.send(e);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  const _id = req.params.id;

  try {
    const artistId = await Artist.findOne({ _id });

    if (!artistId) {
      return res.status(404).send({ message: 'Artist not found' });
    }
    if (artistId.isPublished === false) {
      await Artist.findOneAndUpdate({ _id }, { isPublished: true });
      return res.send({ message: 'Artist updated' });
    } else {
      await Artist.findOneAndUpdate({ _id }, { isPublished: false });
      return res.send({ message: 'Artist updated' });
    }
  } catch (e) {
    return res.send(e);
  }
});

export default artistsRouter;
