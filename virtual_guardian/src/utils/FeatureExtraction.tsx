import moment from "moment";
import { Activity, ActivityList } from "../model/models";

export let activityArray = ["Breakfast", "Dinner", "Grooming", "Leaving", "Lunch", "Showering", "Sleeping", "Snack", "Spare_Time/TV", "Toileting"];

export let durationFrequencyRatio = (activities: Activity[]): number[] => {
  let computedArray = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  let durationOfActivities = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let frequencyOfActivities = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  activities.forEach(activity => {
    let time1 = moment(activity.startTime, 'HH:mm:ss');
    let time2 = moment(activity.endTime, 'HH:mm:ss');

    let diff = moment.duration(time2.diff(time1));

    durationOfActivities[activityArray.indexOf(activity.activity)] += diff.asSeconds();
    frequencyOfActivities[activityArray.indexOf(activity.activity)] += 1;
  });

  for (let i = 0; i < computedArray.length; i++) {
    if (frequencyOfActivities[i] !== 0) {
      let ratio = parseFloat((durationOfActivities[i] / frequencyOfActivities[i]).toFixed(2));
      computedArray[i] = ratio;
    }
  }

  return computedArray;
}

export let getDuration = (activities: Activity[]): number[] => {
  let durationOfActivities = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  activities.forEach(activity => {
    let time1 = moment(activity.startTime, 'HH:mm:ss');
    let time2 = moment(activity.endTime, 'HH:mm:ss');

    let diff = moment.duration(time2.diff(time1));

    durationOfActivities[activityArray.indexOf(activity.activity)] += diff.asSeconds();
  });

  // console.log('DURATION ARRAY FOR DAY '+ activities[0].day)
  // console.log(durationOfActivities)
  return durationOfActivities;
}

export let getFrequency = (activities: Activity[]): number[] => {
  let frequencyOfActivities = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  activities.forEach(activity => {
    frequencyOfActivities[activityArray.indexOf(activity.activity)] += 1;
  });

  // console.log('FREQUENCY ARRAY FOR DAY '+ activities[0].day)
  // console.log(frequencyOfActivities)
  return frequencyOfActivities;
}

export let getBaselineOfActivities = (features: string, days: ActivityList[]): number[] => {
  let baselineFeatures = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

  switch (features) {
    case 'durationFrequencyRatio':
      days.forEach(day => {
        let features = durationFrequencyRatio(day.activities)
        baselineFeatures = baselineFeatures.map((v, i) => v + features[i])
      })
      break;
    case 'duration':
      days.forEach(day => {
        let features = getDuration(day.activities)
        baselineFeatures = baselineFeatures.map((v, i) => v + features[i])
      })
      break;
    case 'frequency':
      days.forEach(day => {
        let features = getFrequency(day.activities)
        baselineFeatures = baselineFeatures.map((v, i) => v + features[i])
      })
      break;
    default:
      console.log('unknown feature')
      break;
  }

  baselineFeatures = baselineFeatures.map((v, i) => parseFloat((v / days.length).toFixed(2)))
  // console.log(activityArray)
  // console.log(baselineFeatures)
  return baselineFeatures;
}