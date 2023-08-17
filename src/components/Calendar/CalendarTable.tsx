import React from 'react';
import styles from './CalendarTable.module.css';

import Event from '../Event/Event';

interface Props {
	gridArea?: string;
}

const WEEK_LENGTH = 7;
const HOURS_IN_DAY = 24;

const TIME_MARKINGS = [
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
	'12',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
];

const calculatePreffix = (i: number): 'AM' | 'PM' => {
	if (i < 11) {
		return 'AM';
	}

	return 'PM';
};

const generateCells = (
	timeMarkings?: string[],
	preffixAmPm?: boolean
): JSX.Element[] => {
	const cells: JSX.Element[] = [];

	if (!timeMarkings) {
		for (let i = 1; i < WEEK_LENGTH * HOURS_IN_DAY; i++) {
			cells.push(<div className={styles.tableCell} key={i}></div>);
		}
	} else if (timeMarkings) {
		for (let i = 0; i < HOURS_IN_DAY - 1; i++) {
			cells.push(
				<span className={styles.timeMarker} key={i}>
					{timeMarkings[i]} {preffixAmPm && calculatePreffix(i)}
				</span>
			);
		}
	} else {
		throw new Error(
			'CalendarTable encountered an error while generating cells'
		);
	}

	return cells;
};

const CalendarTable: React.FC<Props> = (): JSX.Element => {
	return (
		<>
			<div aria-hidden="true" className={styles.tableTime}>
				{generateCells(TIME_MARKINGS, true)}
			</div>
			<div
				className={styles.tableWrap}
				onClick={() => console.log('modal toggle')}
			>
				<div className={styles.table}>
					<Event />
				</div>
				<div className={styles.tableInvisible}>{generateCells()}</div>
			</div>
		</>
	);
};

export default CalendarTable;
