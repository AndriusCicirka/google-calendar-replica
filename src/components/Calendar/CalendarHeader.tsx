import React from 'react';
import styles from './CalendarHeader.module.css';

interface Props {
	gridArea?: string;
}

const DUMMY = ['6', '7', '8', '9', '10', '11', '12'];
const DAY_NAMES_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const CalendarHeader: React.FC<Props> = (): JSX.Element => {
	const loadHeaderCells = (weekdays: string[], dayNames: string[]) => {
		if (weekdays) {
			return weekdays.map((day: string, index): JSX.Element => {
				return (
					<div className={styles.headerCell} key={index + 123}>
						<span className={styles.headerCellLetters}>{dayNames[index]}</span>
						<span className={styles.headerCellNumbers}>{day}</span>
					</div>
				);
			});
		} else {
			throw new Error('Calendar header had problems loading weekday cells');
		}
	};

	return (
		<>
			<div className={styles.headerMisc}>
				<div>
					<button className={styles.buttonWeek}>{'<'}</button>
					<button className={styles.buttonWeek}>{'>'}</button>
				</div>
				<span className={styles.headerTimezone}>GMT+03</span>
			</div>
			<>{loadHeaderCells(DUMMY, DAY_NAMES_SHORT)}</>
		</>
	);
};

export default CalendarHeader;
