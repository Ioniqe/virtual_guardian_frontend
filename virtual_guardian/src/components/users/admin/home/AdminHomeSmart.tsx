import { User } from "../../../../model/models";
import AdminHomeDumb from "./AdminHomeDumb";

interface AdminHomeSmartProps {
  loggedUser: User,
}

function AdminHomeSmart({ loggedUser }: AdminHomeSmartProps) {

  return (
    <>
      <AdminHomeDumb
        loggedUser={loggedUser}
      />
    </>
  );
}

export default AdminHomeSmart;