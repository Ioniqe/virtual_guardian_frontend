import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSignUpStyles } from '../../styles/SignUp';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

interface Props {
  title: string,
  userType: string,
  sendNewUser: (username: string, password: string,
    firstName: string, lastName: string,
    birthday: string,
    gender: string, user?: string, userCredentials?: string, address?: string) => void,
  open: boolean,
  setOpen: (arg0: boolean) => void
}

function PopupSignUp({ title, userType, sendNewUser, open, setOpen }: Props) {
  const classes = useSignUpStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('1990-10-10');
  const [gender, setGender] = useState('male');
  const [user, setUser] = useState('doctor');
  const [userCredentials, setUserCredentials] = useState('');
  const [address, setAddress] = useState('');

  let resetFields = (): void => {
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setBirthday('1990-10-10');
    setGender('male');
    setUser('doctor');
    setUserCredentials('');
  }

  const handleClose = () => {
    setOpen(false);
    resetFields();
  };

  let verifyNullFields = (): boolean => {
    if (username === '') return false
    if (password === '') return false
    if (firstName === '') return false
    if (lastName === '') return false
    if (gender === '') return false
    if (userType === 'patient' && address === '') return false
    if (userType === 'specialUser' && userCredentials === '') return false

    return true
  }

  let handleSubmit = () => {
    if (verifyNullFields()) {
      userType === 'specialUser' && sendNewUser(username, password, firstName, lastName, birthday, gender, user, userCredentials);
      userType === 'patient' && sendNewUser(username, password, firstName, lastName, birthday, gender, address);
      setOpen(false);
      resetFields();
    }
  }

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  const handleUserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUser(event.target.value as string);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title' className={classes.textField}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.textField}>
            Please fill out the form with the necessary information
          </DialogContentText>

          <form className={classes.form} noValidate>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  value={username}
                  onChange={e => { setUsername(e.target.value) }}
                  variant='outlined'
                  name='username'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  color='primary'
                  className={classes.text}
                  InputLabelProps={{
                    classes: {
                      root: classes.textField,
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  value={password}
                  onChange={e => { setPassword(e.target.value) }}
                  variant='outlined'
                  required
                  fullWidth
                  id='password'
                  label='Password'
                  name='password'
                  color='primary'
                  className={classes.text}
                  InputLabelProps={{
                    classes: {
                      root: classes.textField,
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  value={firstName}
                  onChange={e => { setFirstName(e.target.value) }}
                  variant='outlined'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  color='primary'
                  className={classes.text}
                  InputLabelProps={{
                    classes: {
                      root: classes.textField,
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  value={lastName}
                  onChange={e => { setLastName(e.target.value) }}
                  variant='outlined'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  color='primary'
                  className={classes.text}
                  InputLabelProps={{
                    classes: {
                      root: classes.textField,
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant='outlined' fullWidth color='primary' className={classes.formControl}>
                  <InputLabel id='gender' className={classes.textField}>Gender</InputLabel>
                  <Select
                    labelId='gender'
                    id='gender'
                    value={gender}
                    onChange={handleGenderChange}
                    label='Gender'
                    color='primary'
                    className={classes.textField}
                  >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  value={birthday}
                  onChange={e => { setBirthday(e.target.value) }}
                  fullWidth
                  variant='outlined'
                  id='date'
                  label='Birthday'
                  type='date'
                  color='primary'
                  className={`${classes.textField} ${classes.text}`}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.textField,
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>

              {userType === 'specialUser' &&
                <Grid item xs={12} sm={6}>
                  <FormControl variant='outlined' fullWidth color='primary' className={classes.formControl}>
                    <InputLabel id='user' className={classes.textField}>User</InputLabel>
                    <Select
                      labelId='user'
                      id='user'
                      value={user}
                      onChange={handleUserChange}
                      label='User'
                      color='primary'
                      className={classes.textField}
                    >
                      <MenuItem value={'doctor'}>Doctor</MenuItem>
                      <MenuItem value={'admin'}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              }

              {userType === 'specialUser' &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='off'
                    value={userCredentials}
                    onChange={e => { setUserCredentials(e.target.value) }}
                    variant='outlined'
                    name='userCredentials'
                    required
                    fullWidth
                    id='userCredentials'
                    label='User Credentials'
                    color='primary'
                    className={classes.text}
                    InputLabelProps={{
                      classes: {
                        root: classes.textField,
                      },
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                </Grid>
              }

              {userType === 'patient' &&
                <Grid item xs={12}>
                  <TextField
                    autoComplete='off'
                    value={address}
                    onChange={e => { setAddress(e.target.value) }}
                    variant='outlined'
                    name='address'
                    required
                    fullWidth
                    id='address'
                    label='Address'
                    color='primary'
                    className={classes.text}
                    InputLabelProps={{
                      classes: {
                        root: classes.textField,
                      },
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                </Grid>
              }

            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} className={classes.loginButton}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupSignUp;