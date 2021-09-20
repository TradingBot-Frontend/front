import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { loginActions } from '@redux/reducers/authReducer';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignUpContainer from '@containers/AuthContainer/SignUpContainer';

const useStyles = makeStyles((theme) => ({
  realRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fafafa',
    // backgroundColor: '#A2A5A2',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  appBar: {},
  appBarTitle: {
    flexGrow: 1,
    fontFamily: 'Btro_core',
  },
  card: {},
}));

export default function Login(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const handleClickSignUp = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const user = { email, password };
    console.log(user);
    dispatch(loginActions.request(user));
  };

  return (
    <div className={classes.root}>
      <Box sx={{ display: 'flex', justifyContent: 'cneter', alignItems: 'center' }}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Container component="main" maxWidth="xs">
              <Card sx={{ minWidth: 275 }} className={classes.card}>
                <CardContent>
                  <Typography variant="h4" align="center" color="text.primary" gutterBottom>
                    TradingBot
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                    // className={classes.formBox}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={handleChange}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="로그인 상태 유지할래요"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                      Login
                    </Button>
                  </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button size="large" onClick={handleClickSignUp}>
                    회원가입
                  </Button>
                  <SignUpContainer open={open} handleClose={handleClose} />
                </CardActions>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

//  <AppBar position="static" style={{ background: '#2E3B55' }} className={classes.appBar}>
//   <Toolbar>
//     <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
//       <MenuIcon />
//     </IconButton>
//     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.appBarTitle}>
//       TradingBot
//     </Typography>
//     <Button color="inherit">Login</Button>
//   </Toolbar>
// </AppBar>
