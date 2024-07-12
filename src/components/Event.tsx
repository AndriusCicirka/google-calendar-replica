import styles from '../css/Event.module.css';

import { CalendarEventWithStyles } from '../types';

const renderHHMMString = (date: Date) => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
};

const renderShortDate = (date: Date) => {
  return `${date.toLocaleString('en-US', {
    month: 'short',
  })} ${date.getDate()}`;
};

const Event: React.FC<CalendarEventWithStyles> = (props) => {
  
  const { gridRow, gridColumn, marginBottom, marginTop, paddingBottom, paddingTop } = props;

  const {title, description, extendsOverMultipleDays, startingDate, finishingDate} = props;
        
  return (
    <div
      className={styles.event}
      style={{
        gridRow,
        gridColumn,
        marginBottom,
        marginTop,
        paddingBottom,
        paddingTop,
      }}
    >
      <span className={styles.eventTitle}>{title}, </span>
      <span className={styles.eventTime}>
        {extendsOverMultipleDays &&
					`${renderShortDate(startingDate)}, `}
        {renderHHMMString(startingDate)} -{' '}
        {renderHHMMString(finishingDate)}
        {extendsOverMultipleDays &&
					`, ${renderShortDate(finishingDate)}`}
      </span>
      <p className={styles.eventDescription}>{description}</p>
    </div>
  );
};

export default Event;
