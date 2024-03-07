import express from 'express';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import Album from '../models/Album';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const albumsRouter = express.Router();

albumsRouter.post('/',auth, imagesUpload.single('image'), async (req, res, next) => {

  try {
    const saveAlbum = new Album({
      name: req.body.name,
      artist: req.body.artist,
      releaseYear: req.body.releaseYear,
      image: req.file ? 'images/' + req.file.filename : null,
    });
    await saveAlbum.save();
    res.send(saveAlbum);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      res.status(422).send(e);
    }
    next(e);
  }
});

albumsRouter.get('/', async (req, res) => {
  const artist = req.query.artist;

  try {
    if (artist) {
      const albums = await Album.find({ artist })
        .sort({ releaseYear: -1 })
        .populate('artist', 'name');
      return res.send(albums);
    }
    const albums = await Album.find();
    return res.send(albums);
  } catch (e) {
    res.send(e);
  }
});

albumsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const album = await Album.findById(id).populate('artist');
    return res.send(album);
  } catch (e) {
    res.send(e);
  }
});

albumsRouter.delete('/:id', auth, permit('admin'),async (req, res) => {
  const _id = req.params.id;

  try {
    const albumDelete = await Album.findByIdAndDelete(_id);
    if (!albumDelete) {
      return res.status(404).send({ message: 'Album not found' });

    }
    return res.send({ message: 'Album deleted' });
  } catch (e) {
    return  res.send(e);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  const _id = req.params.id;

  try {
    const albumId = await Album.findOne({ _id });

    if (!albumId) {
      return res.status(404).send({ message: 'Album not found' });
    }
    if (albumId.isPublished === false) {
      await Album.findOneAndUpdate({ _id }, { isPublished: true });
      return res.send({ message: 'Album updated' });
    } else {
      await Album.findOneAndUpdate({ _id }, { isPublished: false });
      return res.send({ message: 'Album updated' });
    }
  } catch (e) {
    return res.send(e);
  }
});

export default albumsRouter;
