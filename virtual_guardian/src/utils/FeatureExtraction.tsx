import moment from "moment";
import { Activity } from "../model/models";

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