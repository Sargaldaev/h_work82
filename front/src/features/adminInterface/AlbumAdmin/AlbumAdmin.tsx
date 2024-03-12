import { Box, CircularProgress, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { useEffect } from 'react';
import { deleteAlbum, fetchDataAlbum, publishedAlbum } from '../../../store/album/albumThunk.ts';
import { Link, useParams } from 'react-router-dom';

const AlbumAdmin = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const { albums, fetchLoad, publishedAlbumLoad, deleteAlbumLoad } = useSelector(
    (state: RootState) => state.album,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDataAlbum(id));
    }
  }, [dispatch, id]);

  const deleteAlbumId = async (Id: string) => {
    await dispatch(deleteAlbum(Id));
    await dispatch(fetchDataAlbum(id));
  };
  const togglePublishedAlbum = async (Id: string) => {
    await dispatch(publishedAlbum(Id));
    await dispatch(fetchDataAlbum(id));
  };
  return (
    <>
      <Box>
        <Button component={Link} to={`/`} size="small">
          Back
        </Button>
        {albums.length ? (
          <p>
            <b>Artist: </b>
            {albums[0].artist.name}
          </p>
        ) : null}
        <Box display={'flex'} flexWrap={'wrap'} sx={{ gap: '10px' }}>
          {fetchLoad ? (
            <CircularProgress />
          ) : (
            albums.map((album) => {
              return !album.isPublished ? (
                <Box key={album._id} position={'relative'}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      fontWeight: 1000,
                      background: 'black',
                      color: 'red',
                    }}
                  >
                    Not published
                  </Box>
                  <Card sx={{ width: 345 }}>
                    {album.image ? (
                      <CardMedia
                        sx={{ height: 350 }}
                        image={`http://localhost:8000/${album.image}`}
                      />
                    ) : (
                      <CardMedia sx={{ height: 350 }} image={',ll'} />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {album.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {album.releaseYear} years
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button component={Link} to={`/albums/${album._id}`} size="small">
                        Learn More
                      </Button>
                    </CardActions>
                    {album.isPublished ? (
                      <>
                        <Button
                          className="btn ms-1 btn-primary "
                          disabled={deleteAlbumLoad === album._id}
                          onClick={() => deleteAlbumId(album._id)}
                        >
                          {deleteAlbumLoad === album._id ? <CircularProgress /> : 'Delete'}
                        </Button>
                        <Button
                          className="btn ms-1 btn-primary "
                          onClick={() => togglePublishedAlbum(album._id)}
                        >
                          {publishedAlbumLoad === album._id ? <CircularProgress /> : 'UnPublish'}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="btn ms-1 btn-primary "
                          disabled={deleteAlbumLoad === album._id}
                          onClick={() => deleteAlbumId(album._id)}
                        >
                          {deleteAlbumLoad === album._id ? <CircularProgress /> : 'Delete'}
                        </Button>
                        <Button
                          className="btn ms-1 btn-primary "
                          onClick={() => togglePublishedAlbum(album._id)}
                        >
                          {publishedAlbumLoad === album._id ? <CircularProgress /> : 'UnPublish'}
                        </Button>
                      </>
                    )}
                  </Card>
                </Box>
              ) : (
                <Box key={album._id}>
                  <Card sx={{ width: 345 }}>
                    {album.image ? (
                      <CardMedia
                        sx={{ height: 350 }}
                        image={`http://localhost:8000/${album.image}`}
                      />
                    ) : (
                      <CardMedia sx={{ height: 350 }} image={',ll'} />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {album.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {album.releaseYear} years
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button component={Link} to={`/albums/${album._id}`} size="small">
                        Learn More
                      </Button>
                    </CardActions>
                    {album.isPublished ? (
                      <>
                        <Button
                          className="btn ms-1 btn-primary "
                          disabled={deleteAlbumLoad === album._id}
                          onClick={() => deleteAlbumId(album._id)}
                        >
                          {deleteAlbumLoad === album._id ? <CircularProgress /> : 'Delete'}
                        </Button>
                        <Button
                          className="btn ms-1 btn-primary "
                          onClick={() => togglePublishedAlbum(album._id)}
                        >
                          {publishedAlbumLoad === album._id ? <CircularProgress /> : 'UnPublish'}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="btn ms-1 btn-primary "
                          disabled={deleteAlbumLoad === album._id}
                          onClick={() => deleteAlbumId(album._id)}
                        >
                          {deleteAlbumLoad === album._id ? <CircularProgress /> : 'Delete'}
                        </Button>
                        <Button
                          className="btn ms-1 btn-primary "
                          onClick={() => togglePublishedAlbum(album._id)}
                        >
                          {publishedAlbumLoad === album._id ? <CircularProgress /> : 'UnPublish'}
                        </Button>
                      </>
                    )}
                  </Card>
                </Box>
              );
            })
          )}
        </Box>
      </Box>
    </>
  );
};

export default AlbumAdmin;
