import { useState } from "react";
// import MenuIcon from '@material-ui/icons/Menu';
// import CloseIcon from '@material-ui/icons/Close';
// import { IconButton } from "@material-ui/core";

import { MenuItemsAdmin } from "./MenuItems"
// import '../../styles/Navbar.css';
import { useStylesNavbar } from "../../styles/Navbar";



function Navbar() {
  let style = useStylesNavbar();

  const [clicked, setClicked] = useState(false);

  let handleIconClick = (): void => {
    setClicked(!clicked);
  }

  let burger = <div className={ style.burgerStyle }>
    <div className={style.burgerLine1Style}></div>
    <div className={style.burgerLine2Style}></div>
    <div className={style.burgerLine3Style}></div>
  </div>


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
        
        <ul className={`${style.ulStyle } ${clicked ? style.invisibleStyle : style.visibleStyle}`}>
          {
            MenuItemsAdmin.map((item, index) => {
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
        { burger }
      </nav>
    </>
  );
}

export default Navbar;