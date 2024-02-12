import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())
app.use(express.static('public'));

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