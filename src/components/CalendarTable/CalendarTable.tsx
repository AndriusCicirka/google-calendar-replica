import React from 'react';
import styles from './CalendarTable.module.css';

import Event from '../Event/Event';
import { CalendarEvent } from 'types';
import {
	calculateStyles,
	calculatePreffix,
	generateDateId,
	WEEK_LENGTH,
	HOURS_IN_DAY,
	TIME_MARKINGS,
} from 'utils';
interface Props {
	gridArea: string;
	currentWeeklyView: Date;
	showEventModal: boolean;
	eventList: CalendarEvent[];
	onTableClick: Function;
}

const renderCells = (): JSX.Element[] => {
	const cells: JSX.Element[] = [];

	for (let i = 1; i < WEEK_LENGTH * HOURS_IN_DAY; i++) {
		cells.push(<div className={styles.tableCell} key={i}></div>);
	}

	return cells;
};

const renderTimeMarkings = () => {
	const cells: JSX.Element[] = [];
	for (let i = 0; i < HOURS_IN_DAY - 1; i++) {
		cells.push(
			<span className={styles.timeMarker} key={i}>
				{TIME_MARKINGS[i]} {calculatePreffix(i)}
			</span>
		);
	}
	return cells;
};

const renderEvents = (currentWeeklyView: Date, eventData: CalendarEvent[]) => {
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
				key,
				title,
				description,
				startingDate,
				finishingDate,
				extendsOverMultipleDays,
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
					key={key}
					title={title}
					description={description}
					startingDate={startingDate}
					finishingDate={finishingDate}
					extendsOverMultipleDays={extendsOverMultipleDays}
					width={width}
					gridRow={gridRow}
					gridColumn={gridColumn}
					marginBottom={marginBottom}
					marginTop={marginTop}
					paddingBottom={paddingBottom}
					paddingTop={paddingTop}
				/>
			);
		});
	} else return null;
};

const CalendarTable: React.FC<Props> = (props): JSX.Element => {
	const tableClickHandler = (modalState: boolean) => {
		props.onTableClick(!modalState);
	};

	return (
		<div className={styles[props.gridArea]}>
			<div aria-hidden="true" className={styles.tableTime}>
				{renderTimeMarkings()}
			</div>
			<div
				className={styles.tableWrap}
				onClick={() => tableClickHandler(props.showEventModal)}
			>
				<div className={styles.table}>
					{renderEvents(props.currentWeeklyView, props.eventList)}
				</div>
				<div className={styles.tableInvisible}>{renderCells()}</div>
			</div>
		</div>
	);
};

export default CalendarTable;
