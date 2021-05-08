import { Paper } from "@material-ui/core";
import { User } from "../../../../model/models";
import TableWithDeleteFeature from "./TableWithDeleteFeature";

interface AllAdminsTableProps{
  adminList: User[],
  // deleteSelected : () => void
}

function AllAdminsTableDumb({ adminList }: AllAdminsTableProps) {
  let headers = ['Username', 'Password', 'First Name', 'Last Name', 'Birthday', 'Gender'];
  return (
    <>
      <Paper elevation={0} style={{margin: 100}}>
        <TableWithDeleteFeature
          data={adminList}
          title={'All Administrators'}
          headers={headers}
          // deleteSelected={ deleteSelected }
        />
      </Paper>
    </>
  );
}

export default AllAdminsTableDumb;