import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css';
import { register } from '../../actions/auth';
import { FormHeader, FormInput, AltLink, OtherMethods, FormButton } from './Login';

export default function RegisterForm() {
  return (
    <div id="registerform">
      <FormHeader title="Register" />
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

  const { message } = useSelector(state => state.message);
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
    if (e.target.value !== password) {
        setPassword2(e.target.value);
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    if (password !== password2) {
        alert("Passwords dont match")
    }
    // form.current.validateAll();

    // if (checkBtn.current.context._errors.length === 0) {
    dispatch(register(username, email, password))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
    // }
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
      <FormButton title="Register" onSubmit={handleRegister} />
    </div>
  );
}

export function SignInLink(props) {
  return <AltLink title="Have an Account?" label="Sign In" link="/#/login" />;
}
