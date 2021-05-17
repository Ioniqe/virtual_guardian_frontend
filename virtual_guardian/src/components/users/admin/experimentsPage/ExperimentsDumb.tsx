import { Button, FormControl, InputLabel, MenuItem, Paper, Select } from "@material-ui/core";
import React from "react";
import { ActivityList } from "../../../../model/models";
import { useStylesAdminExperimentsPage } from "../../../../styles/AdminStyle";
import CollapsibleTable from "./CollapsibleTable";

interface ExperimentsDumbProps {
  predict: () => void,
  setDefault: () => void,
  activitiesList: ActivityList[],
  features: string,
  setFeatures: (features: string) => void,
  algorithm: string,
  setAlgorithm: (algorithm: string) => void,
  selected: Date[],
  setSelected: (selected: Date[]) => void,
}

function ExperimentsDumb({ predict, setDefault, activitiesList,
  features, setFeatures, algorithm, setAlgorithm, selected, setSelected }: ExperimentsDumbProps) {
  let style = useStylesAdminExperimentsPage();

  const handleFeatureChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFeatures(event.target.value as string);
  };

  const handleAlgorithmChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAlgorithm(event.target.value as string);
  };

  return (
    <>
      <Paper elevation={0} className={style.adminsTableStyle}>
        <div>
          <div className={style.formsStyle}>
            <FormControl color='primary' className={style.formControlStyle}>
              <InputLabel id='features' className={style.textField}>Features</InputLabel>
              <Select
                labelId='features'
                id='features'
                value={features}
                onChange={handleFeatureChange}
                label='Features'
                color='primary'
                className={style.textField}
              >
                <MenuItem value={'durationFrequencyRatio'}>Duration/Frequency</MenuItem>
                <MenuItem value={'durationAndFrequency'}>Duration and Frequency</MenuItem>
                <MenuItem value={'duration'}>Duration</MenuItem>
                <MenuItem value={'frequency'}>Frequency</MenuItem>
              </Select>
            </FormControl>

            <FormControl color='primary' className={style.formControlStyle}>
              <InputLabel id='algorithm' className={style.textField}>Algorithm</InputLabel>
              <Select
                labelId='algorithm'
                id='algorithm'
                value={algorithm}
                onChange={handleAlgorithmChange}
                label='Algorithm'
                color='primary'
                className={style.textField}
              >
                <MenuItem value={'logisticRegression'}>Logistic Regression</MenuItem>
                <MenuItem value={'linearRegression'}>Linear Regression</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Button className={style.predictButtonStyle} variant='outlined' onClick={predict}> predict </Button>
        </div>

        <div className={style.collapsibleTableStyle}>
          <CollapsibleTable
            activitiesList={activitiesList}
            selected={selected}
            setSelected={setSelected}
          />
        </div>


        <div className={style.resultsTableStyle}>
          <h1>Results</h1>

          <Paper elevation={0} >
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
            <h2>dfvsfdvsdfhvusohfvufoshvusodhufvh</h2>
          </Paper>
        </div>

        <Button className={style.predictButtonStyle} variant='outlined' onClick={setDefault}>Set as default</Button>

      </Paper>
    </>
  );
}

export default ExperimentsDumb;