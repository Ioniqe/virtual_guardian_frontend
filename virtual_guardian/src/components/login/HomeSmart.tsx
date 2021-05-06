import React, { useEffect, useState } from 'react';
import { SpecialUser } from '../../model/models';
import HomeDumb from './HomeDumb';

import { connect } from 'react-redux';
import { saveUser } from '../../actions/RegisterAction';
import { CircularProgress, Snackbar } from '@material-ui/core';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const verifyAllFieldsArNotNull = (user: SpecialUser): boolean => {
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
}

function HomeSmart({ registeredUser, saveNewUser }: Props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

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
      setLoading(false);
      setOpenError(true);
    }
    else if (registeredUser.registerSuccessful) {
      setLoading(false);
      setOpenSuccess(true);
    }
  }, [registeredUser.error, registeredUser.loading, registeredUser.registerSuccessful])

  return (
    <>

      <HomeDumb
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        sendNewUser={sendNewUser}
      />

      {loading && <CircularProgress />}

      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> User saved successfully! </Alert>
      </Snackbar>

      <Snackbar open={openError && registeredUser.error !== ''} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {registeredUser.error} </Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    registeredUser: state.register //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    saveNewUser: (user: SpecialUser) => dispatch(saveUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeSmart);
