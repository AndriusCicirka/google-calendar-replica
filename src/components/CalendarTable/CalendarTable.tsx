import React from 'react';
import styles from './CalendarTable.module.css';

import Event from '../Event/Event';
import { CalendarEvent } from 'types';
import {
	calculatePreffix,
	WEEK_LENGTH,
	HOURS_IN_DAY,
	TIME_MARKINGS,
	processEventDataByWeek,
} from 'utils';

interface Props {
	gridArea: string;
	currentWeeklyView: Date;
	showEventModal: boolean;
	eventList: CalendarEvent[];
	onTableClick: Function;
}

const CalendarTable: React.FC<Props> = (props): JSX.Element => {
	const tableClickHandler = (modalState: boolean) => {
		props.onTableClick(!modalState);
	};

	const currentViewEvents = processEventDataByWeek(
		props.currentWeeklyView,
		props.eventList
	);

	return (
		<div className={styles[props.gridArea]}>
			<div aria-hidden="true" className={styles.tableTime}>
				{Array.from({ length: HOURS_IN_DAY - 1 }, (_, i) => (
					<span className={styles.timeMarker} key={i}>
						{TIME_MARKINGS[i]} {calculatePreffix(i)}
					</span>
				))}
			</div>
			<div
				className={styles.tableWrap}
				onClick={() => tableClickHandler(props.showEventModal)}
			>
				<div className={styles.table}>
					{props.eventList &&
						currentViewEvents.map((event) => {
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
						})}
				</div>
				<div className={styles.tableInvisible}>
					{Array.from({ length: WEEK_LENGTH * HOURS_IN_DAY }, (_, i) => (
						<div className={styles.tableCell} key={i}></div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CalendarTable;
