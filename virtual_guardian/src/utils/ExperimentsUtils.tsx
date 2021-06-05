import { ActivityList } from "../model/models";
import { activityArray, durationFrequencyRatio } from "./FeatureExtraction";

export let getDaysWithTheirActivities = (selected: Date[], activitiesList: ActivityList[]): ActivityList[] => {
  let selectedActivityList: ActivityList[] = []

  for (let i = 0; i < activitiesList.length; i++) {
    if (selected.includes(activitiesList[i].day)) {
      selectedActivityList.push(activitiesList[i])
    }
  }

  return selectedActivityList;
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
    default:
      console.log('unknown feature')
      break;
  }

  baselineFeatures = baselineFeatures.map((v, i) => parseFloat((v / days.length).toFixed(2)))
  console.log(activityArray)
  console.log(baselineFeatures)
  return baselineFeatures;
}