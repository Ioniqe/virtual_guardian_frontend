import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { useStylesNavbar } from "../../styles/Navbar";

interface DropdownMenuProps {
  user: string,
}

function DropdownMenu({ user }: DropdownMenuProps) {
  let history = useHistory();
  let style = useStylesNavbar();

  let menuItemsList = [];
  switch (user) {
    case 'admin':
      menuItemsList.push({ title: 'View admin list', link: '/admin/list' });
      break;
    case 'caregiver':
      menuItemsList.push({ title: 'View patient list', link: '/caregiver/patient/list' });
      break;
    case 'doctor':
      menuItemsList.push({ title: 'View patient list', link: '/doctor/patient/list' });
      menuItemsList.push({ title: 'View caregiver list', link: '/doctor/caregiver/list' });
      menuItemsList.push({ title: 'Assign caregiver to patient', link: '/doctor/caregiver/assign' });
      break;
    default:
      console.error('Error, dropdown menu could not identify user type');
  }

  return (
    <div className={style.dropDownMenuStyle}>
      {
        menuItemsList.map((item, index) => {
          return (
            <li key={ item.title }>
              <Button onClick={() => history.push(item.link)} className={`${style.specialButtonStyle} ${style.menuItemStyle}`} >{item.title}</Button>
            </li>
          );
        })
      }
    </div>
  );

}


export default DropdownMenu;
