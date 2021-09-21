import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { Container, Grid } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

import ListCard  from '@containers/portfolio/ListCard';

const useStyles = makeStyles((theme) => ({
  topGrid: {},
  card: {
    marginLeft: '20px',
    marginRight: '20px',
  },
  topGridCard: {
    marginLeft: '20px',
    marginRight: '20px',
  },
}));

const Portfolio = () => {
  const classes = useStyles();

  return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={3} className={classes.card}>
            <Card sx={{ minWidth: 300 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  주문 가능 수량
                </Typography>
                <Typography variant="body2">
                  --
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} className={classes.card}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  총 보유 자산
                </Typography>
                <Typography variant="body2">
                  --원
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} className={classes.card}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  수익률
                </Typography>
                <Typography variant="body2">
                  --%
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div>차트</div>
          </Grid>
          <Grid item xs={4} >
            <ListCard />
          </Grid>
        </Grid>
      </Container>
  );
};
export default Portfolio;

