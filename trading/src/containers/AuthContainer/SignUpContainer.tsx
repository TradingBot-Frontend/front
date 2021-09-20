import { signupActions } from '@redux/reducers/authReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SignUp from '../../components/Auth/SignUp';

export interface SignUpContainerProps {
  open: boolean;
  // handleClose: (v: boolean | ((pv: boolean) => boolean)) => void;
  handleClose: () => void;
}

export default function SignUpContainer({ open, handleClose }: SignUpContainerProps): JSX.Element {
  const [form, setValues] = useState({
    email: '',
    password: '',
    username: '',
  });
  const dispatch = useDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = () => {
    const { email, password, username } = form;
    const userInfo = { email, password, username };
    dispatch(signupActions.request(userInfo));
  };

  useEffect(() => {
    console.log('form', form);
  }, [form]);

  return <SignUp open={open} handleClose={handleClose} handleChange={handleChange} handleSignUp={handleSignUp} />;
}
