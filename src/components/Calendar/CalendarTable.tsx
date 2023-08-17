import React from 'react';
import styles from './CalendarTable.module.css';

import Event from '../Event/Event';
import { calculateStyles, generateDateId } from 'utils/utils';
import { fetchData } from 'utils/apiHelper';

interface Props {
	gridArea?: string;
	currentWeeklyView: Date;
	showEventModal: boolean;
	onTableClick: Function;
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

const renderCells = (
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

const renderEvents = (currentWeeklyView: Date, eventData: Data[]) => {
	const viewId = generateDateId(currentWeeklyView);
	if (eventData) {
		const filteredData = eventData.filter(
			(event) =>
				event.startingDateId === viewId || event.finishingDateId === viewId
		);

		let styledData = filteredData.map((event) => calculateStyles(event)).flat();

		styledData = styledData.filter(
			(event) => event.storageId!.localeCompare(viewId) === 0
		);

		return styledData.map((event) => {
			const {
				id,
				title,
				description,
				startingDate,
				finishingDate,
				overlapping,
				width,
				gridRow,
				gridColumn,
				marginBottom,
				marginTop,
				paddingTop,
				paddingBottom,
			} = event;
			return (
				<Event
					id={id}
					key={id}
					title={title}
					description={description}
					startingDate={startingDate}
					finishingDate={finishingDate}
					overlapping={overlapping}
				/>
			);
		});
	} else return null;
};

const CalendarTable: React.FC<Props> = (props): JSX.Element => {
	const tableClickHandler = (modalState: boolean) => {
		props.onTableClick(!modalState);
	};

	const temp = fetchData('events');

	return (
		<>
			<div aria-hidden="true" className={styles.tableTime}>
				{renderCells(TIME_MARKINGS, true)}
			</div>
			<div
				className={styles.tableWrap}
				onClick={() => tableClickHandler(props.showEventModal)}
			>
				<div className={styles.table}>
					{renderEvents(props.currentWeeklyView, temp)}
				</div>
				<div className={styles.tableInvisible}>{renderCells()}</div>
			</div>
		</>
	);
};

export default CalendarTable;
