import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface SignUpProps {
  open: boolean;
  handleClose: () => void;
}

export default function SignUp({ open, handleClose }: SignUpProps): JSX.Element {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>회원 가입</DialogTitle>
        <DialogContent>
          <Box component="form">
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <TextField autoFocus fullWidth required margin="normal" id="email" label="Email Address" type="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth required margin="normal" id="password" label="Password" type="password" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  margin="normal"
                  id="passwordConfirm"
                  label="PasswordConfirm"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth required margin="normal" id="name" label="Name" type="text" />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>가입</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
