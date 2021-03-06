import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { User } from "../../../../model/models";
import { useStylesPatient } from "../../../../styles/PatientStyle";

import background from '../../../../visuals/patient/background.svg';
import foreground from '../../../../visuals/patient/foreground.svg';
import lake from '../../../../visuals/patient/lake.svg';
import mountains from '../../../../visuals/patient/mountains.svg';
import small_mountain from '../../../../visuals/patient/small_mountain.svg';
import woods from '../../../../visuals/patient/woods.svg';
import UserDetailsPage from "../../UserDetailsPage";

interface PatientHomeDumbProps {
  loggedUser: User,
  handleEmergencyEvent: () => void,
}

function PatientHomeDumb({ loggedUser, handleEmergencyEvent }: PatientHomeDumbProps) {
  let style = useStylesPatient();

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
        <img alt="lake" src={lake} style={{ position: 'absolute', left: 0, top: '42em', transform: `translateY(-${offsetY * 0.6}px)` }} />

        <Typography style={{ position: 'absolute' }} variant="h1" className={style.titleStyle}>Hello {loggedUser.firstname}!</Typography>
        <Typography style={{ position: 'absolute' }} variant="h4" className={style.subtitleStyle}>How are you today?</Typography>

        <img alt="mountains" src={mountains} style={{ position: 'absolute', right: 0, top: '10em', transform: `translateY(-${offsetY * 0.2}px)` }} />
        <img alt="small_mountain" src={small_mountain} style={{ position: 'absolute', left: 0, top: '24.2em', transform: `translateY(-${offsetY * 0.4}px)` }} />
        <img alt="woods" src={woods} style={{ position: 'absolute', left: 0, top: '30em', width: '60%', transform: `translateY(-${offsetY * 0.6}px)` }} />

        <div style={{ position: 'absolute', marginTop: '78em', marginLeft: '45em'  }}>
          <UserDetailsPage loggedUser={loggedUser} />
        </div>

        <img alt="foreground" src={foreground} style={{ position: 'absolute', left: 0, transform: `translateY(-${offsetY * 1.7}px)` }} />

        <Button className={style.basicButton} variant='outlined' onClick={scrollToBottom}>Account details</Button>
        <Button style={{ position: 'fixed' }} className={style.emergencyButton} variant='outlined' onClick={handleEmergencyEvent}>Emergency!</Button>

      </div>
    </>
  );
}

export default PatientHomeDumb;