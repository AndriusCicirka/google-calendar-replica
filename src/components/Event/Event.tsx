import React from 'react';
import styles from './Event.module.css';

interface EventInformation {
	id: string;
	title: string;
	description?: string;
	startingDate: Date;
	finishingDate: Date;
	startingDateId: string;
	finishingDateId: string;
	overlapping: boolean;
	locale: string;
}

const Event = (eventInfo): JSX.Element => {
	return (
		<div className={styles.event}>
			<span className={styles.eventTitle}>Cat Shower, </span>
			<span className={styles.eventTime}>08:00 - 10:00</span>
			<p className={styles.eventDescription}>Cat like bath, yes</p>
		</div>
	);
};

export default Event;
