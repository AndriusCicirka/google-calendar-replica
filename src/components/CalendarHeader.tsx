import styles from '../css/CalendarHeader.module.css';

import React from 'react';
import classnames from 'classnames';

import { getToday, getWeekdays} from 'utils';

interface Props {
	gridArea: string;
	currentWeeklyView: Date;
	onViewChange: Function;
}

const CalendarHeader: React.FC<Props> = (props) => {
	const today = getToday();
	const weekdays = getWeekdays(props.currentWeeklyView);

	const formatDayName = (day: Date) => {
		return day
			.toLocaleString('en-US', {
				weekday: 'short',
			})
			.toUpperCase();
	};

	const checkIfSameDay = (today: Date, otherDate: Date) => {
		return (
			today.getFullYear() === otherDate.getFullYear() &&
			today.getMonth() === otherDate.getMonth() &&
			today.getDate() === otherDate.getDate()
		);
	};

	return (
		<div className={styles[props.gridArea]}>
			<>
				{weekdays.map((day: Date, index) => {
					const isToday = checkIfSameDay(today, day);
					return (
						<div className={styles.headerCell} key={index + 123}>
							<span
								className={classnames(
									styles.headerCellLetters,
									isToday && styles.currentDayLetters
								)}
							>
								{formatDayName(day)}
							</span>
							<span
								className={classnames(
									styles.headerCellNumbers,
									isToday && styles.currentDayNumbers
								)}
							>
								{day.getDate()}
							</span>
						</div>
					);
				})}
			</>
		</div>
	);
};

export default CalendarHeader;
