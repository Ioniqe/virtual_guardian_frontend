import { ActivityList, GraphData, GraphDataForFeature, VisualData } from '../model/models';
import { durationFrequencyRatio, getBaselineOfActivities, getDuration, getFrequency } from './FeatureExtraction';

let smallActivityLabels = ['Breakfast', 'Dinner', 'Grooming', 'Showering', 'Snack', 'Toileting']
let bigActivityLabels = ['Sleeping', 'Leaving', 'Spare_Time/TV', 'Lunch']

export let getVisualData = (days: ActivityList[], selectedDay: ActivityList): VisualData[] => {
  let visualData: VisualData[] = []
  let featureModels: string[] = ['durationFrequencyRatio', 'duration', 'frequency']

  featureModels.forEach(element => {
    let baselineQuickActs: number[] = []
    let selectedDayQuickActs: number[] = []

    let baselineLongActs: number[] = [];
    let selectedDayLongActs: number[] = [];

    switch (element) {
      case 'durationFrequencyRatio':
        baselineQuickActs = getBaselineOfActivities('durationFrequencyRatio', days)
        selectedDayQuickActs = durationFrequencyRatio(selectedDay.activities)
        break;
      case 'duration':
        baselineQuickActs = getBaselineOfActivities('duration', days)
        selectedDayQuickActs = getDuration(selectedDay.activities)
        break;
      case 'frequency':
        baselineQuickActs = getBaselineOfActivities('frequency', days)
        selectedDayQuickActs = getFrequency(selectedDay.activities)
        break;
      default:
        console.error('Error')
    }

    //process baseline with current feature model and split into quick and long activities
    baselineLongActs.push(baselineQuickActs[6]) //Sleeping
    baselineQuickActs.splice(6, 1)

    baselineLongActs.push(baselineQuickActs[3]) //Leaving
    baselineQuickActs.splice(3, 1)

    baselineLongActs.push(baselineQuickActs[6]) //Spare_Time/TV
    baselineQuickActs.splice(6, 1)

    baselineLongActs.push(baselineQuickActs[3]) //Lunch
    baselineQuickActs.splice(3, 1)

    //process selected day feature arr
    selectedDayLongActs.push(selectedDayQuickActs[6]) //Sleep
    selectedDayQuickActs.splice(6, 1)

    selectedDayLongActs.push(selectedDayQuickActs[3]) //Leaving
    selectedDayQuickActs.splice(3, 1)

    selectedDayLongActs.push(selectedDayQuickActs[6]) //Spare_Time/TV
    selectedDayQuickActs.splice(6, 1)

    selectedDayLongActs.push(selectedDayQuickActs[3]) //Lunch
    selectedDayQuickActs.splice(3, 1)

    let vData: VisualData = {
      feature: element,
      labels: {
        smallActivityLabels: smallActivityLabels,
        bigActivityLabels: bigActivityLabels,
      },
      datasets: {
        baseline: {
          smallActivitiesBaseline: baselineQuickActs,
          bigActivitiesBaseline: baselineLongActs
        },
        dayActivities: {
          smallActivities: selectedDayQuickActs,
          bigActivities: selectedDayLongActs
        }
      }
    }

    // if (element === 'frequency') {
    //   console.log(vData)
    // }

    visualData.push(vData)
  });

  // console.log(visualData)
  return visualData
}


export let getDaysWithTheirActivities = (selected: Date[], activitiesList: ActivityList[]): ActivityList[] => {
  let selectedActivityList: ActivityList[] = []

  for (let i = 0; i < activitiesList.length; i++) {
    if (selected.includes(activitiesList[i].day)) {
      selectedActivityList.push(activitiesList[i])
    }
  }

  return selectedActivityList;
}

export let getGraphData = (days: ActivityList[], selectedDay: ActivityList): GraphDataForFeature[] => {
  let graphDataForFeatures: GraphDataForFeature[] = []
  let visualData = getVisualData(days, selectedDay)

  visualData.forEach(data => {
    let quickActivitiesGraph: GraphData = {
      labels: smallActivityLabels,
      datasets: [
        {
          label: 'Baseline',
          data: data.datasets.baseline.smallActivitiesBaseline,
          backgroundColor: 'rgba(0, 172, 193, .5)',
          borderColor: 'rgb(0, 172, 193)',
          borderWidth: 3,
        },
        {
          label: 'Selected Day',
          data:  data.datasets.dayActivities.smallActivities,
          backgroundColor: 'rgba(247, 157, 101, .5)',
          borderColor: 'rgb(247, 157, 101)',
          borderWidth: 3,
        },
      ]
    }

    let longActivitiesGraph: GraphData = {
      labels: bigActivityLabels,
      datasets: [
        {
          label: 'Baseline',
          data: data.datasets.baseline.bigActivitiesBaseline,
          backgroundColor: 'rgba(0, 172, 193, .5)',
          borderColor: 'rgb(0, 172, 193)',
          borderWidth: 3,
        },
        {
          label: 'Selected Day',
          data:  data.datasets.dayActivities.bigActivities,
          backgroundColor: 'rgba(247, 157, 101, .5)',
          borderColor: 'rgb(247, 157, 101)',
          borderWidth: 3,
        },
      ]
    }

    let graphDataForFeature: GraphDataForFeature = {
      feature: data.feature,
      quickActivitiesGraph: quickActivitiesGraph,
      longActivitiesGraph: longActivitiesGraph
    }

    graphDataForFeatures.push(graphDataForFeature)
  })

  console.log('GRAPH DATA')
  console.log(graphDataForFeatures)

  return graphDataForFeatures;
}