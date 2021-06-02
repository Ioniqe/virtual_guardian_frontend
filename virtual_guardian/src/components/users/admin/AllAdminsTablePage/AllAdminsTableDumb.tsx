import { Paper } from "@material-ui/core";
import { User } from "../../../../model/models";
import { useStylesAdmin } from "../../../../styles/AdminStyle";
import TableWithDeleteFeature from "./TableWithDeleteFeature";

interface AllAdminsTableProps {
  adminList: User[],
  deleteSelected: (adminsToBeDeleted: string[]) => void,
}

function AllAdminsTableDumb({ adminList, deleteSelected }: AllAdminsTableProps) {
  let style = useStylesAdmin();
  let headers = ['Username', 'Password', 'First Name', 'Last Name', 'Birthday', 'Gender'];
  
  return (
    <>
      <Paper elevation={0} className={ style.adminsTableStyle }>
        <TableWithDeleteFeature
          data={adminList}
          title={'All Administrators'}
          headers={headers}
          deleteSelected={deleteSelected}
          userType={'admin'}
        />
      </Paper>
    </>
  );
}

export default AllAdminsTableDumb;