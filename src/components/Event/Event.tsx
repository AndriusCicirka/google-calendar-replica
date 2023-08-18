import React from 'react';
import styles from './Event.module.css';

import { StyledEventInfo } from 'utils/interfaces';

const renderHHMMString = (date: Date) => {
	return `${String(date.getHours()).padStart(2, '0')}:${String(
		date.getMinutes()
	).padStart(2, '0')}`;
};

const Event: React.FC<StyledEventInfo> = (event): JSX.Element => {
	return (
		<div
			className={styles.event}
			style={{
				gridRow: event.gridRow,
				gridColumn: event.gridColumn,
				marginBottom: event.marginBottom,
				marginTop: event.marginTop,
				paddingBottom: event.paddingBottom,
				paddingTop: event.paddingTop,
			}}
		>
			<span className={styles.eventTitle}>{event.title}, </span>
			<span className={styles.eventTime}>
				{renderHHMMString(event.startingDate)} -{' '}
				{renderHHMMString(event.finishingDate)}
			</span>
			<p className={styles.eventDescription}>{event.description}</p>
		</div>
	);
};

export default Event;
