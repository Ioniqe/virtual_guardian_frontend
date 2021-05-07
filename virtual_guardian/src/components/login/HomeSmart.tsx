import React, { useEffect, useState } from 'react';
import { LoginUser, SpecialUser, User } from '../../model/models';
import HomeDumb from './HomeDumb';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import { saveUser } from '../../actions/RegisterAction';
import { loginUser } from '../../actions/LoginAction';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { Redirect } from 'react-router';


const verifyAllFieldsArNotNull = (user: SpecialUser | LoginUser): boolean => {
  let ok = true;
  Object.entries(user).forEach((key, value) => key[1].length === 0 && (ok = false));
  return ok;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  saveNewUser: (user: SpecialUser) => void,
  registeredUser: {
    loading: boolean,
    registerSuccessful: boolean,
    error: string
  },

  loginExistingUser: (user: LoginUser) => void,
  loginUser: {
    loading: boolean,
    loginSuccessful: User,
    error: string
  },
}

function HomeSmart({ registeredUser, saveNewUser, loginExistingUser, loginUser }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  let _loginUser = (): void => {
    let user: LoginUser = { username, password };
    if (verifyAllFieldsArNotNull(user)) {
      loginExistingUser(user);
    }
  }

  let sendNewUser = (username: string, password: string,
    firstName: string, lastName: string, birthday: string,
    gender: string, user: string, userCredentials: string): void => {
    let newUser: SpecialUser = { username, password, firstname: firstName, lastname: lastName, birthday, gender, type: user, secretCredential: userCredentials };
    if (verifyAllFieldsArNotNull(newUser)) {
      saveNewUser(newUser);
    }
  }

  useEffect(() => {
    if (registeredUser.loading) {
      setLoading(true);
    }
    else if (registeredUser.error !== '') {
      setMessage(registeredUser.error);
      setLoading(false);
      setOpenError(true);
    }
    else if (registeredUser.registerSuccessful) {
      setLoading(false);
      setOpenSuccess(true);
    }
  }, [registeredUser.error, registeredUser.loading, registeredUser.registerSuccessful])

  useEffect(() => {
    if (loginUser !== undefined) {
      if (loginUser.loading) {
        setLoading(true);
      } else if (loginUser.error !== '') {
        setMessage(loginUser.error);
        setLoading(false);
        setOpenError(true);
      } else if (loginUser.loginSuccessful.id !== '') {
        sessionStorage.setItem('user_id', JSON.stringify(loginUser.loginSuccessful.id)); //store in sessionStorage or in cookie?

        setLoading(false);
      }
    }

  }, [setMessage, loginUser])

  if (loginUser.loginSuccessful.type !== '') {
    switch (loginUser.loginSuccessful.type) {
      case 'admin':
        return <Redirect push to="/admin" />
      case 'patient':
        return <Redirect push to="/patient" />
      case 'caregiver':
        return <Redirect push to="/caregiver" />
      case 'doctor':
        return <Redirect push to="/doctor" />
      default:
        // console.error('user type not recognized');
        return <Redirect push to="/" />
    }
  }



  return (
    <>
      <HomeDumb
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        sendNewUser={sendNewUser}
        _loginUser={_loginUser}
      />

      {loading && <CircularProgress />}

      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> User saved successfully! </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    registeredUser: state.register, //from rootReducer
    loginUser: state.login
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    saveNewUser: (user: SpecialUser) => dispatch(saveUser(user)),
    loginExistingUser: (user: LoginUser) => dispatch(loginUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeSmart);
