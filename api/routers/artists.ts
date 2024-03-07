import express from 'express';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import Artist from '../models/Artist';

const artistsRouter = express.Router();

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {

  try {
    const saveArtist = new Artist({
      name: req.body.name,
      description: req.body.description,
      image: req.file ? 'images/' + req.file.filename : null,
    });
    await saveArtist.save();
    res.send(saveArtist);
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
    res.send(artists);
  } catch (e) {
    res.send(e);
  }
});
export default artistsRouter;