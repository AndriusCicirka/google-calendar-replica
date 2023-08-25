import React from 'react';
import styles from './CalendarHeader.module.css';
import { getToday, getWeekdays, DAYS_IN_WEEK } from 'utils';

import classnames from 'classnames';

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

	const handleWeekNavigation = (
		direction: 'forward' | 'backward',
		currentDate: Date
	) => {
		const updatedDate =
			direction === 'forward'
				? new Date(currentDate.setDate(currentDate.getDate() + DAYS_IN_WEEK))
				: new Date(currentDate.setDate(currentDate.getDate() - DAYS_IN_WEEK));

		props.onViewChange(updatedDate);
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
			<div className={styles.headerMisc}>
				<div>
					<button
						className={styles.buttonWeek}
						onClick={() =>
							handleWeekNavigation('backward', props.currentWeeklyView)
						}
					>
						{'<'}
					</button>
					<button
						className={styles.buttonWeek}
						onClick={() =>
							handleWeekNavigation('forward', props.currentWeeklyView)
						}
					>
						{'>'}
					</button>
				</div>
				<span className={styles.headerTimezone}>GMT+03</span>
			</div>
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
