import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { getCaregiversList } from '../../../../actions/CaregiverAction';
import { User } from '../../../../model/models';
import {
  Checkbox, CircularProgress, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';

interface CaregiversListPopupProps {
  open: boolean,
  setOpen: (open: boolean) => void,

  getAllCaregiversList: () => void,
  caregiverReducer: {
    loading: boolean,
    caregiversSuccess: User[],
    error: string,
  },

  setMessage: (message: string) => void,
  setOpenError: (error: boolean) => void,

  selectedCaregiver: string,
  setSelectedCaregiver: (caregiver: string) => void,

  patient: User,
  assignCaregiverEvent: (caregiverId: string, patientId: string) => void,
}

function CaregiversListPopup({ open, setOpen, getAllCaregiversList, caregiverReducer, setMessage,
  setOpenError, selectedCaregiver, setSelectedCaregiver, patient, assignCaregiverEvent }: CaregiversListPopupProps) {

  const [loading, setLoading] = useState(false);
  const [caregiverList, setCaregiverList] = useState<User[]>([]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    assignCaregiverEvent(selectedCaregiver, patient.id)
    setOpen(false);
  };

  const isSelected = (caregiverId: string) => selectedCaregiver === caregiverId;

  const handleClick = (event: React.MouseEvent<unknown>, caregiverId: string) => {
    selectedCaregiver === caregiverId ? setSelectedCaregiver('') : setSelectedCaregiver(caregiverId)
  };

  useEffect(() => {
    getAllCaregiversList()
  }, [getAllCaregiversList]);

  useEffect(() => {
    if (caregiverReducer.loading) {
      setLoading(true);
    }
    else if (caregiverReducer.error !== '') {
      setOpen(false)
      setMessage(caregiverReducer.error);
      setLoading(false);
      setOpenError(true);
    }
    else if (caregiverReducer.caregiversSuccess) {
      setLoading(false);
      setCaregiverList(caregiverReducer.caregiversSuccess);
    }
  }, [caregiverReducer.error, caregiverReducer.loading, caregiverReducer.caregiversSuccess,
    setMessage, setOpen, setOpenError, setSelectedCaregiver, patient.caregiverId]);

  useEffect(() => {
    if (patient.caregiverId) {
      setSelectedCaregiver(patient.caregiverId)
    } else
      setSelectedCaregiver('')
  }, [patient.caregiverId, setSelectedCaregiver]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Assign Caregiver</DialogTitle>
        <DialogContent>
          {loading ?
            <CircularProgress /> :
            <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
              <TableContainer >
                <Table style={{ minWidth: 400 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      caregiverList.map((caregiver, index) => {
                        const isItemSelected = isSelected(caregiver.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell >{caregiver.firstname} {caregiver.lastname}</TableCell>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={(event) => handleClick(event, caregiver.id)}
                                aria-checked={isItemSelected}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    caregiverReducer: state.caregiver, //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllCaregiversList: () => dispatch(getCaregiversList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaregiversListPopup);
