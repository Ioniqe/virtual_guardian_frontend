import { IconButton, Paper, Tooltip } from "@material-ui/core";
import { User } from "../../../../model/models";
import TableWithDeleteFeature from "../../admin/AllAdminsTablePage/TableWithDeleteFeature";

import AddIcon from '@material-ui/icons/Add';
import { useState } from "react";
import PopupSignUp from "../../../popups/PopupSignUp";
import { useStylesCaregiver } from "../../../../styles/CaregiverStyle";

interface CaregiversPageDumbProps {
  caregiverList: User[],
  deleteSelected: (caregiversToBeDeleted: string[]) => void,
  saveCaregiver: (newCaregiver: User) => void,
  saveEditedCaregiver: (editedCaregiver: User) => void,
}

function CaregiversPageDumb({ caregiverList, deleteSelected, saveCaregiver, saveEditedCaregiver}: CaregiversPageDumbProps) {
  let style = useStylesCaregiver();

  const [open, setOpen] = useState(false);

  let headers = ['Username', 'Password', 'First Name', 'Last Name', 'Birthday', 'Gender'];

  let sendNewUser = (username: string, password: string,
    firstName: string, lastName: string,
    birthday: string, gender: string): void => {
    let newCaregiver: User = {
      'username': username, 'password': password,
      'firstname': firstName, 'lastname': lastName,
      'birthday': birthday, 'gender': gender, type: 'caregiver', id: ''
    };
    saveCaregiver(newCaregiver);
  }

  let addCaregiver = (): void => {
    setOpen(true);
  }

  return (
    <div style={{ position: 'relative' }}>

      <PopupSignUp
        title={'Register caregiver'}
        userType={'caregiver'}
        sendNewUser={sendNewUser}
        open={open}
        setOpen={setOpen}
      />

      <Paper elevation={0} className={style.caregiversTableStyle}>
        <TableWithDeleteFeature
          data={caregiverList}
          title={'Caregivers list'}
          headers={headers}
          deleteSelected={deleteSelected}
          userType={'caregiver'}
          saveUser={ saveEditedCaregiver }
        />
      </Paper>

      <Tooltip title="Add Caregiver" className={style.addCaregiverTooltipStyle}>
        <IconButton aria-label="add_caregiver" onClick={addCaregiver} >
          <AddIcon className={style.addCaregiverButtonStyle} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default CaregiversPageDumb;