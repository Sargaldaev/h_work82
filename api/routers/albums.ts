import express from 'express';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import Album from '../models/Album';

const albumsRouter = express.Router();

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {

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

export default albumsRouter;
