import * as React from 'react';
import SignUp from '../../components/Auth/SignUp';

export default function SignUpContainer(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <SignUp open={open} handleClose={handleClose} />;
}
