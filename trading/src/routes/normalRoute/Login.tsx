import * as React from 'react';
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
import SignUp from '../../components/Auth/SignUp';

export default function Login(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClickSignUp = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'cneter', alignItems: 'center' }}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Container component="main" maxWidth="xs">
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h4" align="center" color="text.primary" gutterBottom>
                    TradingBot
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={() => {
                      return 0;
                    }}
                    noValidate
                    sx={{ mt: 1 }}
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
                  <SignUp open={open} handleClose={handleClose} />
                </CardActions>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
