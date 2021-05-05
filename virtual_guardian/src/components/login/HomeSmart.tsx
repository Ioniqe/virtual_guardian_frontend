import React, { useEffect, useState } from 'react';
import { SpecialUser } from '../../model/models';
import HomeDumb from './HomeDumb';

import { connect } from 'react-redux';
import { resetRegister, saveUser } from '../../actions/RegisterAction';

const verifyAllFieldsArNotNull = (user: SpecialUser): boolean => {
  let ok = true;
  Object.entries(user).forEach((key, value) => key[1].length === 0 && (ok = false));
  return ok;
}

interface Props {
  saveNewUser: (user: SpecialUser) => void,
  resetRegisteredUser: () => void,
  registeredUser: {
    loading: boolean,
    registerSuccessful: boolean,
    error: boolean
  },
}

function HomeSmart({ registeredUser, resetRegisteredUser, saveNewUser }: Props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let sendNewUser = (username: string, password: string,
    firstName: string, lastName: string, birthday: string,
    gender: string, user: string, userCredentials: string): void => {
      let newUser: SpecialUser = { username, password, firstname: firstName, lastname: lastName, birthday, gender, type: user, secretCredential: userCredentials };
    verifyAllFieldsArNotNull(newUser) && saveNewUser(newUser);
  }

  useEffect(() => {
    if (registeredUser !== undefined) {
      if (registeredUser.error === true) {
        console.log("Error");
      } else if (registeredUser.registerSuccessful === true) {
        console.log("Success!");
        resetRegisteredUser();
      }
    }
  }, [saveNewUser, registeredUser, resetRegisteredUser])

  return (
    <HomeDumb
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      sendNewUser={sendNewUser}
    />
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
    resetRegisteredUser: () => dispatch(resetRegister()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeSmart);
