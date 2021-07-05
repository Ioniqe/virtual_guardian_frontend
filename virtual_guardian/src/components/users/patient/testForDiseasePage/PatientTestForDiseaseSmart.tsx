import { CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { predictDisease } from "../../../../actions/PatientAction";
import { User } from "../../../../model/models";
import PatientTestForDiseaseDumb from "./PatientTestForDiseaseDumb";

const diseasesArray = ['Itching', 'Skin Rash', 'Nodal Skin Eruptions', 'Continuous Sneezing', 'Shivering', 'Chills',
  'Joint Pain', 'Stomach Pain', 'Acidity', 'Ulcers On Tongue', 'Muscle Wasting', 'Vomiting', 'Burning Micturition',
  'Spotting Urination', 'Fatigue', 'Weight Gain', 'Anxiety', 'Cold Hands And Feet', 'Mood Swings', 'Weight Loss',
  'Restlessness', 'Lethargy', 'Patches In Throat', 'Irregular Sugar Level', 'Cough', 'High Fever', 'Sunken Eyes', 'Breathlessness',
  'Sweating', 'Dehydration', 'Indigestion', 'Headache', 'Yellowish Skin', 'Dark Urine', 'Nausea', 'Loss Of Appetite',
  'Pain Behind The Eyes', 'Back Pain', 'Constipation', 'Abdominal Pain', 'Diarrhoea', 'Mild Fever', 'Yellow Urine',
  'Yellowing Of Eyes', 'Acute Liver Failure', 'Fluid Overload', 'Swelling Of Stomach', 'Swelled Lymph Nodes', 'Malaise',
  'Blurred And Distorted Vision', 'Phlegm', 'Throat Irritation', 'Redness Of Eyes', 'Sinus Pressure', 'Runny Nose', 'Congestion',
  'Chest Pain', 'Weakness In Limbs', 'Fast Heart Rate', 'Pain During Bowel Movements', 'Pain In Anal Region', 'Bloody Stool',
  'Irritation In Anus', 'Neck Pain', 'Dizziness', 'Cramps', 'Bruising', 'Obesity', 'Swollen Legs', 'Swollen Blood Vessels',
  'Puffy Face and Eyes', 'Enlarged Thyroid', 'Brittle Nails', 'Swollen Extremeties', 'Excessive Hunger', 'Extra Marital Contacts',
  'Drying and Tingling Lips', 'Slurred Speech', 'Knee Pain', 'Hip Joint Pain', 'Muscle Weakness', 'Stiff Neck', 'Swelling Joints',
  'Movement Stiffness', 'Spinning Movements', 'Loss of Balance', 'Unsteadiness', 'Weakness of One Body Side', 'Loss of Smell',
  'Bladder Discomfort', 'Foul Smell of Urine', 'Continuous Feel of Urine', 'Passage of Gases', 'Internal Itching',
  'Toxic Look (Typhos)', 'Depression', 'Irritability', 'Muscle Pain', 'Altered Sensorium', 'Red Spots Over Body', 'Belly Pain',
  'Abnormal Menstruation', 'Dischromic Patches', 'Watering From Eyes', 'Increased Appetite', 'Polyuria', 'Family History',
  'Mucoid Sputum', 'Rusty Sputum', 'Lack of Concentration', 'Visual Disturbances', 'Receiving Blood Transfusion',
  'Receiving Unsterile Injections', 'Coma', 'Stomach Bleeding', 'Distention of Abdomen', 'History of Alcohol Consumption',
  'Blood in Sputum', 'Prominent Veins on Calf', 'Palpitations', 'Painful Walking', 'Pus Filled Pimples',
  'Blackheads', 'Scurring', 'Skin Peeling', 'Silver Like Dusting', 'Small Dents in Nails', 'Inflammatory Nails', 'Blister',
  'Red Sore Around Nose', 'Yellow Crust Ooze']; 

interface PatientAppointmentsSMartProps {
  loggedUser: User,
  predictDisease: {
    loading: boolean,
    diseasePrediction: string,
    error: string,
  },
  predictDiseaseFromSymptoms: (symptomsArr: Array<number>) => void,
}

function PatientTestForDiseaseSmart({ loggedUser, predictDisease, predictDiseaseFromSymptoms }: PatientAppointmentsSMartProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Array<string>>([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  let preprocessSymptomsArray = (): Array<number> => {
    let preprocessedSymptomsArray: Array<number> = Array(132).fill(0);
    selectedSymptoms.forEach(disease => {
      preprocessedSymptomsArray[diseasesArray.indexOf(disease)] = 1
    });
    return preprocessedSymptomsArray;
  }

  let testSymptoms = (): void => {
    let symptomsToTest = preprocessSymptomsArray();
    predictDiseaseFromSymptoms(symptomsToTest);
  }

  useEffect(() => {

    if (predictDisease.loading) {
      setLoading(true);
    }
    else if (predictDisease.error !== '') {
      setMessage(predictDisease.error);
      setLoading(false);
      setOpenError(true);
    }
    else if (predictDisease.diseasePrediction) {
      setLoading(false);

      setMessage(`We have predicted that you may have ${predictDisease.diseasePrediction}`);
      setOpenError(false);
      setOpenSuccess(true);
    }
  }, [predictDisease.diseasePrediction, predictDisease.error, predictDisease.loading]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> {message} </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <PatientTestForDiseaseDumb
        diseasesArray={diseasesArray}
        setSelectedSymptoms={setSelectedSymptoms}
        testSymptoms={testSymptoms}
      />
      {loading && <CircularProgress style={{color: 'white'}}/>}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    predictDisease: state.patient
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    predictDiseaseFromSymptoms: (symptomsArr: Array<number>) => dispatch(predictDisease(symptomsArr)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientTestForDiseaseSmart);