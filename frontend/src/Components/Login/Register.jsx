import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { register } from '../../actions/auth';
import {
  FormHeader, FormInput, AltLink, OtherMethods, FormButton
} from './Login';
import { MESSAGE } from '../../actions/messages';

export default function RegisterForm() {
  return (
    <div id="registerform">
      <FormHeader title="Sign Up" />
      <Form />
      <OtherMethods label="Or sign up with:" />
      <SignInLink />
    </div>
  );
}
export function Form() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== password2) {
      dispatch(MESSAGE.error("Passwords does not match"))
      return;
    }

    dispatch(register(username, email, password))
      .then(() => {
        navigate('/login')
      })
      .catch((e) => {
        console.log(e)
      });
  };

  return (
    <div>
      <FormInput
        description="Username"
        placeholder="Enter your username"
        type="text"
        value={username}
        onChange={onChangeUsername}
      />
      <FormInput
        description="Email"
        placeholder="Enter your email"
        type="text"
        value={email}
        onChange={onChangeEmail}
      />
      <FormInput
        description="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <FormInput
        description="Password"
        placeholder="Re-enter your password"
        type="password"
        value={password2}
        onChange={onChangePassword2}
      />
      <FormButton title="Sign Up" onSubmit={handleRegister} />
    </div>
  );
}

export function SignInLink(props) {
  return <AltLink title="Have an Account?" label="Log In" link="/#/login" />;
}
