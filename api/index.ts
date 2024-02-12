import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);

const run = async () => {

  await mongoose.connect('mongodb://localhost/song');

  app.listen(port, () => {
    console.log(`server started on ${port} port`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));