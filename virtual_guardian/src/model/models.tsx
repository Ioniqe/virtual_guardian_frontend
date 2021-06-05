export const SERVER_URL = 'http://localhost:8080';
export const FLASK_URL = 'http://localhost:5000';

export interface LoginUser{
  username: string,
  password: string,
} 

export interface BasicUser extends LoginUser {
  firstname: string,
  lastname: string,
  birthday: Date | string,
  gender: string,
  type: string,
}

export interface SpecialUser extends BasicUser{
  secretCredential: string
}

export interface User extends BasicUser{
  id: string,
  doctorId?: string,
  caregiverId?: string,
  address?: string,
}

export interface DiseaseProps{
  disease: string
}

export interface WebSocketMessages{
  day: string,
  message: string
}

export interface Activity{
  day: Date,
  startTime: string,
  endTime: string,
  activity: string,
}

export interface ActivityList{
  day: Date,
  activities: Activity[],
}

export interface Day extends ActivityList{ 
  id: number,
  result: string
}

export interface DayDetected{
  day: string,
  result: string
}

export interface TrainModel{
  algorithm: string,
  features: string
}

export interface WebSocketActivities{
  arr: Activity[],
  prediction: string
}

export interface LabeledDay{
  id: number,
  day: Date,
  label: string,
}

export interface EmergencyWebsocket{
  userId: string, //doctor or caregiver's id
  patientName: string,
  message: string
}

export interface Emergency{
  id: number, //id of emergency 
  patientName: string,
  date: Date,
  userId: string,
}
