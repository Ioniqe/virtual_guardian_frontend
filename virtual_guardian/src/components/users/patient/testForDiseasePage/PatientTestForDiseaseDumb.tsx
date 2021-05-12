import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useStylesPatientTestForDisease } from "../../../../styles/PatientStyle";
import TestForDiseasePopup from "./TestForDiseasePopup";

interface PatientTestForDiseaseDumbProps {
  diseasesArray: Array<string>,
  setSelectedSymptoms: (arr: Array<string>) => void,
  testSymptoms: () => void,
}

function PatientTestForDiseaseDumb({ diseasesArray, setSelectedSymptoms, testSymptoms }: PatientTestForDiseaseDumbProps) {
  const style = useStylesPatientTestForDisease();

  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const handleClick = (event: React.MouseEvent<unknown>, disease: string) => {
    const selectedIndex = selected.indexOf(disease);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, disease);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelectedSymptoms(newSelected);
    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  let restartTest = (): void => {
    setSelected([]);
  }

  return (
    <>
      { open &&
        <TestForDiseasePopup
          open={open}
          setOpen={setOpen}
        />
      }

      <Paper elevation={0} className={style.paperStyle}>
        <Typography variant="h4" className={style.subtitleStyle}>Test your symptoms</Typography>

        <TableContainer>
          <Table
            className={style.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <TableBody>
              {
                diseasesArray.map((disease, index) => {
                  const isItemSelected = isSelected(disease);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, disease)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={disease}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {disease}
                      </TableCell>

                      <TableCell padding="checkbox" align="right">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Button className={style.buttonStyle} variant='outlined' onClick={testSymptoms}>Finish</Button>
      </Paper>
      <Button className={style.cancelButtonStyle} variant='outlined' onClick={restartTest}>restart test</Button>

    </>
  );
}

export default PatientTestForDiseaseDumb;