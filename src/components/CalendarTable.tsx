import styles from '../css/CalendarTable.module.css';

import Event from './Event';
import { CalendarEventWithStyles } from 'types';
import {
  WEEK_LENGTH,
  HOURS_IN_DAY,
} from 'utils';

interface Props {
  showEventModal: boolean;
  eventList: CalendarEventWithStyles[];
  onTableClick: Function;
}

const tableCells = Array(WEEK_LENGTH * HOURS_IN_DAY).fill('');

const CalendarTable: React.FC<Props> = ({ showEventModal, eventList, onTableClick}) => {
  const tableClickHandler = (modalState: boolean) => {
    onTableClick(!modalState);
  };

  return (
    <div className={styles.calendarMain}>
      <div
        className={styles.tableWrap}
        onClick={() => tableClickHandler(showEventModal)}
      >
        <div className={styles.table}>
          {eventList &&
          eventList.map((event) => {
            const {
              id,
              key,
              title,
              description,
              startingDate,
              finishingDate,
              extendsOverMultipleDays,
              width,
              gridRow,
              gridColumn,
              marginBottom,
              marginTop,
              paddingTop,
              paddingBottom,
            } = event;
            return (
              <Event
                id={id}
                key={key}
                title={title}
                description={description}
                startingDate={startingDate}
                finishingDate={finishingDate}
                extendsOverMultipleDays={extendsOverMultipleDays}
                width={width}
                gridRow={gridRow}
                gridColumn={gridColumn}
                marginBottom={marginBottom}
                marginTop={marginTop}
                paddingBottom={paddingBottom}
                paddingTop={paddingTop}
              />
            );
          })}
        </div>
        <div className={styles.tableInvisible}>
          {tableCells.map((_, i) => (
            <div className={styles.tableCell} key={i}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarTable;
