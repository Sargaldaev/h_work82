import express from 'express';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Album from '../models/Album';

const artistsRouter = express.Router();

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const saveArtist = new Artist({
      user: user._id,
      name: req.body.name,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
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

artistsRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res) => {
  const user = (req as RequestWithUser).user;

  const userId = user._id.toString();
  const _id = req.params.id;

  try {
    if (user.role === 'admin') {
      const artist = await Artist.findByIdAndDelete(_id);

      const artistId = artist?._id.toString();
      await Album.deleteMany({ artist: artistId });
      if (!artist) {
        return res.status(404).send({ message: 'Artist not found' });
      }
      return res.send({ message: 'Artist deleted' });
    }

    const artistId = await Artist.findOne({ _id });
    const artistUser = artistId?.user.toString();
    const isPublished = artistId?.isPublished;

    if (!artistId) {
      return res.status(404).send({ message: 'Artist not found' });
    }

    if (userId === artistUser && isPublished === false) {
      await Artist.deleteOne({ _id: artistId._id });
      return res.send({ message: 'Artist deleted' });
    } else if (userId !== artistUser || isPublished === true) {
      return res.send({ message: 'Cannot be deleted' });
    }
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
