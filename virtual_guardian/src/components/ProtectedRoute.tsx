import React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminHomeSmart from "./admin/AdminHomeSmart";
import CaregiverHomeSmart from "./caregiver/CaregiverHomeSmart";
import DoctorHomeSmart from "./doctor/DoctorHomeSmart";
import PatientHomeSmart from "./patient/PatientHomeSmart";

export const ProtectedRoute = ({ ...rest }: any) => {
  return (
    <Route {...rest} render={props => {
      let userType: string = '';

      if (JSON.parse(sessionStorage.getItem('user') as string) !== null)
        userType = JSON.parse(sessionStorage.getItem('user') as string).type;
      
      if (userType !== null) {
        switch (userType) {
          case 'admin':
            return <AdminHomeSmart/>;
          case 'patient':
            return <PatientHomeSmart/>;
          case 'caregiver':
            return <CaregiverHomeSmart/>;
          case 'doctor':
            return <DoctorHomeSmart/>;
          default:
            console.log('User type not recognized');
        }
      } else {
        return (<Redirect to={{
          pathname: "/",
          state: {
            from: props.location
          }
        }}
        />
        );
      }
    }}
    />
  );
};
