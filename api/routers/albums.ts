import express from 'express';
import {IAlbumCreate} from '../type';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import Album from '../models/Album';

const albumsRouter = express.Router();

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {

  const album: IAlbumCreate = {
    name: req.body.name,
    artist: req.body.artist,
    releaseYear: req.body.releaseYear,
    image: req.file ? 'images/' + req.file.filename : null,
  };

  try {
    const saveAlbum = new Album(album);
    await saveAlbum.save();
    res.send(saveAlbum);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});


albumsRouter.get('/', async (req, res) => {

  const artistId = req.query.artist;

  try {
    if (artistId) {
      const albums = await Album.find({artist: artistId});
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