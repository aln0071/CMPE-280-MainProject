import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../actions/auth';

export default function LoginForm() {
  return (
    <div id="loginform">
      <FormHeader title="Login" />
      <Form />
      <OtherMethods label="Or sign in with:" />
      <SignUpLink />
    </div>
  );
}

export function FormHeader(props) {
  return <h2 id="headerTitle">{props.title}</h2>;
}

export function Form() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();

    console.log(username, password);

    dispatch(login(username, password))
      .then(() => {
        navigate('/');
        window.location.reload();
      })
      .catch(() => {
        // setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

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
        description="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <FormButton title="Log in" onSubmit={handleLogin} />
    </div>
  );
}

export function FormButton(props) {
  return (
    <div id="button" className="row">
      <button onClick={props.onSubmit}>{props.title}</button>
    </div>
  );
}

export function FormInput(props) {
  return (
    <div className="row">
      <label>{props.description}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export function OtherMethods(props) {
  return (
    <div id="alternativeLogin">
      <label>{props.label}</label>
      <div id="iconGroup">
        <Facebook />
        <Twitter />
        <Google />
      </div>
    </div>
  );
}
export function SignUpLink(props) {
  return <AltLink title="No Account?" label="Create One" link="/#/signup" />;
}

export function AltLink(props) {
  return (
    <div id="altlink">
      <label>{props.title}</label>
      <a href={props.link}>{props.label}</a>
    </div>
  );
}

export function Facebook(props) {
  return <a href="#" id="facebookIcon" />;
}

export function Twitter(props) {
  return <a href="#" id="twitterIcon" />;
}

export function Google(props) {
  return <a href="#" id="googleIcon" />;
}
