import { useState } from "react";
import { User } from "../../../../model/models";
import PatientTestForDiseaseDumb from "./PatientTestForDiseaseDumb";

const diseasesArray = ['Itching', 'Skin Rash', 'Nodal Skin Eruptions', 'Continuous Sneezing', 'Shivering', 'Chills',
  'Joint_Pain', 'Stomach Pain', 'Acidity', 'Ulcers On Tongue', 'Muscle Wasting', 'Vomiting', 'Burning Micturition',
  'Spotting Urination', 'Fatigue', 'Weight Gain', 'anxiety', 'Cold Hands And Feet', 'Mood Swings', 'Weight Loss',
  'Restlessness', 'Lethargy', 'Patches In Throat', 'Irregular Sugar Level', 'Cough', 'High Fever', 'Sunken Eyes', 'Breathlessness',
  'Sweating', 'Dehydration', 'Indigestion', 'Headache', 'Yellowish Skin', 'Dark Urine', 'Nausea', 'Loss Of Appetite',
  'Pain Behind The Eyes', 'Back Pain', 'Constipation', 'Abdominal Pain', 'diarrhoea', 'Mild Fever', 'Yellow Urine',
  'Yellowing Of Eyes', 'Acute Liver Failure', 'Fluid Overload', 'Swelling Of Stomach', 'Swelled Lymph Nodes', 'Malaise',
  'Blurred And Distorted Vision', 'Phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion',
  'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
  'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels',
  'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts',
  'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints',
  'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell',
  'bladder_discomfort', 'foul_smell_of_urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching',
  'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
  'abnormal_menstruation', 'dischromic_patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history',
  'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion',
  'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption',
  'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples',
  'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister',
  'red_sore_around_nose', 'yellow_crust_ooze'];

interface PatientAppointmentsSMartProps {
  loggedUser: User
}

function PatientTestForDiseaseSmart({ loggedUser }: PatientAppointmentsSMartProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Array<string>>([]);
  
  let preprocessSymptomsArray = (): void => {
    let preprocessedSymptomsArray: Array<number> = Array(132).fill(0);
    selectedSymptoms.forEach(disease => {
      preprocessedSymptomsArray[diseasesArray.indexOf(disease)] = 1
    });
  }

  let testSymptoms = (): void => {
    let symptomsToTest = preprocessSymptomsArray();
    //send request to flask
  }

  return (
    <>
      <PatientTestForDiseaseDumb
        diseasesArray={diseasesArray}
        setSelectedSymptoms={setSelectedSymptoms}
        testSymptoms={ testSymptoms }
      />
    </>
  );
}

export default PatientTestForDiseaseSmart;