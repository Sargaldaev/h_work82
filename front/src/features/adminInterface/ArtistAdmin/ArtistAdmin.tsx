import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { deleteArtist, fetchData, publishedArtist } from '../../../store/artist/artistThunk';
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const ArtistAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {artists, fetchLoad, publishedArtistLoad, deleteLoad} = useSelector(
    (state: RootState) => state.artist,
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const deleteArtistId = async (id: string) => {
    await dispatch(deleteArtist(id));
    await dispatch(fetchData());
  };
  const togglePublishedArtist = async (id: string) => {
    await dispatch(publishedArtist(id));
    await dispatch(fetchData());
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {fetchLoad ? (
        <CircularProgress/>
      ) : (
        artists.map((artist) => (
          !artist.isPublished ? (
              <Box
                key={artist._id}
                display={'flex'}
                position={'relative'}
              >
                <Box sx={{position: 'absolute', top: 20, left: 20, fontWeight:1000,background:'black', color: 'red'}}>
                  Not published
                </Box>

                <Box component="div" style={{display: 'inline-block', margin: '20px'}}>
                  <Card sx={{width: 280, mb: 10, backgroundColor: '#00796B'}}>
                    <CardMedia
                      component="img"
                      sx={{height: 250}}
                      image={'http://localhost:8000' + '/' + artist.image}
                    />
                    <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <Typography gutterBottom variant="h5" component="div">
                        {artist.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                      <Button component={NavLink} to={`/artist/${artist._id}`} color="inherit">
                        watch the album
                      </Button>
                    </CardActions>
                    {artist.isPublished ? (
                      <>
                        <Button
                          className="btn ms-1 btn-primary "
                          disabled={deleteLoad === artist._id}
                          onClick={() => deleteArtistId(artist._id)}
                        >
                          {deleteLoad === artist._id ? <CircularProgress/> : 'Delete'}
                        </Button>
                        <Button
                          className="btn ms-1 btn-primary "
                          onClick={() => togglePublishedArtist(artist._id)}
                        >
                          {publishedArtistLoad === artist._id ? <CircularProgress/> : 'UnPublish'}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="btn ms-1 btn-primary "
                          disabled={deleteLoad === artist._id}
                          onClick={() => deleteArtistId(artist._id)}
                        >
                          {deleteLoad === artist._id ? <CircularProgress/> : 'Delete'}
                        </Button>
                        <Button
                          className="btn ms-1 btn-primary "
                          onClick={() => togglePublishedArtist(artist._id)}
                        >
                          {publishedArtistLoad === artist._id ? <CircularProgress/> : 'Publish'}
                        </Button>
                      </>
                    )
                    }
                  </Card>
                </Box>
              </Box>
            ) :
            <Box
              display={'flex'}
              key={artist._id}
            >
              <Box component="div" style={{display:'flex', margin: '20px'}} key={artist._id}>
                <Card sx={{width: 280, mb: 10, backgroundColor: '#00796B'}}>
                  <CardMedia
                    component="img"
                    sx={{height: 250}}
                    image={'http://localhost:8000' + '/' + artist.image}
                  />
                  <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h5" component="div">
                      {artist.name}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button component={NavLink} to={`/artist/${artist._id}`} color="inherit">
                      watch the album
                    </Button>
                  </CardActions>
                  {artist.isPublished ? (
                    <>
                      <Button
                        className="btn ms-1 btn-primary "
                        disabled={deleteLoad === artist._id}
                        onClick={() => deleteArtistId(artist._id)}
                      >
                        {deleteLoad === artist._id ? <CircularProgress/> : 'Delete'}
                      </Button>
                      <Button
                        className="btn ms-1 btn-primary "
                        onClick={() => togglePublishedArtist(artist._id)}
                      >
                        {publishedArtistLoad === artist._id ? <CircularProgress/> : 'UnPublish'}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="btn ms-1 btn-primary "
                        disabled={deleteLoad === artist._id}
                        onClick={() => deleteArtistId(artist._id)}
                      >
                        {deleteLoad === artist._id ? <CircularProgress/> : 'Delete'}
                      </Button>
                      <Button
                        className="btn ms-1 btn-primary "
                        onClick={() => togglePublishedArtist(artist._id)}
                      >
                        {publishedArtistLoad === artist._id ? <CircularProgress/> : 'Publish'}
                      </Button>
                    </>
                  )
                  }
                </Card>
              </Box>
            </Box>
        ))
      )}
    </div>
  );
};

export default ArtistAdmin;
