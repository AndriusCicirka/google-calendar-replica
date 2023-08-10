import React from 'react';
import './CalendarHeader.css';

interface Props {
	gridArea?: string;
}

const DUMMY = ['6', '7', '8', '9', '10', '11', '12'];
const DAY_NAMES_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const loadMiscCell = (): JSX.Element => {
	return (
		<div className="calendar-header--misc">
			<div>
				<button className="button-week--back">{'<'}</button>
				<button className="button-week--forward">{'>'}</button>
			</div>
			<span className="calendar-header--timezone">GMT+03</span>
		</div>
	);
};

const loadHeaderCells = (
	weekdays: string[],
	dayNames: string[]
): JSX.Element[] => {
	//TO-DO: Make component accept date objects instead of plain numbers
	//TO-DO: Add check if the displayed week has a day of today's date
	if (weekdays.length === 7) {
		return weekdays.map((day, index): JSX.Element => {
			return (
				<div className="calendar-header--cell" key={index + 123}>
					<span className="calendar-header--cell--letters">
						{dayNames[index]}
					</span>
					<span className="calendar-header--cell--number">{day}</span>
				</div>
			);
		});
	} else {
		throw new Error('Calendar header had problems loading weekday cells');
	}
};

const CalendarHeader: React.FC<Props> = (): JSX.Element => {
	return (
		<div className="calendar-header--wrap">
			<>{loadMiscCell()}</>
			<>{loadHeaderCells(DUMMY, DAY_NAMES_SHORT)}</>
		</div>
	);
};

export default CalendarHeader;
