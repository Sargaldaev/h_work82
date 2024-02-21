import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';
import * as crypto from 'crypto';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('track_histories');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [Weeknd, FiftyСent] = await Artist.create(
    {
      name: 'The Weeknd',
      image: 'fixtures/TheWeeknd.jpeg',
      description: 'Best Singer...',
    },
    {
      name: '50 Cent',
      image: 'fixtures/50Cent.jpeg',
      description: '50 Cent (Curtis James Jackson) is an American rapper',
    },
  );

  const [AfterHours, Starboy, GetRichOrDieTryin, TheMassacre] = await Album.create(
    {
      name: 'After Hours',
      artist: Weeknd._id,
      image: 'fixtures/WeekndAlbum2020.jpeg',
      releaseYear: 2020,
    },
    {
      name: 'Starboy',
      artist: Weeknd._id,
      image: 'fixtures/WeekndAlbum2016.jpeg',
      releaseYear: 2016,
    },
    {
      name: 'Get Rich or Die Tryin',
      artist: FiftyСent._id,
      image: 'fixtures/50CentAlbum2003.jpeg',
      releaseYear: 2003,
    },
    {
      name: 'The Massacre',
      artist: FiftyСent._id,
      image: 'fixtures/50CentAlbum2005.jpeg',
      releaseYear: 2005,
    },
  );

  await User.create(
    {
      username: 'Max',
      password: '123',
      token: crypto.randomUUID(),
    },
    {
      username: 'Mat',
      password: '153',
      token: crypto.randomUUID(),
    },
  );

  await Track.create(
    {
      name: 'Starboy',
      album: Starboy._id,
      duration: '3:50',
      songNumber: 10,
    },
    {
      name: 'All I Know',
      album: Starboy._id,
      duration: '5:21',
      songNumber: 15,
    },
    {
      name: 'SideWalks',
      album: Starboy._id,
      duration: '3:51',
      songNumber: 3,
    },
    {
      name: 'Six feet Under',
      album: Starboy._id,
      duration: '3:58',
      songNumber: 4,
    },
    {
      name: 'Reminder',
      album: Starboy._id,
      duration: '1:25',
      songNumber: 5,
    },

    {
      name: 'Blinding Lights',
      album: AfterHours._id,
      duration: '3:20',
      songNumber: 1,
    },
    {
      name: 'Too late',
      album: AfterHours._id,
      duration: '4:00',
      songNumber: 2,
    },
    {
      name: 'Save Your Tears',
      album: AfterHours._id,
      duration: '3:36',
      songNumber: 3,
    },
    {
      name: 'In Your Eyes',
      album: AfterHours._id,
      duration: '3:58',
      songNumber: 4,
    },
    {
      name: 'Alone Again',
      album: AfterHours._id,
      duration: '4:10',
      songNumber: 5,
    },

    {
      name: 'Like My Style',
      album: GetRichOrDieTryin._id,
      duration: '3:13',
      songNumber: 1,
    },
    {
      name: 'P.I.M.P',
      album: GetRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 2,
    },
    {
      name: 'Blood Hound',
      album: GetRichOrDieTryin._id,
      duration: '4:00',
      songNumber: 3,
    },
    {
      name: 'In Da Club',
      album: GetRichOrDieTryin._id,
      duration: '3:14',
      songNumber: 4,
    },
    {
      name: 'Dont Push Me',
      album: GetRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 5,
    },

    {
      name: 'Candy Shop',
      album: TheMassacre._id,
      duration: '3:29',
      songNumber: 1,
    },
    {
      name: 'My Toy Soldier',
      album: TheMassacre._id,
      duration: '3:44',
      songNumber: 2,
    },
    {
      name: 'Position Of Power',
      album: TheMassacre._id,
      duration: '3:12',
      songNumber: 3,
    },
    {
      name: 'So Amazing',
      album: TheMassacre._id,
      duration: '3:17',
      songNumber: 4,
    },
    {
      name: 'Gatman and Robbin',
      album: TheMassacre._id,
      duration: '1:25',
      songNumber: 5,
    },
  );
  await db.close();
};

run().catch(console.error);
