import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { ActivityList } from "../../../../model/models";
import { useStylesLabelDays } from "../../../../styles/CaregiverStyle";
import CollapsibleTable from "../../admin/experimentsPage/CollapsibleTable";
import DoneIcon from '@material-ui/icons/Done';

// const data = {
//   labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [2, 9, 3, 5, 2, 3],
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1,
//     },
//   ],
// };



// const RadarChart = () => (
//   <Radar data={data} options={options} type='radar' />
// );

interface LabelDaysDumbProps {
  activitiesList: ActivityList[],
  selected: Date[],
  setSelected: (selected: Date[]) => void,
  loading: boolean,
  sendSelected: () => void,
}

function LabelDaysDumb({ activitiesList, selected, setSelected, loading, sendSelected }: LabelDaysDumbProps) {
  let style = useStylesLabelDays()

  //TODO use baseline

  // const [data, setData] =
  //   useState<GraphData>({ 'labels': [], 'datasets': [] })

  // labels: ["Breakfast", "Dinner", "Grooming", "Leaving", "Lunch", "Showering", "Sleeping", "Snack", "Spare_Time/TV", "Toileting"],

  // useEffect(() => {
  //   setData({
  //     labels: ["Breakfast", "Dinner", "Grooming", "Showering", "Snack", "Toileting"], //TODO afiseaza si restuuul
  //     datasets: [
  //       {
  //         label: 'Baseline',
  //         data: baseline,
  //         backgroundColor: 'rgba(0, 172, 193, 0.5)',
  //         borderColor: 'rgb(0, 172, 193)',
  //         borderWidth: 3,
  //       },
  //     ]
  //   })
  // }, [baseline]);

  return (
    <>
      {/* <div style={{ width: '35vw', height: '35vh' }}>
        <Radar data={data} options={options} type='radar' />
      </div> */}
      <div className={style.collapsibleTableStyle}>
        {loading && <CircularProgress style={{ position: 'absolute' }} />}

        <CollapsibleTable
          activitiesList={activitiesList}
          selected={selected}
          setSelected={setSelected}
          page={'LabelDays'}
        />
      </div>

      <Tooltip title="Finish" className={style.finishTooltipStyle}>
        <IconButton aria-label="finish" onClick={sendSelected} >
          <DoneIcon className={style.finishButtonStyle} />
        </IconButton>
      </Tooltip>
    </>
  );
}
export default LabelDaysDumb;