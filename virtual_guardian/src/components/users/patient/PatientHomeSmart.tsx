import React from "react";
import { User } from "../../../model/models";
import PatientHomeDumb from "./PatientHomeDumb";

interface PatientHomeSmartProps{
  loggedUser: User
}

function PatientHomeSmart({ loggedUser } : PatientHomeSmartProps) {
  return (
    <>
      <PatientHomeDumb
        loggedUser={ loggedUser }
      />
    </>
  );
}

export default PatientHomeSmart;