import styles from '../css/Event.module.css';

import React from 'react';

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
	return (
		<div
			className={styles.event}
			style={{
				gridRow: props.gridRow,
				gridColumn: props.gridColumn,
				marginBottom: props.marginBottom,
				marginTop: props.marginTop,
				paddingBottom: props.paddingBottom,
				paddingTop: props.paddingTop,
			}}
		>
			<span className={styles.eventTitle}>{props.title}, </span>
			<span className={styles.eventTime}>
				{props.extendsOverMultipleDays &&
					`${renderShortDate(props.startingDate)}, `}
				{renderHHMMString(props.startingDate)} -{' '}
				{renderHHMMString(props.finishingDate)}
				{props.extendsOverMultipleDays &&
					`, ${renderShortDate(props.finishingDate)}`}
			</span>
			<p className={styles.eventDescription}>{props.description}</p>
		</div>
	);
};

export default Event;
