import { useStylesNavbar } from "../../styles/Navbar";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

interface NavbarProps {
  removeUser: () => void,
  userItems: {
    user: string,
    items: {
      title: string;
      url: string;
    }[]
  }
}

function Navbar({ removeUser, userItems }: NavbarProps) {
  let style = useStylesNavbar();

  let history = useHistory();
  let handleLogOut = (): void => {
    sessionStorage.removeItem('user');
    removeUser();
    return history.push('/');
  }

  return (
    <>
      <nav className={style.navbarItems}>
        <h1 className={style.navbarTitle} onClick={() => history.push(`/${userItems.user}`)}>Virtual Guardian</h1>

        <ul className={`${style.visibleStyle}`}>
          {
            userItems.items.map((item, index) => {
              return (
                <li key={index.toString()}>
                  <Button onClick={() => history.push(item.url)} className={style.specialButtonStyle} >{item.title}</Button>
                </li>
              );
            })
          }
        </ul>
        
        <Button className={style.basicButton} variant='outlined' onClick={handleLogOut}>log out</Button>

      </nav>
    </>
  );
}

export default Navbar;