import { User } from "../../../../model/models";

import { useEffect, useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { useStylesDoctorHome } from "../../../../styles/DoctorStyle";
import { useLocation } from "react-router";

import background from '../../../../visuals/doctor/background.svg';
import mountains_3 from '../../../../visuals/doctor/mountains_3.svg';
import mountains_2 from '../../../../visuals/doctor/mountains_2.svg';
import mountains_1 from '../../../../visuals/doctor/mountains_1.svg';
import foreground from '../../../../visuals/doctor/foreground.svg';
import UserDetailsPage from "../../UserDetailsPage";

interface DoctorHomeDumbProps {
  loggedUser: User,
}

function DoctorHomeDumb({ loggedUser }: DoctorHomeDumbProps) {
  let style = useStylesDoctorHome();

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
        <img alt="mountains_3" src={mountains_3} style={{ position: 'absolute', left: 0, marginTop: '20vh', transform: `translateY(-${offsetY * 0.4}px)` }} />

        <Typography variant="h1" className={style.titleStyle}>Hello {loggedUser.firstname}!</Typography>
        <Typography variant="h4" className={style.subtitleStyle}>How are you today?</Typography>

        <img alt="mountains_2" src={mountains_2} style={{ position: 'absolute', right: 0, marginTop: '14vh', transform: `translateY(-${offsetY * 0.6}px)` }} />
        <img alt="mountains_1" src={mountains_1} style={{ position: 'absolute', left: 0, marginTop: '25vh', transform: `translateY(-${offsetY * 0.9}px)` }} />

        <div style={{ position: 'absolute', marginTop: '58em', marginLeft: '45em'  }}>
          <UserDetailsPage loggedUser={loggedUser} />
        </div>

        <Button className={style.basicButton} variant='outlined' onClick={scrollToBottom}>Account details</Button>


        <img alt="foreground" src={foreground} style={{ position: 'absolute', left: 0, marginTop: '38vh', transform: `translateY(-${offsetY * 1.4}px)` }} />


        {/* TODO add fixed button for scrolling up */}

      </div>
    </>
  )
}

export default DoctorHomeDumb;