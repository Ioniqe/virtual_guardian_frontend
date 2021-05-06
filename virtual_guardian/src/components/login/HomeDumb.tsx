import React, { useEffect, useState } from 'react';
import { Button, Link, TextField, Typography } from '@material-ui/core';
import '../../styles/HomeStyle.css';
import { useStylesHome } from '../../styles/Home';
import PopupSignUp from '../popups/PopupSignUp';

interface Props {
  username: string,
  password: string,
  setUsername: (username: string) => void,
  setPassword: (password: string) => void,

  _loginUser: () => void,

  sendNewUser: (username: string, password: string,
    firstName: string, lastName: string,
    birthday: string,
    gender: string, user: string, userCredentials: string) => void,
}

function LoginDumb({ username, password, setUsername, setPassword, _loginUser, sendNewUser }: Props) {

  const style = useStylesHome();

  const [open, setOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  var Scroll = require('react-scroll');
  var scroll = Scroll.animateScroll;
  let scrollToBottom = (): void => {
    scroll.scrollToBottom();
  }

  let openPopup = () : void => {
    setOpen(true);
  }

  return (
    <>
      <div className={style.header}>

        {/*Content before waves*/}
        <div style={{ transform: `translateY(-${offsetY * 0.8}px)` }}>
          <div className={style.content}>
            <Typography variant='h3' className={style.title}>Virtual Guardian</Typography>
            <Button className={style.basicButton} variant='outlined' onClick={scrollToBottom}>LOG IN</Button>
          </div>
        </div>

        {/*Waves Container*/}
        <div >
          <svg className={style.waves} viewBox='0 24 150 28' preserveAspectRatio='none'>
            <defs>
              <path id='gentle-wave' d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z' />
            </defs>
            <g className='parallax'>
              <use xlinkHref='#gentle-wave' x={48} y={0} fill='rgba(255,255,255,0.7)' />
              <use xlinkHref='#gentle-wave' x={48} y={3} fill='rgba(255,255,255,0.5)' />
              <use xlinkHref='#gentle-wave' x={48} y={5} fill='rgba(255,255,255,0.3)' />
              <use xlinkHref='#gentle-wave' x={48} y={7} fill='#fff' />
            </g>
          </svg>

        </div>

        <div className={style.rectangle} >
          <Typography variant='h5' className={style.loginTitle} style={{ transform: `translateY(-${offsetY * 0.4}px)` }}>LOG IN</Typography>
          <form className={style.form} noValidate style={{ transform: `translateY(-${offsetY * 0.4}px)` }}>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              color="primary"
              value={username}
              onChange={e => { setUsername(e.target.value) }}
              className={style.text}
              InputLabelProps={{
                classes: {
                  root: style.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: style.notchedOutline,
                },
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="primary"
              value={password}
              className={style.text}
              onChange={e => { setPassword(e.target.value) }}
              InputLabelProps={{
                classes: {
                  root: style.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: style.notchedOutline,
                },
              }}
            />

            <Button className={style.loginButton} variant='outlined' onClick={ _loginUser }>
              enter
            </Button>

          </form>

          <Link
            component="button"
            variant="body2"
            href="#"
            className={style.link}
            onClick={() => openPopup()}
            style={{ transform: `translateY(-${offsetY * 0.1}px)` }}
          >
            Don't have an account? Sign up for free!
          </Link>

        </div>

      </div>

      <PopupSignUp
        open={open}
        setOpen={setOpen}
        sendNewUser={ sendNewUser }
      />

    </>
  );
}

export default LoginDumb;