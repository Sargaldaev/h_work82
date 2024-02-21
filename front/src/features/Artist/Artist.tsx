import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { fetchData } from '../../store/artist/artistThunk.ts';

const Artist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {artists} = useSelector((state: RootState) => state.artist);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <>
      <Box>

        <Box
          display={'flex'}
          sx={{gap: '10px'}}
        >
          {

            artists.map(artist => {
              return (
                <Box
                  key={artist._id}
                >
                  <Card
                    sx={{width: 345}}
                  >
                    <CardMedia
                      sx={{height: 240}}
                      image={`http://localhost:8000/${artist.image}`} // ToDo написать проверку на то что изобр не будет
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {artist.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Box>
              );
            })
          }
        </Box>

      </Box>
    </>
  );
};

export default Artist;
