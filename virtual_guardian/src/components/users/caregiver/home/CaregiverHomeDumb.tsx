import { Typography, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { User } from "../../../../model/models";
import { useLocation } from "react-router";
import { useStylesCaregiverHome } from "../../../../styles/CaregiverStyle";

import background from '../../../../visuals/caregiver/background.svg';
import mountains from '../../../../visuals/caregiver/mountains.svg';
import hills from '../../../../visuals/caregiver/hills.svg';
import foreground from '../../../../visuals/caregiver/foreground.svg';
import UserDetailsPage from "../../UserDetailsPage";

interface CaregiverHomeDumbProps {
  loggedUser: User,
}

function CaregiverHomeDumb({ loggedUser }: CaregiverHomeDumbProps) {
  let style = useStylesCaregiverHome();

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

        <Typography style={{ position: 'absolute' }} variant="h1" className={style.titleStyle}>Hello {loggedUser.firstname}!</Typography>
        <Typography style={{ position: 'absolute' }} variant="h4" className={style.subtitleStyle}>How are you today?</Typography>

        <img alt="mountains" src={mountains} style={{ position: 'absolute', left: 0, marginTop: '-30vh', top: '42em', transform: `translateY(-${offsetY * 0.6}px)` }} />
        
        <img alt="hills" src={hills} style={{ position: 'absolute', left: 0, marginTop: '7vh', top: '24.2em', transform: `translateY(-${offsetY * 0.4}px)` }} />

        <div style={{ position: 'absolute', marginTop: '68em', marginLeft: '45em'  }}>
          <UserDetailsPage loggedUser={loggedUser} />
        </div>

        <img alt="foreground" src={foreground} style={{ position: 'absolute', left: 0, marginTop: '40vh', transform: `translateY(-${offsetY * 1.4}px)` }} />

        <Button className={style.basicButton} variant='outlined' onClick={scrollToBottom}>Account details</Button>

      </div>
    </>
  )
}

export default CaregiverHomeDumb;