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

  const [admin, user] = await User.create(
    {
      username: 'User',
      password: '123',
      displayName: 'Bob',
      avatar: 'fixtures/user.png',
      role: 'user',
      token: crypto.randomUUID(),
    },
    {
      username: 'Admin',
      password: '153',
      displayName: 'Triss',
      avatar: 'fixtures/admin.png',
      role: 'admin',
      token: crypto.randomUUID(),
    },
  );
  const [Weeknd, FiftyСent, V_$_X_VPRiNCE, Ulukmanapo] = await Artist.create(
    {
      user: user._id,
      name: 'The Weeknd',
      image: 'fixtures/weeknd.jpeg',
      description: 'Best Singer...',
      isPublished: true,
    },
    {
      user: user._id,
      name: '50 Cent',
      image: 'fixtures/50-cent.jpg',
      description: '50 Cent (Curtis James Jackson) is an American rapper',
      isPublished: true,
    },
    {
      user: admin._id,
      name: 'V_$_X_VPRiNCE',
      image: 'fixtures/prince.png',
      description: 'V_$_X_VPRiNCE rapper',
      isPublished: true,
    },
    {
      user: admin._id,
      name: 'Ulukmanapo',
      image: 'fixtures/uluk.jpg',
      description: 'Best rapper',
      isPublished: false,
    },
  );

  const [AfterHours, Starboy, GetRichOrDieTryin, TheMassacre, NOVЫЙ, КоdДоступа996] =
    await Album.create(
      {
        user: user._id,
        name: 'After Hours',
        artist: Weeknd._id,
        image: 'fixtures/afterHouse.jpg',
        isPublished: true,
        releaseYear: 2020,
      },
      {
        user: admin._id,
        name: 'Starboy',
        artist: Weeknd._id,
        image: 'fixtures/starboy.jpg',
        isPublished: true,
        releaseYear: 2016,
      },
      {
        user: user._id,
        name: 'Get Rich or Die Tryin',
        artist: FiftyСent._id,
        image: 'fixtures/GetRichorDieTryin.png',
        isPublished: true,
        releaseYear: 2003,
      },
      {
        user: admin._id,
        name: 'The Massacre',
        artist: FiftyСent._id,
        image: 'fixtures/TheMassacre.jpeg',
        isPublished: true,
        releaseYear: 2005,
      },
      {
        user: user._id,
        name: 'NOVЫЙ',
        artist: V_$_X_VPRiNCE._id,
        image: 'fixtures/new.jpg',
        isPublished: false,
        releaseYear: 2022,
      },

      {
        user: admin._id,
        name: 'Код Доступа996',
        artist: Ulukmanapo._id,
        image: 'fixtures/996.jpeg',
        isPublished: true,
        releaseYear: 2020,
      },
    );

  await Track.create(
    {
      user: admin._id,
      name: 'Starboy',
      album: Starboy._id,
      duration: '3:50',
      songNumber: 10,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/34Na4j8AVgA?si=XXEnjbnaNWpsgJCu',
    },
    {
      user: admin._id,
      name: 'All I Know',
      album: Starboy._id,
      duration: '5:21',
      songNumber: 15,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/4iSEJB1KJ0w?si=0qDFemnggJJLTFSd',
    },
    {
      user: user._id,
      name: 'SideWalks',
      album: Starboy._id,
      duration: '3:51',
      songNumber: 3,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/sK-T-cmznY8?si=r_HiQ8X-wB0l5f9m',
    },
    {
      user: user._id,
      name: 'Six feet Under',
      album: Starboy._id,
      duration: '3:58',
      songNumber: 4,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/Yu7kHJqKRW8?si=BeXs440RKHaGC2XF',
    },
    {
      user: user._id,
      name: 'Reminder',
      album: Starboy._id,
      duration: '1:25',
      songNumber: 5,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/JZjAg6fK-BQ?si=CvJ80GowyiR093PZ',
    },

    {
      user: user._id,
      name: 'Blinding Lights',
      album: AfterHours._id,
      isPublished: true,
      duration: '3:20',
      songNumber: 1,
      youTube: 'https://www.youtube.com/embed/4NRXx6U8ABQ?si=r2DJiiRw87ggGGJS',
    },
    {
      user: user._id,
      name: 'Too late',
      album: AfterHours._id,
      duration: '4:00',
      songNumber: 2,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/nl71vFvVOvw?si=ZQcKLG96zhkWyVzA',
    },
    {
      user: user._id,
      name: 'Save Your Tears',
      album: AfterHours._id,
      duration: '3:36',
      songNumber: 3,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/s37x2VSZrLw?si=F5zihiLUZgMuvJ3I',
    },
    {
      user: admin._id,
      name: 'In Your Eyes',
      album: AfterHours._id,
      duration: '3:58',
      youTube: 'https://www.youtube.com/embed/E3QiD99jPAg?si=E2soJECs3wHmS_X-',
      isPublished: true,
      songNumber: 4,
    },
    {
      user: admin._id,
      name: 'Alone Again',
      album: AfterHours._id,
      duration: '4:10',
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/JH398xAYpZA?si=lIpbBbz6OXkTv50J',
      songNumber: 5,
    },

    {
      user: admin._id,
      name: 'Like My Style',
      album: GetRichOrDieTryin._id,
      duration: '3:13',
      songNumber: 1,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/5nyhlO8Rkxk?si=WsAroxpWAs6hhJ58',
    },
    {
      user: admin._id,
      name: 'P.I.M.P',
      album: GetRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 2,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/UDApZhXTpH8?si=EvIUxf4XL6onHo2_',
    },
    {
      user: user._id,
      name: 'Blood Hound',
      album: GetRichOrDieTryin._id,
      duration: '4:00',
      songNumber: 3,
      isPublished: true,
      youTube: 'https://www.youtube.com/embed/NI4unDKISMY?si=BpTHfXW58K2x1p5Q',
    },
    {
      user: user._id,
      name: 'In Da Club',
      album: GetRichOrDieTryin._id,
      duration: '3:14',
      youTube: 'https://www.youtube.com/embed/5qm8PH4xAss?si=KLa45bHsT55kqFeK',
      songNumber: 4,
      isPublished: true,
    },
    {
      user: user._id,
      name: 'Dont Push Me',
      album: GetRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 5,
      youTube: 'https://www.youtube.com/embed/isEgT3FpOYY?si=tuUUxVojcoMF-ZmJ',
      isPublished: true,
    },

    {
      user: admin._id,
      name: 'Candy Shop',
      album: TheMassacre._id,
      duration: '3:29',
      youTube: 'https://www.youtube.com/embed/SRcnnId15BA?si=wGRXEwkHD7C8J7cn',
      songNumber: 1,
      isPublished: true,
    },
    {
      user: admin._id,
      name: 'My Toy Soldier',
      album: TheMassacre._id,
      duration: '3:44',
      songNumber: 2,
      youTube: 'https://www.youtube.com/embed/yYrSo1FE6_Q?si=_giRproI7COhloKw',
      isPublished: true,
    },
    {
      user: admin._id,
      name: 'Position Of Power',
      album: TheMassacre._id,
      duration: '3:12',
      songNumber: 3,
      youTube: 'https://www.youtube.com/embed/5EsL3sTDuQo?si=gPzoyudsr-_nTMly',
      isPublished: true,
    },
    {
      user: admin._id,
      name: 'So Amazing',
      album: TheMassacre._id,
      duration: '3:17',
      songNumber: 4,
      youTube: 'https://www.youtube.com/embed/_8Lxczo13Oo?si=ViB_TpzKF7woY5Di',
      isPublished: true,
    },
    {
      user: admin._id,
      name: 'Gatman and Robbin',
      album: TheMassacre._id,
      duration: '1:25',
      songNumber: 5,
      youTube: 'https://www.youtube.com/embed/vhjEfkrESJc?si=WUxFCRH4OJPJUgde',
      isPublished: true,
    },

    {
      user: user._id,
      name: 'Дом 50',
      album: NOVЫЙ._id,
      duration: '2:39',
      songNumber: 6,
      youTube: 'https://www.youtube.com/embed/TxMWAWjCbbY?si=NC_WBC3GMbpKiwC4',
      isPublished: false,
    },

    {
      user: user._id,
      name: 'Cy',
      album: NOVЫЙ._id,
      duration: '3:05',
      songNumber: 7,
      youTube: 'https://www.youtube.com/embed/yDpPtslNp84?si=gCkAaZVmD63Cy1mO',
      isPublished: false,
    },

    {
      user: user._id,
      name: 'Мурашки',
      album: NOVЫЙ._id,
      duration: '2:54',
      songNumber: 10,
      youTube: 'https://www.youtube.com/embed/ukoW1djy39Y?si=_ap-kRuwdlJp4CUd',
      isPublished: false,
    },

    {
      user: admin._id,
      name: "I'm A Real",
      album: КоdДоступа996._id,
      duration: '4:08',
      songNumber: 8,
      youTube: 'https://www.youtube.com/embed/1NO_SuGG440?si=kibtxo6aBvORndUf',
      isPublished: true,
    },

    {
      user: admin._id,
      name: 'Denzel W',
      album: КоdДоступа996._id,
      duration: '3:25',
      songNumber: 6,
      youTube: 'https://www.youtube.com/embed/uu2vAFlMl7U?si=rkeET0ea-wqaw509',
      isPublished: true,
    },

    {
      user: admin._id,
      name: 'Crocko Laco',
      album: КоdДоступа996._id,
      duration: '3:27',
      songNumber: 2,
      youTube: 'https://www.youtube.com/embed/CI1F2PPAkB4?si=hqEg8JJ0nMszdUEz',
      isPublished: true,
    },
    {
      user: user._id,
      name: 'Город',
      album: КоdДоступа996._id,
      duration: '3:12',
      songNumber: 3,
      youTube: 'https://www.youtube.com/embed/wIWNsqUJmv0?si=_Sqvi-xq006c25eI',
      isPublished: true,
    },

    {
      user: user._id,
      name: 'Не сегодня',
      album: КоdДоступа996._id,
      duration: '2:00',
      songNumber: 4,
      youTube: 'https://www.youtube.com/embed/LPUfWWvP5eA?si=3MqYR3j0eSdyT0Ns',
      isPublished: true,
    },
  );
  await db.close();
};

run().catch(console.error);
