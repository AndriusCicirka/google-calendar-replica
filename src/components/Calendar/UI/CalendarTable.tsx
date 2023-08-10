import React from 'react';
import './CalendarTable.css';

interface Props {
	gridArea?: string;
}

const WEEK_LENGTH = 7;
const HOURS_IN_DAY = 24;

const generateTableCells = (
	weekLength: number,
	hoursInDay: number
): JSX.Element[] => {
	const tableCells: JSX.Element[] = [];

	for (let i = 1; i < weekLength * hoursInDay; i++) {
		tableCells.push(<div className="calendar-table--cell" key={i}></div>);
	}

	return tableCells;
};

const CalendarTable: React.FC<Props> = () => {
	return (
		<div className="calendar-wrap">
			<div aria-hidden="true" className="calendar-table--time">
				<span className="time-marker">1 AM</span>
				<span className="time-marker">2 AM</span>
				<span className="time-marker">3 AM</span>
				<span className="time-marker">4 AM</span>
				<span className="time-marker">5 AM</span>
				<span className="time-marker">6 AM</span>
				<span className="time-marker">7 AM</span>
				<span className="time-marker">8 AM</span>
				<span className="time-marker">9 AM</span>
				<span className="time-marker">10 AM</span>
				<span className="time-marker">11 AM</span>
				<span className="time-marker">12 PM</span>
				<span className="time-marker">1 PM</span>
				<span className="time-marker">2 PM</span>
				<span className="time-marker">3 PM</span>
				<span className="time-marker">4 PM</span>
				<span className="time-marker">5 PM</span>
				<span className="time-marker">6 PM</span>
				<span className="time-marker">7 PM</span>
				<span className="time-marker">8 PM</span>
				<span className="time-marker">9 PM</span>
				<span className="time-marker">10 PM</span>
				<span className="time-marker">11 PM</span>
			</div>
			<div className="calendar-table--wrap">
				<div className="calendar-table"></div>
				<div className="calendar-table--invisible">
					{generateTableCells(WEEK_LENGTH, HOURS_IN_DAY)}
				</div>
			</div>
		</div>
	);
};

export default CalendarTable;
