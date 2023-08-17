import React from 'react';
import styles from './Event.module.css';

interface EventInformation {
	id: string;
	title: string;
	description?: string;
	startingDate: Date;
	finishingDate: Date;
	startingDateId?: string;
	finishingDateId?: string;
	overlapping: boolean;
	locale?: string;
}

const renderHHMMString = (date: Date) => {
	return `${String(date.getHours()).padStart(2, '0')}:${String(
		date.getMinutes()
	).padStart(2, '0')}}`;
};

const Event: React.FC<EventInformation> = (event): JSX.Element => {
	return (
		<div className={styles.event}>
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
