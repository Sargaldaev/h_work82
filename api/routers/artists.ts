import express from 'express';
import {IArtistCreate} from '../type';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import Artist from '../models/Artist';

const artistsRouter = express.Router();

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {

  const artist: IArtistCreate = {
    name: req.body.name,
    description: req.body.description,
    image: req.file ? 'images/' + req.file.filename : null,
  };

  try {
    const saveArtist = new Artist(artist);
    await saveArtist.save();
    res.send(saveArtist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});


artistsRouter.get('/', async (req, res) => {

  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch (e) {
    res.send(e);
  }
});
export default artistsRouter;