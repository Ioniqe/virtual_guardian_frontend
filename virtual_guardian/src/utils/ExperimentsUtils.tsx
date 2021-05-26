import { ActivityList } from "../model/models";

export let getDaysWithTheirActivities = (selected: Date[], activitiesList: ActivityList[]): ActivityList[] => {
  let selectedActivityList: ActivityList[] = []

  for (let i = 0; i < activitiesList.length; i++){
    if (selected.includes(activitiesList[i].day)) {
      selectedActivityList.push(activitiesList[i])
    }
  }

  return selectedActivityList;
}