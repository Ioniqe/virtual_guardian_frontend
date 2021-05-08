// import MenuIcon from '@material-ui/icons/Menu';
// import CloseIcon from '@material-ui/icons/Close';
// import { IconButton } from "@material-ui/core";

import { useStylesNavbar } from "../../styles/Navbar";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

interface NavbarProps {
  removeUser: () => void,
  links: {
    title: string;
    url: string;
  }[]
}

function Navbar({ removeUser, links }: NavbarProps) {
  let style = useStylesNavbar();

  // const [clicked, setClicked] = useState(false);

  // let handleIconClick = (): void => {
  //   setClicked(!clicked);
  // }

  // let burger = <div className={ style.burgerStyle }>
  //   <div className={style.burgerLine1Style}></div>
  //   <div className={style.burgerLine2Style}></div>
  //   <div className={style.burgerLine3Style}></div>
  // </div>

  let history = useHistory();
  let handleLogOut = (): void => {
    sessionStorage.removeItem('user');
    removeUser();
    return history.push('/');
  }

  return (
    <>
      <nav className={style.navbarItems}>
        <h1 className={style.navbarTitle}>Virtual Guardian</h1>
        {/* <div >
          {
            clicked ? 
              <IconButton onClick={ handleIconClick } className={ style.iconButtonStyle}> <MenuIcon fontSize="large" /> </IconButton> :
              <IconButton onClick={ handleIconClick } className={ style.iconButtonStyle}> <CloseIcon fontSize="large"/> </IconButton>
          }
        </div> */}

        {/* <ul className={`${style.ulStyle} ${clicked ? style.invisibleStyle : style.visibleStyle}`}> */}
        <ul className={`${style.ulStyle} ${style.visibleStyle}`}>
          {
            links.map((item, index) => {
              return (
                <li key={item.title}>
                  <a className={style.hyperlinkStyle} href={item.url} >
                    {item.title}
                  </a>
                </li>

              );
            })
          }


        </ul>
        <Button className={style.basicButton} variant='outlined' onClick={handleLogOut}>log out</Button>

        {/* { burger } */}
      </nav>
    </>
  );
}

export default Navbar;