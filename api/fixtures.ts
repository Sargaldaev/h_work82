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
    await db.dropCollection('trackhistories');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [weeknd, fiftyCent] = await Artist.create(
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

  const [afterHours, starboy, getRichOrDieTryin, theMassacre] = await Album.create(
    {
      name: 'After Hours',
      artist: weeknd._id,
      image: 'fixtures/WeekndAlbum2020.jpeg',
      releaseYear: 2020,
    },
    {
      name: 'Starboy',
      artist: weeknd._id,
      image: 'fixtures/WeekndAlbum2016.jpeg',
      releaseYear: 2016,
    },
    {
      name: 'Get Rich or Die Tryin',
      artist: fiftyCent._id,
      image: 'fixtures/50CentAlbum2003.jpeg',
      releaseYear: 2003,
    },
    {
      name: 'The Massacre',
      artist: fiftyCent._id,
      image: 'fixtures/50CentAlbum2005.jpeg',
      releaseYear: 2005,
    }
  );

  await User.create(
    {
      username: 'John',
      password: '123',
      token: crypto.randomUUID(),
    },
    {
      username: 'Bob',
      password: '153',
      token: crypto.randomUUID(),
    }
  );

  await Track.create(
    {
      name: 'Starboy',
      album: starboy._id,
      duration: '3:50',
      songNumber: 10,
    },
    {
      name: 'All I Know',
      album: starboy._id,
      duration: '5:21',
      songNumber: 15,
    },
    {
      name: 'SideWalks',
      album: starboy._id,
      duration: '3:51',
      songNumber: 3,
    },
    {
      name: 'Six feet Under',
      album: starboy._id,
      duration: '3:58',
      songNumber: 4,
    },
    {
      name: 'Reminder',
      album: starboy._id,
      duration: '1:25',
      songNumber: 5,
    },

    {
      name: 'Blinding Lights',
      album: afterHours._id,
      duration: '3:20',
      songNumber: 1,
    },
    {
      name: 'Too late',
      album: afterHours._id,
      duration: '4:00',
      songNumber: 2,
    },
    {
      name: 'Save Your Tears',
      album: afterHours._id,
      duration: '3:36',
      songNumber: 3,
    },
    {
      name: 'In Your Eyes',
      album: afterHours._id,
      duration: '3:58',
      songNumber: 4,
    },
    {
      name: 'Alone Again',
      album: afterHours._id,
      duration: '4:10',
      songNumber: 5,
    },

    {
      name: 'Like My Style',
      album: getRichOrDieTryin._id,
      duration: '3:13',
      songNumber: 1,
    },
    {
      name: 'P.I.M.P',
      album: getRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 2,
    },
    {
      name: 'Blood Hound',
      album: getRichOrDieTryin._id,
      duration: '4:00',
      songNumber: 3,
    },
    {
      name: 'In Da Club',
      album: getRichOrDieTryin._id,
      duration: '3:14',
      songNumber: 4,
    },
    {
      name: 'Dont Push Me',
      album: getRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 5,
    },

    {
      name: 'Candy Shop',
      album: theMassacre._id,
      duration: '3:29',
      songNumber: 1,
    },
    {
      name: 'My Toy Soldier',
      album: theMassacre._id,
      duration: '3:44',
      songNumber: 2,
    },
    {
      name: 'Position Of Power',
      album: theMassacre._id,
      duration: '3:12',
      songNumber: 3,
    },
    {
      name: 'So Amazing',
      album: theMassacre._id,
      duration: '3:17',
      songNumber: 4,
    },
    {
      name: 'Gatman and Robbin',
      album: theMassacre._id,
      duration: '1:25',
      songNumber: 5,
    }
  );

  await db.close();
};

run().catch(console.error);
