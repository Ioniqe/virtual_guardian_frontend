import { User } from "../../../../model/models";
import { useStylesAdmin } from "../../../../styles/AdminStyle";
import { useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@material-ui/core";

import background from '../../../../visuals/admin/background.svg';
import mountain from '../../../../visuals/admin/mountain.svg';
import foreground from '../../../../visuals/admin/foreground.svg';
import UserDetailsPage from "../../UserDetailsPage";

interface AdminHomeDumbProps {
  loggedUser: User,
}

function AdminHomeDumb({ loggedUser }: AdminHomeDumbProps) {
  let style = useStylesAdmin();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  return (
    <>
      <div style={{ position: 'relative' }}>
        <img alt="background" src={background} style={{ position: 'absolute', right: 0 }} />

        <Typography variant="h1" className={style.titleStyle}>Hello {loggedUser.firstname}!</Typography>
        <Typography variant="h4" className={style.subtitleStyle}>How are you today?</Typography>

        <img alt="mountain" src={mountain} style={{ position: 'absolute', right: 0, marginTop: '10vh', transform: `translateY(-${offsetY * 0.6}px)` }} />

        <div style={{ position: 'absolute', marginTop: '60em', marginLeft: '45em'  }}>
          <UserDetailsPage loggedUser={loggedUser} />
        </div>

        <Button className={style.basicButton} variant='outlined' onClick={scrollToBottom}>Account details</Button>


        <img alt="foreground" src={foreground} style={{ position: 'absolute', left: 0, marginTop: '30vh', transform: `translateY(-${offsetY * 1.4}px)` }} />
      </div>
    </>
  )
}

export default AdminHomeDumb;