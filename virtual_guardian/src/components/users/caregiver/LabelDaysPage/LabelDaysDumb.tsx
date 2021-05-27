import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { ActivityList } from "../../../../model/models";
import { useStylesLabelDays } from "../../../../styles/CaregiverStyle";
import CollapsibleTable from "../../admin/experimentsPage/CollapsibleTable";
import DoneIcon from '@material-ui/icons/Done';

interface LabelDaysDumbProps {
  activitiesList: ActivityList[],
  selected: Date[],
  setSelected: (selected: Date[]) => void,
  loading: boolean,
  sendSelected: () => void,
}

function LabelDaysDumb({ activitiesList, selected, setSelected, loading, sendSelected }: LabelDaysDumbProps) {
  let style = useStylesLabelDays()

  return (
    <>
      <div className={style.collapsibleTableStyle}>
        {loading && <CircularProgress color='primary' />}
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