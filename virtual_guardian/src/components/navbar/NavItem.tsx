import { Button } from "@material-ui/core";
import { useState } from "react";
import { useStylesNavbar } from "../../styles/Navbar";

interface NavItemProps {
  user: string,
  children: JSX.Element | JSX.Element[]
}

function NavItem({ user, ...props }: NavItemProps) {
  let style = useStylesNavbar();
  const [open, setOpen] = useState(false);

  let specialButton = <></>;
  switch (user) {
    case 'admin':
      specialButton = <>
        <Button onClick={() => setOpen(!open)} className={style.specialButtonStyle} >Manage admins</Button>
        {open && props.children}
      </>;
      break;
    case 'patient':

      break;
    case 'caregiver':
      specialButton = <>
        <Button onClick={() => setOpen(!open)} className={style.specialButtonStyle} >Manage users</Button>
        {open && props.children}
      </>;
      break;
    case 'doctor':
      specialButton = <>
        <Button onClick={() => setOpen(!open)} className={style.specialButtonStyle} >Manage users</Button>
        {open && props.children}
      </>;
      break;
    default:
      console.error('Error, navbar could not identify user type');
  }

  return (
    <>
      {/* li key={ user } */}
      { specialButton}
    </>
  );
}

export default NavItem;