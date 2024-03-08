import express from 'express';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Artist from '../models/Artist';
import Track from '../models/Track';

const albumsRouter = express.Router();

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const saveAlbum = new Album({
      user:user._id,
      name: req.body.name,
      artist: req.body.artist,
      releaseYear: req.body.releaseYear,
      image: req.file ?  req.file.filename : null,
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

albumsRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res) => {
  const user = (req as RequestWithUser).user;

  const userId = user._id.toString();
  const _id = req.params.id;

  try {
    if (user.role === 'admin') {
      const albumId = await Album.findByIdAndDelete(_id);
      await Track.deleteMany({ album: albumId });
      if (!albumId) {
        return res.status(404).send({ message: 'Album not found' });
      }
      return res.send({ message: 'Album deleted' });
    }

    const albumId = await Album.findOne({ _id });
    const albumUser = albumId?.user.toString();
    const isPublished = albumId?.isPublished;

    if (!albumId) {
      return res.status(404).send({ message: 'Album not found' });
    }

    if (userId === albumUser && isPublished === false) {
      await Artist.deleteOne({ _id: albumId._id });
      return res.send({ message: 'Album deleted' });
    } else if (userId !== albumUser || isPublished === true) {
      return res.send({ message: 'Cannot be deleted' });
    }
  } catch (e) {
    return res.send(e);
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
