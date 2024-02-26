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

  const [Weeknd, FiftyСent, V_$_X_VPRiNCE] = await Artist.create(
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
    {
      name: 'V_$_X_VPRiNCE',
      image: 'fixtures/Prince.jpg',
      description: 'V_$_X_VPRiNCE rapper',
    },
  );

  const [AfterHours, Starboy, GetRichOrDieTryin, TheMassacre, NOVЫЙ] = await Album.create(
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
    {
      name: 'NOVЫЙ',
      artist: V_$_X_VPRiNCE._id,
      image: 'fixtures/NOVЫЙ.jpg',
      releaseYear: 2022,
    },
  );

  await User.create(
    {
      username: 'User',
      password: '123',
      token: crypto.randomUUID(),
    },
    {
      username: 'Admin',
      password: '153',
      token: crypto.randomUUID()
    },
  );

  await Track.create(
    {
      name: 'Starboy',
      album: Starboy._id,
      duration: '3:50',
      songNumber: 10,
      youTube: 'https://www.youtube.com/embed/34Na4j8AVgA?si=XXEnjbnaNWpsgJCu',
    },
    {
      name: 'All I Know',
      album: Starboy._id,
      duration: '5:21',
      songNumber: 15,
      youTube: 'https://www.youtube.com/embed/4iSEJB1KJ0w?si=0qDFemnggJJLTFSd',
    },
    {
      name: 'SideWalks',
      album: Starboy._id,
      duration: '3:51',
      songNumber: 3,
      youTube: 'https://www.youtube.com/embed/sK-T-cmznY8?si=r_HiQ8X-wB0l5f9m',
    },
    {
      name: 'Six feet Under',
      album: Starboy._id,
      duration: '3:58',
      songNumber: 4,
      youTube: 'https://www.youtube.com/embed/Yu7kHJqKRW8?si=BeXs440RKHaGC2XF',
    },
    {
      name: 'Reminder',
      album: Starboy._id,
      duration: '1:25',
      songNumber: 5,
      youTube: 'https://www.youtube.com/embed/JZjAg6fK-BQ?si=CvJ80GowyiR093PZ',
    },

    {
      name: 'Blinding Lights',
      album: AfterHours._id,
      duration: '3:20',
      songNumber: 1,
      youTube: 'https://www.youtube.com/embed/4NRXx6U8ABQ?si=r2DJiiRw87ggGGJS',
    },
    {
      name: 'Too late',
      album: AfterHours._id,
      duration: '4:00',
      songNumber: 2,
      youTube: 'https://www.youtube.com/embed/nl71vFvVOvw?si=ZQcKLG96zhkWyVzA',
    },
    {
      name: 'Save Your Tears',
      album: AfterHours._id,
      duration: '3:36',
      songNumber: 3,
      youTube: 'https://www.youtube.com/embed/s37x2VSZrLw?si=F5zihiLUZgMuvJ3I',
    },
    {
      name: 'In Your Eyes',
      album: AfterHours._id,
      duration: '3:58',
      youTube: 'https://www.youtube.com/embed/E3QiD99jPAg?si=E2soJECs3wHmS_X-',
      songNumber: 4,
    },
    {
      name: 'Alone Again',
      album: AfterHours._id,
      duration: '4:10',
      youTube: 'https://www.youtube.com/embed/JH398xAYpZA?si=lIpbBbz6OXkTv50J',
      songNumber: 5,
    },

    {
      name: 'Like My Style',
      album: GetRichOrDieTryin._id,
      duration: '3:13',
      songNumber: 1,
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
    },
    {
      name: 'P.I.M.P',
      album: GetRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 2,
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
    },
    {
      name: 'Blood Hound',
      album: GetRichOrDieTryin._id,
      duration: '4:00',
      songNumber: 3,
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
    },
    {
      name: 'In Da Club',
      album: GetRichOrDieTryin._id,
      duration: '3:14',
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
      songNumber: 4,
    },
    {
      name: 'Dont Push Me',
      album: GetRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 5,
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
    },

    {
      name: 'Candy Shop',
      album: TheMassacre._id,
      duration: '3:29',
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
      songNumber: 1,
    },
    {
      name: 'My Toy Soldier',
      album: TheMassacre._id,
      duration: '3:44',
      songNumber: 2,
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
    },
    {
      name: 'Position Of Power',
      album: TheMassacre._id,
      duration: '3:12',
      songNumber: 3,
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
    },
    {
      name: 'So Amazing',
      album: TheMassacre._id,
      duration: '3:17',
      songNumber: 4,
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
    },
    {
      name: 'Gatman and Robbin',
      album: TheMassacre._id,
      duration: '1:25',
      songNumber: 5,
      youTube: 'https://www.youtube.com/embed/oW3x-hmg3Qc?si=V1fMb43WNThjmgUO',
    },

    {
      name: 'Дом 50',
      album: NOVЫЙ._id,
      duration: '2:39',
      songNumber: 6,
      youTube: 'https://www.youtube.com/embed/TxMWAWjCbbY?si=NC_WBC3GMbpKiwC4',
    },

    {
      name: 'Cy',
      album: NOVЫЙ._id,
      duration: '3:05',
      songNumber: 7,
      youTube: 'https://www.youtube.com/embed/yDpPtslNp84?si=gCkAaZVmD63Cy1mO',
    },

    {
      name: 'Мурашки',
      album: NOVЫЙ._id,
      duration: '2:54',
      songNumber: 10,
      youTube: 'https://www.youtube.com/embed/ukoW1djy39Y?si=_ap-kRuwdlJp4CUd',
    },
  );
  await db.close();
};

run().catch(console.error);
