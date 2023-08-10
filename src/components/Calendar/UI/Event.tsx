import React from 'react';
import './Event.css';

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
		<div className="calendar-event">
			<span className="calendar-event--title">Cat Shower, </span>
			<span className="calendar-event--time">08:00 - 10:00</span>
			<p className="calendar-event--description">Cat like bath, yes</p>
		</div>
	);
};

export default Event;
